import fs from "fs";
import path from "path";
import matter from "gray-matter";
import React from "react";

import { MDXRemote } from "next-mdx-remote/rsc";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { TableOfContents } from "../../comp/TableOfContents";
import { AuthorSection } from "@/app/comp/AuthorSection";
import { Article, CenteredArticle } from "@/app/comp/PageLayout";
import { DisplayPill } from "@/app/comp/Primitives";
import { ShareBtns } from "@/app/comp/SocialShare";
import { RandomGuides } from "../comp/RandomGuides";
import { GuideType } from "@/app/utils/types";
import { gradient, slugify } from "@/app/utils/utils";

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
  const background = gradient(imageUrl);
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

            <div className="flex flex-row flex-wrap items-start justify-start text-sm text-dark">
              {props.frontMatter.desc.map((tag: string, index: number) => (
                <div className="mr-2" key={index.toString()}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </Article>
      </div>
      <Article
        className="mt-8"
        right={
          <div className="flex flex-col lh-card p-4 gap-4">
            <ShareBtns />
            <TableOfContents content={props.content} />
          </div>
        }
      >
        <MDXRemote
          {...{ source: props.content }}
          components={componentsForMDX}
        />
      </Article>
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

function EndCardArticle() {
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
