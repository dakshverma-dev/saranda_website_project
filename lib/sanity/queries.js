export const queries = {
  gallery_photos: {
    query: `
      *[_type == "photoset" && setname == "art_gallery"][0]{
        images,
      }`,
    doctype: "photoset",
    tag: "art",
    routes: ["/art_gallery"],
  },

  current_events: {
    query: `
      *[_type == "event" && enddate > now()] | order(enddate desc) {
        _id,
        eventname,
        description,
        "links": links[]{text,url,_key},
        poster,
      }`,
    doctype: "event",
    tag: "current_events",
    routes: ["/events", "/events/current"],
  },

  past_events: {
    query: `
      *[_type == "event" && enddate <= now()] | order(enddate desc){
        _id,
        eventname,
        description,
        "links": links[]{text,url,_key},
        poster,
      }`,
    doctype: "event",
    tag: "past_events",
    routes: ["/events", "/events/past"],
  },

  meetup_posts: {
    query: `
      *[_type == "meetup"] | order(date desc){
        _id,
        meetupname,
        description,
        date,
        photos,
      }`,
    doctype: "meetup",
    tag: "meetups",
    routes: ["/meetups", "/meetups/[region]"],
  },

  meetup_posts_from: {
    query: `
      *[_type == "meetup" && region == $region ] | order(date desc){
        _id,
        meetupname,
        description,
        date,
        photos,
      }`,
    doctype: "meetup",
    tag: "meetups",
    routes: ["/meetups", "/meeetups/[region]"],
  },

  uhc_members: {
    query: `
      *[_type == "team" && teamname == "uhc"][0]{
        "name": longname,
        "members": members[]{
          _key,
          fullname,
          email,
          position,
          image,
          github,
          linkedin,
          instagram,
        }
      }`,
    doctype: "team",
    tag: "uhc",
    routes: ["/know_us"],
  },

  non_uhc_teams: {
    query: `
      *[_type == "team" && teamname != "uhc"] | order(index asc) {
        _id,
        "name": longname,
        "members": members[]{
          _key,
          fullname,
          email,
          position,
          image,
          github,
          linkedin,
          instagram,
        }
      }`,
    doctype: "team",
    tag: "nonuhc",
    routes: ["/know_us"],
  },

  featured_photos: {
    query: `
      *[_type == "photoset" && setname == "featured_photos"][0]{
        images,
      }`,
    doctype: "photoset",
    tag: "featured",
    routes: ["/"],
  },

  community_cards: {
    query: `
      *[_type == "community"]{
        _id,
        title,
        description,
        "slug": slug.current,
        "poster": card_poster,
      }`,
    doctype: "community",
    tag: "communities",
    routes: ["/"],
  },

  community: {
    query: `
        *[_type == "community" && slug.current == $slug][0]{
          _id,
          title,
          description,
          "slug": slug.current,
          joining_form,
          banner,
          events[]{
            _key,
            title,
            description,
            poster
          }
        }`,
    tag: "communities",
    routes: ["/community", "/community/[slug]"],
  },

  communitieslinks: {
    query: `
      *[_type == "community"]{
        _id,
        "slug": slug.current,
      }`,
    doctype: "community",
    tag: "communities",
    routes: [
      "/", "/know_us", "/events", "/meetups", "/art_gallery", "/community"
    ],
  },

  extra_footer_links: {
    query: `
      *[_type == "extra_footer_links" && link_group_name == $groupname]{
        "links": links[]{text,url}
      }.links[]`,
    doctype: "extra_footer_links",
    tag: "footer",
    routes: [
      "/", "/know_us", "/events", "/meetups", "/art_gallery", "/community"
    ],
  },
}


export function getAllTagsAndRoutes(doctype = null) {
  const alltags = new Set();
  const allroutes = new Set();

  for (const q of Object.values(queries)) {
    if (!(doctype && q.doctype === doctype))
      continue;

    alltags.add(q.tag);
    q.routes.forEach(route => {
      alltags.add(route);
      allroutes.add(route);
    })
  }

  return {
    alltags: [...alltags].sort(),
    allroutes: [...allroutes].sort()
  };
}