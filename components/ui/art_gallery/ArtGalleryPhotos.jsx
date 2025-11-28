"use client";

import { useState, useRef } from "react";
import PhotoOverlay from "../PhotoOverlay";
import { twJoin } from "tailwind-merge";
import GalleryCard from "./GalleryCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function ArtGalleryPhotos({
  pictures,
  className = "",
  children,
  ...props
}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".gallery-card", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });
  }, { scope: containerRef });

  return <>
    {(!pictures?.img || pictures?.img?.length === 0) && (
      <p className="text-center my-[2rem] font-medium text-white/60 text-xl">
        No Art for now :(
      </p>
    )}

    {pictures?.img && pictures.img.length > 0 && (
      <>
        <div
          ref={containerRef}
          className={twJoin(
            `w-full md:w-9/10 max-w-[90rem] mx-auto p-[1rem]
            mb-[2rem] pb-[4rem] columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6`,
            className
          )}
          {...props}
        >
          {children}
          {pictures.img.map((img, index) => (
            <GalleryCard
              key={index}
              img={img}
              caption={pictures.images?.[index]?.caption}
              onClick={() => setSelectedIndex(index)}
              className="gallery-card"
            />
          ))}
        </div>

        <PhotoOverlay
          pictures={pictures.img}
          captions={pictures.images?.map(p => p?.caption) || []}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </>
    )}
  </>
}