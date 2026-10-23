export interface WebItem {
  title: string;
  href: string;
  image?: string;
  embed?: string;
  alt?: string;
  tools?: string;
  blurb: string;
}

export const liveSites: WebItem[] = [
  {
    title: "B Living",
    href: "https://bliving.co.nz/",
    image: "/images/web/bliving.webp",
    alt: "B Living website homepage",
    tools: "Figma, Framer",
    blurb: "Bespoke website for a property development company in Auckland, New Zealand.",
  },
  {
    title: "Holocryptic",
    href: "https://holocryptic.xyz",
    image: "/images/web/holocryptic.webp",
    alt: "Holocryptic website homepage",
    tools: "Zola, p5.js",
    blurb: "Home for my generative art and design project.",
  },
];

export const concepts: WebItem[] = [
  {
    title: "NimbusPlay",
    href: "https://dribbble.com/shots/21058165-NimbusPlay-Cloud-Gaming-Dashboard",
    image: "/images/web/nimbus.webp",
    alt: "NimbusPlay cloud gaming dashboard concept",
    blurb: "Cloud gaming dashboard",
  },
  {
    title: "Akai Troupe",
    href: "https://dribbble.com/shots/20991017-Akai-Troupe-Cyberpunk-Samurai-Card-Game",
    image: "/images/web/akaitroupe.webp",
    alt: "Akai Troupe landing page concept",
    blurb: "Card game landing page",
  },
  {
    title: "NeoScapes",
    href: "https://dribbble.com/shots/20925506-NeoScapes-V1-0-Immersive-Reality-Simulations",
    image: "/images/web/neoscapes.webp",
    alt: "NeoScapes landing page concept",
    blurb: "Immersive simulations landing page",
  },
  {
    title: "Isotope",
    href: "https://dribbble.com/shots/20540549-Isotope-A-portfolio",
    image: "/images/web/isotopea.webp",
    alt: "Isotope architecture portfolio concept",
    blurb: "My sister's architecture portfolio",
  },
];

// Live p5.js sketches from Holocryptic, plus two static vector series.
export const holocryptic: WebItem[] = [
  {
    title: "10Print Circuit V2",
    href: "https://holocryptic.xyz/220905/",
    embed: "https://vault.holocryptic.xyz/src/2022/0905/",
    blurb: "Click to regenerate",
  },
  {
    title: "Perlin's Storm",
    href: "https://holocryptic.xyz/210721/",
    embed: "https://vault.holocryptic.xyz/src/2021/21-X64/",
    blurb: "Flow of particles through noise",
  },
  {
    title: "Simple Flowfield",
    href: "https://holocryptic.xyz/220105/",
    embed: "https://vault.holocryptic.xyz/src/2022/0105/",
    blurb: "Perlin noise flowfield",
  },
  {
    title: "Gaussian Flow",
    href: "https://vault.holocryptic.xyz/src/2023/0101/",
    embed: "https://vault.holocryptic.xyz/src/2023/0101/",
    blurb: "Click to regenerate",
  },
];

export const vectorSeries: WebItem[] = [
  {
    title: "Exoplanets",
    href: "https://holocryptic.xyz/221120/",
    image: "/images/web/exoplanets.jpeg",
    alt: "Exoplanets vector design series",
    blurb: "Minimal, space-themed vector series",
  },
  {
    title: "Vector Experiments",
    href: "https://holocryptic.xyz/221108/",
    image: "/images/web/vector-experiments.jpeg",
    alt: "Abstract monochrome vector designs",
    blurb: "Abstract monochrome vector designs",
  },
];
