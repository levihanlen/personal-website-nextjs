import { Avatar } from "./Primitives";

export function AuthorSection({ className }: { className?: string }) {
  return (
    <div
      className={`flex w-full max-w-xs my-16 flex-col items-center justify-center space-y-2 ${className}`}
    >
      <Avatar src="/barcelona.jpeg" size={84} />
      <p className="text-pretty text-center text-dark">
        All content here is researched and created by me, Levi Hanlen
      </p>
      <div className="flex flex-row gap-4">
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
    <a href={href} className="flex flex-row gap-1 items-center">
      <div className="lh-link">{title} </div>
      {/* <HiMiniArrowTopRightOnSquare className="lh-icon-size text-dark" /> */}
    </a>
  );
}
