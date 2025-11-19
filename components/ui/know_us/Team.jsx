"use client";

import Image from "next/image";
import Link from "next/link";
import { twJoin } from "tailwind-merge";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function Team({ team, className = "", ...props }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    
    if (!section || !title) return;

    // Title entrance animation
    gsap.fromTo(
      title,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      }
    );

    // Section entrance
    gsap.fromTo(
      section,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true,
        },
      }
    );

    // Animate member cards
    const cards = section.querySelectorAll(".member-card");
    gsap.fromTo(
      cards,
      { 
        y: 30, 
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      }
    );

  }, []);

  // Determine grid layout based on member count
  const memberCount = team.members?.length || 0;
  const isLHC = memberCount === 8;
  const isWebops = memberCount === 6;
  
  const gridCols = isLHC 
    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" 
    : isWebops 
    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"
    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  return (
    <section
      ref={sectionRef}
      className={twJoin(
        `relative w-11/12 max-w-7xl mx-auto mb-24`,
        className
      )}
      {...props}
    >
      {/* Main container with premium design */}
      <div className="relative bg-primary-darker/75 backdrop-blur-xl rounded-3xl overflow-hidden border border-primary/35 shadow-[0_25px_70px_rgba(0,0,0,0.5)]">
        
        {/* Premium background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(46,125,50,0.15)_0%,transparent_60%)]" />
        </div>

        {/* Top accent border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-secondary/60 to-transparent" />
        
        {/* Title section with 3D effect */}
        <div 
          ref={titleRef}
          className="relative p-10 pb-6 text-center"
        >
          <div className="inline-block">
            <h3 className="text-secondary-ligher mb-3">
              {team.name}
            </h3>
            <div className="h-px bg-linear-to-r from-transparent via-secondary/50 to-transparent" />
          </div>
          
          <div className="mt-6 flex justify-center gap-2">
            {[...Array(memberCount)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary-lighter/50 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>

        {/* Members grid */}
        <div className={twJoin(
          `relative p-6 pt-2 grid gap-6 pb-[10rem]`,
          gridCols
        )}>
          {team.members?.map((member, index) => (
            <Member member={member} key={member._key} index={index} />
          ))}
        </div>

        {/* Bottom accent border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
      </div>
    </section>
  );
}

function Member({ member, index, className = "", ...props }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Lightweight floating animation
    gsap.to(card, {
      y: "+=5",
      duration: 2.5 + (index % 3) * 0.3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.1,
    });

  }, [index]);

  return (
    <div
      ref={cardRef}
      className={twJoin(
        `member-card group relative flex flex-col cursor-pointer`,
        `bg-linear-to-br from-neutral-light/98 via-neutral-light-lighter/95 to-neutral-light/98`,
        `rounded-2xl overflow-hidden text-center`,
        `border border-primary/15 hover:border-secondary/60`,
        `shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]`,
        `transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1`,
        className
      )}
      {...props}
    >
      {/* Image container with professional effects */}
      <div className="relative w-full aspect-square overflow-hidden bg-primary-darker/5">
        <Image
          {...member.img}
          alt={member.fullname}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 30vw, 20vw"
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
        />
        
        {/* Professional gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-primary-darker/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Subtle shine effect */}
        <div className="absolute inset-0 bg-linear-to-br from-transparent via-white/0 to-transparent group-hover:via-white/10 transition-all duration-700" />
      </div>

      {/* Member info */}
      <div className="relative p-5 bg-linear-to-b from-neutral-light to-neutral-light-lighter">
        <p className="font-semibold text-primary-darker text-base mb-2 group-hover:text-primary transition-colors duration-300">
          {member.fullname}
        </p>
        {member.position && (
          <div className="space-y-1">
            <div className="w-8 h-px bg-linear-to-r from-primary/40 to-transparent mx-auto" />
            <p className="text-xs text-neutral-dark-lighter tracking-wide uppercase">
              {member.position}
            </p>
          </div>
        )}
        
        {/* Social Media Icons */}
        {(member.github || member.linkedin || member.instagram) && (
          <div className="pt-3 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-1 group-hover:translate-y-0">
            {member.github && (
              <Link
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-primary/20 hover:bg-primary/40 border border-primary/30 hover:border-secondary/60 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 text-primary-darker" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
            )}
            {member.linkedin && (
              <Link
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-primary/20 hover:bg-primary/40 border border-primary/30 hover:border-secondary/60 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 text-primary-darker" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
            )}
            {member.instagram && (
              <Link
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-primary/20 hover:bg-primary/40 border border-primary/30 hover:border-secondary/60 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 text-primary-darker" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Premium corner accents */}
      <div className="absolute top-3 right-3 w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="absolute top-0 right-0 w-4 h-px bg-linear-to-l from-secondary/50 to-transparent" />
        <div className="absolute top-0 right-0 w-px h-4 bg-linear-to-t from-secondary/50 to-transparent" />
      </div>
      <div className="absolute bottom-3 left-3 w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="absolute bottom-0 left-0 w-4 h-px bg-linear-to-r from-secondary/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-px h-4 bg-linear-to-b from-secondary/50 to-transparent" />
      </div>
    </div>
  );
}