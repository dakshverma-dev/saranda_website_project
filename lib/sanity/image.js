import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder =  imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);

  // return {
  //   cropped: builder.image(source).url(),
  //   uncropped: builder.image(source.asset).url(),
  // };
}