import Image from "next/image";
import Button from "../Button";
import { twJoin } from "tailwind-merge";
import { getFeaturedPhotos } from "@/lib/cmsdata";
import wooden_plank_img from "@/public/images/wooden_plank.png";


export default async function FeaturedSection({
  className = "",
  innerClassName = "",
  innerProps = {},
  ...props
}) {
  const photos = await getFeaturedPhotos();

  return <>
    <section
      id="featured_section_id"
      className={twJoin(
        `featured-section flex justify-center items-center relative h-[100vh]`,
        className
      )}
      {...props}
    >
      <PhotoGrid photos={photos}></PhotoGrid>
      <CTAContainer/>
    </section>
  </>
}


function PhotoGrid({photos=[], className="", ...props}) {
  const area_classes = [
      "[grid-area:tl] lg:hover:-translate-y-1/10 lg:hover:-translate-x-1/10",
      "[grid-area:tr] lg:hover:-translate-y-1/10 lg:hover:translate-x-1/10",
      "[grid-area:midtl] lg:hidden",
      "[grid-area:midtr] lg:hidden",
      "[grid-area:midbl] lg:hidden",
      "[grid-area:midbr] lg:hidden",
      "[grid-area:bl] lg:hover:translate-y-1/10 lg:hover:-translate-x-1/10",
      "[grid-area:br] lg:hover:translate-y-1/10 lg:hover:translate-x-1/10",
  ]
  return <>
    <div
      className={twJoin(
        `h-full lg:h-8/10 w-full lg:w-8/10 xl:w-6/10 featured-photo-grid
        gap-1 mx-2`,
        className
      )}
      {...props}
    >
      {photos.img.map((img, index) => (
        <div
          className={twJoin(
            `relative lg:hover:scale-120 duration-200 rounded-xl overflow-clip
            border-neutral-light/50 lg:border-6 border-2`,
            area_classes[index]
          )}
          key={index}
        >
          <Image
            {...img}
            fill
            alt="Memorable Photo"
            sizes="(max-width: 1024px) 60vw, 40vw"
            className="absolute object-cover min-w-full min-h-full"
          />
        </div>
      ))}
    </div>
  </>
}


function CTAContainer({className="", ...props}) {
  return <>
    <div
      className={twJoin(
        `absolute content-center justify-center`,
        className
      )}
      {...props}
    >
      <div className="
        h-50 w-50 xl:w-60 xl:h-60 green-glass-container rotate-45
        flex justify-center items-center z-10 lg:scale-110 overflow-clip
      ">
        <Image
          src={wooden_plank_img}
          alt=""
          placeholder="blur"
          fill
          className="-z-1"
        />
        <div className="
          -rotate-45 w-9/10 h-1/2 text-center
          text-neutral-light flex flex-col justify-center items-center
        ">
          <p>Check out our</p>
          <div className="flex gap-[1ch] items-center text-nowrap">
            <Button href="/events">Events</Button>
            &
            <Button href="/meetups">Meet Ups</Button>
          </div>
        </div>
      </div>
    </div>
  </>
}