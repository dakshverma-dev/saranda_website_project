import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/sanityImageURL";
import imgPlaceholderAttr from "@/lib/imgPlaceholderAttr";
import { queries } from "./sanityqueries";

const DEFAULT_REVALIDATION_PERIOD = 60*60*24;
const PLACEHOLDER_IMAGE_URL = "https://placehold.co/100/gray/gray/png";
const PLACEHOLDER_BLUR_URL = "https://placehold.co/10/gray/gray/png";


async function fetchQuery(query_data, params={}) {
  const {query, tag, routes} = query_data;
  try {
    const data = await client.fetch(
      query,
      params,
      {next: {
        tags: [tag, ...routes],
        revalidate:
          parseInt(process.env.REVALIDATION_PERIOD)
          || DEFAULT_REVALIDATION_PERIOD,
      }}
    ) || [];

    return data;
  }
  catch(e) {
    console.error("FETCH ERROR:", e.message);
    return null;
  }
}

async function parseImg(image, dim={}, options={}) {
  const {width, height} = dim;

  if (!image) {
    return {
      src: PLACEHOLDER_IMAGE_URL,
      overlay_src: PLACEHOLDER_IMAGE_URL,
      ...await imgPlaceholderAttr(PLACEHOLDER_BLUR_URL, options),
    }
  }
  else {
    let src = urlFor(image);
    if (width) src = src?.width(width);
    if (height) src = src?.height(height);
    if (height || width) src = src?.fit("max");
    return {
      src: src.url(),
      overlay_src: urlFor(image).url(),
      ...await imgPlaceholderAttr(
        urlFor(image).width(10).fit("max").url(),
        options
      ),
    }
  }
}


export async function getGalleryPictures() {
  const pictures = await fetchQuery(queries.gallery_photos, {}) ?? {};
  pictures.images = pictures.images || [];

  pictures.img = [];
  for (const image of pictures.images) {
    pictures.img.push(await parseImg(image, {}, {w:400}));
  }

  return pictures;
}


export async function getEventPosts(isPast = false) {
  const events = await fetchQuery(
    isPast ? queries.past_events : queries.current_events,
    {},
  ) ?? [];

  for (const event of events) {
    event.img = await parseImg(event.poster, {}, {w: 400});
  }

  return events;
}


export async function getMeetupPosts(region=null) {
  const meetups = ( region
    ? await fetchQuery(queries.meetup_posts_from, { region: region })
    : await fetchQuery(queries.meetup_posts, {}) ?? []
  );

  if (!meetups || !Array.isArray(meetups)) {
    return [];
  }

  for (const meetup of meetups) {
    meetup.img = []
    for (const photo of meetup.photos) {
      meetup.img.push(await parseImg(photo, {}, {w: 400}));
    }
  }

  return meetups;
}


const parseTeamImg = async (team, length=400) => {
  if (!team.members) return

  for (let i = 0; i < team.members.length; i++) {
    const member = team.members[i];
    member.img = await parseImg(
      member.image,
      {width: length, height: length},
      {dimensions: false}
    );
  }
}


export async function getUHCTeam() {
  const team = await fetchQuery(queries.uhc_members, {});
  await parseTeamImg(team, 800);

  return team;
}


export async function getNonUHCTeams() {
  const teams = await fetchQuery(queries.non_uhc_teams, {}) ?? [];

  for (const team of teams) {
    await parseTeamImg(team, 400);
  }

  return teams;
}


export async function getFeaturedPhotos(imgDimensions=false) {
  const photos = await fetchQuery(queries.featured_photos, {}) ?? [];
  photos.images = photos.images || [];

  photos.img = [];
  for (const image of photos.images) {
    photos.img.push(await parseImg(
      image,
      {},
      {w: 400, dimensions: imgDimensions}
    ));
  }


  return photos;
}


export async function getCommunityCards(imgDimensions=false) {
  const cards = await fetchQuery(queries.community_cards, {}) ?? [];
  
  for (const card of cards) {
    card.img = await parseImg(
      card.poster,
      {width: 600, height: 600},
      {dimensions: imgDimensions}
    );
  }

  return cards;
}


export async function getCommunityLinks() {
  const communities = await fetchQuery(queries.community_cards, {}) ?? [];
  return communities;
}


export async function getCommunity(slug="") {
  const community = await fetchQuery(queries.community, {slug: slug});
  if (!community) return null;

  community.events = community.events ?? [];
  community.img = await parseImg(
    community.banner,
    {width: 1920, height: 1080},
    {w: 1920}
  )

  for (const event of community.events) {
    event.img = await parseImg(
      event.poster,
      {width: 400, height: 400},
      {w: 400}
    );
  }

  return community;
}


export async function getExtraFooterLinks() {
  const extra_footer_links = {
    extra_contact_links: await fetchQuery(
      queries.extra_footer_links,
      { "groupname": "contacts", },
    ) ?? [],

    extra_quick_links: await fetchQuery(
      queries.extra_footer_links,
      { "groupname": "quick_links", },
    ) ?? [],

    extra_useful_links: await fetchQuery(
      queries.extra_footer_links,
      { "groupname": "other_useful_links", },
    ) ?? [],
  }

  return extra_footer_links;
}