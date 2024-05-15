import { resolve } from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    coverage: {
      include: ["app/**"],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./"),
    },
  },
});
