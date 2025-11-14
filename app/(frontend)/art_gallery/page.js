import ArtGalleryPhotos from "@/components/ui/art_gallery/ArtGalleryPhotos";
import { getGalleryPictures } from "@/lib/cmsdata";
import AddArtFloatingButton from "@/components/ui/art_gallery/AddArtFloatingButton";
import Button from "@/components/ui/Button";
import { RiImageAddFill } from "react-icons/ri";


export default async function ArtGallery() {
  const pictures = await getGalleryPictures();
  const NEW_ART_FORM_URL = "https://forms.gle/f9jwYsqABvwFXDcB8";
  
  return (
    <main
      className="
    pt-[5rem] pb-[5rem] relative min-h-[100vh] bg-[#dbdbdb]
  "
    >
      <h2 className="text-center text-primary mb-[1rem]">Art Gallery</h2>
      <div className="
        w-full md:w-9/10 max-w-[80rem] mx-auto p-[1rem] flex justify-end
      ">
        <Button
          href={NEW_ART_FORM_URL}
          className="px-[1.5rem]"
          target="blank"
        >
          Submit your art <RiImageAddFill size={24} className="inline"/>
        </Button>
      </div>
      {pictures.length == 0 ? (
        <p className="text-center my-[2rem] font-medium">No Art for now :(</p>
      ) : (
        <ArtGalleryPhotos pictures={pictures} />
      )}
      <AddArtFloatingButton href={NEW_ART_FORM_URL}/>
    </main>
  );
}