import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["192.168.0.106"],
  turbopack: {
    // motion-utils ESM barrel (dist/es/index.mjs) references sub-files that
    // don't exist in the published package. Alias to the CJS bundle instead.
    resolveAlias: {
      "motion-utils": "./node_modules/motion-utils/dist/cjs/index.js",
    },
  },
};

export default nextConfig;
