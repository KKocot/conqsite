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
        hostname: process.env.NEXT_PUBLIC_IMAGES_IP_HOST ?? "nginx",
        port: process.env.NEXT_PUBLIC_IMAGES_IP_PORT ?? "8080",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
