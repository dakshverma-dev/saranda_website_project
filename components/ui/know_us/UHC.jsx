"use client";

import Image from "next/image";
import Link from "next/link";
import { twJoin } from "tailwind-merge";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function UHC({ team, className = "", ...props }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    
    if (!section || !title) return;

    // Title animation
    gsap.fromTo(
      title,
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      }
    );

    // Members animation
    const members = section.querySelectorAll(".uhc-member");
    gsap.fromTo(
      members,
      { 
        y: 50, 
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          once: true,
        },
      }
    );

  }, []);

  return (
    <section
      ref={sectionRef}
      className={twJoin(
        `relative flex flex-col justify-center items-center min-h-screen py-20`,
        className
      )}
      {...props}
    >
      <div 
        ref={titleRef}
        className="relative z-10 mb-12 text-center"
      >
        <h2 className="text-primary-lighter">
          {team.name}
        </h2>
      </div>

      <div className="relative w-11/12 max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 px-4">
        {team?.members?.map((member, index) => (
          <Member member={member} key={member._key} index={index} />
        ))}
      </div>
    </section>
  );
}

function Member({ member, index, className = "", ...props }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Subtle floating animation
    gsap.to(card, {
      y: "+=10",
      duration: 3 + index * 0.3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.2,
    });
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={twJoin(
        `uhc-member relative group cursor-pointer`,
        `bg-gradient-to-br from-primary-darker/90 via-neutral-dark/90 to-primary-darker/80`,
        `backdrop-blur-md rounded-3xl overflow-hidden`,
        `border-2 border-primary/40 hover:border-secondary/60`,
        `shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.7)]`,
        `transition-all duration-300 hover:scale-105`,
        className
      )}
      {...props}
    >
      {/* Member image */}
      <div className="relative h-96 overflow-hidden">
        <Image
          {...member.img}
          alt={member.fullname}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-darker via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent mix-blend-overlay" />
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/10 transition-colors duration-500" />
      </div>

      {/* Member info */}
      <div className="relative z-30 p-6 text-center text-neutral-light">
        <div className="space-y-2">
          <h3 className="text-secondary-ligher group-hover:text-secondary transition-colors">
            {member.fullname}
          </h3>
          <p className="text-primary-lighter">
            {member.position}
          </p>
          
          {member.email && (
            <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link
                href={`mailto:${member.email}`}
                target="_blank"
                className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full 
                  bg-primary/30 hover:bg-primary/50 border border-primary-lighter/50 
                  transition-all duration-300 hover:scale-105"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-secondary/40 rounded-tr-3xl" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-secondary/40 rounded-bl-3xl" />
    </div>
  );
}