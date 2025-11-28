"use client";

import Image from "next/image";
import { twJoin } from "tailwind-merge";

export default function GalleryCard({
  img,
  caption,
  onClick,
  className = "",
  ...props
}) {
  return (
    <div
      className={twJoin(
        `group relative mb-4 break-inside-avoid rounded-2xl overflow-hidden cursor-pointer
        bg-neutral-900/20 backdrop-blur-sm
        transition-all duration-300 ease-out
        hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        hover:scale-[1.02]`,
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div className="w-full relative">
        {img?.src ? (
          <Image
            src={img.src}
            alt={caption || "Art Gallery Image"}
            width={img.width}
            height={img.height}
            placeholder={img.placeholder}
            blurDataURL={img.blurDataURL}
            className="w-full h-auto object-cover block"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ width: '100%', height: 'auto' }}
          />
        ) : (
          <div className="w-full aspect-square bg-neutral-800/50 flex items-center justify-center">
            <p className="text-white/50">No Image</p>
          </div>
        )}

        {/* Overlay Gradient - Pinterest style: subtle dark gradient on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content Overlay */}
        {caption && (
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white font-medium text-sm md:text-base line-clamp-2 drop-shadow-md">
              {caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
