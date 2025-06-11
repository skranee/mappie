import { defineConfig, mergeConfig } from "vite";
import baseConfig from "./vite-base.config";

export default mergeConfig(
  baseConfig,
  defineConfig({
    mode: "development",
    server: {
      hmr: true,
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify("development"),
    },
  }),
);
