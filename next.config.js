/** @type {import('next').NextConfig} */
const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  compiler: {
    removeConsole: true,
  },
  experimental: {
    // appDir: true, // 👈 هذا اللي ناقص
  },
  swcMinify: true,
  async headers() {
    return [
      {
        source: "/:path*.xml",
        headers: [
          {
            key: "Content-Type",
            value: "text/xml; charset=utf-8",
          },
        ],
      },
    ];
  },
};

module.exports = withContentlayer({ ...nextConfig });
