// Scale fixed-size 400×400 sketch iframes to fill their card.
const SIZE = 400;
const frames = document.querySelectorAll(".card-media iframe");

if (frames.length) {
  const fit = (frame) => {
    const box = frame.parentElement.getBoundingClientRect();
    frame.style.transform = `scale(${box.width / SIZE})`;
  };
  const ro = new ResizeObserver((entries) => entries.forEach((e) => fit(e.target.querySelector("iframe"))));
  frames.forEach((f) => ro.observe(f.parentElement));
}
