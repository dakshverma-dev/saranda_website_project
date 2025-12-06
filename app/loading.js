import logo_mark from "@/public/images/saranda_logo.png";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="
      h-screen w-full flex justify-center items-center bg-[#ece6c6] flox-row
      z-2 text-primary
    ">
      <h1>L</h1>
      <Image
        src={logo_mark}
        alt="Saranda"
        width={128}
        sizes="8vw"
        className="animate-bounce bg-black rounded-full"
      />
      <h1>ading...</h1>
    </div>
  );
}