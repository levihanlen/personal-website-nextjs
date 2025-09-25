"use client";

import { useCallback, useMemo, useState } from "react";
import { NodeClusterType } from "@/app/utils/knowledge/NEW";
import { createCardForNode, nextState } from "@/app/utils/anki/generate";
import { Rating, Grade } from "ts-fsrs";
import { getAnkiText } from "@/app/utils/anki/text";

type ReviewCard = {
  node: NodeClusterType;
  card: ReturnType<typeof createCardForNode>;
};

function flatten(nodes: NodeClusterType[]): NodeClusterType[] {
  const flat: NodeClusterType[] = [];
  const walk = (n: NodeClusterType) => {
    flat.push(n);
    n.c?.forEach(walk);
  };
  nodes.forEach(walk);
  return flat;
}

export default function ReviewClient({ nodes }: { nodes: NodeClusterType[] }) {
  const [queue, setQueue] = useState<ReviewCard[]>(() =>
    flatten(nodes).map((node) => ({ node, card: createCardForNode(node) }))
  );

  // cards that are due now or overdue
  const dueCards = useMemo(() => {
    const now = Date.now();
    return queue
      .filter((c) => c.card.due.getTime() <= now)
      .sort((a, b) => a.card.due.getTime() - b.card.due.getTime());
  }, [queue]);

  const current = dueCards[0];
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleRate = useCallback(
    (grade: Rating) => {
      if (!current) return;
      setQueue((q) => {
        const nextQueue = q.map((rc) => {
          if (rc.card.id === current.card.id) {
            const record = nextState(
              rc.card,
              grade as unknown as Grade,
              new Date()
            );
            const updated = record.card;

            // feedback interval
            setFeedback(
              `${Rating[grade]} - due again in ${getDiffStr(updated.due)}`
            );

            return { ...rc, card: { ...updated, id: rc.card.id } };
          }
          return rc;
        });
        return nextQueue;
      });
    },
    [current]
  );

  if (!current) return <div className="mt-32">All cards reviewed</div>;

  return (
    <div className="flex flex-col items-center mt-32 space-y-8">
      <div className="text-dark">{dueCards.length} cards due</div>
      <div className="lh-card p-8 text-dark text-pretty max-w-lg">
        {getAnkiText(current.node)}
      </div>
      <div className="flex gap-4">
        {[Rating.Again, Rating.Hard, Rating.Good, Rating.Easy].map((g) => (
          <button
            key={g}
            onClick={() => handleRate(g)}
            className="lh-btn-primary"
          >
            {Rating[g]}
          </button>
        ))}
      </div>
      {feedback && <div className="text-dark">{feedback}</div>}
      {/* <pre>{JSON.stringify(queue, null, 2)}</pre> */}
    </div>
  );
}

function getDiffStr(due: Date) {
  const diffMs = due.getTime() - Date.now();
  const diffMin = Math.round(diffMs / 60000);
  let diffStr = "now";
  if (diffMin >= 60 * 24) {
    const days = Math.round(diffMin / (60 * 24));
    diffStr = `${days} day${days === 1 ? "" : "s"}`;
  } else if (diffMin >= 60) {
    const hours = Math.round(diffMin / 60);
    diffStr = `${hours} hour${hours === 1 ? "" : "s"}`;
  } else if (diffMin > 0) {
    diffStr = `${diffMin} min`;
  }
  return diffStr;
}
