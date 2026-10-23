import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { readdirSync, readFileSync } from "node:fs";

// Post dates from front matter, keyed by URL, so the sitemap can tell search engines when each post
// was published. Other pages get no lastmod rather than a made-up one.
const postDates = Object.fromEntries(
  readdirSync("src/content/blog")
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const date = readFileSync(`src/content/blog/${f}`, "utf8").match(/^date:\s*(\S+)/m)?.[1];
      return [`https://amri.dev/blog/${f.replace(/\.md$/, "")}/`, date];
    })
    .filter(([, date]) => date),
);

export default defineConfig({
  site: "https://amri.dev",
  output: "static",
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      serialize(item) {
        const date = postDates[item.url];
        if (date) item.lastmod = new Date(date).toISOString();
        return item;
      },
    }),
  ],
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
