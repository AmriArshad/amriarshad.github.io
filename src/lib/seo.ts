// Search and sharing metadata shared by the layout and pages: the preview image URL and schema.org
// structured data (JSON-LD) that Google reads for rich results.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { site } from "../data/site";

// Discord, Slack and friends cache previews by image URL, so a hash of the file goes in the query:
// re-rendering og.png changes the URL and they fetch the new one.
const ogHash = createHash("sha256")
  .update(readFileSync(join(process.cwd(), "public/og.png")))
  .digest("hex")
  .slice(0, 10);
export const ogImage = new URL(`/og.png?v=${ogHash}`, site.url).href;

const abs = (path: string) => new URL(path, site.url).href;

// One stable @id per entity lets every page point back at the same person and website.
const personId = abs("/#person");
const websiteId = abs("/#website");

export const person = {
  "@type": "Person",
  "@id": personId,
  name: site.name,
  url: site.url,
  image: ogImage,
  jobTitle: "IT Operations Specialist",
  description: site.description,
  address: { "@type": "PostalAddress", addressLocality: "Auckland", addressCountry: "NZ" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Auckland" },
  knowsAbout: [
    "Active Directory",
    "Microsoft Entra ID",
    "PowerShell",
    "Linux",
    "Self-hosting",
    "Web development",
    "Generative art",
  ],
  sameAs: [site.github, site.linkedin, site.dribbble, "https://holocryptic.xyz"],
};

export const website = {
  "@type": "WebSite",
  "@id": websiteId,
  url: site.url,
  name: "amri.dev",
  description: site.description,
  inLanguage: "en-NZ",
  publisher: { "@id": personId },
};

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function blogPosting(post: { title: string; description: string; date: Date; path: string }) {
  return {
    "@type": "BlogPosting",
    "@id": abs(post.path) + "#post",
    headline: post.title,
    description: post.description,
    datePublished: post.date.toISOString(),
    url: abs(post.path),
    mainEntityOfPage: abs(post.path),
    image: ogImage,
    inLanguage: "en-NZ",
    // Name the author inline as well as by @id: Google's article check wants author.name on the post.
    author: { "@type": "Person", "@id": personId, name: site.name, url: site.url },
    publisher: { "@type": "Person", "@id": personId, name: site.name, url: site.url },
    isPartOf: { "@id": websiteId },
  };
}
