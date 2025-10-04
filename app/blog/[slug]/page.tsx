import fs from "fs";
import path from "path";
import matter from "gray-matter";
import React from "react";
import { AuthorSection } from "@/app/comp/AuthorSection";
import { Article, PageLayout } from "@/app/comp/PageLayout";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Tag } from "../comp/TagSelector";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("blog"));

  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return paths;
}

function getPost({ slug }: { slug: string }) {
  const postPath = path.join("blog", `${slug}.mdx`);

  // Check if the file exists
  if (!fs.existsSync(postPath)) {
    notFound();
  }

  // Read and parse the markdown file
  const markdownFile = fs.readFileSync(postPath, "utf-8");
  const { data: frontMatter, content } = matter(markdownFile);

  return {
    frontMatter,
    slug,
    content,
  };
}

export default function Post({ params }: { params: { slug: string } }) {
  const props = getPost(params);

  // const timeToRead = Math.max(Math.round(props.content.length / 5 / 250), 1);
  return (
    <PageLayout>
      <Article className="mt-32">
        <h1 className="!mb-4">{props.frontMatter.title}</h1>
        <div className="flex flex-row flex-wrap items-start justify-start text-sm text-dark md:text-base">
          {props.frontMatter.tags.map((tag: string, index: number) => (
            <Tag tag={tag} key={index.toString()} />
          ))}
        </div>
        <MDXRemote {...{ source: props.content }} />
      </Article>
      <AuthorSection />
    </PageLayout>
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
