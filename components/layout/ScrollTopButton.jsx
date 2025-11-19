"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

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
      className={`bg-secondary text-primary fixed bottom-6 right-6 p-3 rounded-full shadow-lg 
      transition-all duration-300 hover:scale-120 border-primary border-1
      ${visible ? "opacity-100 scale-100" : "opacity-0 scale-0"}
      `}
    >
      <FaArrowUp size={16} />
    </button>
  );
}
