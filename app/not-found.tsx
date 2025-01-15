"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { PrimaryBtn } from "./comp/Primitives";

export default function NotFound() {
  const [image, setImage] = useState("");

  useEffect(() => {
    const num = Math.ceil(Math.random() * 5);

    setImage(`/lost${num}.webp`);
  }, []);
  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div className="space-y-6 flex-col flex items-center">
        <Image
          src={image}
          alt="A funny meme of a lost person"
          width="500"
          height="500"
          className="w-2/3 rounded-xl aspect-square object-cover grayscale bg-light"
        />
        <h2 className="text-8xl font-semibold">404</h2>
        <p className="text-xl text-dark">
          Oops! I couldn&apos;t find that page for you.
        </p>
        <Link href="/">
          <PrimaryBtn>Return Home</PrimaryBtn>
        </Link>
      </div>
    </div>
  );
}
