import { PageLayout } from "@/app/comp/PageLayout";
import { GuideSidebar } from "./comp";
import { GUIDES } from "./guides";

export default function Layout({ children }: { children: React.ReactNode }) {
  const guidesData = GUIDES.map((guide) => ({
    slug: guide.slug,
    title: guide.title,
    chapters: guide.chapters.map((chapter) => ({
      slug: chapter.slug,
      title: chapter.title,
    })),
  }));

  return (
    <PageLayout left={<GuideSidebar guides={guidesData} />}>
      {children}
    </PageLayout>
  );
}
