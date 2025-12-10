import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";


export async function POST(req) {
  const { revalidationKey, ...data } = await req.json();
  
  if (
    process.env.REVALIDATION_KEY
    && process.env.REVALIDATION_KEY !== revalidationKey
  ) return new NextResponse(JSON.stringify({
    message: "Please enter the correct revalidation key",
  }))
  
  const revalidationPaths = {
    "team": ["/know_us"],
    "artphotos": ["/art_gallery"],
    "artphotos": ["/art_gallery"],
    "event": ["/events", "/events/past", "/events/current", "/meetups"],
    "meetup": [`/meetups/${data.region}`],
    "featuredphotos": ["/"],
    "linktre": ["/links"],
    "community": ["/", `/community/${data.slug}`],
    "extra_footer_links": ["/"],
  }

  const revalidationLayoutPaths = {
    "community": ["/"],
    "extra_footer_links": ["/"],
  }
  
  const paths = revalidationPaths[data.type];
  const layoutPaths = revalidationLayoutPaths[data.type] || [];

  if (!paths) {
    return new NextResponse(JSON.stringify({
      message: `the given type (${data.type}) is not supported`,
    }));
  }

  for (const path of paths) {
    revalidatePath(path);
    console.log(`REVALIDATE PATH: ${path}`);
  }

  for (const path of layoutPaths) {
    revalidatePath(path, "layout");
  }

  return new NextResponse(JSON.stringify({
    message: `revalidation complete: ${paths.join(" ")}`,
  }));
}