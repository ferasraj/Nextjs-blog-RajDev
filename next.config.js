/** @type {import('next').NextConfig} */
const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  compiler: {
    removeConsole: true,
  },
  experimental: {
    appDir: true, // 👈 هذا اللي ناقص
  },
  swcMinify: true,
};

module.exports = withContentlayer({ ...nextConfig });
