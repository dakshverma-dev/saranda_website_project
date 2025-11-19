import Image from "next/image";
import mist_forest_img from "@/public/images/mist_forest2.png";
import { twJoin } from "tailwind-merge";
import LoneTreeSlidingAnimation from "@/components/gsapanimations/LoneTreeSlidingAnimation";

export default function NonHeroSections({
  className = "",
  children,
  ...props
}) {
  return <>
    <main
      className={twJoin(
        "relative py-[10rem]",
        className
      )}
      id="non_hero_sections_id"
      {...props}
    >
      <div
        className="absolute inset-0"
        id="landing_page_bg_container_id"
      >
        <Image
          id="mist_forest_img_id"
          src={mist_forest_img}
          alt=""
          sizes="100vw"
          placeholder="blur"
          className="object-cover w-screen h-screen sticky top-0"
        ></Image>
      </div>
      <LoneTreeSlidingAnimation/>
      <div
        className="
          absolute inset-0 bg-linear-to-b from-[#d1ccb0] via-[#d1ccb0]/80 to-[#faf6e6]/0 h-[10rem]
        "
      ></div>
      {children}
    </main>
  </>
}
