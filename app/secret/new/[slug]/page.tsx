import { GUIDES } from "../guides";
import { notFound } from "next/navigation";
import { gradient } from "@/app/utils/utils";
import { ebGaramond } from "@/app/utils/fonts";
import { Metadata } from "next";
import Link from "next/link";

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
      <div className="lh-border lh-round overflow-hidden w-full max-w-lg">
        <div
          style={{ backgroundImage: background }}
          className={`text-center grayscale text-dark flex flex-col gap-4 w-full items-center justify-center p-8 bg-no-repeat bg-cover bg-center ${ebGaramond.className}`}
        >
          <h1 className="text-3xl md:text-4xl lh-bold tracking-tight text-darkest">
            {guide.title}
          </h1>
          <p className="text-dark">{guide.desc}</p>
          <div className="flex gap-4 items-center flex-wrap">
            <span>{guide.chapters.length} chapters</span>
            <span>{guide.citations.length} citations</span>
          </div>
        </div>
      </div>

      <h2 className="text-2xl lh-bold text-darkest">Chapters</h2>
      <div className="w-full flex flex-col divide-y-pt divide-light">
        {guide.chapters.map((chapter, idx) => (
          <Link
            key={chapter.slug}
            href={`/secret/new/${guide.slug}/${chapter.slug}`}
            className="flex flex-col gap-2 p-4 lh-interactive"
          >
            <h3 className="lh-bold text-darkest">
              {idx + 1}. {chapter.title}
            </h3>
            <p className="text-dark">{chapter.desc}</p>
            {chapter.readingTime > 0 && (
              <p className="text-sm text-dark">
                {chapter.readingTime} minute read
              </p>
            )}
          </Link>
        ))}
      </div>
    </>
  );
}

export default Page;

export function generateStaticParams() {
  return GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}
