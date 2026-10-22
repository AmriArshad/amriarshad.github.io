// Highlights the "On this page" entry for the section currently being read.
const links = [...document.querySelectorAll(".toc a")];
const details = document.querySelector("details.toc");

// The contents list is always open in the desktop sidebar; on phones it starts collapsed above the text.
const narrow = window.matchMedia("(max-width: 960px)");
if (details && narrow.matches) details.open = false;
details?.querySelector("summary").addEventListener("click", (e) => {
  if (!narrow.matches) e.preventDefault();
});

if (links.length) {
  const targets = links
    .map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1))))
    .filter(Boolean);
  let current = null;

  function update() {
    // The active section is the last heading that has scrolled past the top third of the viewport.
    const line = window.innerHeight * 0.33;
    let active = targets[0];
    for (const t of targets) {
      if (t.getBoundingClientRect().top <= line) active = t;
      else break;
    }
    if (active === current) return;
    current = active;
    for (const a of links) {
      if (a.hash.slice(1) === active.id) a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
    }
  }

  let queued = false;
  window.addEventListener(
    "scroll",
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; update(); });
    },
    { passive: true },
  );
  update();
}
