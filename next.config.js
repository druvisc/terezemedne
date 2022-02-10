const { DEVICE_SIZES, IMAGE_SIZES } = require("./constants");

// TODO: Fix connect-src wildcard for Safari: https://github.com/graphile/starter/pull/244
const ContentSecurityPolicy = `
  default-src 'none';
  base-uri 'self';
  connect-src 'self' *;
  script-src 'self' 'unsafe-eval' www.youtube.com;
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  img-src 'self' data:;
  frame-src www.youtube.com;
`;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // optimizeFonts: false,
  productionBrowserSourceMaps: true,
  images: {
    loader: "custom",
    deviceSizes: DEVICE_SIZES,
    imageSizes: IMAGE_SIZES,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
    ];
  },
};
