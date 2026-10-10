import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/ui-02-holographic-badge",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
