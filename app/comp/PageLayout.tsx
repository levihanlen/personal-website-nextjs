"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { HiMiniBars3 } from "react-icons/hi2";
import { ebGaramond } from "../utils/fonts";

export function Navbar({
  hasLeft,
  hasRight,
  onToggleLeft,
  onToggleRight,
}: {
  hasLeft?: boolean;
  hasRight?: boolean;
  onToggleLeft?: () => void;
  onToggleRight?: () => void;
}) {
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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen]);
  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }
  return (
    <div
      className={`flex flex-col items-center w-full fixed px-4 left-0 top-0 z-30 ${scrolled}`}
    >
      <nav
        className={`max-w-lg flex w-full flex-row items-start justify-between py-2 sm:items-center text-base`}
      >
        <div className="flex gap-2 items-center">
          {hasLeft && (
            <button
              className="lh-btn-secondary lh-icon-size lg:hidden"
              onClick={onToggleLeft}
            >
              L
            </button>
          )}
          <div className="hidden sm:block">
            <NavBtn href="/">Levi Hanlen</NavBtn>
          </div>
          <button
            className="lh-btn-secondary lh-icon-size sm:hidden"
            onClick={toggleMenu}
          >
            <HiMiniBars3 />
          </button>
        </div>
        <div
          className={`flex-col items-end gap-2 sm:flex-row sm:flex sm:items-center ${
            menuOpen ? "flex" : "hidden"
          }`}
        >
          <div className="sm:hidden block">
            <NavBtn href="/">Home</NavBtn>
          </div>

          <NavBtn href="/guides">Guides</NavBtn>
          {hasRight && (
            <button
              className="lh-btn-secondary lh-icon-size lg:hidden"
              onClick={onToggleRight}
            >
              R
            </button>
          )}
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
    <Link href={href} className="lh-link">
      {children}
    </Link>
  );
}

export function PageLayout({
  children,
  className,
  left,
  right,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}) {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <div
      className={`flex min-h-full w-full flex-col justify-start ${className} `}
      {...props}
    >
      <Navbar
        hasLeft={!!left}
        hasRight={!!right}
        onToggleLeft={() => setLeftOpen(!leftOpen)}
        onToggleRight={() => setRightOpen(!rightOpen)}
      />
      <main className="flex h-full w-full flex-row justify-center gap-8 pt-16">
        {left && (
          <>
            <aside className="hidden lg:flex flex-shrink-0 w-64 fixed left-4 top-16 bottom-0 overflow-y-auto">
              {left}
            </aside>
            {leftOpen && (
              <>
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                  onClick={() => setLeftOpen(false)}
                />
                <aside className="fixed left-0 top-16 bottom-0 w-64 bg-lightest z-50 overflow-y-auto p-4 lg:hidden">
                  {left}
                </aside>
              </>
            )}
          </>
        )}
        <div className="flex flex-col items-center w-full max-w-lg flex-grow gap-8 px-4 lg:px-0 lg:mx-64">
          {children}
          <Footer />
        </div>
        {right && (
          <>
            <aside className="hidden lg:flex flex-shrink-0 w-64 fixed right-4 top-16 bottom-0 overflow-y-auto">
              {right}
            </aside>
            {rightOpen && (
              <>
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                  onClick={() => setRightOpen(false)}
                />
                <aside className="fixed right-0 top-16 bottom-0 w-64 bg-lightest z-50 overflow-y-auto p-4 lg:hidden">
                  {right}
                </aside>
              </>
            )}
          </>
        )}
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
        <div className="flex w-full justify-between ">
          <div className="w-auto flex flex-col space-y-1">
            {/* <div className="lh-bold text-darkest">My social links</div> */}
            <ALink href="https://www.instagram.com/levihanlen/">
              Instagram
            </ALink>
            <ALink href="https://x.com/LeviHanlen">Twitter (X)</ALink>
            <ALink href="https://github.com/levihanlen">Github</ALink>
          </div>
          <div className=" flex flex-col space-y-1 text-right">
            {/* <div className="lh-bold text-darkest ">Levi Hanlen</div> */}
            <ALink href="/">Home</ALink>
            <ALink href="/guides">Guides</ALink>
            <ALink href="/blog">Essays</ALink>
          </div>
        </div>
      </div>
    </footer>
  );
}

// export function Article({
//   children,
//   className,
//   right,
// }: {
//   children: React.ReactNode;
//   className?: string;
//   right?: React.ReactNode;
// }) {
//   return (
//     <div className="flex w-full flex-row justify-center">
//       <article
//         className={`${ebGaramond.className} lh-prose-editor text-dark text-base sm:text-lg max-w-full flex-grow-0 self-center sm:px-0 lh-ml md:min-w-[576px] md:self-start ${className}`}
//       >
//         {children}
//       </article>
//       <div className="sticky top-14 hidden w-full flex-grow self-start p-4 md:flex  lh-pr">
//         <div className="flex w-full flex-col items-end ">{right}</div>
//       </div>
//     </div>
//   );
// }

export function Article({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`${ebGaramond.className} text-base sm:text-lg lh-prose-editor text-dark ${className}`}
    >
      {children}
    </div>
  );
}
