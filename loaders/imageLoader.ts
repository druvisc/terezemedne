// TODO: Create imageSaver for naming.
// "src" is "publicUri" (image uri used in content files to access the uploaded image).
const imageLoader = ({ src, width }: { src: string; width: number }) => {
  const split = src.split(".");
  const ext = split[split.length - 1];
  const fileName = split.slice(0, split.length - 1).join(".");

  // Map uploaded image to resized image.
  const img = `${fileName.replace("uploads", "resized")}-${width}.${ext}`;

  return img;
};

export default imageLoader;
