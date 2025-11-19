"use client";

import { useEffect, useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import Link from "next/link";
import { twJoin } from "tailwind-merge";

export default function AddArtFloatingButton({href, className, ...props}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 250);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link
      href={href}
      className={twJoin(
        `fixed bottom-[8vh] right-[8vw] bg-secondary text-primary p-[1.2rem]
        rounded-full shadow-lg duration-200 hover:scale-120 border z-10
        border-t-secondary-ligher border-l-secondary-ligher
        border-b-secondary-darker border-r-secondary-darker`,
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none",
        className
      )}
      {...props}
      target="blank"
    >
      <RiImageAddFill size={32} />
    </Link>
  );
}
