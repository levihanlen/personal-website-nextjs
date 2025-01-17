"use client";

import Image from "next/image";

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

export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full lh-fg bg-medium">
      <div className="h-full bg-darkest" style={{ width: percent + "%" }}></div>
    </div>
  );
}
