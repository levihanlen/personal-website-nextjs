import Image from "next/image";
import Link from "next/link";

import { roadmap, version } from "./utils/roadmap";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { RoadmapOverview, RoadmapDisp } from "./comp/Roadmap";
import { GuideType } from "./utils/types";
import { RandomGuides } from "./guides/comp/RandomGuides";
import { CenteredArticle } from "./comp/PageLayout";

export default function Home() {
  const today = new Date();
  const bDay = new Date("2006-05-23");

  let age = today.getFullYear() - bDay.getFullYear();
  const monthDifference = today.getMonth() - bDay.getMonth();
  const dayDifference = today.getDate() - bDay.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

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

  // const imageUrl = "/header-images/neuron.jpg";
  // const background = `linear-gradient(hsla(120, 0%, 0%, 0.8), hsla(120, 0%, 0%, 0.8)), url(${imageUrl})`;
  return (
    <>
      <div className="px-4 pt-8 w-full flex items-center justify-center">
        <div className="w-full  max-w-3xl space-y-4 lh-card p-4 pt-8 sm:p-8 lg:p-12 bg-light flex flex-col items-center justify-center">
          <h2 className="text-center text-2xl font-semibold">
            {articles.length} high-quality guides
          </h2>
          <p className="text-center text-dark w-full -1/2">
            Guides to enhance your productivity, wisdom, and overall well-being
            with proven strategies to achieve your goals and lead a more
            fulfilling life.
          </p>
          <RandomGuides articles={articles} />
        </div>
      </div>

      <CenteredArticle className={`mt-32`}>
        <h1>Hey! I&apos;m Levi 👋</h1>

        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <SquareImg src="/blinds.jpg" />
          <SquareImg src="/gradPic.jpeg" />
          <SquareImg src="/barcelona.jpeg" />
          <SquareImg src="/golf.jpeg" />
        </div>

        <h2>About me 🕵️</h2>
        <ul>
          <li>
            I&apos;m an {age}-year-old in the US who loves creating businesses
            and learning
          </li>
          <li>I&apos;m a minimalist with under 100 items</li>
          <li>I was Valedictorian of my high school class</li>
          <li>
            I chose not to attend college and am instead pursuing
            entrepreneurship
          </li>
          <li>
            I love reading so much that I used to it for eight hours daily (I
            now do one hour)
          </li>
          <li>I drink only water and eat only healthy food</li>
          <li>Almost everything I own is black, white, or gray</li>
          <li>
            I&apos;m madly in love with{" "}
            <a href="https://apps.ankiweb.net/" target="_blank">
              Anki
            </a>
          </li>
        </ul>
        <div className="flex flex-col space-y-4 my-12">
          <h1 className="!m-0 text-pretty">
            Our roadmap to a better world—and how I can help 🌲
          </h1>
          <div className="tracking-widest text-xs font-semibold text-dark">
            VERSION {version} OF 1000
          </div>
        </div>

        <p>Improvement never happens on its own.</p>

        <p>
          Every innovation, every improvement, was made via force—via consistent
          effort.
        </p>

        <p>
          Never blindly assume tomorrow will be better. Because it won&apos;t be
          unless you make it so.
        </p>

        <RoadmapOverview />

        <p>
          <strong>
            If you want to use any of these ideas, go ahead! Somebody has to
            change the world, so why not you?
          </strong>
        </p>

        <div className="space-y-4 md:space-y-8">
          {roadmap
            .sort((a, b) => {
              const earliestA = a.items.reduce((earliest, current) =>
                new Date(current.date) < new Date(earliest.date)
                  ? current
                  : earliest
              );
              const earliestB = b.items.reduce((earliest, current) =>
                new Date(current.date) < new Date(earliest.date)
                  ? current
                  : earliest
              );

              return (
                new Date(earliestA.date).getTime() -
                new Date(earliestB.date).getTime()
              );
            })
            .map((val, ind) => {
              return <RoadmapDisp roadmap={val} key={ind} />;
            })}
        </div>
        <div className="w-full flex flex-col items-center py-16">
          <div className="text-pretty text-4xl tracking-widest font-semibold text-center">
            A NEW WORLD IS BORN
          </div>
          <p className="max-w-sm text-pretty text-center">
            A plan is good, but alone it wont change the world. Only action
            will. So let&apos;s get to work.
          </p>
        </div>
        <p></p>
        <h2>Challenges we must overcome 🧑‍🚀</h2>
        <ul>
          <li>Doubt from others and self</li>
          <li>Not learning enough</li>
          <li>Too ingrained in wanting pleasure</li>
          <li>Losing motivation</li>
          <li>Fear of leaving the comfort zone</li>
          <li>Not working hard enough</li>
          <li>Too much busywork</li>
          <li>Embrassment from failures</li>
          <li>Balancing idealism with realism</li>
          <li>Unforseen obstacles</li>
          <li>Lack of collaboration</li>
          <li>Impatience</li>
          <li>Perfectionism</li>
          <li>Criticism</li>
          <li>Not adapting enough</li>
          <li>Output dilution from doing too much at once</li>
          <li>Discouragement from failures</li>
          <li>Trying to do all the work</li>
          <li>Underestimating how hard it will be</li>
        </ul>
        <div className="pt-16"></div>

        <h1>My work 🎯</h1>
      </CenteredArticle>
      <div className="pt-16 px-4 md:px-8 lg:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4">
        <ProjectDiv
          heading="Varu AI"
          desc="AI-generated stories"
          href="https://www.varu.us/"
          img="url('/varu.png')"
        />
        <ProjectDiv
          heading="WriteRush"
          desc="Software that makes writing fun, fast, and easy"
          href="https://www.writerush.net/"
          img="url('/writerush-mockup.png')"
        />
        <ProjectDiv
          heading="Hanlen's Simulator"
          img="url('/mythscape-mockup.png')"
          desc="Procedural text-based game"
          href="https://game.levihanlen.com/"
        />
        <ProjectDiv
          heading="LeviHanlen Instagram"
          desc="Life hacks, business ideas, productivity tips, wisdom, and more"
          href="https://www.instagram.com/levihanlen/"
          img="url('/levihanlen-ig-mockup.png')"
        />
        <ProjectDiv
          heading="WriteRush Instagram"
          desc="Actionable advice for fiction writing (20K+ followers)"
          href="https://www.instagram.com/writerushofficial/"
          img="url('/writerush-ig-mockup.png')"
        />
      </div>
    </>
  );
  // <GenerateWallpaperButton />
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
      <Link href={href} className="" target="_blank">
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
