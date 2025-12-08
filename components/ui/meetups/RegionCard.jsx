"use client";

import Link from "next/link";
import Image from "next/image";

export default function RegionCard({ region, imageSrc, isLast, isHovered, onHover, onLeave }) {
  const shouldBeGrayscale = isHovered !== null && isHovered !== region;

  return (
    <Link 
      href={`/meetups/${region.toLowerCase()}`}
      className={`
        relative overflow-hidden rounded-lg h-64 group
        transition-all duration-300 ease-in-out
        ${isLast ? 'col-span-2 md:col-span-1' : ''}
        ${shouldBeGrayscale ? 'grayscale' : 'grayscale-0'}
      `}
      onMouseEnter={() => onHover(region)}
      onMouseLeave={onLeave}
    >
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={`${region} region`}
          fill
          placeholder="blur"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
      
      {/* Region Name */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-neutral-light text-2xl md:text-3xl capitalize font-bold">
          {region}
        </h3>
        <p className="text-neutral-light-lighter text-sm md:text-base mt-1 opacity-90">
          View past meetups
        </p>
      </div>
    </Link>
  );
}
