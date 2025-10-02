import { getHlsFile } from "@/app/utils/knowledge/hls";
import { ParsedNodeCluster } from "./comp";

type GuideSectionType = React.ReactNode;

interface GuideType {
  slug: string;
  title: string;
  desc: string;
  imgSrc: string;
  sections: GuideSectionType[];
}

function renderText(text: string): GuideSectionType {
  return text.split("\n").map((line) => <p key={line}>{line}</p>);
}

function renderImg(src: string): GuideSectionType {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="guide" />;
}

function renderGuideSections(
  hlsSrc: string,
  sections: (string | GuideSectionType)[]
): GuideSectionType[] {
  const parsed = getHlsFile(hlsSrc);

  const allTitles: string[] = [];

  for (const cluster of parsed) {
    if (cluster.title) allTitles.push(cluster.title);
  }

  const renderedSections = sections.map((section) => {
    if (typeof section === "string") {
      if (allTitles.includes(section)) {
        allTitles.splice(allTitles.indexOf(section), 1);
        const cluster = parsed.find((cluster) => cluster.title === section)!;
        return <ParsedNodeCluster cluster={cluster} key={section} />;
      } else {
        throw new Error(`Section ${section} not found in ${hlsSrc}`);
      }
    }
    return section;
  });
  return renderedSections;
}

const LEARNING_GUIDE_SECTIONS: GuideSectionType[] = renderGuideSections(
  "learning",
  [
    "reading",
    renderText(`
This text
    `),
    // "learning",
    renderImg("/images/learning/learning-guide.png"),
  ]
);

const LEARNING_GUIDE: GuideType = {
  slug: "learning",
  title: "Learning Guide",
  desc: "Learn how to learn",
  imgSrc: "/images/learning/learning-guide.png",
  sections: LEARNING_GUIDE_SECTIONS,
};

const GUIDES: GuideType[] = [LEARNING_GUIDE];

export { GUIDES };
export type { GuideType };
