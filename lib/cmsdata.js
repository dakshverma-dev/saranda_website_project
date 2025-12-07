import { client } from "./sanity/client";
import { urlFor } from "./sanity/image";
import { getPlaiceholder } from "plaiceholder";
import { queries } from "./sanity/queries";
import eventPlaceholderImg from "@/public/images/Event_poster_not_available.png";
import personPlaceholderImg from "@/public/images/person_placeholder.jpeg";


async function fetchQuery(query, params={}, tags=[]) {
  try {
    return await client.fetch(
      query,
      params,
      {
        next: {
          tags: tags,
          revalidate: Number(process.env.REVALIDATION_PERIOD) ?? 30,
        }
      }
    )
  }
  catch(e) {
    console.warn("SANITY FETCH ERROR:", e);
    return null;
  }
}


async function parseImage(image, {defaultImage=null, getDimensions=false} = {}) {
  if(!image) return {
    cropped: defaultImage,
    uncropped: defaultImage,
  }
  const croppedDimenstions = getDimensions === "cropped" || getDimensions === "both" || getDimensions === true;
  const uncroppedDimenstions = getDimensions === "uncropped" || getDimensions === "both" || getDimensions === true;

  const urls = urlFor(image);
  return {
    cropped: {
      src: urls.cropped,
      placeholder: "blur",
      ...await getPlaceholderAttributes(urls.cropped, croppedDimenstions)
    },
    uncropped: {
      src: urls.uncropped,
      placeholder: "blur",
      ...await getPlaceholderAttributes(urls.uncropped, uncroppedDimenstions)
    },
  }
}


async function getPlaceholderAttributes(src, getDimenstions=false) {
  const imgBuffer = Buffer.from(await fetch(src).then(res => res.arrayBuffer()));
  const { base64, metadata: {height, width} } = await getPlaiceholder(imgBuffer);

  if (getDimenstions) return {
    blurDataURL: base64,
    height: height,
    width: width,
  }
  else return {
    blurDataURL: base64,
  }
}


export async function getGalleryPictures() {
  const pictures = await fetchQuery(queries.gallery_photos.query) ?? {};
  pictures.images = pictures.images || [];

  pictures.img = [];
  for (const image of pictures.images) {
    pictures.img.push(await parseImage(image, { getDimensions: true }));
  }

  return pictures;
}


export async function getEventPosts(isPast = false) {
  const events = await fetchQuery(
    isPast ? queries.past_events.query : queries.current_events.query,
  ) ?? [];

  for (const event of events) {
    event.img = await parseImage(
      event.poster,
      {
        getDimensions: true,
        defaultImage: {
          src: eventPlaceholderImg,
          placeholder: "blur",
        },
      }
    );
  }

  return events;
}


export async function getMeetupPosts(region=null) {
  const meetups = ( region
    ? await fetchQuery(queries.meetup_posts_from.query, { region: region })
    : await fetchQuery(queries.meetup_posts.query) ?? []
  );

  if (!meetups || !Array.isArray(meetups)) {
    return [];
  }

  for (const meetup of meetups) {
    meetup.img = []
    for (const photo of meetup.photos) {
      meetup.img.push(await parseImage( photo, { getDimensions: true }));
    }
  }

  return meetups;
}


const parseTeamImg = async (team) => {
  if (!team.members) return

  for (let i = 0; i < team.members.length; i++) {
    const member = team.members[i];
    member.img = await parseImage(member.image, {
      defaultImage: {
        src: personPlaceholderImg,
        placeholder: "blur",
      }
    });
  }
}


export async function getUHCTeam() {
  const team = await fetchQuery(queries.uhc_members.query);
  await parseTeamImg(team);

  return team;
}


export async function getNonUHCTeams() {
  const teams = await fetchQuery(queries.non_uhc_teams.query) ?? [];

  for (const team of teams) {
    await parseTeamImg(team);
  }

  return teams;
}


export async function getFeaturedPhotos(imgDimensions=false) {
  const photos = await fetchQuery(queries.featured_photos.query) ?? [];
  photos.images = photos.images || [];

  photos.img = [];
  for (const image of photos.images) {
    photos.img.push(await parseImage(image));
  }


  return photos;
}


export async function getCommunityCards(imgDimensions=false) {
  const cards = await fetchQuery(queries.community_cards.query) ?? [];
  
  for (const card of cards) {
    card.img = await parseImage(card.poster);
  }

  return cards;
}


export async function getCommunityLinks() {
  const communities = await fetchQuery(queries.community_cards.query) ?? [];
  return communities;
}


export async function getCommunity(slug="") {
  const community = await fetchQuery(queries.community.query, {slug: slug});
  if (!community) return null;

  community.events = community.events ?? [];
  community.img = await parseImage(community.banner, { getDimensions: true });

  for (const event of community.events) {
    event.img = await parseImage(event.poster, { getDimensions: true });
  }

  return community;
}


export async function getExtraFooterLinks() {
  const extra_footer_links = {
    extra_contact_links: await fetchQuery(
      queries.extra_footer_links.query,
      { "groupname": "contacts", },
    ) ?? [],

    extra_quick_links: await fetchQuery(
      queries.extra_footer_links.query,
      { "groupname": "quick_links", },
    ) ?? [],

    extra_useful_links: await fetchQuery(
      queries.extra_footer_links.query,
      { "groupname": "other_useful_links", },
    ) ?? [],
  }

  return extra_footer_links;
}