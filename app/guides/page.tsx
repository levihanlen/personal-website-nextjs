import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { ArticleType, TagSelectorPage } from "./clientComponents";
export default function Home() {
  // 1) Set articles directory
  const articleDir = "articles";

  // 2) Find all files in the article directory
  const files = fs.readdirSync(path.join(articleDir));

  // 3) For each article found
  const articles: ArticleType[] = files.map((filename) => {
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
  }) as ArticleType[];

  return <TagSelectorPage articles={articles} />;
}
