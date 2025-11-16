"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FloatingTrees() {
  const treesRef = useRef(null);

  useEffect(() => {
    const trees = treesRef.current?.querySelectorAll(".floating-tree");
    if (!trees) return;

    trees.forEach((tree, index) => {
      // Random initial position
      gsap.set(tree, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: 0.5 + Math.random() * 0.5,
        opacity: 0.1 + Math.random() * 0.3,
      });

      // Floating animation
      gsap.to(tree, {
        y: `+=${50 + Math.random() * 100}`,
        x: `+=${(Math.random() - 0.5) * 50}`,
        duration: 10 + Math.random() * 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.5,
      });

      // Rotation animation
      gsap.to(tree, {
        rotation: `+=${(Math.random() - 0.5) * 20}`,
        duration: 15 + Math.random() * 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Parallax on scroll
      gsap.to(tree, {
        y: `+=${100 + index * 50}`,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: 1 + index * 0.5,
        },
      });
    });
  }, []);

  return (
    <div ref={treesRef} className="fixed inset-0 pointer-events-none -z-5 overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="floating-tree absolute">
          <svg
            viewBox="0 0 100 150"
            className="w-32 h-48 text-primary opacity-20"
            style={{
              filter: "blur(2px)",
            }}
          >
            {/* Tree trunk */}
            <rect x="45" y="100" width="10" height="50" fill="currentColor" className="opacity-60" />
            
            {/* Tree layers */}
            <path
              d="M50,100 L30,120 L70,120 Z"
              fill="currentColor"
              className="opacity-80"
            />
            <path
              d="M50,80 L25,105 L75,105 Z"
              fill="currentColor"
              className="opacity-80"
            />
            <path
              d="M50,60 L20,90 L80,90 Z"
              fill="currentColor"
              className="opacity-80"
            />
            <path
              d="M50,40 L15,75 L85,75 Z"
              fill="currentColor"
              className="opacity-80"
            />
            <path
              d="M50,20 L10,60 L90,60 Z"
              fill="currentColor"
              className="opacity-80"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
