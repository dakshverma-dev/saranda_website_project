import UHC from "@/components/ui/know_us/UHC";
import bg3 from "@/public/images/bg3.jpg"
import Image from "next/image";
import Team from "@/components/ui/know_us/Team";
import AnimatedForestParticleEffects from "@/components/ui/know_us/AnimatedForestParticleEffects";
import TeamSectionAnimation from "@/components/gsapanimations/TeamSectionAnimation";
import { getUHCTeam, getNonUHCTeams } from "@/lib/cmsdata";


export default async function KnowUs() {
  const uhcTeam = await getUHCTeam();
  const nonUHCTeams = await getNonUHCTeams();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <FixedForestBackground />
      <AnimatedForestParticleEffects />
      <ForestAmbiance />
      <LeafDriftLayer />

      <TeamSectionAnimation sectionId="uhc">
        <UHC team={uhcTeam} />
      </TeamSectionAnimation>

      <NatureDivider />

      <div className="space-y-12 md:space-y-20 pb-20 md:pb-32">
        {nonUHCTeams
          .map((team, index) => (
            <TeamSectionAnimation key={team._id} sectionId={`team-${index}`}>
              <Team team={team} index={index} />
            </TeamSectionAnimation>
          ))}
      </div>
    </main>
  );
}


function FixedForestBackground() {
  return (
    <div className="fixed inset-0 -z-10 w-screen h-screen">
      <div className="absolute inset-0">
        <Image
          src={bg3}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover"
          priority
          quality={90}
        />
        {/* Layered forest depth - warmer tones */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-primary-darker/20 to-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,195,74,0.08),transparent_60%)]" />
      </div>
    </div>
  )
}

function ForestAmbiance() {
  return (
    <>
      {/* Subtle light rays */}
      <div className="fixed inset-0 -z-8 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-primary-lighter/10 via-primary-lighter/5 to-transparent transform -skew-x-12" />
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-secondary/10 via-secondary/5 to-transparent transform skew-x-12" />
      </div>
      
      {/* Fireflies */}
      <div className="fixed inset-0 -z-7 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-secondary rounded-full animate-pulse"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              boxShadow: '0 0 8px rgba(139,195,74,0.6)',
            }}
          />
        ))}
      </div>
    </>
  )
}

function LeafDriftLayer() {
  return (
    <div className="fixed inset-0 -z-9 pointer-events-none">
      {/* Soft parallax-style organic glows */}
      <div className="absolute -top-10 left-6 w-64 h-64 md:w-80 md:h-80 bg-[radial-gradient(circle_at_30%_30%,rgba(26,77,46,0.55),transparent_55%)] blur-3xl mix-blend-screen" />
      <div className="absolute bottom-0 right-4 w-72 h-72 md:w-96 md:h-96 bg-[radial-gradient(circle_at_60%_40%,rgba(45,80,22,0.5),transparent_60%)] blur-3xl mix-blend-screen" />
      <div className="absolute top-1/3 left-1/3 w-56 h-56 md:w-72 md:h-72 bg-[radial-gradient(circle_at_50%_50%,rgba(106,91,76,0.35),transparent_60%)] blur-2xl mix-blend-multiply" />
    </div>
  );
}

function NatureDivider() {
  return (
    <div className="relative py-14 md:py-20">
      <div className="max-w-5xl mx-auto px-4">
        {/* Branch with leaves and vines */}
        <div className="relative h-20 flex items-center justify-center">
          <svg viewBox="0 0 1000 90" className="w-full h-full opacity-60" preserveAspectRatio="none">
            {/* Main vine */}
            <path
              d="M0,50 Q220,25 500,45 T1000,40"
              stroke="#1a4d2e"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeOpacity="0.7"
            />
            {/* Secondary vine */}
            <path
              d="M0,55 Q260,65 520,55 T1000,50"
              stroke="#4a3f35"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeOpacity="0.45"
            />
            {/* Leaves */}
            <ellipse cx="180" cy="30" rx="10" ry="16" fill="#2d5016" transform="rotate(-28 180 30)" />
            <ellipse cx="420" cy="68" rx="10" ry="16" fill="#1a4d2e" transform="rotate(24 420 68)" />
            <ellipse cx="620" cy="28" rx="10" ry="16" fill="#2d5016" transform="rotate(-28 620 28)" />
            <ellipse cx="820" cy="66" rx="10" ry="16" fill="#1a4d2e" transform="rotate(22 820 66)" />
            {/* Leaf veins */}
            <path d="M172,30 L188,30" stroke="#f8e41a" strokeWidth="1.2" strokeOpacity="0.6" />
            <path d="M412,68 L428,68" stroke="#f8e41a" strokeWidth="1.2" strokeOpacity="0.6" />
            <path d="M612,28 L628,28" stroke="#f8e41a" strokeWidth="1.2" strokeOpacity="0.6" />
            <path d="M812,66 L828,66" stroke="#f8e41a" strokeWidth="1.2" strokeOpacity="0.6" />
          </svg>
          
          {/* Center glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#f8e41a] animate-pulse" style={{boxShadow: '0 0 18px rgba(248,228,26,0.55)'}} />
          </div>
        </div>
      </div>
    </div>
  );
}