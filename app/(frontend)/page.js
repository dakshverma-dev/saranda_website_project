import NonHeroSections from "@/components/ui/home/NonHeroSections";
import AboutSection from "@/components/ui/home/AboutSection";
import Hero from "@/components/ui/home/Hero";
import FeaturedSection from "@/components/ui/home/FeaturedSection";
import CommunitiesSection from "@/components/ui/home/CommunitiesSection";

export default async function Home() {
  return <>
    <Hero />
    <DivForTransition />
    <NonHeroSections>
      <AboutSection />
      <FeaturedSection/>
      <CommunitiesSection/>
    </NonHeroSections>
  </>
}

function DivForTransition() {
  return (
    <div
      className="w-full h-[5rem] bg-[#d1ccb0]"
    ></div>
  )
}