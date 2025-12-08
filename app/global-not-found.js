import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Image from "next/image";
import bg404_img from "@/public/images/bg404.png";

import { RiHome9Fill } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdEmojiPeople } from "react-icons/md";
import { FaExternalLinkAlt, FaPaintBrush } from "react-icons/fa";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoMdMicrophone } from "react-icons/io";
import { getCommunityLinks } from "@/lib/cmsdata";

const roboto = Roboto({
  subsets: ["latin"],
  fallback: ["Helvetica", "Arial", "sans-serif"],
  variable: "--font-roboto",
});

const redwood = localFont({
  src: "../public/fonts/Realwood Regular.otf",
  variable: "--font-redwood",
})

export default async function LostPage() {
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
      <body>
        <Header navbarOptions={navbarOptions}/>
        <main className="
          h-dvh flex justify-center items-center flex-col relative
        ">
          <Image
            src={bg404_img}
            alt=""
            fill
            sizes="100vw"
            className="object-cover -z-1"
          />
          <p>Oops...</p>
          <h1 className="mb-[-0.4ch]">404</h1>
          <p>You might be lost.</p>
          <p>
            <Button href="/" className="mr-[1ch]">
              Click this
            </Button>
            to get back home.
          </p>
        </main>
        <Footer communities={communities}/>
      </body>
    </html>
  )
}