import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";
import { Avatar } from "./Primitives";

export function AuthorSection({ className }: { className?: string }) {
  return (
    <div
      className={`align-center mt-24 flex w-full max-w-sm flex-col items-center justify-center space-y-2 px-8 ${className}`}
    >
      <Avatar src="/mePicture.png" size={84} />
      <p className="text-pretty text-center text-dark">
        All guides are researched and created by me, Levi Hanlen.
      </p>
      <div className="flex">
        <AuthorSectionLink href="https://x.com/LeviHanlen" title="Twitter" />
        <AuthorSectionLink
          href="https://www.instagram.com/levihanlen/"
          title="Instagram"
        />
      </div>
    </div>
  );
}

function AuthorSectionLink({ href, title }: { href: string; title: string }) {
  return (
    <a
      href={href}
      className="text-dark flex gap-1 items-center flex-row underline border-r-pt border-r-light px-4 last-of-type:border-r-0 hover:text-darkest"
    >
      <div>{title} </div>
      <HiMiniArrowTopRightOnSquare className="lh-icon-size text-dark" />
    </a>
  );
}
