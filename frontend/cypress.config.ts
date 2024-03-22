import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    baseUrl: "http://localhost:3000",
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1200,
    viewportHeight: 1200,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
