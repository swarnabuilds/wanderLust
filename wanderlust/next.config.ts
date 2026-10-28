import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents:false,
  reactCompiler: true,
  experimental: {
    // Run the React Compiler natively inside Turbopack instead of the
    // Node.js babel-loader subprocess (which crashes/times out on Windows).
    turbopackRustReactCompiler: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
