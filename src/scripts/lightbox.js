// One shared dialog that shows any .zoomable image at full size.
const images = document.querySelectorAll("img.zoomable");

if (images.length) {
  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  const big = document.createElement("img");
  dialog.appendChild(big);
  document.body.appendChild(dialog);

  function open(img) {
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    dialog.showModal();
  }

  images.forEach((img) => {
    img.addEventListener("click", (e) => {
      e.preventDefault(); // stop a surrounding link from navigating
      open(img);
    });
    if (!img.closest("a")) {
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      img.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open(img);
        }
      });
    }
  });

  dialog.addEventListener("click", () => dialog.close());
}
