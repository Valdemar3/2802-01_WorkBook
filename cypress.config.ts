import { defineConfig } from "cypress";

export default defineConfig({
  viewportHeight: 1200,
  viewportWidth: 1600,
  e2e: {
    retries: 2,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
