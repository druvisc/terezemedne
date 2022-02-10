const {
  DEVICE_SIZES,
  IMAGE_SIZES,
  CONFIG: { isDev },
} = require("./constants");

const ContentSecurityPolicy = `
  default-src 'none';
  base-uri 'self';
  connect-src 'self' ${
    // Local development websocket wildcard for Safari: https://github.com/graphile/starter/pull/244
    isDev ? "*" : ""
  };
  script-src 'self' 'unsafe-eval' www.youtube.com;
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  img-src 'self' data:;
  frame-src www.youtube.com;
`;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  optimizeFonts: false,
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
