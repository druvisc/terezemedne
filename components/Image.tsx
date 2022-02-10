import React, { useState } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import cx from "classnames";

import defaultImageLoader from "../loaders/imageLoader";
import defaultResizedLoader, {
  ResizedLoader,
  UploadSrc,
} from "../loaders/resizedLoader";

import { getSizes } from "../utils";

export type ImageProps = Omit<NextImageProps, "src" | "sizes"> & {
  src: UploadSrc;
  sizes?: Parameters<typeof getSizes>[0];
  containHeight?: boolean;
  resizedLoader?: ResizedLoader;
};

export const Image = ({
  className,
  src: uploadSrc,
  sizes = {},
  resizedLoader = defaultResizedLoader,
  containHeight = true,
  width: containerWidth,
  height: containerHeight,
  loader = defaultImageLoader,
  ...rest
}: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { width, height, src } = resizedLoader({ src: uploadSrc as UploadSrc });

  return (
    <div
      className={cx([
        "opacity-0 transition-opacity duration-1000",
        { "opacity-100": isLoaded },
        className,
        "w-full",
        { "image-contain-height": containHeight },
      ])}
      style={{ width: containerWidth, height: containerHeight }}
    >
      <NextImage
        {...rest}
        sizes={getSizes(sizes)}
        src={src}
        width={width}
        height={height}
        layout="responsive"
        objectFit="contain"
        loader={loader}
        onLoadingComplete={() => {
          setIsLoaded(true);
        }}
      />
    </div>
  );
};
