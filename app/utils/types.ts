export interface GuideType {
  slug: string;
  meta: {
    title: string;
    desc: string[];
    bg: string;
  };
}

export interface BlogType {
  slug: string;
  meta: {
    tags: string[];
    title: string;
    date: string;
  };
}
