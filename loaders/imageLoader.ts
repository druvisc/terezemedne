import { DEFAULT_IMAGE_WIDTH } from "../constants";

const imageLoader = ({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  const loaded = src.replace(`${DEFAULT_IMAGE_WIDTH}`, `${width}`);

  return loaded;
};

export default imageLoader;
