import { CenteredArticle } from "@/app/comp/PageLayout";
import { GUIDES } from "../render";
import { notFound } from "next/navigation";

function Page({ params }: { params: { slug: string } }) {
  const guide = GUIDES.find((g) => g.slug === params.slug);

  if (!guide) {
    notFound();
  }

  return (
    <CenteredArticle className="mt-32">
      <h1>{guide.title}</h1>
      <p>{guide.desc}</p>
      {guide.sections.map((section, idx) => (
        <div key={idx}>{section}</div>
      ))}
    </CenteredArticle>
  );
}

export default Page;

export function generateStaticParams() {
  return GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}
