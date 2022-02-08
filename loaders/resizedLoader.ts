import attributes from "../public/images/attributes.json";

export type UploadSrc = keyof typeof attributes;

const resizedLoader = ({ src }: { src: UploadSrc }) => {
  return attributes[src];
};

export type ResizedLoader = typeof resizedLoader;

export default resizedLoader;
