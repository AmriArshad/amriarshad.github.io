// Header toggle: flips between Mocha and Latte and remembers the choice.
const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");

function current() {
  if (root.dataset.theme) return root.dataset.theme;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

// Pin the resolved theme so CSS selectors (and the hero canvas) see one explicit value.
root.dataset.theme = current();

toggle?.addEventListener("click", () => {
  const next = current() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
  window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
});
