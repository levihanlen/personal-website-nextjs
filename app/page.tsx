import Image from "next/image";
import Link from "next/link";

import { Article, PageLayout } from "./comp/PageLayout";
import NewsletterForm from "./comp/NewsletterForm";

export default function Home() {
  const today = new Date();
  const bDay = new Date("2006-05-23");

  let age = today.getFullYear() - bDay.getFullYear();
  const monthDifference = today.getMonth() - bDay.getMonth();
  const dayDifference = today.getDate() - bDay.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  // const articleDir = "guides";
  // const files = fs.readdirSync(path.join(articleDir));
  // const articles = files.map((filename) => {
  //   const fileContent = fs.readFileSync(
  //     path.join(articleDir, filename),
  //     "utf-8"
  //   );
  //   const { data: frontMatter } = matter(fileContent);
  //   return {
  //     meta: frontMatter,
  //     slug: filename.replace(".mdx", ""),
  //   };
  // }) as GuideType[];

  // const imageUrl = "/header-images/neuron.jpg";
  // const background = `linear-gradient(hsla(120, 0%, 0%, 0.8), hsla(120, 0%, 0%, 0.8)), url(${imageUrl})`;
  return (
    <PageLayout left={<div>test</div>}>
      <Article className={`mt-32`}>
        <h1>Hey! I&apos;m Levi</h1>
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <SquareImg src="/barcelona.jpeg" />
          <SquareImg src="/golf.jpeg" />
          <SquareImg src="/suits.png" />
          <SquareImg src="/polaroid.jpeg" />
        </div>
        <h2>About me</h2>
        <ul>
          <li>I&apos;m a {age}-year-old in the US who loves learning</li>
          <li>I&apos;m a minimalist with under 100 items</li>
          <li>
            I love reading so much that I used to do it for eight hours daily
          </li>
          <li>I only drink water</li>
          {/* <li>I&apos;m celibate by choice</li> */}
          <li>I&apos;m writing down every memory I&apos;ve ever had</li>
          <li>Almost everything I own is black, white, or gray</li>

          <li>I was Valedictorian of my high school class</li>
          <li>
            I chose not to attend college and am instead pursuing
            entrepreneurship
          </li>
          <li>
            I&apos;m madly in love with{" "}
            <a href="https://apps.ankiweb.net/" target="_blank">
              Anki
            </a>
            . I even made my own version.
          </li>
          <li>
            I created my own <a href="/blog/shorthand">shorthand alphabet</a>{" "}
            with which I write
          </li>
          {/* <li>
            I&apos;m working on a programmatic simulation of societies (turns
            out it&apos;s pretty hard)
          </li> */}
        </ul>
      </Article>

      <NewsletterForm />
      {/* <div className="w-full space-y-4 p-8 lh-card flex flex-col items-center justify-center">
        <h2 className="text-center text-2xl font-semibold !my-0">
          {articles.length} high-quality guides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <RandomGuides articles={articles} />
        </div>
        <Link href="/guides" className="lh-btn-primary">
          Browse all guides
        </Link>
      </div> */}
      <Article>
        {/* <div className="flex flex-col space-y-4 my-12">
          <h1 className="!m-0 text-pretty">My goals 🌲</h1>
          <div className="tracking-widest text-xs font-semibold text-dark">
            VERSION 13 OF 1000
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
        </p> */}
        {/* <h2>Goals specific to me 🧐</h2>
        <div className="flex flex-col gap-2">
          <Goal date="2025-12">10K anki cards</Goal>
          <Goal date="2025-10">
            Be able to fully sustain myself with self-made income
          </Goal>
          <Goal date="2028">Master all desire, emotions, and willpower</Goal>
        </div> */}
        {/* <h2>Goals anyone can (and should) help with 🌍</h2>
        <div className="flex flex-col gap-2">
          <Goal date="2024" years={10}>
            Help create AGI
          </Goal>
          <Goal date="2026" years={15}>
            Create a great global, free education system
          </Goal>
        </div>
        <p>
          Other goals that will be solved after AGI/ASI: longer lifespan, world
          peace, complete brain-computer interface.
        </p>
        <p>The general method for this is as follows:</p>
        <ul>
          <li>Research a lot</li>
          <li>Gather a team of smart people</li>
          <li>Experiment and fail 10,000 times</li>
          <li>Make an expensive, janky working version</li>
          <li>Innovate a ton, make it cheaper, improve it</li>
        </ul>
        <p>
          <strong>
            If you want to use any of these ideas, go ahead! Somebody has to
            change the world, so why not you?
          </strong>
        </p>

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
        </ul> */}
        {/* <h2>Things I know</h2>
        <ul>
          <li>test</li>
        </ul> */}
        <h1>My work</h1>
        <p>
          My main project these days is WriteRush. Check it out by clicking the
          button below!
        </p>
      </Article>
      <div className=" max-w-sm">
        <ProjectDiv
          heading="WriteRush"
          desc="Software that makes writing fun, fast, and easy"
          href="https://www.writerush.net/"
          img="/writerush-mockup.png"
        />
      </div>
    </PageLayout>
  );
  // <GenerateWallpaperButton />
}

// const isValidYear = (date: string): boolean => /^\d{4}$/.test(date);
// const isValidYearMonth = (date: string): boolean =>
//   /^\d{4}-(0[1-9]|1[0-2])$/.test(date);

// const MONTH_NAMES: { [key: string]: string } = {
//   "01": "Jan",
//   "02": "Feb",
//   "03": "Mar",
//   "04": "Apr",
//   "05": "May",
//   "06": "Jun",
//   "07": "Jul",
//   "08": "Aug",
//   "09": "Sep",
//   "10": "Oct",
//   "11": "Nov",
//   "12": "Dec",
// };

// // Function to format the date string
// const formatDate = (year: string, month: string): string => {
//   if (month) {
//     const monthName = MONTH_NAMES[month];
//     return `${monthName} ${year}`;
//   }
//   return year;
// };

// function Goal({
//   children,
//   years,
//   done,
//   date,
// }: {
//   children: React.ReactNode;
//   years?: number;
//   done?: boolean;
//   date: string;
// }) {
//   const validateDate = (date: string): boolean => {
//     return isValidYear(date) || isValidYearMonth(date);
//   };

//   if (!validateDate(date)) {
//     console.error(
//       `Invalid date format: "${date}". Expected "YYYY" or "YYYY-MM".`
//     );
//     return null;
//   }

//   // eslint-disable-next-line prefer-const
//   let [year, month] = date.split("-");

//   const initialYear = year;

//   const isStart = years !== undefined;
//   if (isStart) {
//     year = (Number(year) + years).toString();
//   }

//   const formattedDate = formatDate(year, month);
//   return (
//     <div className={`lh-card text-dark p-4 ${done ? "opacity-50" : ""}`}>
//       <div>
//         <span className="text-darkest">{children}</span>
//       </div>
//       <div>{isStart ? initialYear + " - " + year : formattedDate}</div>
//     </div>
//   );
// }

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
        <div className="lh-border rounded-xl w-full aspect-square relative overflow-hidden">
          <Image
            src={img}
            alt={heading}
            width={500}
            height={500}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="mt-4 space-y-4 text-center px-4 text-pretty">
          <h2 className="text-darkest text-2xl lh-bold">{heading}</h2>
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
        className="absolute w-full h-full grayscale object-cover"
      />
    </div>
  );
}
