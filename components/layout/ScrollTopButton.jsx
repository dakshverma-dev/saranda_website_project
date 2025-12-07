"use client";

import { useEffect, useState } from "react";

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`group fixed bottom-6 right-6 w-28 h-28
        flex items-center justify-center bg-transparent border-none
        transition-all duration-300 hover:scale-110 active:scale-110
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
    >
      <div className="relative w-28 h-28">
        
        <img
          src="/images/alwaystree.png"
          alt="normal leaf"
          className="absolute inset-0 w-full h-full object-contain 
                     transition-opacity duration-500 
                     group-hover:opacity-0 group-active:opacity-0"
        />

        
        <img
          src="/images/hovereffect.png"
          alt="hover leaf"
          className="absolute inset-0 w-full h-full object-contain 
                     opacity-0 scale-95 transition-all duration-500 
                     group-hover:opacity-100 group-hover:scale-105 
                     group-active:opacity-100 group-active:scale-105"
        />
      </div>
    </button>
  );
}
