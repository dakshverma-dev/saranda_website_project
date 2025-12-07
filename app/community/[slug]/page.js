import Button from "@/components/ui/Button";
import { getCommunity } from "@/lib/cmsdata";
import Image from "next/image";
import Link from "next/link";


export default async function Community({ params }) {
  const { slug } = await params;

  const community = await getCommunity(slug);
  if (!community)
    return <main className="
      min-h-screen content-center items-center text-center p-4
    ">
      <h1>404</h1>
      <p>The community you are looking for does not exits.</p>
    </main>

  return <>
    <main className="
      relative min-h-screen pb-8
    ">
      <div className="
        absolute inset-0 overflow-clip -z-1
      ">
        <Image
          {...community.img.cropped}
          alt=""
          className="object-cover sticky w-screen h-screen top-0"
        />
      </div>

      <main className="
        pt-32 md:pt-48 pb-16 w-full px-4
      ">
        <div className="
          w-full max-w-7xl mx-auto text-neutral-light bg-[#0005]
          shadow-[0_1rem_2rem_.5rem_#0004] backdrop-blur-[6px] p-8 rounded-xl
          border-y border-t-[#fff4] border-b-[#0006]
        ">
          <h2 className="max-md:mb-4">{community.title}</h2>
          <p className="mb-4">{community.description}</p>
          <div className="flex flex-wrap gap-4 items-center">
            {
              community.joining_form &&
              <Button
                href={community.joining_form}
                target="blank"
              >Join the Community</Button>
            }
            <Link
              href="/events"
              className="underline hover:text-secondary"
            >
              Check out the events...
            </Link>
          </div>
        </div>
      </main>

      <section className="
        green-glass-container -mt-4 py-16 min-h-[60vh] px-4 mx-auto max-w-7xl
      ">
        <h3 className="
          max-w-240 mx-auto mb-8
        ">Events hosted under our care</h3>
        {community.events.map((event, index) => (
          <div
            key={index}
            className="
              w-full max-w-240 mx-auto border-2 rounded-2xl mb-8
              border-neutral-light grid md:grid-cols-[18rem_auto] p-8
              gap-4
            "
          >
            <Image {...event.img.cropped} alt="" className="rounded-xl"></Image>
            <div>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  </>
}