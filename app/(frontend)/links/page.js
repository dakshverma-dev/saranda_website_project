// app/(frontend)/links/page.js
import { client } from "@/sanity/lib/client"; 
import LinkCardGrid from "@/components/ui/links/LinkCardGrid";

const linkCardsQuery = `
  *[_type == "linkCard"] | order(_createdAt desc) {
    _id,
    title,
    description,
    externalUrl,
    image
  }
`;

async function getLinkCards() {
  return await client.fetch(linkCardsQuery);
}

export default async function LinksPage() {
  const linkCards = await getLinkCards();

  return (
    <main className="relative w-11/12 max-w-7xl mx-auto py-24">
      {/* Container matching your Team component style */}
      <div className="relative bg-primary-darker/75 backdrop-blur-xl rounded-3xl overflow-hidden border border-primary/35 shadow-[0_25px_70px_rgba(0,0,0,0.5)]">
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(46,125,50,0.15)_0%,transparent_60%)]" />
        </div>

        {/* Top accent border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent" />

        {/* Title */}
        <div className="relative p-10 pb-6 text-center">
          <h1 className="text-white text-3xl font-bold mb-3">
            Useful Links
          </h1>
          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
        </div>

        {/* Cards Grid */}
        <div className="relative p-6 pt-2 pb-12">
          <LinkCardGrid cards={linkCards} />
        </div>

        {/* Bottom accent border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>
    </main>
  );
}