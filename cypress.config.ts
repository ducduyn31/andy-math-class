import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "x827ym",
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    supportFile: "cypress/support/component.tsx",
  },

  env: {
    MAILTRAP_TOKEN: "",
    MAILTRAP_ACCOUNT_ID: "",
    MAILTRAP_INBOX_ID: "",
    SUPABASE_URL: "",
    SUPABASE_KEY: "",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
