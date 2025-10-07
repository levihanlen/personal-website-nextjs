"use client";

import { PageLayout } from "@/app/comp/PageLayout";
import { useState, useEffect, useCallback } from "react";
import { NodeClusterType } from "@/app/utils/knowledge/NEW";

type SyncAction = {
  type: "add" | "update" | "delete" | "skip";
  node?: NodeClusterType;
  ankiId?: number;
  ankiText?: string;
  reason?: string;
};

type AnkiNote = {
  noteId: number;
  fields: {
    Text: { value: string };
    "Back Extra": { value: string };
  };
  tags: string[];
};

function flatten(nodes: NodeClusterType[]): NodeClusterType[] {
  const flat: NodeClusterType[] = [];
  function walk(n: NodeClusterType) {
    flat.push(n);
    n.c?.forEach(walk);
  }
  nodes.forEach(walk);
  return flat;
}

function normalizeCloze(text: string): string {
  const parts: string[] = [];
  let lastIndex = 0;
  let clozeNumber = 1;

  const regex = /\{\{(.+?)\}\}/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    parts.push(text.slice(lastIndex, match.index));

    const content = match[1];
    if (content.match(/^c\d+::/)) {
      parts.push(match[0]);
    } else {
      parts.push(`{{c${clozeNumber++}::${content}}}`);
    }

    lastIndex = regex.lastIndex;
  }

  parts.push(text.slice(lastIndex));
  return parts.join("");
}

function hasCloze(text: string): boolean {
  return /\{\{.+?\}\}/.test(text);
}

