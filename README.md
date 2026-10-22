# amri.dev

Personal site of Amri Arshad, built with [Astro](https://astro.build) and coloured with
[Catppuccin](https://catppuccin.com) (Mocha, with Latte for light mode). The design borrows from
[Glyphbloom](https://glyphbloom.amri.dev/); see [docs/DESIGN.md](docs/DESIGN.md).

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run check    # type-check
npm run build    # static site in dist/
```

## Where things live

| Path                       | What                                               |
|----------------------------|----------------------------------------------------|
| `src/content/blog/`        | Posts (Markdown). File name is the URL slug.       |
| `src/content/projects/`    | Long-form project write-ups at `/projects/<slug>/` |
| `src/content/work/`        | Client case studies at `/web/<slug>/`              |
| `src/data/projects.ts`     | Project list and skills on `/projects/`            |
| `src/data/web.ts`          | Cards on `/web/` and the home page                 |
| `src/data/site.ts`         | Nav, social links and the 88×31 buttons            |
| `src/pages/about.md`       | About page (plain Markdown)                        |
| `src/scripts/knot.js`      | ASCII torus-knot renderer for the hero             |
| `src/styles/site.css`      | All styles and theme tokens                        |

## Deploy

Pushing to `main` builds with GitHub Actions and publishes `dist/` to the `gh-pages` branch.
`public/CNAME` keeps the `amri.dev` custom domain.
