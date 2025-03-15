"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RadioCircle } from "./Primitives";

// Utility to create anchor IDs from heading text
function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

interface HeadingItem {
  level: number;
  text: string;
  slug: string;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  // 1) Split the content into lines
  const lines = content.split("\n");

  // 2) Regex to capture headings that start with `##` up to `######`
  const headingRegex = /^(#{2,6})\s+(.*)/;

  // 3) Parse out headings and store them
  const headings: HeadingItem[] = [];
  for (const line of lines) {
    const match = line.match(headingRegex);
    if (match) {
      const hashes = match[1];
      const headingText = match[2].trim();
      const level = hashes.length;
      const slug = slugify(headingText);
      headings.push({ level, text: headingText, slug });
    }
  }

  // State to track which heading is currently "active"
  const [activeSlug, setActiveSlug] = useState<string>("");

  useEffect(() => {
    // If there are no headings, bail out
    if (!headings.length) return;

    // Callback for Intersection Observer
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // The target's id is the heading's slug
          setActiveSlug(entry.target.id);
        }
      });
    };

    // Create the observer
    const observer = new IntersectionObserver(callback, {
      // Adjust the rootMargin/top margin so that the heading is considered
      // 'active' a bit before it hits the top of the viewport
      rootMargin: "0px 0px -60% 0px",
      threshold: 0,
    });

    // Observe each heading in the DOM
    headings.forEach((heading) => {
      const el = document.getElementById(heading.slug);
      if (el) observer.observe(el);
    });

    // Cleanup on unmount
    return () => {
      observer.disconnect();
    };
  }, [headings]);

  const activeIndex = headings.findIndex(
    (heading) => heading.slug === activeSlug
  );

  return (
    <nav>
      <ul className="flex flex-col">
        {headings.map((heading, index) => {
          // Highlight the currently active heading using "bg-light" class
          const isActive = heading.slug === activeSlug;

          // Determine if the heading has been passed
          const isPassed = index < activeIndex;

          // The RadioCircle is checked if the heading has been passed or is active
          const isChecked = isPassed || isActive;

          return (
            <Link
              key={heading.slug}
              className={`text-xs text-dark transition-none lh-interactive lh-fg-no-color rounded-full p-1 flex flex-row gap-2 items-center ${
                isActive ? "bg-light" : ""
              }`}
              style={{ marginLeft: (heading.level - 2) * 12 }}
              href={`#${heading.slug}`}
            >
              <RadioCircle checked={isChecked} />
              <span>{heading.text}</span>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
