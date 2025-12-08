"use client";

import { useState } from "react";
import PhotoOverlay from "@/components/ui/PhotoOverlay";
import Image from "next/image"
import Button from "@/components/ui/Button"
import { PortableText } from "next-sanity"
import { twJoin } from "tailwind-merge";


export default function EventPost({event, className="", children, ...props}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return <>
    <div
      className={twJoin(
        `w-9/10 max-w-[120ch] mx-auto green-glass-container p-4
        mb-8 pb-16 grid gap-4 md:grid-cols-[18rem_1fr]
        grid-cols-1`,
        className
      )}
      {...props}
    >
      <div className="h-fit duration-200">
        <Image
          alt=""
          {...event.img.uncropped}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="
            object-cover rounded-xl cursor-pointer w-full h-auto
            hover:scale-120 duration-200 hover:shadow-lg shadow-black
          "
          onClick={e => setSelectedIndex(0)}
        />
      </div>

      <div>
        <h3 className="mb-2">{event.eventname}</h3>
        <div className="mb-4 *:min-h-4">
          <PortableText value={event.description}/>
        </div>
        {event.links && event.links.map(
          l => <Button
            href={l.url}
            key={l._key}
            target="blank"
            className="m-0.5 py-[0.08rem]"
          >
            {l.text}
          </Button>
        )}
        {children}
      </div>
    </div>

    <PhotoOverlay
      pictures={[event.img]}
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
    />
  </>
}