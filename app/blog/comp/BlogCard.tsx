"use client";

import { RadioCircle } from "@/app/comp/Primitives";
import { BlogType } from "@/app/utils/types";
import { useState, useEffect } from "react";

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
      className={`lh-interactive flex w-full flex-col gap-2 p-4 ${className}`}
      onClick={() => handleArticleClick(article.slug)}
    >
      <div className="flex flex-row gap-1 items-center">
        <div className="text-base font-semibold leading-tight  ">
          {article.meta.title}
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <RadioCircle checked={read} />
        <div className="text-xs text-dark">
          {new Date(article.meta.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
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
