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

export default imageLoader;
