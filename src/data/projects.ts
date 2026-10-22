export interface Project {
  title: string;
  href?: string;
  stack: string[];
  timeline: string;
  summary: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "Self-Hosted Game Server Platform",
    href: "/blog/7-game-server-platform/",
    stack: ["Ubuntu", "AMP", "Podman", "playit.gg"],
    timeline: "2026 – present",
    featured: true,
    summary: [
      "A multi-instance game server platform running on bare-metal Ubuntu, built so my friends and I can play modded Minecraft and Terraria without paying for hosting or depending on one person's PC staying on. AMP handles the lifecycle of each server, including backups and mod updates, while Podman containers keep every modded Minecraft server isolated from the others.",
      "Servers are exposed to players through playit.gg tunnels, so there's no router port forwarding and the home network perimeter stays closed.",
    ],
  },
  {
    title: "n8n Self-Hosting",
    href: "/blog/4-n8n-self-hosting/",
    stack: ["Docker", "n8n", "Cloudflare Zero Trust"],
    timeline: "2025",
    featured: true,
    summary: [
      "n8n workflow automation running in Docker with persistent storage, available on a custom domain over HTTPS. A Cloudflare Tunnel running as its own container handles remote access, so nothing is exposed through port forwarding.",
      "It's my sandbox for building automations that connect APIs and services.",
    ],
  },
  {
    title: "Home Server",
    stack: ["Ubuntu", "Docker", "Jellyfin", "Tailscale", "Synology NAS"],
    timeline: "2022 – present",
    summary: [
      "My home server runs Ubuntu and hosts various services through Docker containers. It uses locally redundant storage on a Synology NAS and includes Jellyfin for media streaming, accessible from anywhere via Tailscale VPN.",
      "It's both practical infrastructure and a testing ground: containers keep the host clean and make experimentation easy, and it's where I test automation scripts and workflows before using similar solutions elsewhere.",
    ],
  },
  {
    title: "Virtualised Home Lab",
    href: "/projects/virtualised-home-lab/",
    stack: ["Windows Server 2022", "KVM/QEMU", "Virt-Manager", "AD DS"],
    timeline: "2025",
    featured: true,
    summary: [
      "A virtualised environment for practising system administration in a realistic domain network, with Windows Server 2022 and Windows 11 VMs on KVM/QEMU simulating an on-premises enterprise.",
      "Fully configured Active Directory with DNS, DHCP, OUs, security groups and Group Policy, where I test GPOs and domain administration safely before doing it in production.",
    ],
  },
  {
    title: "Holocryptic",
    href: "https://holocryptic.xyz",
    stack: ["JavaScript", "p5.js"],
    timeline: "2021 – 2023",
    summary: [
      "A creative coding project exploring mathematics and generative art, coded in p5.js, a JavaScript port of Processing.",
      "The project has concluded, but it taught me to think about problems differently: creative coding means balancing randomness with control, and performance with visual complexity.",
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages & scripting", items: ["PowerShell", "Bash", "Python", "JavaScript / TypeScript"] },
  {
    group: "Systems & infrastructure",
    items: [
      "Windows Server 2022",
      "Active Directory & Entra ID",
      "Intune",
      "Microsoft Graph API",
      "Group Policy",
      "DNS & DHCP",
      "Linux (Arch & Ubuntu)",
      "KVM/QEMU, Virt-Manager",
    ],
  },
  {
    group: "Containers & DevOps",
    items: ["Docker", "Podman", "Git / GitHub", "GitHub Actions", "Cloudflare (DNS, Tunnels, Workers)"],
  },
  {
    group: "Tools & platforms",
    items: ["ServiceNow", "Datto RMM", "Microsoft 365 & SharePoint", "8x8", "Tailscale", "Domain management"],
  },
  { group: "Cloud & networking", items: ["Azure", "Remote Desktop Services", "VPN configuration", "Network administration"] },
  {
    group: "Development & design",
    items: ["VS Code", "Vim", "Astro", "React & React Native", "Figma & Penpot", "Framer", "p5.js", "Zola"],
  },
];
