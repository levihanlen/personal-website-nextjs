import { CenteredArticle } from "@/app/comp/PageLayout";
import { GUIDES } from "../render";
import { notFound } from "next/navigation";
import React from "react";
import { gradient } from "@/app/utils/utils";
import { ebGaramond } from "@/app/utils/fonts";
import { AuthorSection } from "@/app/comp/AuthorSection";
import { Metadata } from "next";

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const guide = GUIDES.find((g) => g.slug === params.slug);

  if (!guide) {
    return {
      title: "Guide Not Found - Levi Hanlen",
    };
  }

  return {
    title: `${guide.title} - Levi Hanlen`,
    description: guide.desc,
  };
}

function Page({ params }: { params: { slug: string } }) {
  const guide = GUIDES.find((g) => g.slug === params.slug);

  if (!guide) {
    notFound();
  }

  const citations = guide.citations;
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
      <div className="lh-border lh-round overflow-hidden mt-32 w-full max-w-lg">
        <div
          style={{ backgroundImage: background }}
          className={`text-center grayscale text-dark flex flex-col gap-4 w-full items-center justify-center p-8 bg-no-repeat bg-cover bg-center ${ebGaramond.className}`}
        >
          <h1 className="text-3xl md:text-4xl lh-bold tracking-tight text-darkest">
            {guide.title}
          </h1>
          {/* <p>{guide.desc}</p> */}
          <div className="flex gap-4 items-center flex-wrap">
            <span>{guide.readingTime} minute read</span>
            <span>{guide.citations.length} citations</span>
          </div>
        </div>
      </div>
      <CenteredArticle className="">
        {guide.sections.map((section, idx) => (
          <React.Fragment key={idx}>{section}</React.Fragment>
        ))}
      </CenteredArticle>
      <CenteredArticle className="mt-16">
        <details className="lh-border lh-round p-6">
          <summary className="cursor-pointer text-lg font-semibold">
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
      </CenteredArticle>
      <AuthorSection />
    </>
  );
}

export default Page;

export function generateStaticParams() {
  return GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}
