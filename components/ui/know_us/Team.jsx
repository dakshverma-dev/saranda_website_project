"use client";

import Image from "next/image";
import Link from "next/link";
import { twJoin } from "tailwind-merge";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

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
        <div className="pt-3 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-1 group-hover:translate-y-0">
          {member.email && (
            <SociaLinkIcon Icon={IoMdMail} href={"mailto:" + member.email} aria-label="GitHub"/>
          )}
          {member.github && (
            <SociaLinkIcon Icon={FaGithub} href={member.github} aria-label="GitHub"/>
          )}
          {member.linkedin && (
            <SociaLinkIcon Icon={FaLinkedin} href={member.linkedin} aria-label="LinkedIn"/>
          )}
          {member.instagram && (
            <SociaLinkIcon Icon={FaInstagram} href={member.instagram} aria-label="Instagram"/>
          )}
        </div>
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


function SociaLinkIcon({Icon, ...props}) {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-full bg-primary/20 hover:bg-primary/40 border border-primary/30 hover:border-secondary/60 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md"
      {...props}
    >
      <Icon size={24}/>
    </Link>
  )
}