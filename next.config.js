const { DEVICE_SIZES, IMAGE_SIZES } = require("./constants");

const ContentSecurityPolicy = `
  default-src 'none';
  script-src 'self' 'unsafe-eval';
  connect-src 'self';
  img-src 'self' data:;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com/;
  font-src 'self' https://fonts.gstatic.com/;
  base-uri 'self';
`;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
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
