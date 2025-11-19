import Image from "next/image";
import lush_forest_back_img from "@/public/images/lush-forest-back.png";
import lush_forest_front_img from "@/public/images/lush-forest-front.png";
import { lushForestFrontBase64, lushForestBackBase64 } from "./base64Images";
import HeroAnimation from "../../gsapanimations/HeroAnimation";
import { twJoin } from "tailwind-merge";


export default function Hero({className, ...props}) {
  const hero_section_id = "hero"
  const lush_forest_back_id = "lush_forest_back_id"
  const lush_forest_front_id = "lush_forest_front_id"
  const the_saranda_text_id = "the_saranda_text_id"

  return <>
    <main
      id={hero_section_id}
      className={twJoin(
        `h-[100vh] overflow-y-clip relative`,
        className
      )}
      {...props}
    >
      <Image
        id={lush_forest_back_id}
        src={lush_forest_back_img}
        alt="Landing Page Background"
        fill
        sizes="100vw"
        placeholder={lushForestBackBase64}
        className="-z-1 object-cover"
      />
      <div
        className="h-full animate-heroslideup"
      >
        <div
          id={the_saranda_text_id}
          className="
            text-center h-full flex flex-col justify-center text-primary
            uppercase -translate-y-15/100 animate-heroslidedown
          "
        >
          <h1 className="mb-[-0.4ch]">Saranda</h1>
          <p className="text-base lg:text-xl font-bold">
            THE HOUSE OF EXCELLENCE AND INNOVATION
          </p>
        </div>
      </div>
      <div className="inset-0 absolute animate-treeslidedown">
        <Image
          id={lush_forest_front_id}
          src={lush_forest_front_img}
          alt="Landing Page Foreground"
          fill
          sizes="(max-width: 768px) 200vw, 100vw"
          placeholder={lushForestFrontBase64}
          className="object-cover"
        />
      </div>
      <div
        className="
          absolute inset-0 bg-linear-to-t from-[#d1ccb0] to-[#d1ccb0]/0 to-10%
        "
      ></div>
    </main>

    <HeroAnimation
      hero_section_id = {hero_section_id}
      lush_forest_back_id = {lush_forest_back_id}
      lush_forest_front_id = {lush_forest_front_id}
      the_saranda_text_id = {the_saranda_text_id}
    />
  </>
}