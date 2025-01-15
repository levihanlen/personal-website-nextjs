"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { HiMiniBars3 } from "react-icons/hi2";

export function Card({
  children,
  className = "",
  style,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`lh-card ${className}`} style={style} {...props}>
      {children}
    </div>
  );
}

export function GradientHeading({ children }: { children: React.ReactNode }) {
  // linear-gradient(to right, #28e9a2, #6de806)
  return (
    <span className="bg-gradient-to-br from-darkest to-primary bg-clip-text">
      <span className=" !m-0 !p-0 !text-transparent">{children}</span>
    </span>
  );
}

export function Navbar({ scrollbar = false }: { scrollbar: boolean }) {
  const [scrolled, setScrolled] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;

      let twOutput = "";
      if (isScrolled || menuOpen) {
        twOutput = `bg-lightest bg-opacity-90  backdrop-blur-md`;
      } else {
        twOutput = "";
      }
      setScrolled(twOutput);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen]);
  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }
  return (
    <div className="flex flex-col">
      <nav
        className={`${scrolled} fixed transition-colorsNoBorder left-0 top-0 z-30 w-full`}
      >
        <div
          className={`transition-colorsNoBorder flex w-full flex-row items-start justify-between px-8 py-3 sm:items-center text-base`}
        >
          <Link
            href="/"
            className="hidden no-underline sm:flex sm:items-center group"
          >
            <Image
              alt="Logo image"
              src="/faviconImg.png"
              width="20"
              height="20"
              className="mr-2"
            ></Image>
            <div className="text-darkest group-hover:underline">
              Levi Hanlen
            </div>
          </Link>
          <button className="text-2xl sm:hidden" onClick={toggleMenu}>
            <HiMiniBars3 />
          </button>
          <div
            className={`flex-col items-end space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0 ${
              menuOpen ? "flex" : "hidden"
            } text-lg sm:flex sm:text-base`}
          >
            <Link href="/" className="block no-underline sm:hidden">
              <div className="text-darkest hover:underline">Home</div>
            </Link>
            <Link href="/guides" className="no-underline">
              <div className="text-darkest hover:underline">Guides</div>
            </Link>
          </div>
        </div>
        {scrollbar && <ScrollProgressBar2 />}
      </nav>
    </div>
  );
}

export function ScrollProgressBar2() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    // Calculate the current scroll position as a percentage
    //const adjustForFooter = 272;

    const footer: HTMLElement | null = document.querySelector("#footer");
    const footerHeight = footer ? footer.offsetHeight : 0;

    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight - footerHeight;
    const currentScroll = window.scrollY;
    const progress = (currentScroll / totalHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    // Add scroll event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener when component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty array ensures this effect runs only once
  return (
    <div className="h-0.5 w-full overflow-hidden">
      <div
        className="h-full bg-light"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

export function PageLayout({
  scrollbar = false,
  children,
  className,
  ...props
}: {
  scrollbar?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  //  <Navbar scrollbar={scrollbar} />
  console.log(scrollbar);
  return (
    <div
      className={`flex min-h-full w-full flex-col justify-start ${className} `} //bg-gridX bg-right-top md:bg-gridXBig
      style={{ backgroundSize: "100% auto" }}
      {...props}
    >
      <Navbar scrollbar={scrollbar} />
      <main className="flex h-full w-full flex-col items-center pb-32">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function FooterLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <div>
      <a href={href} target="_blank" className="hover:underline">
        {children}
      </a>
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="footer"
      className="flex w-full flex-col space-y-12 lh-fg p-8 pb-32 text-sm text-dark md:flex-row md:justify-between md:space-y-0 md:text-sm"
    >
      <div className="w-full max-w-lg flex-grow space-y-4 sm:mb-0 md:w-1/2 md:mr-8">
        <div className="font-bold text-darkest">Our Mission</div>
        <p>
          Note that I said <i>our</i> mission. We, you and I, have an obligation
          to improve the world.
        </p>
        <p>
          It may sound ambitious, even impossible. But with enough people and
          enough effort, it&apos;s achievable. And we <i>will</i> make it happen
          in our lifetime.
        </p>
        <p>
          As always, thanks for supporting me. I hope my projects have improved
          your life; I spend way too much time on them.
        </p>
        <p>- Levi</p>
      </div>
      <div className="flex w-full justify-between max-w-sm">
        <div className="w-auto space-y-1 sm:mb-0">
          <div className="font-bold text-darkest">Social</div>
          <FooterLink href="https://www.instagram.com/levihanlen/">
            Instagram
          </FooterLink>
          <FooterLink href="https://x.com/LeviHanlen">Twitter (X)</FooterLink>
          <FooterLink href="https://github.com/levihanlen">Github</FooterLink>
        </div>
        <div className="w-auto space-y-1 sm:mb-0">
          <div className="font-bold text-darkest">Levi Hanlen ©{year}</div>
          <div>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </div>

          <div>
            <Link href="/guides" className="hover:underline">
              Guides
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PrimaryBtn({
  className,
  children,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      className={`${className} lh-round bg-darkest bg-cover px-4 py-2 font-semibold text-lightest hover:bg-darkest/70 hover:opacity-70`}
      style={{ backgroundImage: "url('aurora.jpg')" }}
      onClick={onClick} // directly pass onClick here
      {...props}
    >
      {children}
    </button>
  );
}

export function SecondaryBtn({
  className,
  children,
  onClick,
  type,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}) {
  return (
    <button
      className={`${className} rounded-xl border-pt border-darkest/20 bg-lightest px-4 py-2 font-semibold text-darkest hover:bg-light/70`}
      type={type}
      onClick={onClick} // directly pass onClick here
      {...props}
    >
      {children}
    </button>
  );
}

export function Article({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`prose prose-sm prose-headings:font-semibold prose-strong:text-darkest prose-ol:text-dark prose-ul:text-dark prose-headings:text-darkest prose-blockquote:text-dark prose-p:text-dark !w-[576px] max-w-full flex-grow-0 self-center px-4 md:ml-8 md:min-w-[576px] md:self-start lg:ml-32 ${className}`}
    >
      {children}
    </div>
  );
}

export function CenteredArticle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`prose prose-sm prose-zinc !prose-invert lg:prose-base prose-headings:font-semibold prose-headings:text-darkest prose-p:text-dark prose-li:text-dark w-full max-w-xl self-center px-4 ${className}`}
    >
      {children}
    </div>
  );
}

export function LinkCard({
  link,
  children,
  className,
}: {
  link: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={link}
      rel="noopener noreferrer"
      target="_blank"
      className="no-underline"
    >
      <Card className={`hover:bg-light/50 ${className}`}>{children}</Card>
    </Link>
  );
}

export function DisplayPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-full lh-fg px-3 py-1.5 text-sm font-semibold tracking-widest text-dark ${className}`}
    >
      {children}
    </div>
  );
}

export function Avatar({ src, size = 16 }: { src: string; size?: number }) {
  return (
    <Image
      src={src}
      width={size}
      height={size}
      alt="Image"
      className=" h-12 w-12 rounded-full border-pt border-darkest/20 "
    />
  );
}

export function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function gradient(url: string) {
  return `linear-gradient(hsla(120, 0%, 0%, 0.7), hsla(120, 0%, 0%, 0.7)), url(${url})`;
}
