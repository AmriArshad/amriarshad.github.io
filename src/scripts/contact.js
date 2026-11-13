// Copy-to-clipboard for the contact address; the mailto link still works without JS.
const button = document.getElementById("copy-email");
if (button && navigator.clipboard) {
  button.hidden = false;
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.email);
      button.textContent = "Copied ✓";
    } catch {
      button.textContent = "Copy failed";
    }
    setTimeout(() => (button.textContent = "Copy address"), 1800);
  });
}
