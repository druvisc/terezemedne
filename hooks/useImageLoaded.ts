import { ImgHTMLAttributes, useState } from "react";

export type ImageAttributes = ImgHTMLAttributes<HTMLImageElement>;

const useImageLoaded = (
  attrs: Pick<ImageAttributes, "srcSet" | "sizes" | "src">,
  load: boolean = true
) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (imageLoaded) return true;

  if (!load) return false;

  const img = new Image();

  img.onerror = () => {
    console.error(`Could not load image "${attrs.src}"!`);
  };

  img.onload = () => {
    setImageLoaded(img.complete);
  };

  img.srcset = attrs.srcSet || "";
  img.sizes = attrs.sizes || "";
  img.src = attrs.src || "";

  return imageLoaded;
};

export default useImageLoaded;
