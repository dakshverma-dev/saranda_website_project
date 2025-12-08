import Image from "next/image";
import mist_forest_img from "@/public/images/mist_forest1.png";
import RegionGrid from "@/components/ui/meetups/RegionGrid";
import { getMeetupAnnouncements } from "@/lib/cmsdata";


export default async function Meetup() {
  const meetupAnnouncements = getMeetupAnnouncements();

  return <main className="pt-20 pb-20 relative min-h-screen">
    <div className="absolute inset-0 -z-1">
      <Image
        src={mist_forest_img}
        alt=""
        sizes="100vw"
        placeholder="blur"
        className="object-cover w-screen h-screen sticky top-0"
      />
    </div>

    {/* Meetup Announcemnts if any */}

    <RegionGrid />
  </main>;
}
