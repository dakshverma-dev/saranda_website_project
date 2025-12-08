import { getGalleryPictures } from "@/lib/cmsdata";
import ArtGalleryClient from "@/components/ui/art_gallery/ArtGalleryClient.jsx";

export default async function ArtGallery() {
  const pictures = await getGalleryPictures();
  return <ArtGalleryClient pictures={pictures} />;
}