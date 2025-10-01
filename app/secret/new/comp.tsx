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

      {level === 0 && (
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
  // const [isSummaryFocused, setIsSummaryFocused] = useState(false);

  return (
    <>
      <h2>{cluster.title ? capitalize(cluster.title) : ""}</h2>
      <BulletList items={cluster.nodes} />
      {/* <textarea
        className="w-full lh-input-no-h min-h-[100px]"
        placeholder="Write your summary here..."
        onFocus={() => setIsSummaryFocused(true)}
        onBlur={() => setIsSummaryFocused(false)}
      /> */}
    </>
  );
}

export { ParsedNodeCluster, BulletList };
