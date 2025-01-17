"use client";

import {
  FaEnvelope,
  FaFacebook,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

export function ShareBtns() {
  return (
    <>
      <div className="text-xs font-semibold tracking-widest text-dark">
        SHARE
      </div>
      <div className="flex w-full max-w-40 gap-2 flex-row items-center justify-between">
        <SocialShare />
      </div>
    </>
  );
}

export function SocialShare() {
  // Ensure URL is encoded properly
  /*
  const encodedUrl = encodeURIComponent(
    url || typeof window !== "undefined" ? window.location.href : ""
  );
  */

  const url = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(
    typeof window !== "undefined" ? window.location.href : ""
  );

  const summary = "Thought you might like this";
  const encodedTitle = encodeURIComponent("Cool article");
  const encodedSummary = encodeURIComponent(summary);

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/share?url=${encodedUrl}&text=${encodedTitle}`;
    window.open(twitterUrl, "_blank", "width=600,height=400,left=200,top=200");
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer.php?u=${encodedUrl}`;
    window.open(facebookUrl, "_blank", "width=600,height=400,left=200,top=200");
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}`;
    window.open(linkedInUrl, "_blank", "width=600,height=400,left=200,top=200");
  };

  const shareViaEmail = () => {
    const body = encodeURIComponent(`Thought you might like this: ${url}`);
    const mailtoUrl = `mailto:?subject=${encodedTitle}&body=${body}`;
    window.open(mailtoUrl, "_self");
  };

  return (
    <>
      <ShareButton onClick={shareOnTwitter}>
        <FaXTwitter />
      </ShareButton>
      <ShareButton onClick={shareOnFacebook}>
        <FaFacebook />
      </ShareButton>
      <ShareButton onClick={shareOnLinkedIn}>
        <FaLinkedin />
      </ShareButton>
      <ShareButton onClick={shareViaEmail}>
        <FaEnvelope />
      </ShareButton>
    </>
  );
}

export function ShareButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`h-full w-1/4 text-dark lh-interactive text-xl ${
        className || ""
      }`}
    >
      {children}
    </button>
  );
}
