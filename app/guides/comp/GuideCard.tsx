"use client";

import { RadioCircle } from "@/app/comp/Primitives";
import { GuideType } from "@/app/utils/types";
import { gradient } from "@/app/utils/utils";
import Link from "next/link";
import { useState, useEffect } from "react";

export function GuideCard({
  article,
  className,
}: {
  article: GuideType;
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

  const imageUrl = article.meta.bg || "/header-images/wealth.jpg";
  const background = gradient(imageUrl);
  return (
    <Link
      style={{ backgroundImage: background }}
      className={`lh-card  lh-interactive border border-medium no-underline flex w-full bg-no-repeat bg-cover bg-center grayscale  flex-grow flex-col space-y-2 p-4 md:p-6 ${className}`}
      onClick={() => handleArticleClick(article.slug)}
      href={"/guides/" + article.slug}
    >
      <div className="flex flex-row gap-2 items-center justify-between">
        <div className="text-lg font-semibold leading-tight md:text-xl ">
          {article.meta.title}
        </div>
        <div className="flex flex-row gap-2 items-center">
          {read && <RadioCircle checked={read} />}
          25 min
        </div>
      </div>
      <ul className="text-sm text-dark flex flex-col gap-1 list-disc pl-4">
        {article.meta.desc.map((val) => {
          return (
            <li className="" key={val}>
              {val}
            </li>
          );
        })}
      </ul>
    </Link>
  );
}
