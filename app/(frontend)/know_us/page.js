import UHC from "@/components/ui/know_us/UHC";
import mist_forest_img from "@/public/images/mist_forest1.png"
import Image from "next/image";
import Team from "@/components/ui/know_us/Team";
import ForestBackground from "@/components/ui/know_us/ForestBackground";
import TeamSectionAnimation from "@/components/gsapanimations/TeamSectionAnimation";
import { getUHCTeam, getNonUHCTeams } from "@/lib/cmsdata";

export default async function KnowUs() {
  const uhcTeam = await getUHCTeam();
  const nonUHCTeams = await getNonUHCTeams();

  return (
    <main className="relative min-h-screen">
      {/* Forest background with mist - Fixed position */}
      <div className="fixed inset-0 -z-10 w-screen h-screen">
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
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Animated forest particles and effects */}
      <ForestBackground />

      {/* UHC Section - 3 members */}
      <TeamSectionAnimation sectionId="uhc">
        <UHC team={uhcTeam} />
      </TeamSectionAnimation>

      {/* Divider */}
      <div className="relative py-12">
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-primary-lighter/40 to-transparent mx-auto" />
      </div>

      {/* LHC and Webops sections */}
      <div className="space-y-16 pb-32">
        {nonUHCTeams.map((team, index) => (
          <TeamSectionAnimation key={team._id} sectionId={`team-${index}`}>
            <Team team={team} />
          </TeamSectionAnimation>
        ))}
      </div>

      {/* Bottom spacer */}
      <div className="h-20" />
    </main>
  );
}
