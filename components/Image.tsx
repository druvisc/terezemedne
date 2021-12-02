/* eslint-disable @next/next/no-img-element */
import React, { ImgHTMLAttributes } from "react";

import { randomInt } from "../utils";

import { WIDTHS } from "../constants/sharp";

import ImageMeta from "../public/images/meta.json";

export type ImageSrc = keyof typeof ImageMeta;

export type Props = ImgHTMLAttributes<HTMLImageElement> & {
  src: ImageSrc;
};

export const Image = ({ src, sizes, ...rest }: Props) => {
  const attrs = {
    ...rest,
    ...getImageAttributes(src, sizes),
  };

  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...attrs} />;
};

const getImageAttributes = (src: ImageSrc, sizes: Props["sizes"] = "100vw") => {
  const meta = ImageMeta[src];
  if (!meta) {
    throw new Error(`Missing image meta for image "${src}"!`);
  }

  return {
    width: meta.width,
    height: meta.height,
    sizes,
    srcSet: WIDTHS.map(
      (width) => `${imageLoader({ src, width })} ${width}w`
    ).join(", "),
    // "src" has to be last.
    src: imageLoader({ src, width: WIDTHS[WIDTHS.length - 1] }),
  };
};

// TODO: Create imageSaver for naming.
const imageLoader = ({ src, width }: { src: string; width: number }) => {
  const split = src.split(".");
  const ext = split[split.length - 1];

  const img = `${split
    // Remove ext.
    .slice(0, split.length - 1)
    .join(".")
    // Directory changed to use resized images.
    .replace("uploads", "resized")}-${width}.${ext}`;

  return img;
};

const MIN_RANDOM_WIDTH = 300;
const MAX_RANDOM_WIDTH = 500;

export const RandomWidthImage = React.memo(({ src, sizes, ...rest }: Props) => {
  const attrs = {
    ...getImageAttributes(src, sizes),
    ...rest,
  };

  const randomWidth = randomInt(MIN_RANDOM_WIDTH, MAX_RANDOM_WIDTH);
  const scale = (attrs.width as number) / randomWidth;

  (attrs.width as number) /= scale;
  (attrs.height as number) /= scale;

  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...attrs} />;
});
RandomWidthImage.displayName = "RandomWidthImage";
