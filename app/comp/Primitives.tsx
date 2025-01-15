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

export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full lh-fg bg-medium">
      <div className="h-full bg-darkest" style={{ width: percent + "%" }}></div>
    </div>
  );
}
