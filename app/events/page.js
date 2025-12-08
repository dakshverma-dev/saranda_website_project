import { getEventPosts } from "@/lib/cmsdata";
import { redirect } from "next/navigation";


export default async function EventsPage() {
  const events = await getEventPosts(false);

  return redirect(events.length === 0 ? "/events/past" : "/events/current");
}