function extractAnkiId(text: string): number | null {
  const match = text.match(/\^id:(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

function removeAnkiId(text: string): string {
  return text.replace(/\s*\^id:\d+\s*$/, "");
}

function textWithoutId(node: NodeClusterType): string {
  return removeAnkiId(node.p);
}

function normalizedText(node: NodeClusterType): string {
  return normalizeCloze(textWithoutId(node));
}

function textForAnki(node: NodeClusterType): string {
  const normalized = normalizedText(node);
  const category = node.category || "";
  return category ? `${category}: ${normalized}` : normalized;
}

export default function AnkiClient({ nodes }: { nodes: NodeClusterType[] }) {
  const [actions, setActions] = useState<SyncAction[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [status, setStatus] = useState("");
  const [syncComplete, setSyncComplete] = useState(false);

  async function invokeAnkiConnect(
    action: string,
    params: Record<string, unknown> = {}
  ) {
    const response = await fetch("http://localhost:8765", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action,
        version: 6,
        params,
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data.result;
  }

  const analyzeChanges = useCallback(async () => {
    setIsAnalyzing(true);
    setStatus("Analyzing changes...");
    setSyncComplete(false);

    try {
      await invokeAnkiConnect("createDeck", { deck: "test" });

      const noteIds = (await invokeAnkiConnect("findNotes", {
        query: "deck:test",
      })) as number[];

      const ankiNotes =
        noteIds.length > 0
          ? ((await invokeAnkiConnect("notesInfo", {
              notes: noteIds,
            })) as AnkiNote[])
          : [];

      const ankiMap = new Map<number, AnkiNote>();
      ankiNotes.forEach((note) => {
        ankiMap.set(note.noteId, note);
      });

      const flat = flatten(nodes);
      const newActions: SyncAction[] = [];
      const processedAnkiIds = new Set<number>();

      flat.forEach((node) => {
        const textWithoutIdStr = textWithoutId(node);
        const textForAnkiStr = textForAnki(node);
        const ankiId = extractAnkiId(node.p);

        if (!hasCloze(textWithoutIdStr)) {
          newActions.push({
            type: "skip",
            node,
            reason: "No cloze deletions found",
          });
          return;
        }

        if (ankiId) {
          processedAnkiIds.add(ankiId);
          const ankiNote = ankiMap.get(ankiId);

          if (ankiNote) {
            const ankiText = removeAnkiId(ankiNote.fields.Text.value);
            if (ankiText === textForAnkiStr) {
              newActions.push({
                type: "skip",
                node,
                ankiId,
                reason: "No changes",
              });
            } else {
              newActions.push({
                type: "update",
                node,
                ankiId,
                ankiText,
              });
            }
          } else {
            newActions.push({
              type: "add",
              node,
              ankiId,
            });
          }
        } else {
          newActions.push({
            type: "add",
            node,
          });
        }
      });

      ankiNotes.forEach((note) => {
        if (!processedAnkiIds.has(note.noteId)) {
          newActions.push({
            type: "delete",
            ankiId: note.noteId,
            ankiText: note.fields.Text.value,
          });
        }
      });

      setActions(newActions);
      setStatus("Analysis complete");
    } catch (error) {
      setStatus(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsAnalyzing(false);
    }
  }, [nodes]);

  async function syncToAnki() {
    setIsSyncing(true);
    setStatus("Syncing to Anki...");
    setSyncComplete(false);

    try {
      await invokeAnkiConnect("createDeck", { deck: "test" });

      let addedCount = 0;
      let updatedCount = 0;
      let deletedCount = 0;
      const idUpdates: { oldText: string; newText: string }[] = [];

      for (const action of actions) {
        if (action.type === "add" && action.node) {
          try {
            const textWithoutIdStr = textWithoutId(action.node);
            const normalizedTextStr = normalizeCloze(textWithoutIdStr);
            const textForAnkiStr = textForAnki(action.node);
            const noteId = (await invokeAnkiConnect("addNote", {
              note: {
                deckName: "test",
                modelName: "Cloze",
                fields: {
                  Text: textForAnkiStr,
                  "Back Extra": action.node.category || "",
                },
                tags: ["synced", action.node.category || "uncategorized"],
              },
            })) as number;

            idUpdates.push({
              oldText: action.node.p,
              newText: `${normalizedTextStr} ^id:${noteId}`,
            });
            addedCount++;
          } catch (error) {
            console.error(`Failed to add card: ${action.node.p}`, error);
          }
        } else if (action.type === "update" && action.node && action.ankiId) {
          try {
            const textForAnkiStr = textForAnki(action.node);
            await invokeAnkiConnect("updateNoteFields", {
              note: {
                id: action.ankiId,
                fields: {
                  Text: textForAnkiStr,
                  "Back Extra": action.node.category || "",
                },
              },
            });
            updatedCount++;
          } catch (error) {
            console.error(`Failed to update card: ${action.node.p}`, error);
          }
        } else if (action.type === "delete" && action.ankiId) {
          try {
            await invokeAnkiConnect("deleteNotes", {
              notes: [action.ankiId],
            });
            deletedCount++;
          } catch (error) {
            console.error(`Failed to delete card ID ${action.ankiId}`, error);
          }
        }
      }

      if (idUpdates.length > 0) {
        try {
          await fetch("/api/update-anki-ids", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ updates: idUpdates }),
          });
        } catch (error) {
          console.error("Failed to update HLS files with IDs", error);
        }
      }

      setStatus(
        `Sync complete! Added: ${addedCount}, Updated: ${updatedCount}, Deleted: ${deletedCount}`
      );
      setSyncComplete(true);
    } catch (error) {
      setStatus(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsSyncing(false);
    }
  }

  useEffect(() => {
    analyzeChanges();
  }, [analyzeChanges]);

  const addCount = actions.filter((a) => a.type === "add").length;
  const updateCount = actions.filter((a) => a.type === "update").length;
  const deleteCount = actions.filter((a) => a.type === "delete").length;
  const skipCount = actions.filter((a) => a.type === "skip").length;

  return (
    <PageLayout>
      <h1 className="text-2xl font-semibold mb-6">Anki Sync</h1>

      <div className="lh-card p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Summary</h2>
        <div className="flex flex-row gap-4 text-sm">
          <div>
            <span className="text-dark">Add:</span>{" "}
            <span className="font-semibold text-green-600">{addCount}</span>
          </div>
          <div>
            <span className="text-dark">Update:</span>{" "}
            <span className="font-semibold text-blue-600">{updateCount}</span>
          </div>
          <div>
            <span className="text-dark">Delete:</span>{" "}
            <span className="font-semibold text-red-600">{deleteCount}</span>
          </div>
          <div>
            <span className="text-dark">Skip:</span>{" "}
            <span className="font-semibold text-yellow-600">{skipCount}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={analyzeChanges}
          disabled={isAnalyzing || isSyncing}
          className="lh-btn-secondary"
        >
          {isAnalyzing ? "Analyzing..." : "Re-analyze"}
        </button>

        <button
          onClick={syncToAnki}
          disabled={
            isSyncing ||
            isAnalyzing ||
            (addCount === 0 && updateCount === 0 && deleteCount === 0) ||
            syncComplete
          }
          className="lh-btn-primary"
        >
          {isSyncing ? "Syncing..." : syncComplete ? "Synced!" : "Sync to Anki"}
        </button>
      </div>

      {status && (
        <div
          className={`lh-card p-4 mb-6 ${
            status.startsWith("Error") ? "bg-red-50" : "bg-green-50"
          }`}
        >
          {status}
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Changes</h2>

        {actions.filter((a) => a.type === "add").length > 0 && (
          <div className="lh-card p-4">
            <h3 className="font-semibold text-green-600 mb-2">
              To Add ({addCount})
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {actions
                .filter((a) => a.type === "add")
                .map((action, idx) => (
                  <div
                    key={idx}
                    className="text-sm border-l-2 border-green-500 pl-3 py-1"
                  >
                    <div className="text-dark text-xs mb-1">
                      {action.node?.category || "No category"}
                    </div>
                    <div>{textForAnki(action.node!)}</div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {actions.filter((a) => a.type === "update").length > 0 && (
          <div className="lh-card p-4">
            <h3 className="font-semibold text-blue-600 mb-2">
              To Update ({updateCount})
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {actions
                .filter((a) => a.type === "update")
                .map((action, idx) => (
                  <div
                    key={idx}
                    className="text-sm border-l-2 border-blue-500 pl-3 py-1"
                  >
                    <div className="text-dark text-xs mb-1">
                      {action.node?.category || "No category"} (ID:{" "}
                      {action.ankiId})
                    </div>
                    <div className="line-through text-dark">
                      {action.ankiText}
                    </div>
                    <div className="text-green-600">
                      → {textForAnki(action.node!)}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {actions.filter((a) => a.type === "delete").length > 0 && (
          <div className="lh-card p-4">
            <h3 className="font-semibold text-red-600 mb-2">
              To Delete ({deleteCount})
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {actions
                .filter((a) => a.type === "delete")
                .map((action, idx) => (
                  <div
                    key={idx}
                    className="text-sm border-l-2 border-red-500 pl-3 py-1"
                  >
                    <div className="text-dark text-xs mb-1">
                      ID: {action.ankiId}
                    </div>
                    <div className="text-dark">{action.ankiText}</div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {actions.filter((a) => a.type === "skip").length > 0 && (
          <div className="lh-card p-4">
            <h3 className="font-semibold text-yellow-600 mb-2">
              Skipped ({skipCount})
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {actions
                .filter((a) => a.type === "skip")
                .map((action, idx) => (
                  <div
                    key={idx}
                    className="text-sm border-l-2 border-yellow-500 pl-3 py-1"
                  >
                    <div className="text-dark text-xs mb-1">
                      {action.node?.category || "No category"} - {action.reason}
                    </div>
                    <div className="text-dark">{action.node?.p}</div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
