import { Breakpoint, BREAKPOINTS } from "../styles/variables";

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

export const getSizes = (map: Partial<typeof BREAKPOINTS> = {}) => {
  const sizes = `${Object.entries(map).reduce(
    (sizes, [breakpoint, size]) =>
      `${sizes}
      (min-width: ${BREAKPOINTS[breakpoint as Breakpoint]}) ${size},`,
    ``
  )}
  100vw`;

  return sizes;
};
