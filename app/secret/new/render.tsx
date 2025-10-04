import { getHlsFile } from "@/app/utils/knowledge/hls";
import { ParsedNodeCluster } from "./comp";
import { NodeClusterType } from "@/app/utils/knowledge/NEW";

type GuideSectionType = React.ReactNode;

interface CitationType {
  first?: string;
  last?: string;
  title: string;
  date?: string;
  url?: string;
}

interface GuideType {
  slug: string;
  title: string;
  desc: string;
  imgSrc: string;
  sections: GuideSectionType[];
  readingTime: number;
  citations: CitationType[];
}

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

  for (const title of allTitles) {
    const cluster = parsed.find((cluster) => cluster.title === title)!;
    renderedSections.push(<ParsedNodeCluster cluster={cluster} key={title} />);
  }
  return renderedSections;
}

const LEARNING_GUIDE_SECTIONS: GuideSectionType[] = renderGuideSections(
  "learning",
  [
    renderText(`
We spend over a decade in school being told what to learn, but almost no one ever teaches us how to learn. Most of us rely on instinct and ineffective habits like rereading and highlighting (methods that feel productive but create an illusion of knowledge).

This guide is a new operating system for your brain. It's a framework built on cognitive science for learning anything faster, deeper, and for longer.
    `),
    "reading",
    // "learning",
    renderImg("/header-images/neuron.jpg"),
  ]
);

const LEARNING_GUIDE: GuideType = {
  slug: "learning",
  title: "How to Learn",
  desc: "Learn how to learn. this is a very logn description lets see how it will fare when it's long",
  imgSrc: "/header-images/neuron.jpg",
  sections: LEARNING_GUIDE_SECTIONS,
  readingTime: getReadingTimeForHls("learning"),
  citations: [
    {
      title: "How to Take Smart Notes",
      first: "Sönke",
      last: "Ahrens",
      date: "2017",
      url: "https://www.goodreads.com/book/show/34507927-how-to-take-smart-notes",
    },
    {
      title: "How to Read a Book",
      first: "Mortimer",
      last: "J. Adler",
      date: "1972",
      url: "https://www.goodreads.com/book/show/567610.How_to_Read_a_Book",
    },
    {
      url: "https://www.goodreads.com/book/show/36647421-learning-how-to-learn",
      title: "Learning How to Learn",
      first: "Barbara",
      last: "Oakley",
      date: "2018",
    },
    {
      url: "https://www.goodreads.com/book/show/59616977-building-a-second-brain",
      title: "Building a Second Brain",
      first: "Tiago",
      last: "Forte",
      date: "2020",
    },
    {
      url: "https://gwern.net/spaced-repetition",
      title: "Spaced Repetition",
      date: "2021",
    },
    {
      url: "https://augmentingcognition.com/ltm.html",
      title: "Augmenting Long Term Memory",
      date: "2021",
      first: "Michael",
      last: "Nielsen",
    },
    {
      first: "Piotr",
      last: "Wozniak",
      url: "https://www.supermemo.com/en/blog/twenty-rules-of-formulating-knowledge",
      title: "Twenty Rules of Formulating Knowledge",
      date: "1999",
    },
    {
      url: "https://andymatuschak.org/books/",
      title: "Why Books Don't Work",
      first: "Andy",
      last: "Matuschak",
      date: "2019",
    },
    {
      url: "https://www.goodreads.com/book/show/35167685-surely-you-re-joking-mr-feynman",
      title: "Surely You're Joking, Mr. Feynman!",
      first: "Richard",
      last: "Feynman",
      date: "1985",
    },
    {
      url: "https://www.goodreads.com/book/show/44770129-ultralearning",
      title: "Ultralearning",
      first: "Scott",
      last: "Young",
      date: "2018",
    },
  ],
};

const GUIDES: GuideType[] = [LEARNING_GUIDE];

export { GUIDES };
export type { GuideType };
