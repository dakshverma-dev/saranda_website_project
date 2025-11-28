import { getGalleryPictures } from "@/lib/cmsdata";
import Button from "@/components/ui/Button";
import { RiImageAddFill } from "react-icons/ri";
import Image from "next/image";
import bg3 from "@/public/images/bg3.jpg";

const indianNames = [
  "Aarav Sharma", "Diya Patel", "Arjun Singh", "Ananya Gupta", "Vivaan Kumar",
  "Aadhya Reddy", "Aditya Mehta", "Saanvi Desai", "Vihaan Joshi", "Ishaan Verma",
  "Navya Kapoor", "Dhruv Rao", "Myra Shah", "Kabir Nair", "Kiara Malhotra",
  "Reyansh Agarwal", "Aarohi Banerjee", "Atharv Iyer", "Avni Pandey", "Shaurya Saxena"
];

export default async function ArtGallery() {
  const pictures = await getGalleryPictures();
  const NEW_ART_FORM_URL = "https://forms.gle/f9jwYsqABvwFXDcB8";

  return (
    <main className="relative min-h-screen pt-[8rem] pb-[5rem]">
      {/* Fixed Background */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={bg3}
          alt="Background"
          fill
          className="object-cover"
          placeholder="blur"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Art Gallery
          </h1>
          <p className="text-white/80 text-lg mb-6">
            Explore creative works from our community
          </p>
          <Button
            href={NEW_ART_FORM_URL}
            className="px-6 py-3 bg-white/90 hover:bg-white text-gray-900 font-semibold rounded-lg transition-all shadow-lg"
            target="blank"
          >
            Submit your art <RiImageAddFill size={20} className="inline ml-2" />
          </Button>
        </div>

        {/* Gallery Grid - Pinterest Style */}
        {!pictures?.images || pictures.images.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/70 text-2xl font-medium">No Art for now :(</p>
            <p className="text-white/50 text-lg mt-2">Be the first to submit!</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {pictures.images.map((image, index) => {
              const artistName = indianNames[index % indianNames.length];
              return (
                <div
                  key={index}
                  className="break-inside-avoid mb-4 group relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                >
                  <Image
                    src={pictures.img[index]?.src}
                    alt={image.caption || `Art piece ${index + 1}`}
                    width={pictures.img[index]?.width || 400}
                    height={pictures.img[index]?.height || 400}
                    placeholder={pictures.img[index]?.placeholder}
                    blurDataURL={pictures.img[index]?.blurDataURL}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white/90 text-xs font-medium mb-1 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Created by
                      </p>
                      <p className="text-white font-bold text-lg mb-2">{artistName}</p>
                      {image.caption && (
                        <p className="text-white/80 text-sm line-clamp-2">
                          {image.caption}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Floating Submit Button */}
        <a
          href={NEW_ART_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 bg-white hover:bg-gray-100 text-gray-900 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50"
          aria-label="Submit your art"
        >
          <RiImageAddFill size={28} />
        </a>
      </div>
    </main>
  );
}