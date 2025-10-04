import { getHlsFile } from "@/app/utils/knowledge/hls";
import { ParsedNodeCluster } from "./comp";
import { NodeClusterType } from "@/app/utils/knowledge/NEW";
import { GuideSectionType, GuideType } from "./types";

function renderText(text: string): GuideSectionType {
  return text
    .trim()
    .split("\n")
    .map((line) => <p key={line}>{line.trim()}</p>);
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

  // for (const title of allTitles) {
  //   const cluster = parsed.find((cluster) => cluster.title === title)!;
  //   renderedSections.push(<ParsedNodeCluster cluster={cluster} key={title} />);
  // }
  return renderedSections;
}

export { renderText, renderImg, getReadingTimeForHls, renderGuideSections };
export type { GuideType };
