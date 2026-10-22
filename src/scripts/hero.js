// Interactive knot in the home hero: drag to rotate, slow idle spin, arrow keys, shape cycling.
import { SHAPES, buildGeometry, createRenderer } from "./knot.js";

const stage = document.getElementById("hero-stage");
const canvas = document.getElementById("hero-canvas");
const readout = document.getElementById("hero-readout");
const shapeBtn = document.getElementById("hero-shape");

if (stage && canvas) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderer = createRenderer(canvas);
  const cache = new Map();
  let shapeIndex = 0;
  // Phones get a coarser mesh; the character grid there is too small to show the difference.
  const detail = stage.clientWidth < 520 ? { nu: 560, nv: 26 } : { nu: 900, nv: 36 };

  function setShape(i) {
    shapeIndex = (i + SHAPES.length) % SHAPES.length;
    const shape = SHAPES[shapeIndex];
    if (!cache.has(shape.key)) cache.set(shape.key, buildGeometry(shape, detail));
    renderer.setGeometry(cache.get(shape.key));
    if (shapeBtn) shapeBtn.textContent = shape.label + " ↻";
    stage.setAttribute(
      "aria-label",
      `A ${shape.label} drawn in ASCII characters. Drag to rotate it, or use the arrow keys.`,
    );
  }
  setShape(0);

  const HOME = { yaw: -0.35, pitch: -0.45 };
  let yaw = HOME.yaw;
  let pitch = HOME.pitch;
  let spin = 0;
  let vYaw = 0;
  let vPitch = 0;
  let dragging = false;
  let visible = true;
  let running = false;
  let last = 0;
  let lastReadout = "";
  let lastPoint = null;

  function frame(time) {
    if (!visible) { running = false; return; }
    const dt = last ? Math.min(50, time - last) : 16;
    last = time;
    if (!dragging) {
      yaw += vYaw * dt;
      pitch += vPitch * dt;
      const damp = Math.pow(0.92, dt / 16);
      vYaw *= damp;
      vPitch *= damp;
      if (Math.abs(vYaw) < 1e-5) vYaw = 0;
      if (Math.abs(vPitch) < 1e-5) vPitch = 0;
      if (!reduceMotion) {
        spin += 0.00035 * dt;
        if (vYaw === 0) yaw += 0.00012 * dt;
      }
    }
    pitch = Math.max(-1.45, Math.min(1.45, pitch));
    renderer.draw(reduceMotion ? 0 : time, yaw, pitch, spin);

    const deg = ((Math.round((yaw * 180) / Math.PI) % 360) + 360) % 360;
    const text = "yaw " + deg + "° · pitch " + Math.round((pitch * 180) / Math.PI) + "°";
    if (readout && text !== lastReadout) { readout.textContent = text; lastReadout = text; }
    requestAnimationFrame(frame);
  }

  function kick() {
    if (running) return;
    running = true;
    last = 0;
    requestAnimationFrame(frame);
  }

  function reset() { yaw = HOME.yaw; pitch = HOME.pitch; vYaw = 0; vPitch = 0; }

  stage.addEventListener("pointerdown", (e) => {
    if (e.target === shapeBtn) return;
    stage.setPointerCapture(e.pointerId);
    dragging = true;
    stage.classList.add("dragging");
    vYaw = 0;
    vPitch = 0;
    lastPoint = { x: e.clientX, y: e.clientY, t: performance.now() };
  });

  stage.addEventListener("pointermove", (e) => {
    if (!dragging || !lastPoint) return;
    const now = performance.now();
    const dx = e.clientX - lastPoint.x;
    // On touch screens vertical movement scrolls the page, so only the mouse and pen tilt the knot.
    const dy = e.pointerType === "touch" ? 0 : e.clientY - lastPoint.y;
    const dtm = Math.max(1, now - lastPoint.t);
    yaw += dx * 0.0095;
    pitch += dy * 0.0075;
    const cap = 0.006;
    vYaw = Math.max(-cap, Math.min(cap, (dx * 0.0095) / dtm));
    vPitch = Math.max(-cap, Math.min(cap, (dy * 0.0075) / dtm));
    lastPoint = { x: e.clientX, y: e.clientY, t: now };
  });

  function endDrag() {
    dragging = false;
    lastPoint = null;
    stage.classList.remove("dragging");
  }
  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);
  stage.addEventListener("dblclick", (e) => { if (e.target !== shapeBtn) reset(); });

  stage.addEventListener("keydown", (e) => {
    const step = 0.08;
    if (e.key === "ArrowLeft") yaw -= step;
    else if (e.key === "ArrowRight") yaw += step;
    else if (e.key === "ArrowUp") pitch -= step;
    else if (e.key === "ArrowDown") pitch += step;
    else return;
    e.preventDefault();
  });

  shapeBtn?.addEventListener("click", () => setShape(shapeIndex + 1));

  window.addEventListener("themechange", () => renderer.refreshPalette());
  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", () => renderer.refreshPalette());

  if (window.ResizeObserver) new ResizeObserver(() => renderer.resize()).observe(stage);
  else window.addEventListener("resize", () => renderer.resize());
  renderer.resize();

  if (window.IntersectionObserver) {
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible) kick();
    }).observe(stage);
  }

  // The canvas draws in Plex Mono 500, which no DOM text uses, so the browser won't fetch it on
  // its own. Ask for it explicitly, then re-measure once it lands.
  document.fonts?.load('500 13px "IBM Plex Mono"').finally(() => renderer.resize());

  kick();
}
