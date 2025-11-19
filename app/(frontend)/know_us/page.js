import UHC from "@/components/ui/know_us/UHC";
import mist_forest_img from "@/public/images/mist_forest1.png"
import Image from "next/image";
import Team from "@/components/ui/know_us/Team";
import AnimatedForestParticleEffects from "@/components/ui/know_us/AnimatedForestParticleEffects";
import TeamSectionAnimation from "@/components/gsapanimations/TeamSectionAnimation";
import { getUHCTeam, getNonUHCTeams } from "@/lib/cmsdata";


export default async function KnowUs() {
  const uhcTeam = await getUHCTeam();
  const nonUHCTeams = await getNonUHCTeams();

  return (
    <main className="relative min-h-screen">
      <FixedForestBackground />
      <AnimatedForestParticleEffects />

      <TeamSectionAnimation sectionId="uhc">
        <UHC team={uhcTeam} />
      </TeamSectionAnimation>

      <ElegantDivider />

      <div className="space-y-20 pb-32">
        {nonUHCTeams
          .map((team, index) => (
            <TeamSectionAnimation key={team._id} sectionId={`team-${index}`}>
              <Team team={team} />
            </TeamSectionAnimation>
          ))}
      </div>
    </main>
  );
}


function FixedForestBackground() {
return (
    <div className="fixed inset-0 -z-10 w-screen h-screen opacity-80">
      <div className="absolute inset-0">
        <Image
          src={mist_forest_img}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover"
          priority
          quality={90}
        />
      </div>
    </div>
  )
}


function ElegantDivider() {
  return (
    <div className="relative py-16">
      <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-primary-lighter/30 to-primary-lighter/30" />
        <div className="w-2 h-2 rounded-full bg-secondary/60" />
        <div className="flex-1 h-px bg-linear-to-l from-transparent via-primary-lighter/30 to-primary-lighter/30" />
      </div>
    </div>
  );
}