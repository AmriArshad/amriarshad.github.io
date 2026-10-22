import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://amri.dev",
  output: "static",
  integrations: [sitemap()],
  redirects: {
    "/portfolio": "/projects/",
  },
  markdown: {
    shikiConfig: {
      themes: { light: "catppuccin-latte", dark: "catppuccin-mocha" },
      defaultColor: false,
    },
  },
});
