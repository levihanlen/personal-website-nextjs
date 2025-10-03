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
          <div>{guide.readingTime} minute read</div>
        </div>
      </div>
      <CenteredArticle className="">
        {guide.sections.map((section, idx) => (
          <React.Fragment key={idx}>{section}</React.Fragment>
        ))}
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
