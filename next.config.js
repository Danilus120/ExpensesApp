/** @type {import('next').NextConfig} */
// const withPWA = require("next-pwa");

const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
};

// module.exports = withPWA({
//   pwa: {
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//   },
// });

module.exports = nextConfig;
