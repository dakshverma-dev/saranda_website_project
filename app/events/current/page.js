import EventPost from "@/components/ui/events/EventPost";
import Button from "@/components/ui/Button";
import { getEventPosts } from "@/lib/cmsdata";


export default async function EventsPage() {
  const events = await getEventPosts(false);

  return <>
    <h2 className="text-center text-primary mb-4">
      Current Events
    </h2>

    {events.map(e => <EventPost event={e} key={e._id}/>)}

    {(events.length == 0) && (
      <p className="text-center my-8 font-medium">
        No events for now :(
      </p>
    )}

    <div className="w-9/10 max-w-[120ch] mx-auto mb-8">
      <Button href="/events/past">Past Events &gt;</Button>
    </div>
  </>;
}