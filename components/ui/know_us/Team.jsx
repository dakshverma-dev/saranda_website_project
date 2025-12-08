"use client";

import Image from "next/image";
import Link from "next/link";
import { twJoin } from "tailwind-merge";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLinkedin, FaInstagram, FaGithub, FaFacebook, FaYoutube } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";
import { IoMdMail } from "react-icons/io";

gsap.registerPlugin(ScrollTrigger);

const socialMediaIcons = {
  'github': FaGithub,
  'linkedin': FaLinkedin,
  'instagram': FaInstagram,
  'youtube': FaYoutube,
  'facebook': FaFacebook,
  'other': TbWorldWww,
}


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
  const organicTheme = isLHC
    ? { base: "#4a3f35", moss: "#2d5016", accent: "#f8e41a" }
    : isWebops
    ? { base: "#2d5016", moss: "#1a4d2e", accent: "#f8e41a" }
    : null;
  
  const gridCols = isLHC 
    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" 
    : isWebops 
    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"
    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  return (
    <section
      ref={sectionRef}
      className={twJoin(
        `relative w-full md:w-11/12 max-w-7xl mx-auto mb-12 md:mb-24 px-4 md:px-0`,
        className
      )}
      {...props}
    >
      {/* Forest-themed container */}
      <div className="relative bg-gradient-to-br from-[#1a4d2e]/85 via-[#2d5016]/80 to-[#1a3825]/90 backdrop-blur-xl rounded-2xl md:rounded-3xl overflow-hidden border border-[#2d5016]/50 shadow-[0_18px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(26,77,46,0.25)] md:shadow-[0_30px_80px_rgba(0,0,0,0.65),0_0_60px_rgba(26,77,46,0.28)]">
        {organicTheme && <OrganicSectionFrame theme={organicTheme} />}
        
        {/* Organic forest patterns */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(248,228,26,0.1)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(74,80,54,0.18)_0%,transparent_55%)]" />
          <div className="absolute inset-0 bg-[conic-gradient(from_45deg_at_50%_50%,rgba(58,94,64,0.12),rgba(58,94,64,0.04),rgba(58,94,64,0.12))] mix-blend-overlay" />
        </div>

        {/* Ambient glow accents */}
        <div className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 bg-[#f8e41a]/10 rounded-full blur-2xl md:blur-3xl" />
        <div className="absolute bottom-0 left-0 w-36 h-36 md:w-48 md:h-48 bg-[#2d5016]/25 rounded-full blur-2xl md:blur-3xl" />
        <div className="absolute -bottom-6 right-12 w-44 h-20 bg-[radial-gradient(ellipse_at_center,rgba(106,139,85,0.3),transparent_60%)] blur-3xl" />

        {/* Top nature border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/70 to-transparent" />
        
        {/* Title section with forest essence */}
        <div 
          ref={titleRef}
          className="relative p-6 md:p-10 pb-4 md:pb-6 text-center"
        >
          <div className="inline-block relative">
            {/* Subtle glow */}
            <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-primary/15 via-secondary/20 to-primary/15 blur-xl md:blur-2xl opacity-50" />
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[#f8e41a] drop-shadow-[0_0_8px_rgba(248,228,26,0.35)]">
              <svg width="64" height="20" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 22c18-10 36-12 54-4s36 6 54-4" stroke="#f8e41a" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
                <path d="M18 18c4-6 10-10 16-12" stroke="#2d5016" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
                <path d="M94 18c-4-6-10-10-16-12" stroke="#2d5016" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
              </svg>
            </div>
            
            <h3 className="text-secondary-ligher mb-3 md:mb-4 relative drop-shadow-[0_0_10px_rgba(139,195,74,0.4)] md:drop-shadow-[0_0_15px_rgba(139,195,74,0.4)] text-2xl md:text-3xl lg:text-4xl">
              {team.name}
            </h3>
            
            {/* Organic divider with dots */}
            <div className="flex items-center justify-center gap-1.5 md:gap-2">
              <div className="w-10 md:w-12 h-px bg-gradient-to-r from-transparent to-secondary/60" />
              {[...Array(Math.min(memberCount, 5))].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1.5 h-1.5 rounded-full bg-secondary/70 animate-pulse shadow-[0_0_6px_rgba(139,195,74,0.5)]" 
                  style={{ animationDelay: `${i * 0.3}s` }} 
                />
              ))}
              <div className="w-10 md:w-12 h-px bg-gradient-to-l from-transparent to-secondary/60" />
            </div>
          </div>
        </div>

        {/* Members grid */}
        <div className={twJoin(
          `relative p-4 md:p-6 pt-2 grid gap-4 md:gap-6 pb-[8rem] md:pb-[10rem]`,
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
        `bg-[linear-gradient(135deg,#f6f1e4_0%,#f1e8d8_45%,#e8ddc9_100%)]`,
        `rounded-xl md:rounded-2xl overflow-hidden text-center`,
        `border border-[#2d5016]/20 hover:border-[#f8e41a]/70`,
        `shadow-[0_8px_25px_rgba(0,0,0,0.35),0_0_0_1px_rgba(248,228,26,0.08)] md:shadow-[0_12px_35px_rgba(0,0,0,0.4),0_0_0_1px_rgba(248,228,26,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(248,228,26,0.25)] md:hover:shadow-[0_25px_50px_rgba(0,0,0,0.6),0_0_25px_rgba(248,228,26,0.25)]`,
        `transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 md:hover:scale-[1.04] md:hover:-translate-y-2`,
        className
      )}
      {...props}
    >
      {/* Image container with professional effects */}
      <div className="relative w-full aspect-[3/4] md:aspect-square overflow-hidden bg-primary-darker/5">
        <Image
          {...member.img.cropped}
          alt={member.fullname}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 30vw, 20vw"
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
        />
        
        {/* Professional gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-primary-darker/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Subtle shine effect */}
        <div className="absolute inset-0 bg-linear-to-br from-transparent via-white/0 to-transparent group-hover:via-white/10 transition-all duration-700" />
        {/* Mossy edges */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-2 left-0 w-full h-6 bg-[radial-gradient(circle_at_50%_50%,rgba(74,80,54,0.25),transparent_60%)] blur-xl opacity-70" />
          <div className="absolute -bottom-2 right-0 w-full h-6 bg-[radial-gradient(circle_at_50%_50%,rgba(45,80,22,0.2),transparent_60%)] blur-xl opacity-60" />
        </div>
      </div>

      {/* Member info */}
      <div className="relative p-2.5 md:p-5 bg-linear-to-b from-neutral-light to-neutral-light-lighter">
        <p className="font-semibold text-primary-darker text-sm md:text-base mb-1 md:mb-2 group-hover:text-primary transition-colors duration-300">
          {member.fullname}
        </p>
        {member.position && (
          <div className="space-y-1">
            <div className="w-6 md:w-8 h-px bg-linear-to-r from-primary/40 to-transparent mx-auto" />
            <p className="text-[10px] md:text-xs text-neutral-dark-lighter tracking-wide uppercase">
              {member.position}
            </p>
          </div>
        )}
        
        {/* Social Media Icons */}
        <div className="pt-2 md:pt-3 flex justify-center gap-1.5 md:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-1 group-hover:translate-y-0">
          {member.email && member.visiblemail && (
            <SocialLinkIcon Icon={IoMdMail} aria-label="Email" href={"mailto:" + member.email}/>
          )}
          {member.socials?.map(({socialMedia, url, _key}) => (
            <SocialLinkIcon
              key={_key}
              Icon={socialMediaIcons[socialMedia]}
              aria-label="GitHub"
              href={url}
            />
          ))}
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


function SocialLinkIcon({Icon, ...props}) {
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

function OrganicSectionFrame({ theme }) {
  return (
    <>
      {/* Soft bark arcs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-10 left-4 right-4 h-20 rounded-[999px] blur-2xl"
          style={{ background: `radial-gradient(circle at 50% 50%, ${theme.base}55, transparent 65%)` }}
        />
        <div
          className="absolute -bottom-10 left-8 right-8 h-24 rounded-[999px] blur-3xl"
          style={{ background: `radial-gradient(circle at 50% 50%, ${theme.moss}50, transparent 70%)` }}
        />
      </div>

      {/* Organic corner trims */}
      <div className="absolute inset-0 pointer-events-none opacity-80">
        <div
          className="absolute top-3 left-3 w-14 h-14 rounded-[18px] border border-dashed"
          style={{ borderColor: `${theme.accent}66` }}
        />
        <div
          className="absolute top-4 right-4 w-10 h-10 rounded-[16px] border border-solid blur-[1px]"
          style={{ borderColor: `${theme.moss}55` }}
        />
        <div
          className="absolute bottom-4 left-4 w-10 h-10 rounded-[16px] border border-solid blur-[1px]"
          style={{ borderColor: `${theme.moss}55` }}
        />
        <div
          className="absolute bottom-3 right-3 w-14 h-14 rounded-[18px] border border-dashed"
          style={{ borderColor: `${theme.accent}66` }}
        />
      </div>

      {/* Firefly pulses */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => {
          const positions = [
            { top: "18%", left: "20%" },
            { top: "12%", right: "22%" },
            { top: "45%", left: "12%" },
            { top: "58%", right: "16%" },
            { bottom: "18%", left: "30%" },
            { bottom: "12%", right: "26%" },
          ];
          const pos = positions[i];
          return (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-pulse"
              style={{
                background: theme.accent,
                boxShadow: `0 0 10px ${theme.accent}88`,
                animationDelay: `${i * 0.3}s`,
                ...pos,
              }}
            />
          );
        })}
      </div>
    </>
  );
}