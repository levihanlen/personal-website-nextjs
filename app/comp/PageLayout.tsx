"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { HiMiniBars3 } from "react-icons/hi2";
import { ebGaramond } from "../utils/fonts";

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
    <div
      className={`flex flex-col items-center w-full fixed left-0 top-0 z-30 ${scrolled}`}
    >
      <nav
        className={` max-w-lg  w-full flex w-full flex-row items-start justify-between py-2 sm:items-center text-base`}
      >
        <div className="hidden sm:block">
          <NavBtn href="/">Levi Hanlen</NavBtn>
        </div>
        <button
          className="lh-btn-secondary lh-icon-size sm:hidden"
          onClick={toggleMenu}
        >
          <HiMiniBars3 />
        </button>
        <div
          className={`flex-col items-end space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0 ${
            menuOpen ? "flex" : "hidden"
          } text-lg sm:flex sm:text-base`}
        >
          <div className="sm:hidden block">
            <NavBtn href="/">Home</NavBtn>
          </div>
          <NavBtn href="/guides">Guides</NavBtn>
          {/* <NavBtn href="/blog">Essays</NavBtn> */}
        </div>
      </nav>
    </div>
  );
}

export function NavBtn({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link href={href} className="lh-btn-secondary">
      {children}
    </Link>
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
    <Link href={href} className="lh-interactive underline">
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
      <main className="flex h-full w-full flex-col items-center px-4 gap-8">
        {children}
        <Footer />
      </main>
    </div>
  );
}

function Footer() {
  return (
    <footer
      id="footer"
      className="flex w-full flex-col  pb-12 items-center text-sm text-dark"
    >
      <div className="flex flex-col gap-12 w-full max-w-lg lh-card p-8">
        {/* <div className=" flex-grow space-y-4">
          <div className="font-bold text-center text-darkest">Our Mission</div>
          <p>
            Note that I said <i>our</i> mission. We, you and I, have an
            obligation to improve the world.
          </p>
          <p>
            It may sound ambitious, even impossible. But with enough people and
            enough effort, it&apos;s achievable. And we <i>will</i> make it
            happen in our lifetime.
          </p>
          <p>
            As always, thanks for supporting me. I hope my projects have
            improved your life; I spend way too much time on them.
          </p>
          <p>- Levi</p>
        </div> */}
        <div className="flex w-full justify-between ">
          <div className="w-auto flex flex-col space-y-1">
            <div className="font-bold text-darkest">My social links</div>
            <ALink href="https://www.instagram.com/levihanlen/">
              Instagram
            </ALink>
            <ALink href="https://x.com/LeviHanlen">Twitter (X)</ALink>
            <ALink href="https://github.com/levihanlen">Github</ALink>
          </div>
          <div className=" flex flex-col space-y-1 text-right">
            <div className="font-bold text-darkest ">Levi Hanlen</div>
            <ALink href="/">Home</ALink>
            <ALink href="/guides">Guides</ALink>
            <ALink href="/blog">Essays</ALink>
          </div>
        </div>
      </div>
    </footer>
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
      <article
        className={`${ebGaramond.className} lh-prose-editor text-dark text-base sm:text-lg max-w-full flex-grow-0 self-center sm:px-0 lh-ml md:min-w-[576px] md:self-start ${className}`}
      >
        {children}
      </article>
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
      className={`${ebGaramond.className} text-base sm:text-lg lh-prose-editor text-dark  w-full max-w-lg self-center ${className}`}
    >
      {children}
    </div>
  );
}
