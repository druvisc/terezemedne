export const randomInt = (min: number, max: number) => {
  const num = Math.random() * (max - min) + min;

  return Math.round(num);
};

export const isWebpSupported = () => {
  const canvas = document.createElement("canvas");

  return (
    canvas.getContext &&
    canvas.getContext("2d") &&
    canvas.toDataURL("image/webp").indexOf("data:image/webp") == 0
  );
};
