"use client";

import { PageLayout } from "@/app/comp/PageLayout";
import { useState } from "react";

export default function AnkiTestPage() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  async function checkNoteTypes() {
    setIsLoading(true);
    setStatus("Checking available note types...");
    try {
      const types = await invokeAnkiConnect("modelNames");
      setStatus(`Available note types: ${(types as string[]).join(", ")}`);
    } catch (error) {
      setStatus(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddCard() {
    if (!text.trim()) {
      setStatus("Please enter some text");
      return;
    }

    if (!text.match(/\{\{c\d+::.+?\}\}/)) {
      setStatus("Error: Text must contain cloze deletions like {{c1::word}}");
      return;
    }

    setIsLoading(true);
    setStatus("Adding card...");

    try {
      await invokeAnkiConnect("createDeck", {
        deck: "test",
      });

      const result = await invokeAnkiConnect("addNote", {
        note: {
          deckName: "test",
          modelName: "Cloze",
          fields: {
            Text: text,
            "Back Extra": "",
          },
          tags: ["test"],
        },
      });

      setStatus(`Card added successfully! ID: ${result}`);
      setText("");
    } catch (error) {
      setStatus(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PageLayout>
      <h1 className="text-2xl">Anki Cloze Card Test</h1>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text with {{c1::cloze}} deletions"
        className="lh-input w-full"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !isLoading) {
            handleAddCard();
          }
        }}
      />
      <p className="text-sm text-medium">
        Example: The capital of France is {"{{"} c1::Paris {"}}"}
      </p>

      <div className="flex gap-4">
        <button
          onClick={handleAddCard}
          disabled={isLoading}
          className="lh-btn-secondary"
        >
          {isLoading ? "Adding..." : "Add Cloze Card"}
        </button>

        <button
          onClick={checkNoteTypes}
          disabled={isLoading}
          className="lh-btn-secondary"
        >
          Check Note Types
        </button>
      </div>

      {status && <div className="lh-card p-4">{status}</div>}
    </PageLayout>
  );
}
