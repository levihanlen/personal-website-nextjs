"use client";

import { RadioCircle } from "@/app/comp/Primitives";
import { formatKnowledgeText } from "@/app/utils/knowledge/format";
import { NodeClusterType, UiNodeCluster } from "@/app/utils/knowledge/NEW";
import { capitalize } from "@/app/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiMiniChevronRight } from "react-icons/hi2";

type GuideSidebarData = {
  slug: string;
  title: string;
  chapters: {
    slug: string;
    title: string;
    readingTime: number;
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
  const lastPathname = pathname ? pathname.split("/").pop() : "";

  const guidePathname = pathname
    ? pathname.match(/\/secret\/new\/([^/]+)/)?.[1]
    : "";

  function slugToTitle(slug: string) {
    return slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* <h3 className="text-lg lh-bold text-darkest">Guides</h3> */}
      <div className="flex flex-col text-dark">
        {guides.map((guide) => {
          const isCurrentGuide = guide.slug === guidePathname;

          return (
            <div key={guide.slug}>
              <Link
                href={`/secret/new/${guide.slug}`}
                className="lh-interactive py-1 flex flex-row gap-2 items-center justify-between"
              >
                <div className="flex flex-row gap-2 items-center">
                  <RadioCircle checked={false} />
                  <span
                    className={` ${
                      guide.slug === lastPathname ? "text-darkest lh-bold" : ""
                    }`}
                  >
                    {slugToTitle(guide.slug)}
                  </span>
                  <span className="text-sm text-dark lh-card py-0.5 px-2">
                    {guide.chapters.length}
                  </span>
                </div>
                <HiMiniChevronRight
                  className={`lh-icon-size shrink-0 transition-transform ${
                    isCurrentGuide ? "rotate-90" : ""
                  }`}
                />
              </Link>
              {isCurrentGuide &&
                guide.chapters.map((chapter) => (
                  <Link
                    key={chapter.slug}
                    href={`/secret/new/${guide.slug}/${chapter.slug}`}
                    className="lh-interactive pl-4 py-1 flex flex-row gap-2 items-center justify-between"
                  >
                    <div className="flex flex-row gap-2 items-center">
                      <RadioCircle checked={false} />
                      <span
                        className={
                          chapter.slug === lastPathname
                            ? "text-darkest lh-bold"
                            : ""
                        }
                      >
                        {slugToTitle(chapter.slug)}
                      </span>
                    </div>
                    <span className="text-sm">{chapter.readingTime}m</span>
                  </Link>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { ParsedNodeCluster, BulletList, GuideSidebar };
