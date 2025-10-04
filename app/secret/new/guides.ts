import { renderGuideSections, renderText, renderImg } from "./render";
import { ChapterType, GuideType } from "./types";

const READING_CHAPTER: ChapterType = {
  slug: "reading",
  title: "How to Read a Book",
  desc: "stuff",
  sections: renderGuideSections("learning", [
    renderText(`
  We spend over a decade in school being told what to learn, but almost no one ever teaches us how to learn. Most of us rely on instinct and ineffective habits like rereading and highlighting (methods that feel productive but create an illusion of knowledge).
  
  This guide is a new operating system for your brain. It's a framework built on cognitive science for learning anything faster, deeper, and for longer.
      `),
    "reading",
    renderImg("/header-images/neuron.jpg"),
  ]),
  readingTime: 0,
};

const TEACHING_CHAPTER: ChapterType = {
  slug: "teaching",
  title: "How to Teach",
  desc: "stuff",
  sections: renderGuideSections("learning", [
    renderText(`
  Sutff
      `),
    "teaching",
    renderImg("/header-images/neuron.jpg"),
  ]),
  readingTime: 0,
};

const LEARNING_GUIDE: GuideType = {
  slug: "learning",
  title: "How to Learn",
  desc: "Learn how to learn. this is a very logn description lets see how it will fare when it's long",
  imgSrc: "/header-images/neuron.jpg",
  chapters: [READING_CHAPTER, TEACHING_CHAPTER],
  // readingTime: getReadingTimeForHls("learning"),
  citations: [
    {
      title: "How to Take Smart Notes",
      first: "Sönke",
      last: "Ahrens",
      date: "2017",
      url: "https://www.goodreads.com/book/show/34507927-how-to-take-smart-notes",
    },
    {
      title: "How to Read a Book",
      first: "Mortimer",
      last: "J. Adler",
      date: "1972",
      url: "https://www.goodreads.com/book/show/567610.How_to_Read_a_Book",
    },
    {
      url: "https://www.goodreads.com/book/show/36647421-learning-how-to-learn",
      title: "Learning How to Learn",
      first: "Barbara",
      last: "Oakley",
      date: "2018",
    },
    {
      url: "https://www.goodreads.com/book/show/59616977-building-a-second-brain",
      title: "Building a Second Brain",
      first: "Tiago",
      last: "Forte",
      date: "2020",
    },
    {
      url: "https://gwern.net/spaced-repetition",
      title: "Spaced Repetition",
      date: "2021",
    },
    {
      url: "https://augmentingcognition.com/ltm.html",
      title: "Augmenting Long Term Memory",
      date: "2021",
      first: "Michael",
      last: "Nielsen",
    },
    {
      first: "Piotr",
      last: "Wozniak",
      url: "https://www.supermemo.com/en/blog/twenty-rules-of-formulating-knowledge",
      title: "Twenty Rules of Formulating Knowledge",
      date: "1999",
    },
    {
      url: "https://andymatuschak.org/books/",
      title: "Why Books Don't Work",
      first: "Andy",
      last: "Matuschak",
      date: "2019",
    },
    {
      url: "https://www.goodreads.com/book/show/35167685-surely-you-re-joking-mr-feynman",
      title: "Surely You're Joking, Mr. Feynman!",
      first: "Richard",
      last: "Feynman",
      date: "1985",
    },
    {
      url: "https://www.goodreads.com/book/show/44770129-ultralearning",
      title: "Ultralearning",
      first: "Scott",
      last: "Young",
      date: "2019",
    },
  ],
};

const GUIDES: GuideType[] = [LEARNING_GUIDE];

export { GUIDES };
