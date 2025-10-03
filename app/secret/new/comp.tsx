"use client";

import { formatKnowledgeText } from "@/app/utils/knowledge/format";
import { NodeClusterType, UiNodeCluster } from "@/app/utils/knowledge/NEW";
import { capitalize } from "@/app/utils/utils";
import { useState } from "react";

function InnerBulletList({
  item,
  level = 0,
}: {
  item: NodeClusterType;
  level?: number;
}) {
  const [isSummaryFocused, setIsSummaryFocused] = useState(false);

  return (
    <>
      <li className={isSummaryFocused ? "blur-sm opacity-50" : ""}>
        {formatKnowledgeText(item.p)}

        {/* {getAnkiText(item)} */}
        {item.n &&
          item.n.map((note, nIdx) => (
            <ul key={`n-${nIdx}`} className="">
              <li>
                <i>{capitalize(note)}</i>
              </li>
            </ul>
          ))}
        {item.c && <BulletList items={item.c} level={level + 1} />}
      </li>

      {level === 0 && item.c && (
        <textarea
          className="w-full lh-input-no-h min-h-[100px]"
          placeholder="Write your summary here..."
          onFocus={() => setIsSummaryFocused(true)}
          onBlur={() => setIsSummaryFocused(false)}
        />
      )}
    </>
  );
}

function BulletList({
  items,
  level = 0,
}: {
  items: NodeClusterType[];
  level?: number;
}) {
  return (
    <>
      <ul>
        {items.map((item, idx) => {
          return <InnerBulletList item={item} level={level} key={idx} />;
        })}
      </ul>
    </>
  );
}

function ParsedNodeCluster({ cluster }: { cluster: UiNodeCluster }) {
  const [isSummaryFocused, setIsSummaryFocused] = useState(false);
  const [showWhyImportant, setShowWhyImportant] = useState(false);

  return (
    <>
      <h2>{cluster.title ? capitalize(cluster.title) : ""}</h2>

      <div className={isSummaryFocused ? "blur-sm opacity-50" : ""}>
        <BulletList items={cluster.nodes} />
      </div>
      <div className="flex flex-col  gap-2">
        <textarea
          className="flex-1 lh-input-no-h min-h-[100px]"
          placeholder="Summarize the entire idea group here in one paragraph or less..."
          onFocus={() => setIsSummaryFocused(true)}
          onBlur={() => setIsSummaryFocused(false)}
        />
        <button
          onClick={() => setShowWhyImportant(!showWhyImportant)}
          className="lh-link font-sans"
        >
          Why is summarizing important?
        </button>

        {showWhyImportant && (
          <div className="p-4 lh-card">
            Summarizing forces you to process and understand the information. By
            distilling the key ideas into your own words, you create stronger
            mental connections and improve long-term retention. It is one of the
            most effective learning techniques.
          </div>
        )}
      </div>
    </>
  );
}

export { ParsedNodeCluster, BulletList };
