import { getHlsFile } from "@/app/utils/knowledge/hls";
import { ParsedNodeCluster } from "./comp";
import { NodeClusterType } from "@/app/utils/knowledge/NEW";

type GuideSectionType = React.ReactNode;

interface GuideType {
  slug: string;
  title: string;
  desc: string;
  imgSrc: string;
  sections: GuideSectionType[];
  readingTime: number;
}

function renderText(text: string): GuideSectionType {
  return text.split("\n").map((line) => <p key={line}>{line}</p>);
}

function renderImg(src: string): GuideSectionType {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="guide" />;
}

function extractText(cluster: NodeClusterType): string {
  let text = cluster.p;
  if (cluster.n) {
    text += " " + cluster.n.join(" ");
  }
  if (cluster.c) {
    text += " " + cluster.c.map(extractText).join(" ");
  }
  return text;
}

function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  const wordsPerMinute = 200;
  return Math.ceil(words / wordsPerMinute);
}

function getReadingTimeForHls(hlsSrc: string): number {
  const parsed = getHlsFile(hlsSrc);
  const allNodes = parsed.flatMap((cluster) => cluster.nodes);
  const allText = allNodes.map(extractText).join(" ");
  return calculateReadingTime(allText);
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

  for (const title of allTitles) {
    const cluster = parsed.find((cluster) => cluster.title === title)!;
    renderedSections.push(<ParsedNodeCluster cluster={cluster} key={title} />);
  }
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
    renderImg("/header-images/neuron.jpg"),
  ]
);

const LEARNING_GUIDE: GuideType = {
  slug: "learning",
  title: "Learning Guide",
  desc: "Learn how to learn. this is a very logn description lets see how it will fare when it's long",
  imgSrc: "/header-images/neuron.jpg",
  sections: LEARNING_GUIDE_SECTIONS,
  readingTime: getReadingTimeForHls("learning"),
};

const GUIDES: GuideType[] = [LEARNING_GUIDE];

export { GUIDES };
export type { GuideType };
