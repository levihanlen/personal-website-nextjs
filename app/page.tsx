import Image from "next/image";
import Link from "next/link";
import { Card, CenteredArticle, PrimaryBtn } from "./clientComponents";
import { Roadmap } from "./utils/roadmap";

import { roadmap } from "./utils/roadmap";

// import { RandomArticles } from "./learn/clientComponents";
/*
import fs from "fs";
import path from "path";
import matter from "gray-matter";
*/
export default function Home() {
  const today = new Date();
  const bDay = new Date("2006-05-23");

  let age = today.getFullYear() - bDay.getFullYear();
  const monthDifference = today.getMonth() - bDay.getMonth();
  const dayDifference = today.getDate() - bDay.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }
  /*
  const articleDir = "articles";
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
  });
  */

  // const imageUrl = "/header-images/neuron.jpg";
  // const background = `linear-gradient(hsla(120, 0%, 0%, 0.8), hsla(120, 0%, 0%, 0.8)), url(${imageUrl})`;
  return (
    <>
      {/* 
      <div
        style={{ backgroundImage: background }}
        className="relative w-full bg-white bg-cover bg-center bg-no-repeat text-left"
      >
        <div className="relative flex h-[70vh] w-full flex-row items-center justify-center p-4 text-left">
          <div className="flex flex-col items-start space-y-4 w-full max-w-lg">
            <h1 className="text-5xl font-bold text-darkest">
              <span className="text-dark">Chasing </span>
              <GradientHeading>Infinity</GradientHeading>
            </h1>
            <p className=" text-pretty text-dark">
              I have a mission to improve the world and myself.
            </p>
            <Link href="/learn">
              <PrimaryBtn>Browse guides</PrimaryBtn>
            </Link>
          </div>
        </div>
      </div>
      <div className="px-4 pt-8 w-full flex items-center justify-center">
        <div className="w-full border-pt border-medium/30 max-w-3xl space-y-4 rounded-2xl p-4 pt-8 sm:p-8 lg:p-12 bg-light flex flex-col items-center justify-center">
          <h2 className="text-center text-2xl font-semibold">
            {articles.length} high-quality guides
          </h2>
          <p className="text-center text-dark w-full -1/2">
            Guides to enhance your productivity, wisdom, and overall well-being
            with proven strategies to achieve your goals and lead a more
            fulfilling life.
          </p>
          <RandomArticles articles={articles} />
        </div>
      </div>
*/}
      <CenteredArticle className={`mt-32`}>
        <h1>Hey! I&apos;m Levi 👋</h1>

        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <SquareImg src="/mePicture.webp" />
          <SquareImg src="/gradPic.png" />
          <SquareImg src="/mePicture2.png" />
          <SquareImg src="/polaroid.png" />
        </div>
        <h2>About me 🕵️</h2>
        <p>
          I&apos;m an {age}-year-old in the US who loves creating businesses and
          learning.
        </p>
        <div className="flex flex-col space-y-4 mb-16">
          <h1 className="!m-0 text-pretty">The Story of Our Future</h1>
          <div className="text-xl text-pretty text-dark">
            The roadmap to utopia—and how I can help.
          </div>
          <div className="tracking-widest text-xs font-semibold text-dark">
            VERSION 2 - OCT 3, 2024
          </div>
        </div>

        <p>Improvement never happens on its own.</p>

        <p>
          Every innovation, every improvement, was made via force--via
          consistent effort.
        </p>

        <p>
          Never blindly assume tomorrow will be better. Because it won&apos;t be
          unless you make it so.
        </p>

        <p>The main problems we must solve:</p>

        <ul>
          <li>Pain</li>
          <li>Intelligence</li>
          <li>World Peace</li>
          <li>Poverty</li>
          <li>Hunger</li>
          <li>Education</li>
          <li>Government</li>
          <li>Human Limitations</li>
          <li>Time</li>
        </ul>

        <p>
          <strong>
            If you want to use any of these ideas, go ahead! Somebody has to
            change the world, so why not you?
          </strong>
        </p>

        <p>The year is 2024. The clock begins.</p>

        <div className="space-y-4 md:space-y-8">
          {roadmap.map((val, ind) => {
            return <RoadmapDisp roadmap={val} key={ind} />;
          })}
        </div>
        <h2>Fun Facts 🕺</h2>
        <ul>
          <li>I&apos;m a minimalist and own under 100 items.</li>
          <li>I was Valedictorian of my high school class (285 people).</li>
          <li>
            I chose not to attend college and am instead pursuing
            entrepreneurship.
          </li>
          <li>
            I love reading. I read 45 minutes daily. I used to read 8 hours a
            day.
          </li>
          <li>I drink only water and eat only healthy food.</li>
        </ul>
        <h2>My heroes 🦸‍♀️</h2>
        <ul>
          <li>Steve Jobs</li>
          <li>Winston Churchill</li>
          <li>Leonardo Da Vinci</li>
          <li>Elon Musk</li>
          <li>Albert Einstein</li>
          <li>
            <a href="https://www.heroic.us/brian-johnson" target="_blank">
              Brian Johnson
            </a>{" "}
            (of Heroic company)
          </li>
          <li>Charles Darwin</li>
          <li>Isaac Newton</li>
          <li>Plato</li>
          <li>Abraham Lincoln</li>
        </ul>
        <div className="pt-16"></div>

        <h1>My work 🎯</h1>
      </CenteredArticle>
      <div className="pt-16 px-4 md:px-8 lg:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4">
        <ProjectDiv
          heading="WriteRush"
          desc="Software that makes writing fun, fast, and easy"
          href="https://www.writerush.net/"
          img="url('writerush-mockup.png')"
        />
        <ProjectDiv
          heading="MythScape"
          img="url('mythscape-mockup.png')"
          desc="Procedural text-based game"
          href="https://game.levihanlen.com/"
        />
        <ProjectDiv
          heading="LeviHanlen Instagram"
          desc="Life hacks, business ideas, productivity tips, wisdom, and more"
          href="https://www.instagram.com/levihanlen/"
          img="url('levihanlen-ig-mockup.png')"
        />
        <ProjectDiv
          heading="WriteRush Instagram"
          desc="Actionable advice for fiction writing (19,000+ followers)"
          href="https://www.instagram.com/writerushofficial/"
          img="url('writerush-ig-mockup.png')"
        />
        {/*
        <ProjectDiv
          heading="ImaginationRPG"
          desc="A game playable entirely in your head"
          href="https://levihanlen.itch.io/imaginationrpg"
          cta="Open ImaginationRPG"
          img="url('imaginationrpg-mockup.png')"
        />
         */}
      </div>

      <Link href="/learn">
        <PrimaryBtn>Browse guides</PrimaryBtn>
      </Link>
    </>
  );
}

