import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GuideType } from "../utils/types";
import { GuideCard } from "./comp/GuideCard";

export default function Home() {
  // 1) Set articles directory
  const articleDir = "guides";

  // 2) Find all files in the article directory
  const files = fs.readdirSync(path.join(articleDir));

  // 3) For each article found
  const articles = files.map((filename) => {
    // 4) Read the content of that article
    const fileContent = fs.readFileSync(
      path.join(articleDir, filename),
      "utf-8"
    );

    // 5) Extract the metadata from the articles's content
    const { data: frontMatter } = matter(fileContent);

    // 6) Return the metadata and page slug
    return {
      meta: frontMatter,
      slug: filename.replace(".mdx", ""),
    };
  }) as GuideType[];

  console.log(articles);
  return (
    <>
      <h1 className="text-4xl text-darkest font-semibold mt-32">Guides</h1>
      <div className="max-w-lg w-full flex flex-col gap-4">
        {articles.map((val) => {
          return <GuideCard article={val} key={val.slug} />;
        })}
      </div>
    </>
  );
}
