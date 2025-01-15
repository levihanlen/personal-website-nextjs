"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Avatar, gradient, shuffleArray } from "../clientComponents";
import Link from "next/link";
import {
  HiMiniArrowTopRightOnSquare,
  HiMiniCheckCircle,
  HiMiniMagnifyingGlass,
} from "react-icons/hi2";

// localStorage.clear();

export interface ArticleType {
  slug: string;
  meta: {
    tags: string[];
    title: string;
    desc: string[];
    bg: string;
  };
}

export function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export function RandomArticles({ articles }: { articles: ArticleType[] }) {
  const [nextArticles, setNextArticles] = useState<ArticleType[]>([]);
  // const [readArticles, setReadArticles] = useState([]);

  useEffect(() => {
    const storedReadArticles =
      JSON.parse(localStorage.getItem("readArticles")!) || [];
    // setReadArticles(storedReadArticles);

    let before: ArticleType[] = articles;
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
    <div className="w-full grid gap-4 sm:grid-cols-2 grid-cols-1">
      {nextArticles.map((article) => (
        <Link
          href={"/guides/" + article.slug}
          passHref
          className={`w-full`}
          key={article.slug}
        >
          <BaseArticleCard article={article} className="bg-lightest" />
        </Link>
      ))}
    </div>
  );
}

export function BaseArticleCard({
  article,
  className,
}: {
  article: ArticleType;
  className?: string;
}) {
  const [readArticles, setReadArticles] = useState<string[]>([]);

  useEffect(() => {
    const storedReadArticles =
      JSON.parse(localStorage.getItem("readArticles")!) || [];
    setReadArticles(storedReadArticles);
  }, []);

  function handleArticleClick(slug: string) {
    console.log("sup", slug);
    let updatedReadArticles = [...readArticles, slug];
    updatedReadArticles = [...updatedReadArticles];
    setReadArticles(updatedReadArticles);
    localStorage.setItem("readArticles", JSON.stringify(updatedReadArticles));
  }

  const read = readArticles.includes(article.slug);

  const imageUrl = article.meta.bg || "/header-images/wealth.jpg";
  const background = gradient(imageUrl);
  return (
    <div
      style={{ backgroundImage: background }}
      className={`lh-card  lh-interactive outline outline-light flex w-full bg-no-repeat bg-cover bg-center grayscale  flex-grow flex-col space-y-2 p-4 lg:p-6 ${className}`}
      onClick={() => handleArticleClick(article.slug)}
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
      <div className="flex flex-row flex-wrap text-xs text-dark md:text-sm">
        {article.meta.tags.map((tag, index) => (
          <span key={index} className="mr-1">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    // Calculate the current scroll position as a percentage
    //const adjustForFooter = 272;

    const footer: HTMLElement = document.querySelector("#footer")!;
    const footerHeight = footer ? footer.offsetHeight : 0;

    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight - footerHeight;
    const currentScroll = window.scrollY;
    const progress = (currentScroll / totalHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    // Add scroll event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener when component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty array ensures this effect runs only once
  return (
    <div className="sticky bottom-0 h-1 w-full overflow-hidden">
      <div
        className="h-full bg-dark"
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </div>
  );
}

export function TagSelectorPage({ articles }: { articles: ArticleType[] }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TagSelectorContent articles={articles} />
    </Suspense>
  );
}

export function TagSelectorContent({ articles }: { articles: ArticleType[] }) {
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
      router.push(`/guides?tag=${encodeURIComponent("null")}`);
      return;
    }

    // setSelectedTag(tag);
    router.push(`/guides?tag=${encodeURIComponent(tag)}`);
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
      <div className="w-full pt-32">
        <div className="hidden px-12 py-4 text-dark md:block">
          Read {articles.length} guides
        </div>
        <div className="relative flex w-full flex-col border-light px-4 md:flex-row md:items-start  md:border-y-pt">
          <div className="left-0 top-0 flex flex-col md:sticky md:flex md:w-1/3  md:border-light md:p-4 md:pt-16">
            <div className="relative mb-8 flex lh-card flex-row items-center overflow-hidden text-dark ">
              <span className="mr-2 pl-4 absolute lh-icon-size">
                <HiMiniMagnifyingGlass />
              </span>
              <input
                id="searchInput"
                placeholder="Search"
                className="w-full bg-transparent p-2 pl-10 lh-round placeholder:text-dark"
                onChange={handleSearchChange}
              ></input>
            </div>
            <div className="pb-4 pl-4 text-xs tracking-widest text-dark">
              FILTERS
            </div>
            <div className="flex flex-col md:w-full">
              {tags.map((tag) => (
                <button
                  onClick={() => {
                    handleSetTag(tag);
                  }}
                  key={tag}
                  className={`flex w-full cursor-pointer flex-row items-center px-4 py-2 text-left  md:border-0`}
                >
                  <div
                    className={`${
                      tag == selectedTag
                        ? "border-0 bg-gradient-to-b from-darkest to-darkest"
                        : "transparent lh-border"
                    } mr-4 flex h-4 w-4 items-center justify-center rounded-full border-pt `}
                  >
                    <div
                      className={`${
                        tag == selectedTag ? "bg-lightest" : "bg-transparent"
                      } h-2 w-2 rounded-full`}
                    />
                  </div>
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
                      href={"/guides/" + article.slug}
                      passHref
                      key={article.slug}
                    >
                      <BaseArticleCard article={article} />
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

export function SocialShare({
  title,
  summary,
  url,
}: {
  title: string;
  summary: string;
  url: string;
}) {
  // Ensure URL is encoded properly
  const encodedUrl = encodeURIComponent(
    url || typeof window !== "undefined" ? window.location.href : ""
  );
  const encodedTitle = encodeURIComponent(title);
  const encodedSummary = encodeURIComponent(summary);

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/share?url=${encodedUrl}&text=${encodedTitle}`;
    window.open(twitterUrl, "_blank", "width=600,height=400,left=200,top=200");
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer.php?u=${encodedUrl}`;
    window.open(facebookUrl, "_blank", "width=600,height=400,left=200,top=200");
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}`;
    window.open(linkedInUrl, "_blank", "width=600,height=400,left=200,top=200");
  };

  const shareViaEmail = () => {
    const body = encodeURIComponent(`I thought you might like this: ${url}`);
    const mailtoUrl = `mailto:?subject=${encodedTitle}&body=${body}`;
    window.open(mailtoUrl, "_self");
  };

  return (
    <>
      <ShareButton onClick={shareOnTwitter}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          <path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" />
        </svg>
      </ShareButton>
      <ShareButton onClick={shareOnFacebook}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
        </svg>
      </ShareButton>
      <ShareButton onClick={shareOnLinkedIn}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="currentColor"
        >
          <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
        </svg>
      </ShareButton>
      <ShareButton onClick={shareViaEmail}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
        </svg>
      </ShareButton>
    </>
  );
}

export function ShareButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`h-full w-1/4 pl-4 text-dark lh-interactive ${
        className || ""
      }`}
    >
      {children}
    </button>
  );
}

export function AuthorSection({ className }: { className?: string }) {
  return (
    <div
      className={`align-center mt-24 flex w-full max-w-sm flex-col items-center justify-center space-y-2 px-8 ${className}`}
    >
      <Avatar src="/mePicture.png" size={84} />
      <p className="text-pretty text-center text-dark">
        All guides are researched and created by me, Levi Hanlen.
      </p>
      <div className="flex">
        <AuthorSectionLink href="https://x.com/LeviHanlen" title="Twitter" />
        <AuthorSectionLink
          href="https://www.instagram.com/levihanlen/"
          title="Instagram"
        />
      </div>
    </div>
  );
}

function AuthorSectionLink({ href, title }: { href: string; title: string }) {
  return (
    <a
      href={href}
      className="text-dark flex gap-1 items-center flex-row underline border-r-pt border-r-light px-4 last-of-type:border-r-0 hover:text-darkest"
    >
      <div>{title} </div>
      <HiMiniArrowTopRightOnSquare className="lh-icon-size text-dark" />
    </a>
  );
}

export function Tag({ key, tag }: { key: string; tag: string }) {
  const router = useRouter();

  const handleButtonClick = (text: string) => {
    // Navigate to the new URL with the text as a query parameter
    router.push(`/guides?tag=${encodeURIComponent(text)}`);
  };

  return (
    <button
      key={key}
      onClick={() => handleButtonClick(tag)}
      className="mr-1 text-primary underline cursor-pointer hover:text-darkest"
    >
      #{tag}
    </button>
  );
}

export function findWriteTime(chars: number) {
  return Math.max(Math.round((chars / 5 / 250) * 15), 1);
}
