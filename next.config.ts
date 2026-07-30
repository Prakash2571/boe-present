import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle (.next/standalone) so the Docker
  // runtime image only needs the traced node_modules, not the full tree.
  output: "standalone",
};

export default nextConfig;
