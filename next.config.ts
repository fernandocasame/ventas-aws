import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    domains: ['i.ibb.co','www.facebook.com'], // dominios permitidos
  },
};

export default nextConfig;
