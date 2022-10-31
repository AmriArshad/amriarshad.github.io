+++
title = "Setting up personal servers"
date = 2022-10-31
+++

Recently I came across a few extremely useful resources on the topic of setting up servers for website and personal service hosting.
<!-- more -->

### Virtual Private Server (VPS)

The first server I set up was actually a VPS via a service called Vultr. I chose the cheapest server plan at roughly $5 a month and chose Debian as the operating system since I've never tried it before. I then purchased the domain [negiland.xyz](http://negiland.xyz/) from NameCheap and connected my newly bought server and domain via DNS Records. Next up was setting up NginX for hosting websites, and finally using Certbot to enable encrypted connections over HTTPS/SSL. I also set up a cronjob that renews the SSL certificate every month. I also set up a few other things such as ssh keys and ohmyzsh to make things easier.

### Self Hosting

I've wanted to have my own cloud storage for a while, so I thought why not utilise an old computer as a home server. I decided to install Ubuntu desktop just to keep things a bit different from my VPS. I then configured a static ip address and installed openSSH server so that I could ssh into my home server remotely. From there I was able to install and set up Samba for file sharing throughout my network. To store my files I used a 2TB external hard drive. I also have some HDDs lying around from old laptops that I want to install in the future.

In addition to cloud storage I also set up a docker compose image for [Yacht](https://yacht.sh/). Yacht is basically a container management UI that allows you to easily manage and deploy other containers. Using Yacht, I deployed my own instance of Pi-hol, which pretty much removes most ads for all the devices on my network.

I also set up my own instance of Jellyfin for a Netflix like UI for all my Movies and TV Shows on my hard drive.