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
        className="relative z-10 text-center mb-16"
      >
        <div className="inline-block">
          <h2 className="text-primary mb-6">
            {team.name}
          </h2>
          <div className="h-1 w-32 bg-linear-to-r from-transparent via-secondary/70 to-transparent mx-auto" />
        </div>
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
        `bg-primary-darker/80`,
        `backdrop-blur-xl rounded-3xl overflow-hidden`,
        `border border-primary/40 hover:border-secondary/70`,
        `shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.6)]`,
        `transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2`,
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
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        />
        
        <GradientOverlay />
        <PremiumGlowEffect />
        <ShineOverlay />
      </div>

      <MemberInfo member={member} />
      <PremiumCornerAccents />
    </div>
  );
}


function GradientOverlay() {
  return <>
    <div className="absolute inset-0 bg-linear-to-t from-primary-darker/90 via-primary-darker/30 to-transparent" />
    <div className="absolute inset-0 bg-linear-to-br from-secondary/5 to-transparent mix-blend-overlay" />
  </>
}


function PremiumGlowEffect() {
  return <>
    <div className="absolute inset-0 bg-linear-to-t from-secondary/0 via-secondary/0 to-secondary/0 group-hover:from-secondary/10 group-hover:via-secondary/5 transition-all duration-500" />
  </>
}


function ShineOverlay() {
  return <>
    <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/0 group-hover:via-white/5 to-transparent transition-all duration-700 opacity-0 group-hover:opacity-100" />
  </>
}


function SocialMediaIcons({member}) {
  return <>
    {(member.github || member.linkedin || member.instagram) && (
      <div className="pt-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
        {member.github && (
          <Link
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-primary/40 hover:bg-primary/60 border border-primary-lighter/40 hover:border-secondary/60 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20 backdrop-blur-sm"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5 text-neutral-light" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </Link>
        )}
        {member.linkedin && (
          <Link
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-primary/40 hover:bg-primary/60 border border-primary-lighter/40 hover:border-secondary/60 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20 backdrop-blur-sm"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5 text-neutral-light" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </Link>
        )}
        {member.instagram && (
          <Link
            href={member.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-primary/40 hover:bg-primary/60 border border-primary-lighter/40 hover:border-secondary/60 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20 backdrop-blur-sm"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5 text-neutral-light" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </Link>
        )}
      </div>
    )}
  </>
}


function MemberInfo({member}) {
  return <>
    <div className="relative z-30 p-8 text-center text-neutral-light bg-linear-to-t from-primary-darker/80 to-transparent">
      <div className="space-y-3">
        <h3 className="text-secondary-ligher group-hover:text-secondary transition-colors duration-300 text-2xl">
          {member.fullname}
        </h3>
        <div className="w-12 h-px bg-linear-to-r from-transparent via-primary-lighter/50 to-transparent mx-auto" />
        <p className="text-primary-lighter/90 text-base tracking-wide">
          {member.position}
        </p>
        
        <SocialMediaIcons member={member}/>
      </div>
    </div>
  </>
}


function PremiumCornerAccents() {
  return <>
    <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div className="absolute top-4 right-4 w-8 h-px bg-linear-to-l from-secondary/60 to-transparent" />
      <div className="absolute top-4 right-4 w-px h-8 bg-linear-to-t from-secondary/60 to-transparent" />
    </div>
    <div className="absolute bottom-0 left-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div className="absolute bottom-4 left-4 w-8 h-px bg-linear-to-r from-secondary/60 to-transparent" />
      <div className="absolute bottom-4 left-4 w-px h-8 bg-linear-to-b from-secondary/60 to-transparent" />
    </div>
  </>
}