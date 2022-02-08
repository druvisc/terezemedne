const DEFAULT_WIDTH = "3840";

const imageLoader = ({
  src,
  width,
  // quality = 75,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  const loaded = src.replace(DEFAULT_WIDTH, `${width}`);

  return loaded;
};

export default imageLoader;
