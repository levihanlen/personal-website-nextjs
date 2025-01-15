"use client";

import { BlogType } from "@/app/utils/types";
import { useState, useEffect } from "react";
import { HiMiniCheckCircle } from "react-icons/hi2";

export function BlogCard({
  article,
  className,
}: {
  article: BlogType;
  className?: string;
}) {
  const [readArticles, setReadArticles] = useState<string[]>([]);

  useEffect(() => {
    const storedReadArticles =
      JSON.parse(localStorage.getItem("readArticles")!) || [];
    setReadArticles(storedReadArticles);
  }, []);

  function handleArticleClick(slug: string) {
    let updatedReadArticles = [...readArticles, slug];
    updatedReadArticles = [...updatedReadArticles];
    setReadArticles(updatedReadArticles);
    localStorage.setItem("readArticles", JSON.stringify(updatedReadArticles));
  }

  const read = readArticles.includes(article.slug);

  return (
    <div
      className={`lh-card  lh-interactive outline outline-light flex w-full bg-no-repeat bg-cover bg-center grayscale  flex-grow flex-col space-y-2 p-4 ${className}`}
      onClick={() => handleArticleClick(article.slug)}
    >
      <div className="flex flex-row gap-1 items-center">
        <div className="text-base font-semibold leading-tight  ">
          {article.meta.title}
        </div>{" "}
        {read && <HiMiniCheckCircle className="lh-icon-size text-dark" />}
      </div>
      <div className="flex flex-row gap-2">
        <div className="text-xs text-dark">{article.meta.date}</div>
        <div className="flex flex-row flex-wrap text-xs text-dark ">
          {article.meta.tags.map((tag, index) => (
            <span key={index} className="mr-1">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
