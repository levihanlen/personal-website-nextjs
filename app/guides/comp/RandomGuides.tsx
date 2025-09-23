"use client";

import { shuffleArray } from "@/app/utils/utils";
import { useState, useEffect } from "react";
import { GuideCard } from "./GuideCard";
import { GuideType } from "@/app/utils/types";

export function RandomGuides({ articles }: { articles: GuideType[] }) {
  const [nextArticles, setNextArticles] = useState<GuideType[]>([]);
  // const [readArticles, setReadArticles] = useState([]);

  useEffect(() => {
    const storedReadArticles =
      JSON.parse(localStorage.getItem("readArticles")!) || [];
    // setReadArticles(storedReadArticles);

    let before: GuideType[] = articles;
    before = shuffleArray(before);
    // setNextArticles(before);

    before.sort((a, b) => {
      if (
        storedReadArticles.includes(a.slug) &&
        !storedReadArticles.includes(b.slug)
      )
        return 1;
      if (
        !storedReadArticles.includes(a.slug) &&
        storedReadArticles.includes(b.slug)
      )
        return -1;
      return 0;
    });
    setNextArticles(before.slice(0, 6));
  }, [articles]);

  return (
    <>
      {nextArticles.map((article) => (
        <GuideCard
          key={article.slug}
          article={article}
          className="bg-lightest"
        />
      ))}
    </>
  );
}
