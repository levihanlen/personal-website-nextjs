// TableOfContents.tsx
"use client";
import React from "react";

// Slugify a heading's text to create a valid anchor ID
function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, ""); // remove any non-word chars
}

interface HeadingItem {
  level: number; // e.g. 2 for ##, 3 for ###
  text: string; // the actual heading text
  slug: string; // slugified ID
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  // 1) Split the content into lines
  const lines = content.split("\n");

  // 2) Regex to capture headings that start with `##` up to `######`
  //    (You can adjust this to capture # as well, if needed)
  const headingRegex = /^(#{2,6})\s+(.*)/;

  // 3) Parse out headings and store them
  const headings: HeadingItem[] = [];

  for (const line of lines) {
    const match = line.match(headingRegex);
    if (match) {
      const hashes = match[1]; // e.g. "##" or "###"
      const headingText = match[2].trim(); // text after the hashes
      const level = hashes.length; // number of # symbols
      const slug = slugify(headingText);
      headings.push({ level, text: headingText, slug });
    }
  }

  return (
    <nav className="">
      <ul className="space-y-2">
        {headings.map((heading) => (
          <div
            key={heading.slug}
            // Simple left padding to show nesting for subheadings
            className="text-sm  text-dark  lh-interactive"
            style={{ paddingLeft: (heading.level - 2) * 12 }}
          >
            <a href={`#${heading.slug}`}>{heading.text}</a>
          </div>
        ))}
      </ul>
    </nav>
  );
}
