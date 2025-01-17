"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { HiMiniBars3 } from "react-icons/hi2";

export function Navbar() {
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
          className={`transition-colorsNoBorder flex w-full flex-row items-start justify-between lh-pl lh-pr py-3 sm:items-center text-base`}
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
            <ALink href="/guides">Guides</ALink>
            <ALink href="/blog">Blog</ALink>
          </div>
        </div>
      </nav>
    </div>
  );
}

export function ALink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link href={href} className="underline lh-interactive text-darkest">
      {children}
    </Link>
  );
}

export function PageLayout({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-full w-full flex-col justify-start ${className} `} //bg-gridX bg-right-top md:bg-gridXBig
      style={{ backgroundSize: "100% auto" }}
      {...props}
    >
      <Navbar />
      <main className="flex h-full w-full flex-col items-center pb-32">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="footer"
      className="flex w-full flex-col space-y-12 lh-fg p-8 pb-32  lh-pl lh-pr text-sm text-dark md:flex-row md:justify-between md:space-y-0 md:text-sm"
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
        <div className="w-auto flex flex-col space-y-1 sm:mb-0">
          <div className="font-bold text-darkest">Social</div>
          <ALink href="https://www.instagram.com/levihanlen/">Instagram</ALink>
          <ALink href="https://x.com/LeviHanlen">Twitter (X)</ALink>
          <ALink href="https://github.com/levihanlen">Github</ALink>
        </div>
        <div className="w-auto flex flex-col space-y-1 sm:mb-0">
          <div className="font-bold text-darkest">Levi Hanlen ©{year}</div>
          <ALink href="/">Home</ALink>
          <ALink href="/guides">Guides</ALink>
          <ALink href="/blog">Blog</ALink>
        </div>
      </div>
    </footer>
  );
}

export function OldArticle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`prose prose-sm prose-headings:font-semibold prose-strong:text-darkest prose-ol:text-dark prose-ul:text-dark prose-headings:text-darkest prose-blockquote:text-dark prose-p:text-dark !w-[576px] max-w-full flex-grow-0 self-center px-4 sm:px-0 lh-ml md:min-w-[576px] md:self-start ${className}`}
    >
      {children}
    </div>
  );
}

export function Article({
  children,
  className,
  right,
}: {
  children: React.ReactNode;
  className?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-row justify-center">
      <div
        className={`prose prose-sm prose-headings:font-semibold prose-strong:text-darkest prose-ol:text-dark prose-ul:text-dark prose-headings:text-darkest prose-blockquote:text-dark prose-p:text-dark !w-[576px] max-w-full flex-grow-0 self-center px-4 sm:px-0 lh-ml md:min-w-[576px] md:self-start ${className}`}
      >
        {children}
      </div>
      <div className="sticky top-14 hidden w-full flex-grow self-start p-4 md:flex  lh-pr">
        <div className="flex w-full flex-col items-end ">{right}</div>
      </div>
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
