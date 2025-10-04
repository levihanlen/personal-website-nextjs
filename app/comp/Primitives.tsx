"use client";

import Image from "next/image";
import { HiMiniCheck } from "react-icons/hi2";

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

export function RadioCircle({ checked }: { checked: boolean }) {
  /*

    <div
      className={`w-4 h-4 rounded-full border-pt border-light ${
        checked ? "bg-darkest" : "bg-transparent"
      }`}
    />
  */
  return (
    <div
      className={`${
        checked
          ? "border-0 bg-gradient-to-b from-darkest to-darkest"
          : "transparent lh-border"
      } flex shrink-0 h-4 w-4 items-center justify-center rounded-full border-pt `}
    >
      {checked && <HiMiniCheck className="text-lightest lh-icon-size" />}
    </div>
  );
}

export function InnerIconBtn({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <span className="lh-icon-size shrink-0">{icon}</span>
      {children}
    </div>
  );
}
