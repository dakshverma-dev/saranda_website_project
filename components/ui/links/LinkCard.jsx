"use client";


import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

export default function LinkCard({ card }) {
  const { title, description, externalUrl, image } = card;

  return (
    <a
      href={externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-5 p-6 bg-neutral-light/95 border border-primary/15 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-secondary/60 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
    >
      {/* Circle Image */}
      <div className="relative shrink-0 w-20 h-20 rounded-full overflow-hidden bg-primary-darker/10 border-2 border-primary/20 group-hover:border-secondary/50 transition-all duration-300">
        {image && (
          <Image
            src={urlFor(image).cropped.src || "https://placehold.co/png"}
            alt={title || "Card image"}
            fill
            sizes="80px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-primary-darker mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-neutral-dark-lighter line-clamp-2 mb-3">
            {description}
          </p>
        )}
      </div>
    </a>
  );
}