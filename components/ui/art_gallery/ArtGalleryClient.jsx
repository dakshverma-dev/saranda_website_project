"use client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { RiImageAddFill } from "react-icons/ri";
import Image from "next/image";
import bg3 from "@/public/images/bg3.jpg";
import PhotoOverlay from "@/components/ui/PhotoOverlay";


export default function ArtGalleryClient({ pictures }) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const NEW_ART_FORM_URL = process.env.NEXT_PUBLIC_ART_GALLERY_FORM_LINK;

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <main className="relative min-h-screen pt-32 pb-20">
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

      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
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
            className="px-6 py-3 bg-white/90 hover:bg-yellow-400 hover:scale-105 active:scale-95 text-gray-900 font-semibold rounded-lg transition-all duration-300 shadow-lg"
            target="blank"
          >
            Submit your art <RiImageAddFill size={20} className="inline ml-2" />
          </Button>
        </div>

        {/* Gallery Grid - Pinterest Style */}
        {!pictures?.artworks || pictures.artworks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/70 text-2xl font-medium">No Art for now :(</p>
            <p className="text-white/50 text-lg mt-2">Be the first to submit!</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {pictures.artworks.map((artwork, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className="break-inside-avoid mb-4 group relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                >
                  <Image
                    {...pictures.img[index].uncropped}
                    alt=""
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white/90 text-xs font-medium mb-1 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Created by
                      </p>
                      <p className="text-white font-bold text-lg mb-2">{artwork.artist}</p>
                      {artwork.caption && (
                        <p className="text-white/80 text-sm line-clamp-2">
                          {artwork.caption}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Photo Overlay for fullscreen view */}
        <PhotoOverlay
          pictures={pictures.img}
          captions={pictures.artworks?.map(p => p?.caption) || []}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />

        <a
          href={NEW_ART_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`fixed bottom-20 right-6 bg-white hover:bg-gray-100 text-gray-900 p-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
          aria-label="Submit your art"
        >
          <RiImageAddFill size={22} />
        </a>
      </div>
    </main>
  );
}