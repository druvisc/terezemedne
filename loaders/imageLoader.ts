import { DEFAULT_IMAGE_WIDTH } from "../constants/images";

import { isWebpSupported } from "../utils";

const WEBP_IS_SUPPORTED = process.browser && isWebpSupported();

const imageLoader = ({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  const loaded = src.replace(`${DEFAULT_IMAGE_WIDTH}`, `${width}`);

  // Workaround for next/image w/o a <picture> element to use webp for supported browsers.
  if (WEBP_IS_SUPPORTED) {
    return `${loaded.split(".").slice(0, -1).join(".")}.webp`;
  }

  return loaded;
};

export default imageLoader;
