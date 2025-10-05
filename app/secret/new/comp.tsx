"use client";

import { RadioCircle } from "@/app/comp/Primitives";
import { formatKnowledgeText } from "@/app/utils/knowledge/format";
import { NodeClusterType, UiNodeCluster } from "@/app/utils/knowledge/NEW";
import { capitalize } from "@/app/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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

  const [readChapters, setReadChapters] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem("readChapters");
    if (stored) {
      setReadChapters(new Set(JSON.parse(stored) as string[]));
    }
  }, []);

  function slugToTitle(slug: string) {
    return slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col text-dark">
        {guides.map((guide) => {
          const isCurrentGuide = guide.slug === guidePathname;

          const isGuideRead = guide.chapters.every((chapter) =>
            readChapters.has(`${guide.slug}/${chapter.slug}`)
          );

          return (
            <div key={guide.slug}>
              <Link
                href={`/secret/new/${guide.slug}`}
                className="lh-interactive py-1 flex flex-row gap-2 items-center justify-between"
              >
                <div className="flex flex-row gap-2 items-center">
                  <RadioCircle checked={isGuideRead} />
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
                      <RadioCircle
                        checked={readChapters.has(
                          `${guide.slug}/${chapter.slug}`
                        )}
                      />
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

function hasChapterBeenRead(guideSlug: string, chapterSlug: string): boolean {
  if (typeof window === "undefined") return false;
  const readChapters = localStorage.getItem("readChapters");
  if (!readChapters) return false;
  const chapters = JSON.parse(readChapters) as string[];
  return chapters.includes(`${guideSlug}/${chapterSlug}`);
}

function toggleChapterRead(guideSlug: string, chapterSlug: string): boolean {
  if (typeof window === "undefined") return false;
  const chapterPath = `${guideSlug}/${chapterSlug}`;
  const readChapters = localStorage.getItem("readChapters");
  let chapters: string[] = readChapters ? JSON.parse(readChapters) : [];

  if (chapters.includes(chapterPath)) {
    chapters = chapters.filter((c) => c !== chapterPath);
  } else {
    chapters.push(chapterPath);
  }

  localStorage.setItem("readChapters", JSON.stringify(chapters));
  return chapters.includes(chapterPath);
}

function MarkAsReadButton({
  guideSlug,
  chapterSlug,
}: {
  guideSlug: string;
  chapterSlug: string;
}) {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    setIsRead(hasChapterBeenRead(guideSlug, chapterSlug));
  }, [guideSlug, chapterSlug]);

  function handleToggleRead() {
    const newReadState = toggleChapterRead(guideSlug, chapterSlug);
    setIsRead(newReadState);
  }

  return (
    <button
      onClick={handleToggleRead}
      className="lh-btn-secondary backdrop-blur-sm font-sans"
    >
      {isRead ? "Mark as unread" : "Mark as read"}
    </button>
  );
}

function GuideProgress({
  guideSlug,
  totalChapters,
}: {
  guideSlug: string;
  totalChapters: number;
}) {
  const [readCount, setReadCount] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("readChapters");
    if (stored) {
      const chapters = JSON.parse(stored) as string[];
      const readForThisGuide = chapters.filter((c) =>
        c.startsWith(`${guideSlug}/`)
      ).length;
      setReadCount(readForThisGuide);
    }

    function handleStorageChange() {
      const stored = localStorage.getItem("readChapters");
      if (stored) {
        const chapters = JSON.parse(stored) as string[];
        const readForThisGuide = chapters.filter((c) =>
          c.startsWith(`${guideSlug}/`)
        ).length;
        setReadCount(readForThisGuide);
      } else {
        setReadCount(0);
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [guideSlug]);

  const progress = totalChapters > 0 ? (readCount / totalChapters) * 100 : 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm text-dark">
        {readCount}/{totalChapters} done
      </div>
      <div className="w-full h-2 bg-light lh-round overflow-hidden backdrop-blur-sm">
        <div
          className="h-full bg-darkest transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export {
  ParsedNodeCluster,
  BulletList,
  GuideSidebar,
  hasChapterBeenRead,
  MarkAsReadButton,
  GuideProgress,
};
