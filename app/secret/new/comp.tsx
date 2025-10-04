"use client";

import { formatKnowledgeText } from "@/app/utils/knowledge/format";
import { NodeClusterType, UiNodeCluster } from "@/app/utils/knowledge/NEW";
import { capitalize } from "@/app/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type GuideSidebarData = {
  slug: string;
  title: string;
  chapters: {
    slug: string;
    title: string;
  }[];
};

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

function GuideSidebar({ guides }: { guides: GuideSidebarData[] }) {
  const pathname = usePathname();

  const getCurrentSlug = () => {
    if (!pathname) return "";
    const match = pathname.match(/\/secret\/new\/([^/]+)/);
    return match ? match[1] : "";
  };

  const currentSlug = getCurrentSlug();

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg lh-bold text-darkest">Guides</h3>
      <div className="flex flex-col gap-4">
        {guides.map((guide) => (
          <div key={guide.slug} className="flex flex-col gap-2">
            <Link
              href={`/secret/new/${guide.slug}`}
              className={`lh-bold ${
                guide.slug === currentSlug
                  ? "text-darkest"
                  : "text-dark lh-interactive"
              }`}
            >
              {guide.title}
            </Link>
            <div className="flex flex-col gap-1 pl-4 border-l-2 border-light">
              {guide.chapters.map(
                (chapter: { slug: string; title: string }) => (
                  <Link
                    key={chapter.slug}
                    href={`/secret/new/${guide.slug}/${chapter.slug}`}
                    className="text-dark lh-interactive"
                  >
                    {chapter.title}
                  </Link>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { ParsedNodeCluster, BulletList, GuideSidebar };
