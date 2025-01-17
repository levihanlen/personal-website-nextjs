"use client";

import { GuideType } from "@/app/utils/types";
import { gradient } from "@/app/utils/utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMiniCheckCircle } from "react-icons/hi2";

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
      className={`lh-card  lh-interactive border border-dark no-underline flex w-full bg-no-repeat bg-cover bg-center grayscale  flex-grow flex-col space-y-2 p-4 lg:p-6 ${className}`}
      onClick={() => handleArticleClick(article.slug)}
      href={"/guides/" + article.slug}
    >
      <div className="flex flex-row gap-1 items-center">
        <div className="text-lg font-semibold leading-tight md:text-xl ">
          {article.meta.title}
        </div>{" "}
        {read && <HiMiniCheckCircle className="lh-icon-size text-dark" />}
      </div>
      <div className="text-xs text-dark">
        {article.meta.desc.map((val) => {
          return <div key={val}>{val}</div>;
        })}
      </div>
    </Link>
  );
}
