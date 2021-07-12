/* eslint-disable no-undef */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  filenameHashing: false,
  publicPath: process.env.NODE_ENV === "production" ? "/StreetView/" : "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/src"),
      "~": path.resolve(__dirname, "node_modules"),
    },
  },
});
