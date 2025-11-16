"use client";

import Image from "next/image";
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
      {/* Main container with forest-inspired design */}
      <div className="relative bg-gradient-to-br from-neutral-dark-glass via-primary-darker/40 to-neutral-dark-glass backdrop-blur-xl rounded-3xl overflow-hidden border-2 border-primary/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
        
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(46,125,50,0.1)_0%,transparent_50%)]" />
        </div>

        {/* Top decorative border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        
        {/* Title section with 3D effect */}
        <div 
          ref={titleRef}
          className="relative p-8 pb-6 text-center"
        >
          <h3 className="text-secondary-ligher">
            {team.name}
          </h3>
          
          <div className="mt-2 flex justify-center gap-2">
            {[...Array(memberCount)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-primary-lighter/40" />
            ))}
          </div>
        </div>

        {/* Members grid */}
        <div className={twJoin(
          `relative p-6 pt-2 grid gap-6`,
          gridCols
        )}>
          {team.members?.map((member, index) => (
            <Member member={member} key={member._key} index={index} />
          ))}
        </div>

        {/* Bottom decorative border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
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
        `bg-gradient-to-br from-neutral-light/95 via-neutral-light-lighter/90 to-neutral-light/95`,
        `rounded-2xl overflow-hidden text-center`,
        `border-2 border-primary/20 hover:border-secondary/50`,
        `shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.5)]`,
        `transition-all duration-300 hover:scale-105`,
        className
      )}
      {...props}
    >
      {/* Image container with mask effect */}
      <div className="relative w-full aspect-square overflow-hidden bg-primary-darker/10">
        <Image
          {...member.img}
          alt={member.fullname}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 30vw, 20vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-darker/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Member info */}
      <div className="relative p-4 bg-gradient-to-b from-transparent to-primary/5">
        <p className="font-bold text-primary-darker mb-1 group-hover:text-primary transition-colors">
          {member.fullname}
        </p>
        {member.position && (
          <p className="text-sm text-neutral-dark-lighter">
            [{member.position}]
          </p>
        )}
      </div>

      {/* Corner accents */}
      <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-secondary/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-secondary/30 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-transparent group-hover:via-white/10 transition-all duration-700 pointer-events-none transform -translate-x-full group-hover:translate-x-full" />
    </div>
  );
}