export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full border-pt border-darkest/10 bg-medium">
      <div className="h-full bg-darkest" style={{ width: percent + "%" }}></div>
    </div>
  );
}
function RoadmapDisp({ roadmap }: { roadmap: Roadmap }) {
  const total = roadmap.items.reduce(
    (acc, item) => acc + (item.done ? 1 : 0),
    0
  );
  const percent = (total / roadmap.items.length) * 100;

  // Function to calculate time difference
  function getTimeDifference(date: Date) {
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const isPast = diffMs < 0;
    const diff = Math.abs(diffMs);

    const msInMinute = 60 * 1000;
    const msInHour = msInMinute * 60;
    const msInDay = msInHour * 24;
    const msInMonth = msInDay * 30; // Approximate
    const msInYear = msInDay * 365; // Approximate

    let timeStr = "";
    if (diff >= msInYear) {
      const years = Math.floor(diff / msInYear);
      timeStr = `${years} year${years > 1 ? "s" : ""}`;
    } else if (diff >= msInMonth) {
      const months = Math.floor(diff / msInMonth);
      timeStr = `${months} month${months > 1 ? "s" : ""}`;
    } else if (diff >= msInDay) {
      const days = Math.floor(diff / msInDay);
      timeStr = `${days} day${days > 1 ? "s" : ""}`;
    } else if (diff >= msInHour) {
      const hours = Math.floor(diff / msInHour);
      timeStr = `${hours} hour${hours > 1 ? "s" : ""}`;
    } else if (diff >= msInMinute) {
      const minutes = Math.floor(diff / msInMinute);
      timeStr = `${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else {
      timeStr = "just now";
    }

    if (timeStr === "just now") {
      return timeStr;
    }

    return isPast ? `${timeStr} ago` : `in ${timeStr}`;
  }

  return (
    <Card className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col space-y-1">
        <ProgressBar percent={percent} />
        <div className="text-xs text-dark">{percent.toFixed(0)}%</div>
      </div>
      <div className="text-2xl font-semibold text-darkest">{roadmap.title}</div>
      <div className="text-dark">{roadmap.desc}</div>

      <details className="mt-4">
        <summary className="cursor-pointer text-lg font-semibold">
          Expand
        </summary>
        <div className="space-y-6 mt-4">
          {roadmap.items
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .map((item, ind) => {
              const date = new Date(item.date);
              const timeDiffStr = getTimeDifference(date);

              return (
                <div
                  key={ind}
                  className={` flex flex-auto justify-between items-center border-b-pt pb-1 border-mediumLight ${
                    item.done ? "" : ""
                  }`}
                >
                  <div className=" items-center flex flex-row mr-4">
                    <div
                      className={` rounded-full w-4 h-4 flex-none mr-4 border-medium border-pt ${
                        item.done ? "bg-darkest border-dark" : ""
                      }`}
                    />
                    <div
                      className={` ${
                        item.done
                          ? "line-through text-mediumDark"
                          : "text-darkest "
                      }`}
                    >
                      {item.title}
                    </div>
                  </div>
                  <div className="text-sm text-medium flex-none">
                    {timeDiffStr}
                  </div>
                </div>
              );
            })}
        </div>
      </details>
    </Card>
  );

  /*
  return (
    <Card className="p-6 md:p-8 space-y-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col space-y-2">
        <ProgressBar percent={percent} />
        <div className="text-sm text-gray-600">
          {percent.toFixed(0)}% Completed
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-800">{roadmap.title}</div>
      <div className="text-gray-700">{roadmap.desc}</div>

      <details className="mt-4">
        <summary className="cursor-pointer text-lg font-semibold text-blue-600 hover:text-blue-800">
          View Roadmap Items
        </summary>
        <div className="mt-4 space-y-4">
          {roadmap.items
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .map((item, ind) => {
              const date = new Date(item.date);
              const timeDiffStr = getTimeDifference(date);

              return (
                <div
                  key={ind}
                  className={`flex justify-between items-center border-b pb-2 ${
                    item.done ? "opacity-50" : ""
                  }`}
                >
                  <div
                    className={`flex items-center ${
                      item.done ? "line-through text-gray-500" : "text-gray-800"
                    }`}
                  >
                    <span
                      className={`inline-block w-3 h-3 mr-2 rounded-full ${
                        item.done ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></span>
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-500">{timeDiffStr}</div>
                </div>
              );
            })}
        </div>
      </details>
    </Card>
  );
  */
}

function ProjectDiv({
  heading,
  desc,
  href,
  img,
}: {
  heading: string;
  desc: string;
  href: string;
  img: string;
}) {
  return (
    <div className="mb-16 group">
      <Link href={href} className="" rel="noopener noreferrer" target="_blank">
        <div
          style={{
            backgroundImage: img,
            aspectRatio: "1 / 1",
          }}
          className="w-full bg-cover bg-no-repeat bg-center rounded-xl group-hover:scale-105 transition-transform"
        />
        <div className="mt-4 space-y-4 text-center px-4 text-pretty">
          <h2 className="text-darkest text-2xl font-semibold">{heading}</h2>
          <p className="text-dark">{desc}</p>
        </div>
      </Link>
    </div>
  );
}

function SquareImg({ src }: { src: string }) {
  return (
    <div className=" relative" style={{ aspectRatio: "1 / 1" }}>
      <Image
        src={src}
        width={0}
        height={0}
        sizes="100vw"
        alt="Image"
        className="absolute m-0 w-full h-full grayscale object-cover rounded-xl"
      />
    </div>
  );
}
