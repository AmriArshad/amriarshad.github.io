# amri.dev redesign

A rebuild of amri.dev in Astro, borrowing the visual language of
[Glyphbloom](https://glyphbloom.amri.dev/) and recolouring it with Catppuccin
Mocha, with Mauve as the single accent.

## Direction

Glyphbloom reads as *a dark room, one red rose, a faint glow*. amri.dev keeps
that restraint and swaps the rose for mauve: a dark Mocha room, one ASCII
object turning in the hero, and a soft purple glow. Everything else is quiet
type and hairline borders.

Principles carried over from Glyphbloom:

- **Two typefaces, strict roles.** Newsreader *italic* for display
  (wordmark, headings, card titles). IBM Plex Mono for everything else.
  Glyphbloom uses Instrument Serif; amri.dev swapped to Newsreader because
  Instrument's condensed, hairline italic got hard to read at the 22–34px
  sizes used for post titles and section headings. Newsreader keeps the
  editorial italic but is drawn for screens, and its optical sizes make small
  headings sturdier.
- **Hairlines, not boxes.** 1px borders in `--line`, square corners, panels
  only one step lighter than the page.
- **Small uppercase labels.** Nav, buttons, eyebrows and metadata are 11–12px
  mono, uppercase, letter-spaced ~0.1em, in `--muted`.
- **One accent, used sparingly.** Mauve marks the one word that matters in a
  heading, the primary button, numbered steps and hover borders.
- **Live ASCII in the hero.** A drag-to-rotate object drawn from characters on
  a canvas, with a hint and a yaw/pitch readout in the corners.

## Palette — Catppuccin Mocha

| Token          | Mocha name | Hex       | Use                                 |
|----------------|------------|-----------|-------------------------------------|
| `--bg`         | Crust      | `#11111b` | Page background                     |
| `--panel`      | Mantle     | `#181825` | Stages, cards, inputs               |
| `--raised`     | Base       | `#1e1e2e` | Code blocks, hover fills            |
| `--line`       | Surface 0  | `#313244` | Hairline borders                    |
| `--line-strong`| Surface 1  | `#45475a` | Hover on neutral borders            |
| `--muted`      | Overlay 1  | `#7f849c` | Labels, metadata, captions          |
| `--fg-soft`    | Subtext 1  | `#bac2de` | Body copy, ledes                    |
| `--fg`         | Text       | `#cdd6f4` | Headings, emphasis                  |
| `--accent`     | Mauve      | `#cba6f7` | The accent                          |
| `--accent-2`   | Lavender   | `#b4befe` | Secondary accent (links in prose)   |
| `--accent-3`   | Pink       | `#f5c2e7` | Hero gradient highlights only       |

Crust (not Base) is the page colour so the stage and cards, in Mantle, sit just
above it the way Glyphbloom's panels do. The primary button is Mauve with Crust
text: 9.9:1 contrast.

A Catppuccin Latte light theme follows `prefers-color-scheme`, with a manual
toggle in the header. Latte swaps the same tokens (Base `#eff1f5`, Mantle,
Text `#4c4f69`, Mauve `#8839ef`) so no component needs to know which theme is on.

## Type scale

| Role        | Face                    | Size                       |
|-------------|-------------------------|----------------------------|
| Hero h1     | Newsreader italic       | `clamp(42px, 6.2vw, 74px)`, lh 1.04 |
| Page h1     | Newsreader italic       | `clamp(40px, 6vw, 68px)`, lh 1.06 |
| Section h2  | Newsreader italic       | `clamp(30px, 4vw, 44px)`, lh 1.08 |
| Card h3     | Newsreader italic       | 26–28px                    |
| Body        | IBM Plex Mono 400       | 14px / 1.6 (prose 15px / 1.75) |
| Labels      | IBM Plex Mono 500       | 11–12px uppercase, 0.1–0.16em tracking |

## Hero — the ASCII torus knot

Glyphbloom's hero is a rose. amri.dev's is a **(2,3) torus knot** drawn in
characters from the ramp `.,:;-=+*#%@`, shaded from Mauve through Lavender to
Pink along the tube. It's a nod to Holocryptic (maths as art) and to `donut.c`.

- Drag to rotate, arrow keys when focused, double-click to reset.
- Slow idle spin; stops when off-screen; respects `prefers-reduced-motion`.
- Corner labels: `Drag to rotate` and a live `yaw 33° · pitch 22°` readout.
- A breathing radial glow in Mauve behind the knot.

## Pages

| Route                     | Content                                                        |
|---------------------------|----------------------------------------------------------------|
| `/`                       | Hero · *What I do* (three numbered columns) · Selected projects · Latest posts · Random IT quote · Holocryptic pieces |
| `/projects/`              | Project list (from content) beside a sticky Skills column      |
| `/projects/<slug>/`       | Project write-up                                               |
| `/web/`                   | Live sites, Holocryptic highlights, client work, concepts — card grid with lightbox |
| `/web/<slug>/`            | Case study                                                     |
| `/blog/`                  | Post index, grouped by year                                    |
| `/blog/<slug>/`           | Post (same URLs as the Zola site, e.g. `/blog/4-n8n-self-hosting/`) |
| `/about/`                 | About, with certifications table and education                 |
| `/links/`                 | Link collection (unlisted, as before)                          |
| `/portfolio/`             | Redirect to `/projects/`                                       |
| `/404`                    | `4<span>0</span>4` in display type                             |

## Components

- **Header** — wordmark `amri.dev` (Newsreader italic, `.dev` in Mauve), uppercase
  nav, theme toggle. Current page gets the Mauve underline.
- **Footer** — hairline top border; the 88×31 button wall (kept from the old site,
  it's part of the personality); GitHub · LinkedIn · email.
- **Numbered list** (`.steps`) — `01 / 02 / 03` in Mauve above serif titles,
  hairline top rule.
- **Card** — Mantle panel, hairline border that turns Mauve on hover/focus,
  image or embed on top, body below a hairline.
- **Row list** — for posts and projects: date or year in a fixed mono column,
  serif title, short summary, the whole row is the link.
- **Prose** — 68ch measure, Lavender underlined links, Mantle code blocks with
  a Catppuccin Mocha syntax theme, tables with hairline rules.
- **Lightbox** — one shared `<dialog>` for any `.zoomable` image.

## Tech

- Astro (static output), content collections for blog, projects and web case studies.
- Markdown content migrated from Zola: TOML front matter → YAML; `<!-- more -->`
  still marks the summary.
- Shiki with the `catppuccin-mocha` theme for code.
- Deployed to GitHub Pages from Actions (`gh-pages` branch, as today), with
  `public/CNAME` keeping `amri.dev`.
