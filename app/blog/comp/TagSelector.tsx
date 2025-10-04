"use client";

import { BlogType } from "@/app/utils/types";
import { capitalize } from "@/app/utils/utils";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { BlogCard } from "./BlogCard";
import { RadioCircle } from "@/app/comp/Primitives";
import { PageLayout } from "@/app/comp/PageLayout";

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
      <PageLayout
        left={
          <div className="flex flex-col gap-4">
            <input
              id="searchInput"
              placeholder="Search"
              className="w-full lh-input"
              onChange={handleSearchChange}
            ></input>
            <div className=" text-xs tracking-widest text-dark pl-2">
              FILTERS
            </div>
            <div className="flex flex-col md:w-full">
              {tags.map((tag) => (
                <button
                  onClick={() => {
                    handleSetTag(tag);
                  }}
                  key={tag}
                  className={`flex w-full lh-interactive flex-row items-center text-left pl-2  md:border-0 gap-2`}
                >
                  <RadioCircle checked={tag === selectedTag} />
                  <div>{capitalize(tag)}</div>
                </button>
              ))}
            </div>
          </div>
        }
      >
        <div className="hidden text-dark md:block">
          Read {articles.length} essays
        </div>
        <div className="flex w-full flex-col">
          <div className="flex flex-col divide-y-pt divide-light">
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
      </PageLayout>
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
      className="mr-1 lh-link"
    >
      #{tag}
    </button>
  );
}
