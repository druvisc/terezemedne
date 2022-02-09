const { DEVICE_SIZES, IMAGE_SIZES } = require("./constants");

const ContentSecurityPolicy = `
  default-src 'none';
  script-src 'self' 'unsafe-eval';
  connect-src 'self';
  img-src 'self' data:;
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  base-uri 'self';
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
