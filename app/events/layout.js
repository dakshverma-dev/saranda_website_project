import Image from "next/image";
import mist_forest_img from "@/public/images/mist_forest2.png";


export default async function EventsPage({ children }) {
  return <main className="pt-[5rem] pb-[5rem] relative min-h-[100vh]">
    <div className="absolute inset-0 -z-1">
      <Image
        src={mist_forest_img}
        alt=""
        sizes="100vw"
        placeholder="blur"
        className="object-cover w-screen h-screen sticky top-0"
      />
    </div>
    { children }
  </main>;
}