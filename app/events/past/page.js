import EventPost from "@/components/ui/events/EventPost";
import Button from "@/components/ui/Button";
import { getEventPosts } from "@/lib/cmsdata";


export default async function EventsPage({ params }) {
  const events = await getEventPosts(true);

  return <>
    <h2 className="text-center text-primary mb-[1rem]">
      Past Events
    </h2>
    <div className="
      w-9/10 max-w-[120ch] mx-auto mb-[2rem] mt-[-1rem]
    ">
      <Button href="/events/current">&lt; Back</Button>
    </div>
    {events.map(e => <EventPost event={e} key={e._id}/>)}
    {(events.length == 0) && (
      <p className="text-center my-[2rem] font-medium">
        No events for now :(
      </p>
    )}
  </>;
}