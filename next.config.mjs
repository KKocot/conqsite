import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // This is to handle the canvas package which is not compatible with the browser
    config.externals = [...(config.externals || []), { canvas: "canvas" }];

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "nginx",
        port: "8080",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
