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