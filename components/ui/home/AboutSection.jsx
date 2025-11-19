import Image from "next/image";
import saranda_logo_img from "@/public/images/saranda_logo.png"
import AboutSEctionAnimation from "../../gsapanimations/AboutSectionAnimation";
import { twJoin } from "tailwind-merge";
import SocialLinks from "@/components/layout/SocialLinks";
import wooden_plank_img from "@/public/images/wooden_plank.png";


export default function AboutSection({
  className = "",
  innerClassName = "",
  innerProps = {},
  ...props
}) {
  const about_section_id = "about_section_id"
  const about_section_inner_id = "about_section_inner_id"
  const about_content_container_id = "about_content_container_id"

  return <>
    <section
      id={about_section_id}
      className={twJoin(
        "grid justify-center items-center p-1 md:h-[100vh]",
        className
      )}
      {...props}
    >
      <div
        id={about_section_inner_id}
        className={twJoin(
          `green-glass-container lg:px-[8rem] lg:py-[4rem] md:px-[3rem]
          md:py-[2rem] px-[1rem] py-[2rem] grid grid-cols-1
          md:grid-cols-2 gap-[1rem] lg:gap-[3rem] max-w-[80rem] min-h-7/10
          relative max-md:h-full overflow-clip max-md:items-start`,
          innerClassName
        )}
        style={{ direction: "rtl", }}
        {...innerProps}
      >
        <Image
          src={wooden_plank_img}
          alt=""
          placeholder="blur"
          fill
          className="-z-1"
        />
        <div
          id={about_content_container_id}
          className={`
            flex flex-col h-full gap-y-[0.8rem] lg:gap-y-[1.5rem] justify-center p-1
          `}
          style={{ direction: "ltr" }}
        >
          <h2 className="text-center">About Us</h2>
          <p className="text-left self-start">
            Saranda, The House of Excellence and Innovation, is one of the 12
            student houses in the IIT Madras BS degree program. We cultivate a
            vibrant community by organizing regular meetups, hands-on
            workshops, tech showcases, eSports tournaments, and cultural
            festivals. Saranda brings together passionate learners to connect,
            innovate, and grow beyond boundaries.
          </p>
          <SocialLinks
            icons_size={32}
            linkClassName="before:!bg-neutral-light/20"
          />
        </div>
        <Image
          src={saranda_logo_img}
          alt="Saranda Logo"
          className=" max-md:scale-90 self-center"
        />
      </div>
    </section>

    <AboutSEctionAnimation
      about_section_id = {about_section_id}
      about_section_inner_id = {about_section_inner_id}
      about_content_container_id = {about_content_container_id}
    />
  </>
}