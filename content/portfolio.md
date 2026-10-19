+++
title = "Portfolio"
page_template = "page.html"
+++

<div class="portfolio">

<div class="projects">

<div class="project">

<h1 class="portfolio-title">Projects</h1>

</div>

<div class="project">

### [Self-Hosted Game Server Platform](@/blog/7.game-server-platform.md)

**Tech Stack:** Ubuntu, AMP, Podman, playit.gg  
**Timeline:** 2026 - Present

A multi-instance game server platform running on bare-metal Ubuntu, built so my friends and I can play modded Minecraft and Terraria without paying for hosting or depending on one person's PC staying on. AMP handles the lifecycle of each server, including backups and mod updates, while Podman containers keep every modded Minecraft server isolated from the others.

Servers are exposed to players through playit.gg tunnels, so there's no router port forwarding and the home network perimeter stays closed. Read the full write-up in [the blog post](@/blog/7.game-server-platform.md).

</div>

<div class="project">

### [n8n Self-Hosting](/blog/4-n8n-self-hosting)

Tech Stack: Docker, n8n, Cloudflare Zero-Trust

Timeline: 2025

[n8n](https://n8n.io/) workflow automation running in Docker with persistent storage, available on a custom domain over HTTPS. A Cloudflare Tunnel running as its own container handles remote access, so nothing is exposed through port forwarding.

It's my sandbox for building automations that connect APIs and services.

</div>

<div class="project">

### Home Server

Tech Stack: Ubuntu, Docker, Jellyfin, Tailscale VPN, Synology NAS

Timeline: 2022 - Present

My home server runs Ubuntu and hosts various services through Docker containers. It uses locally redundant storage on a Synology NAS and includes Jellyfin for media streaming, accessible from anywhere via Tailscale VPN.

This setup serves as both practical infrastructure and a testing ground for new technologies. I use Docker extensively to spin up containers for testing different applications—keeping the host system clean and making experimentation easy. It's where I test automation scripts and workflows before implementing similar solutions elsewhere.

</div>

<div class="project">

### [Virtualised Home Lab](/projects/virtualised-home-lab)

Tech Stack: Windows Server 2022, KVM/QEMU, Virt-Manager, Active Directory Domain Services

Timeline: 2025

Built a virtualised environment to practice system administration in a realistic domain network. Using KVM/QEMU, I've deployed Windows Server 2022 and Windows 11 VMs to simulate an on-premises enterprise environment.

The lab includes a fully configured Active Directory setup with DNS, DHCP, organizational units, security groups, and Group Policy Objects. It's where I test GPO configurations, practice user and group management, and experiment with domain administration tasks in a safe environment before implementing them in production.

</div>

<div class="project">

### [Holocryptic](https://holocryptic.xyz)

<!-- ![Holocryptic - Perlin Alps](/images/projects/PerlinAlps.png) -->

<embed type="text/html" src="https://vault.holocryptic.xyz/src/2021/21-X64/" width="400" height="400" />

Tech Stack: JavaScript, p5.js

Timeline: 2021 - 2023

A creative coding project where I explored elements of mathematics and generative art. The animations are coded in [p5.js](https://p5js.org/), a JavaScript port of the Java based language [Processing](https://processing.org/).

While the project has concluded, it was an incredible learning experience that taught me to think about problems differently. Creative coding requires balancing randomness with control, performance with visual complexity. You can still view some of my favorite pieces on the homepage and explore the full collection at holocryptic.xyz.

</div>

</div>

<div class="skills">

<h1 class="portfolio-title">Skills<hr/></h1>

### Languages & Scripting

- PowerShell
- Bash
- Python
- JavaScript/TypeScript

### Systems & Infrastructure

- Windows Server 2022
- Active Directory & Entra ID (Azure AD)
- Intune
- Microsoft Graph API
- Group Policy Management
- DNS & DHCP
- Linux (Arch & Ubuntu)
- Virtual Machines (KVM/QEMU, Virt-Manager)

### Containers & DevOps

- Docker
- Podman
- Git/GitHub
- GitHub Actions (CI/CD)
- Cloudflare (DNS, Tunnels, Workers)

### Tools & Platforms

- ServiceNow
- Datto RMM
- Microsoft 365 & SharePoint
- 8x8
- Tailscale VPN
- Domain management (Cloudflare, Namecheap, GoDaddy, Squarespace)

### Cloud & Networking

- Azure
- Remote Desktop Services
- VPN configuration
- Network administration

### Development & Design

- VS Code
- Vim
- Astro
- React & React Native
- Figma & Penpot
- Framer
- p5.js
- Zola

</div>

</div>