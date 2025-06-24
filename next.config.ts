import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: '1gb', // Set the body size limit to 1GB
    },
  },
}

export default nextConfig;
