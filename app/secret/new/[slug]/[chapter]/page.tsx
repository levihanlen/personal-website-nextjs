import { Article } from "@/app/comp/PageLayout";
import { GUIDES } from "../../guides";
import { notFound } from "next/navigation";
import React from "react";
import { gradient } from "@/app/utils/utils";
import { ebGaramond } from "@/app/utils/fonts";
import { AuthorSection } from "@/app/comp/AuthorSection";
import { Metadata } from "next";
import Link from "next/link";
import { InnerIconBtn } from "@/app/comp/Primitives";
import { HiMiniChevronLeft, HiMiniChevronRight } from "react-icons/hi2";

export function generateMetadata({
  params,
}: {
  params: { slug: string; chapter: string };
}): Metadata {
  const guide = GUIDES.find((g) => g.slug === params.slug);

  if (!guide) {
    return {
      title: "Guide Not Found - Levi Hanlen",
    };
  }

  const chapter = guide.chapters.find((c) => c.slug === params.chapter);

  if (!chapter) {
    return {
      title: "Chapter Not Found - Levi Hanlen",
    };
  }

  return {
    title: `${chapter.title} - ${guide.title} - Levi Hanlen`,
    description: chapter.desc,
  };
}

function Page({ params }: { params: { slug: string; chapter: string } }) {
  const guide = GUIDES.find((g) => g.slug === params.slug);

  if (!guide) {
    notFound();
  }

  const chapter = guide.chapters.find((c) => c.slug === params.chapter);

  if (!chapter) {
    notFound();
  }

  const guideIndex = GUIDES.findIndex((g) => g.slug === params.slug);
  const chapterIndex = guide.chapters.findIndex(
    (c) => c.slug === params.chapter
  );

  const getPreviousLink = () => {
    if (chapterIndex > 0) {
      return `/secret/new/${guide.slug}/${
        guide.chapters[chapterIndex - 1].slug
      }`;
    } else if (guideIndex > 0) {
      const prevGuide = GUIDES[guideIndex - 1];
      const lastChapter = prevGuide.chapters[prevGuide.chapters.length - 1];
      return `/secret/new/${prevGuide.slug}/${lastChapter.slug}`;
    }
    return null;
  };

  const getNextLink = () => {
    if (chapterIndex < guide.chapters.length - 1) {
      return `/secret/new/${guide.slug}/${
        guide.chapters[chapterIndex + 1].slug
      }`;
    } else if (guideIndex < GUIDES.length - 1) {
      const nextGuide = GUIDES[guideIndex + 1];
      return `/secret/new/${nextGuide.slug}/${nextGuide.chapters[0].slug}`;
    }
    return null;
  };

  const previousLink = getPreviousLink();
  const nextLink = getNextLink();

  const citations = [...guide.citations];
  citations.push({
    title: "Levi Hanlen",
    first: "Levi",
    last: "Hanlen",
    date: new Date().getFullYear().toString(),
    url: "https://www.levihanlen.com",
  });

  const background = gradient(guide.imgSrc);

  return (
    <>
      <div className="w-full max-w-lg mb-4">
        <Link href={`/secret/new/${guide.slug}`} className="lh-link text-sm">
          ← Back to {guide.title}
        </Link>
      </div>

      <div className="lh-border lh-round overflow-hidden w-full max-w-lg">
        <div
          style={{ backgroundImage: background }}
          className={`text-center grayscale text-dark flex flex-col gap-4 w-full items-center justify-center p-8 bg-no-repeat bg-cover bg-center ${ebGaramond.className}`}
        >
          <h1 className="text-3xl md:text-4xl lh-bold tracking-tight text-darkest">
            {chapter.title}
          </h1>
          {chapter.readingTime > 0 && (
            <div className="flex gap-4 items-center flex-wrap">
              <span>{chapter.readingTime} minute read</span>
            </div>
          )}
        </div>
      </div>

      <Article className="">
        {chapter.sections.map((section, idx) => (
          <React.Fragment key={idx}>{section}</React.Fragment>
        ))}
      </Article>

      <Article className="mt-16">
        <details className="lh-border lh-round p-6">
          <summary className="text-darkest text-lg lh-bold lh-interactive">
            Citations
          </summary>
          <div className="mt-4 space-y-4">
            {citations.map((citation, idx) => (
              <div key={idx} className="text-sm">
                {citation.first && citation.last && (
                  <span>
                    {citation.last}, {citation.first}.{" "}
                  </span>
                )}
                {citation.title && (
                  <span className="italic">{citation.title}</span>
                )}
                {citation.date && <span>. {citation.date}</span>}
                {citation.url && (
                  <span>
                    .{" "}
                    <a href={citation.url} target="_blank">
                      {citation.url}
                    </a>
                  </span>
                )}
              </div>
            ))}
          </div>
        </details>
      </Article>

      <div className="w-full flex justify-between items-center gap-4">
        {previousLink ? (
          <Link href={previousLink} className="lh-btn-secondary">
            <InnerIconBtn icon={<HiMiniChevronLeft />}>Previous</InnerIconBtn>
          </Link>
        ) : (
          <button
            disabled
            className="lh-btn-secondary opacity-50 cursor-not-allowed"
          >
            <InnerIconBtn icon={<HiMiniChevronLeft />}>Previous</InnerIconBtn>
          </button>
        )}
        {nextLink ? (
          <Link href={nextLink} className="lh-btn-secondary">
            <InnerIconBtn icon={<HiMiniChevronRight />}>Next</InnerIconBtn>
          </Link>
        ) : (
          <button
            disabled
            className="lh-btn-secondary opacity-50 cursor-not-allowed"
          >
            <InnerIconBtn icon={<HiMiniChevronRight />}>Next</InnerIconBtn>
          </button>
        )}
      </div>

      <AuthorSection />
    </>
  );
}

export default Page;

export function generateStaticParams() {
  const params: { slug: string; chapter: string }[] = [];

  for (const guide of GUIDES) {
    for (const chapter of guide.chapters) {
      params.push({
        slug: guide.slug,
        chapter: chapter.slug,
      });
    }
  }

  return params;
}
