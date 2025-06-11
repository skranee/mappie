import { defineConfig, mergeConfig } from "vite";
import baseConfig from "./vite-base.config";

export default mergeConfig(
  baseConfig,
  defineConfig({
    mode: "production",
    build: {
      outDir: "dist",
      assetsDir: "assets",
      emptyOutDir: true,
      sourcemap: true,
      minify: "esbuild",
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
  }),
);
