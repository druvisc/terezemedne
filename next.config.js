// "max-width: 80rem (1280px)" is defined on components/Layout,
// so largest image on a retina screen would be 2560px -
// let's say 1920px is close enough.
const DEVICE_SIZES = [768, 992, 1200, 1920];

// Full width, half width.
const IMAGE_SIZES = DEVICE_SIZES.flatMap((size) => [size / 2]);

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    loader: "custom",
    deviceSizes: DEVICE_SIZES,
    imageSizes: IMAGE_SIZES,
  },
};
