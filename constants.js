// "max-width: 80rem (1280px)" is defined on components/Layout,
// so largest image on a retina screen would be 2560px -
// let's say 1920px is close enough.
const DEVICE_SIZES = [768, 992, 1200, 1920];
// Only full width and half width images are used.
const IMAGE_SIZES = DEVICE_SIZES.flatMap((size) => [size / 2]);
// Array of all necessary image widths.
const IMAGE_WIDTHS = [...DEVICE_SIZES, ...IMAGE_SIZES].sort((a, b) => a - b);

module.exports = {
  UPLOADS_DIR: "./public/images/uploads",
  RESIZED_DIR: "./public/images/resized",
  IMAGE_QUALITY: 70,

  IMAGE_ATTRIBUTES_URI: "./public/images/attributes.json",

  DEVICE_SIZES,
  IMAGE_SIZES,
  IMAGE_WIDTHS,
  // Use largest image size by default.
  DEFAULT_IMAGE_WIDTH: IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1],
};
