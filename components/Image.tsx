/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import cx from "classnames";

import { useIntersection } from "../hooks/useIntersection";
import { ImageAttributes } from "../hooks/useImageLoaded";

import defaultImageLoader from "../loaders/imageLoader";
import defaultResizedLoader, {
  ResizedLoader,
  UploadSrc,
} from "../loaders/resizedLoader";

import { getSizes } from "../utils";

const WEBP = "webp";

export type ImageProps = Omit<ImageAttributes, "src" | "sizes"> & {
  src: UploadSrc;
  sizes?: Parameters<typeof getSizes>[0];
  containHeight?: boolean;
  resizedLoader?: ResizedLoader;
  loader?: typeof defaultImageLoader;
};

export const Image = ({
  className,
  src: uploadSrc,
  sizes: sizeMap = {},
  resizedLoader = defaultResizedLoader,
  containHeight = true,
  width: containerWidth,
  height: containerHeight,
  loader = defaultImageLoader,
  ...rest
}: ImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const sizes = getSizes(sizeMap);

  const { width, height, srcSet, src, format } = resizedLoader({
    src: uploadSrc,
  });

  useIntersection(ref, () => {
    setIsInView(true);
  });

  const commonClassnames = cx([{ "max-h-[70vh]": containHeight }]);

  const commonStyles = {
    width,
    height,
  };

  const quotient = height / width;
  const paddingTop = isNaN(quotient) ? "100%" : `${quotient * 100}%`;

  const placeHolderStyles = {
    ...commonStyles,
    paddingTop,
    maxWidth: "100%",
  };

  const imgAttributes = {
    width,
    height,
    srcSet,
    sizes,
    src,
    className: `${commonClassnames} object-contain animate-fade-in`,
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ width: containerWidth, height: containerHeight }}
    >
      {isInView ? (
        <picture>
          <source
            type="image/webp"
            srcSet={imgAttributes.srcSet.replaceAll(format, WEBP)}
            sizes={imgAttributes.sizes}
          />

          <source
            type={`image/${format}`}
            srcSet={imgAttributes.srcSet}
            sizes={imgAttributes.sizes}
          />

          <img {...rest} {...imgAttributes} alt={rest.alt || ""} />
        </picture>
      ) : (
        <div className={commonClassnames} style={placeHolderStyles}></div>
      )}
    </div>
  );
};
