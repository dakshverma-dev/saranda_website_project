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
        `relative flex flex-col justify-center items-center min-h-screen py-12 md:py-20`,
        className
      )}
      {...props}
    >
      {/* Ambient forest glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-5 md:left-10 w-48 h-48 md:w-64 md:h-64 bg-primary/10 rounded-full blur-[80px] md:blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-5 md:right-10 w-56 h-56 md:w-80 md:h-80 bg-secondary/10 rounded-full blur-[100px] md:blur-[120px] animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      <div 
        ref={titleRef}
        className="relative z-10 text-center mt-8 md:mt-12 mb-12 md:mb-20 px-4"
      >
        <div className="inline-block relative">
          {/* Glowing title with golden essence */}
          <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-r from-[#f8e41a]/10 via-[#f8e41a]/15 to-[#f8e41a]/10 blur-lg md:blur-xl opacity-60" />
          <h2 className="mb-4 md:mb-6 relative drop-shadow-[0_0_15px_rgba(248,228,26,0.5)] md:drop-shadow-[0_0_20px_rgba(248,228,26,0.5)] text-3xl md:text-4xl lg:text-5xl" style={{color: '#f8e41a'}}>
            {team.name}
          </h2>
          {/* Nature divider */}
          <div className="flex items-center justify-center gap-1.5 md:gap-2">
            <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent to-[#f8e41a]/50" />
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#f8e41a] shadow-[0_0_8px_rgba(248,228,26,0.6)]" />
            <div className="w-12 md:w-16 h-px bg-gradient-to-l from-transparent to-[#f8e41a]/50" />
          </div>
        </div>
      </div>

      <div className="relative w-full md:w-11/12 max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 px-6 md:px-4">
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
        `bg-[linear-gradient(135deg,#4a3f35_0%,#5c4a3d_45%,#3b2b23_100%)]`,
        `backdrop-blur-xl rounded-2xl md:rounded-3xl overflow-hidden`,
        `border border-[#2d5016]/40 hover:border-[#f8e41a]/70`,
        `shadow-[0_18px_50px_rgba(0,0,0,0.45),0_0_0_1px_rgba(248,228,26,0.12)] hover:shadow-[0_30px_75px_rgba(0,0,0,0.65),0_0_35px_rgba(248,228,26,0.3)]`,
        `transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:rotate-[0.4deg]`,
        className
      )}
      {...props}
    >
      {/* Mossy edge glow */}
      <div className="absolute inset-0 opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute -top-4 left-0 w-full h-10 bg-[radial-gradient(circle_at_50%_50%,rgba(106,139,85,0.22),transparent_60%)] blur-2xl" />
        <div className="absolute bottom-0 left-0 w-full h-10 bg-[radial-gradient(circle_at_50%_50%,rgba(74,80,54,0.2),transparent_60%)] blur-2xl" />
      </div>

      {/* Member image */}
      <div className="relative h-96 overflow-hidden">
        <Image
          {...member.img.cropped}
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
    <div className="absolute inset-0 bg-gradient-to-t from-primary-darker/70 via-transparent to-transparent" />
  </>
}


function PremiumGlowEffect() {
  return null;
}


function ShineOverlay() {
  return <>
    <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/0 group-hover:via-white/5 to-transparent transition-all duration-700 opacity-0 group-hover:opacity-100" />
  </>
}


function SocialMediaIcons({member}) {
  return <>
    <div className="pt-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
      {member.email && (
        <SocialLinkIcon Icon={IoMdMail} aria-label="Email" href={"mailto:" + member.email}/>
      )}
      {member.github && (
        <SocialLinkIcon Icon={FaGithub} aria-label="GitHub" href={member.github}/>
      )}
      {member.linkedin && (
        <SocialLinkIcon Icon={FaLinkedin} aria-label="LinkedIn" href={member.linkedin}/>
      )}
      {member.instagram && (
        <SocialLinkIcon Icon={FaInstagram} aria-label="Instagram" href={member.instagram}/>
      )}
    </div>
  </>
}

function SocialLinkIcon({Icon, ...props}) {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-primary/40 hover:bg-primary/60 border border-primary-lighter/40 hover:border-secondary/60 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20 backdrop-blur-sm"
      {...props}
    >
      <Icon size={24}/>
    </Link>
  )
}


function MemberInfo({member}) {
  return <>
    <div className="relative z-30 p-6 md:p-8 text-center text-neutral-light bg-linear-to-t from-primary-darker/80 to-transparent">
      <div className="space-y-2 md:space-y-3">
        <h3 className="text-secondary-ligher group-hover:text-secondary transition-colors duration-300 text-xl md:text-2xl">
          {member.fullname}
        </h3>
        <div className="w-10 md:w-12 h-px bg-linear-to-r from-transparent via-primary-lighter/50 to-transparent mx-auto" />
        <p className="text-primary-lighter/90 text-sm md:text-base tracking-wide">
          {member.position}
        </p>
        
        <SocialMediaIcons member={member}/>
      </div>
    </div>
  </>
}


function PremiumCornerAccents() {
  return <>
    {/* Top right with glowing dot */}
    <div className="absolute top-0 right-0 w-16 h-16 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
      <div className="absolute top-4 right-4 w-8 h-px bg-gradient-to-l from-secondary/70 to-transparent" />
      <div className="absolute top-4 right-4 w-px h-8 bg-gradient-to-t from-secondary/70 to-transparent" />
      <div className="absolute top-4 right-4 w-2 h-2 bg-secondary/40 rounded-full blur-[2px]" />
    </div>
    {/* Bottom left with glowing dot */}
    <div className="absolute bottom-0 left-0 w-16 h-16 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
      <div className="absolute bottom-4 left-4 w-8 h-px bg-gradient-to-r from-secondary/70 to-transparent" />
      <div className="absolute bottom-4 left-4 w-px h-8 bg-gradient-to-b from-secondary/70 to-transparent" />
      <div className="absolute bottom-4 left-4 w-2 h-2 bg-secondary/40 rounded-full blur-[2px]" />
    </div>
  </>
}