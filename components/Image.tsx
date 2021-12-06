/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import React, { ImgHTMLAttributes, useEffect } from "react";

import { randomInt } from "../utils";

import ImageAttributes from "../public/images/attributes.json";

const MIN_RANDOM_WIDTH = 300;
const MAX_RANDOM_WIDTH = 500;

export type ImageSrc = string; // keyof typeof ImageAttributes;

export type Props = ImgHTMLAttributes<HTMLImageElement> & {
  src: ImageSrc;
  useOriginal?: boolean;
  randomWidth?: boolean;
};

export const Image = ({
  src,
  sizes = "100vw",
  useOriginal,
  randomWidth,
  ...rest
}: Props) => {
  const attrs = (ImageAttributes as any)[src] || {};
  attrs.sizes = sizes;

  if (useOriginal) {
    attrs.src = src;
    attrs.srcSet = "";
  } else if (!attrs) {
    throw new Error(`Missing attributes for image "${src}"!`);
  }

  useEffect(() => {
    if (randomWidth) {
      const width = randomInt(MIN_RANDOM_WIDTH, MAX_RANDOM_WIDTH);
      const scale = (attrs.width as number) / width;

      (attrs.width as number) /= scale;
      (attrs.height as number) /= scale;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <img {...rest} {...attrs} />;
};
