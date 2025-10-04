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
  chapters: ChapterType[];
  citations: CitationType[];
}

interface ChapterType {
  slug: string;
  title: string;
  desc: string;
  sections: GuideSectionType[];
  readingTime: number;
}

export type { GuideSectionType, CitationType, GuideType, ChapterType };
