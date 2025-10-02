"use client";

import { BlogType } from "@/app/utils/types";
import { capitalize } from "@/app/utils/utils";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { BlogCard } from "./BlogCard";
import { RadioCircle } from "@/app/comp/Primitives";

export function TagSelectorPage({ articles }: { articles: BlogType[] }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TagSelectorContent articles={articles} />
    </Suspense>
  );
}

export function TagSelectorContent({ articles }: { articles: BlogType[] }) {
  const [readArticles, setReadArticles] = useState<string[]>([]);
  const router = useRouter();
  // let tags = [];

  let tags = useMemo(() => {
    const uniqueTags: string[] = [];
    for (let i = 0; i < articles.length; i++) {
      const art = articles[i];
      for (let j = 0; j < art.meta.tags.length; j++) {
        if (!uniqueTags.includes(art.meta.tags[j])) {
          uniqueTags.push(art.meta.tags[j]);
        }
      }
    }
    return uniqueTags.flat().sort();
  }, [articles]);
  for (let i = 0; i < articles.length; i++) {
    const art = articles[i];
    for (let j = 0; j < art.meta.tags.length; j++) {
      if (!tags.includes(art.meta.tags[j])) {
        tags.push(art.meta.tags[j]);
      }
    }
  }
  tags = tags.flat().sort();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  function handleSetTag(tag: string) {
    if (tag === selectedTag) {
      // setSelectedTag(null);
      router.push(`/blog?tag=${encodeURIComponent("null")}`);
      return;
    }

    // setSelectedTag(tag);
    router.push(`/blog?tag=${encodeURIComponent(tag)}`);
  }

  const [search, setSearch] = useState("");
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value.toLowerCase());
  }

  const filteredArticles = articles.filter((article) => {
    const articleTagsMatch = selectedTag
      ? article.meta.tags.includes(selectedTag)
      : true;
    const searchMatch = search
      ? article.meta.title.toLowerCase().includes(search) ||
        article.meta.tags.some((tag) => tag.toLowerCase().includes(search))
      : true;
    return articleTagsMatch && searchMatch;
  });

  useEffect(() => {
    const storedReadArticles =
      JSON.parse(localStorage.getItem("readArticles")!) || [];
    setReadArticles(storedReadArticles);
  }, [articles]);

  /*
  let orderedArticles = filteredArticles
    .filter((article) => {
      return !readArticles.includes(article.slug);
    })
    .push(
      filteredArticles.filter((article) => {
        return readArticles.includes(article.slug);
      })
    );
*/
  const orderedArticles = filteredArticles.sort((a, b) => {
    if (readArticles.includes(a.slug) && !readArticles.includes(b.slug))
      return 1;
    if (!readArticles.includes(a.slug) && readArticles.includes(b.slug))
      return -1;
    return 0;
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) {
      return;
    }
    const urlTag = searchParams.get("tag") || null;
    if (selectedTag !== urlTag) {
      if (urlTag === null || urlTag === "null") {
        setSelectedTag(null);
      } else if (tags.includes(urlTag)) {
        setSelectedTag(urlTag);
      }
    }
  }, [searchParams, tags, selectedTag]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full pt-32 lh-pl lh-pr">
        <div className="hidden py-4 text-dark md:block">
          Read {articles.length} blogs
        </div>
        <div className="relative flex w-full flex-col border-light md:flex-row md:items-start  md:border-y-pt">
          <div className="left-0 top-0 flex flex-col gap-4 md:sticky md:flex md:w-1/3  md:border-light md:pt-16">
            <input
              id="searchInput"
              placeholder="Search"
              className="w-full lh-input"
              onChange={handleSearchChange}
            ></input>
            <div className=" text-xs tracking-widest text-dark">FILTERS</div>
            <div className="flex flex-col md:w-full">
              {tags.map((tag) => (
                <button
                  onClick={() => {
                    handleSetTag(tag);
                  }}
                  key={tag}
                  className={`flex w-full lh-interactive flex-row items-center px-4 py-2 text-left  md:border-0 gap-2`}
                >
                  <RadioCircle checked={tag === selectedTag} />
                  <div>{capitalize(tag)}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full py-4 md:w-2/3 md:p-16 md:pt-16">
            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-0 md:grid-cols-1 lg:grid-cols-2">
              {orderedArticles.map(
                (article) =>
                  (article.meta.tags.includes(selectedTag ?? "") ||
                    selectedTag == null) && (
                    <Link
                      href={"/blog/" + article.slug}
                      passHref
                      key={article.slug}
                    >
                      <BlogCard article={article} />
                    </Link>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export function Tag({ key, tag }: { key: string; tag: string }) {
  const router = useRouter();

  const handleButtonClick = (text: string) => {
    // Navigate to the new URL with the text as a query parameter
    router.push(`/blog?tag=${encodeURIComponent(text)}`);
  };

  return (
    <button
      key={key}
      onClick={() => handleButtonClick(tag)}
      className="mr-1 text-darkest underline lh-interactive"
    >
      #{tag}
    </button>
  );
}
