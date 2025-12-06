import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

import { RiHome9Fill } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdEmojiPeople } from "react-icons/md";
import { FaExternalLinkAlt, FaPaintBrush } from "react-icons/fa";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoMdMicrophone } from "react-icons/io";
import { getCommunityLinks } from "@/lib/cmsdata";
import ScrollTopButton from "@/components/layout/ScrollTopButton";
import { Analytics } from "@vercel/analytics/next"


const roboto = Roboto({
  subsets: ["latin"],
  fallback: ["Helvetica", "Arial", "sans-serif"],
  variable: "--font-roboto",
});

const redwood = localFont({
  src: "../public/fonts/Realwood Regular.otf",
  variable: "--font-redwood",
})

export const metadata = {
  title: {
    template: "%s | Saranda IITM BS",
    default: "Saranda House | IITM BS",
  },
  description: "Saranda, a house at IIT Madras BS program, fosters creativity and innovation through meetups, workshops, tech showcases, eSports, and cultural events.",
  authors: [
    {
      name: "Sovit",
      url: "https://www.linkedin.com/in/5ovit/",
    },
  ],
  creator: "Saranda WebOps Team",
  keywords: [
    'Saranda', 'House', 'IIT Madras', 'BS Program', 'Community', 'Meetups',
    'Events', 'Workshops', 'eSports', 'Cultural', 'Tech', 'Students'
  ],
};

export default async function RootLayout({ children }) {
  const communities = await getCommunityLinks();

  const navbarOptions = [
    {
      href: "/",
      icon: <RiHome9Fill/>,
      text: "Home",
    },
    {
      href: "/know_us",
      icon: <FaPeopleGroup/>,
      text: "Know Us",
    },
    {
      href: "/events",
      icon: <IoMdMicrophone/>,
      text: "Events",
    },
    {
      href: "/meetups",
      icon: <MdEmojiPeople/>,
      text: "Meet Ups",
    },
    {
      href: "/art_gallery",
      icon: <FaPaintBrush/>,
      text: "Art Gallery",
    },
    {
      href: "/#communities_section_id",
      pseudoHref: "/community",
      icon: <SiHomeassistantcommunitystore/>,
      text: "Communities",
      dropdown: communities.map(c => ({
        href: `/community/${c.slug}`,
        text: c.slug,
      }))
    },
     {
      href: "/links",
      icon: <FaExternalLinkAlt/>,
      text: "Links",
    },
  ]

  return (
    <html lang="en" className={`${roboto.variable} ${redwood.variable}`}>
    <head>
      <meta name="google-site-verification" content="TNSYtDTfXmegrUjamV_Sr99pv19C2q7ojWZSH2YEFVg" />
    </head>
      <body className="bg-neutral-light">
        <Header navbarOptions={navbarOptions}/>
        {children}
        <ScrollTopButton/>
        <Footer communities={communities}/>
        <Analytics/>
      </body>
    </html>
  );
}