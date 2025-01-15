import fs from "fs";
import path from "path";
import matter from "gray-matter";
import React from "react";

import { MDXRemote } from "next-mdx-remote/rsc";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { TableOfContents } from "../toc";
import { Tag } from "@/app/blog/comp/TagSelector";
import { AuthorSection } from "@/app/comp/AuthorSection";
import { Article, CenteredArticle } from "@/app/comp/PageLayout";
import { DisplayPill } from "@/app/comp/Primitives";
import { SocialShare } from "@/app/comp/SocialShare";
import { RandomGuides } from "../comp/RandomGuides";
import { GuideType } from "@/app/utils/types";
import { slugify } from "@/app/utils/utils";

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("guides"));

  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return paths;
}

// Function to get post data by slug
function getPost({ slug }: { slug: string }) {
  const markdownFile = fs.readFileSync(
    path.join("guides", slug + ".mdx"),
    "utf-8"
  );

  const { data: frontMatter, content } = matter(markdownFile);

  console.log("in there");
  return {
    frontMatter,
    slug,
    content,
  };
}

function H2({ children }: { children: React.ReactNode }) {
  const text = String(children);
  return <h2 id={slugify(text)}>{children}</h2>;
}

function H3({ children }: { children: React.ReactNode }) {
  const text = String(children);
  return <h3 id={slugify(text)}>{children}</h3>;
}

export default function Post({ params }: { params: { slug: string } }) {
  const props = getPost(params);

  console.log("in there");
  const timeToRead = Math.max(Math.round(props.content.length / 5 / 250), 1);

  const componentsForMDX = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h2: (props: any) => <H2 {...props} />,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h3: (props: any) => <H3 {...props} />,
    // plus anything else you like
  };

  const imageUrl = props.frontMatter.bg || "/header-images/wealth.jpg";
  const background = `linear-gradient(hsla(120, 0%, 0%, 0.8), hsla(120, 0%, 0%, 0.8)), url(${imageUrl})`;
  return (
    <>
      <div
        style={{ backgroundImage: background }}
        className="flex w-full flex-col grayscale items-center justify-center bg-light bg-cover bg-center bg-no-repeat pb-8 pt-32"
      >
        <Article>
          <h1 className="!mb-4">{props.frontMatter.title}</h1>
          <div className="w-full max-w-xl space-y-2">
            <div className="text-dark">{timeToRead}-minute read</div>

            <div className="flex flex-row flex-wrap items-start justify-start text-sm text-dark md:text-base">
              {props.frontMatter.tags.map((tag: string, index: number) => (
                <Tag tag={tag} key={index.toString()} />
              ))}
            </div>
          </div>
        </Article>
      </div>
      <div className="flex w-full flex-row justify-center">
        <Article className="mt-8">
          <MDXRemote
            {...{ source: props.content }}
            components={componentsForMDX}
          />
        </Article>
        <div className="sticky top-14 hidden w-full flex-grow self-start p-4 md:flex lg:p-8">
          <div className="flex w-full flex-col items-start gap-4">
            <div className="text-xs font-semibold tracking-widest text-dark">
              SHARE
            </div>
            <div className="flex w-full max-w-40 flex-row items-center justify-between">
              <SocialShare
                title={props.frontMatter.title}
                summary="Check out this great article!"
                url={typeof window !== "undefined" ? window.location.href : ""}
              />
            </div>

            <TableOfContents content={props.content} />
          </div>
        </div>
      </div>
      <EndCardArticle />
      <AuthorSection />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const article = getPost(params);

  return {
    title: article.frontMatter.title,
    description: `Discover top life tips for mastering ${article.frontMatter.title.toLowerCase()}. Improve your life: productivity, health, and wealth.`,
  };
}

export function Example({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex flex-col space-y-2 rounded-lg bg-light p-4">
      <div className="mb-2 text-xs tracking-widest text-dark">EXAMPLE</div>
      <div className="!m-0 !p-0 text-dark">{children}</div>
    </div>
  );
}

export function EndCardArticle() {
  // I copied the below code from page.js of /learn. This is to get the "articles" list
  const articleDir = "guides";
  const files = fs.readdirSync(path.join(articleDir));
  const articles = files.map((filename) => {
    const fileContent = fs.readFileSync(
      path.join(articleDir, filename),
      "utf-8"
    );
    const { data: frontMatter } = matter(fileContent);
    return {
      meta: frontMatter,
      slug: filename.replace(".mdx", ""),
    };
  }) as GuideType[];
  // code ends here.
  return (
    <div className="mt-16 flex w-full flex-col items-center px-4 md:px-16">
      <div className="flex w-full flex-col items-center  lh-card px-8 sm:px-12 py-16">
        <DisplayPill className="inline-flex flex-row items-center space-x-2">
          <span>GUIDE COMPLETE</span>
          <HiMiniCheckBadge className="lh-icon-size" />
        </DisplayPill>
        <CenteredArticle className="my-4 text-pretty text-center">
          <p className="">
            Amazing news! You&apos;re now 1% smarter after reading this guide.
            Keep reading to improve!
          </p>
        </CenteredArticle>
        <RandomGuides articles={articles} />
      </div>
    </div>
  );
}
