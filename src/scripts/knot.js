// ASCII torus knots: a tube swept along a (p,q) knot, z-buffered into a character grid and drawn
// on a canvas. Geometry is pure so it can be built off the DOM; createRenderer() owns the canvas.

export const RAMP = ".,:;-=+*#%@";
const SHADES = 18;
const HUES = 24;

export const SHAPES = [
  { key: "trefoil", label: "knot 2·3", p: 2, q: 3, R: 1, r: 0.42, a: 0.2 },
  { key: "cinquefoil", label: "knot 2·5", p: 2, q: 5, R: 1, r: 0.36, a: 0.15 },
  { key: "knot34", label: "knot 3·4", p: 3, q: 4, R: 1, r: 0.42, a: 0.13 },
  { key: "torus", label: "torus", p: 1, q: 0, R: 1, r: 0, a: 0.42 },
];

function knotPoint(p, q, R, r, phi) {
  const k = R + r * Math.cos(q * phi);
  return [k * Math.cos(p * phi), k * Math.sin(p * phi), r * Math.sin(q * phi)];
}

const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
function norm(a) {
  const l = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
}

// Returns flat arrays of positions, normals and a 0..1 "hue" coordinate along the tube.
export function buildGeometry(shape, { nu = 900, nv = 36 } = {}) {
  const { p, q, R, r, a } = shape;
  const count = nu * nv;
  const pos = new Float32Array(count * 3);
  const nrm = new Float32Array(count * 3);
  const hue = new Float32Array(count);
  const h = 1e-3;
  let i = 0;
  let maxR = 0;

  for (let iu = 0; iu < nu; iu++) {
    const phi = (iu / nu) * Math.PI * 2;
    const c = knotPoint(p, q, R, r, phi);
    const t = norm(sub(knotPoint(p, q, R, r, phi + h), knotPoint(p, q, R, r, phi - h)));
    // Pull the frame towards the knot's axis; for a torus (q = 0) this is the radial direction.
    let n = norm(cross(cross(t, [c[0], c[1], 0]), t));
    if (!isFinite(n[0])) n = [1, 0, 0];
    const b = cross(t, n);
    for (let iv = 0; iv < nv; iv++) {
      const th = (iv / nv) * Math.PI * 2;
      const ct = Math.cos(th), st = Math.sin(th);
      const nx = ct * n[0] + st * b[0];
      const ny = ct * n[1] + st * b[1];
      const nz = ct * n[2] + st * b[2];
      const k = i * 3;
      pos[k] = c[0] + a * nx;
      pos[k + 1] = c[1] + a * ny;
      pos[k + 2] = c[2] + a * nz;
      nrm[k] = nx;
      nrm[k + 1] = ny;
      nrm[k + 2] = nz;
      hue[i] = iu / nu;
      maxR = Math.max(maxR, Math.hypot(pos[k], pos[k + 1], pos[k + 2]));
      i++;
    }
  }
  return { pos, nrm, hue, count, radius: maxR };
}

/* ---------- colour ---------- */

function parseColor(str) {
  const s = str.trim();
  if (s.startsWith("#")) {
    const v = s.length === 4 ? s.slice(1).split("").map((c) => c + c).join("") : s.slice(1);
    return [0, 2, 4].map((o) => parseInt(v.slice(o, o + 2), 16));
  }
  const m = s.match(/\d+(\.\d+)?/g);
  return m ? m.slice(0, 3).map(Number) : [203, 166, 247];
}

const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

// A lookup table of fill styles, indexed by [hue band][shade]. The hue loops mauve → lavender →
// pink → mauve along the tube; each shade fades from the panel colour up to full strength.
function buildPalette() {
  const cs = getComputedStyle(document.documentElement);
  const stops = ["--accent", "--accent-2", "--accent-3"].map((v) => parseColor(cs.getPropertyValue(v)));
  const panel = parseColor(cs.getPropertyValue("--panel"));
  const lut = [];
  for (let hI = 0; hI < HUES; hI++) {
    const x = (hI / HUES) * 3;
    const s = Math.floor(x);
    const base = mix(stops[s % 3], stops[(s + 1) % 3], x - s);
    const row = [];
    for (let sI = 0; sI < SHADES; sI++) {
      const t = 0.22 + 0.78 * Math.pow(sI / (SHADES - 1), 0.7);
      const c = mix(panel, base, t);
      row.push("rgb(" + (c[0] | 0) + "," + (c[1] | 0) + "," + (c[2] | 0) + ")");
    }
    lut.push(row);
  }
  return { lut, glow: parseColor(cs.getPropertyValue("--glow")) };
}

/* ---------- renderer ---------- */

// Light from upper left, slightly in front.
const L = norm([-0.5, 0.65, 0.6]);

export function createRenderer(canvas, { minFs = 9, maxFs = 14, fsDiv = 46 } = {}) {
  const ctx = canvas.getContext("2d");
  let geom = null;
  let palette = buildPalette();
  let W = 0, H = 0, dpr = 1, fs = 10, cw = 6, ch = 10, cols = 0, rows = 0;
  let zbuf = new Float32Array(0), bbuf = new Float32Array(0), hbuf = new Uint8Array(0);
  let font = "";

  function resize() {
    const r = canvas.getBoundingClientRect();
    W = Math.max(1, Math.floor(r.width));
    H = Math.max(1, Math.floor(r.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    fs = Math.max(minFs, Math.min(maxFs, Math.round(Math.min(W, H) / fsDiv)));
    ch = fs;
    cw = fs * 0.6;
    cols = Math.ceil(W / cw);
    rows = Math.ceil(H / ch);
    zbuf = new Float32Array(cols * rows);
    bbuf = new Float32Array(cols * rows);
    hbuf = new Uint8Array(cols * rows);
    font = "500 " + fs + "px " + getComputedStyle(document.body).fontFamily;
  }

  function setGeometry(g) { geom = g; }
  function refreshPalette() { palette = buildPalette(); }

  // yaw/pitch come from the user; spin turns the knot in its own plane so it seems to flow.
  function draw(time, yaw, pitch, spin) {
    if (!cols || !geom) return;
    const { pos, nrm, hue, count, radius } = geom;
    const ppu = (Math.min(W, H) * 0.42) / radius;
    const cy = Math.cos(yaw), sy = Math.sin(yaw);
    const cp = Math.cos(pitch), sp = Math.sin(pitch);
    const cs = Math.cos(spin), ss = Math.sin(spin);
    const ox = W / 2, oy = H / 2;
    const total = cols * rows;
    for (let i = 0; i < total; i++) { zbuf[i] = -1e9; hbuf[i] = 255; }

    for (let i = 0; i < count; i++) {
      const k = i * 3;
      // spin about model z, then yaw about screen y, then pitch about screen x.
      let x = pos[k] * cs - pos[k + 1] * ss;
      let y = pos[k] * ss + pos[k + 1] * cs;
      let z = pos[k + 2];
      let x1 = x * cy + z * sy;
      let z1 = -x * sy + z * cy;
      let y2 = y * cp - z1 * sp;
      let z2 = y * sp + z1 * cp; // towards the viewer
      const persp = 1 / (1 - 0.12 * z2 / radius);
      const px = ox + x1 * ppu * persp;
      const py = oy - y2 * ppu * persp;
      const col = (px / cw) | 0, row = (py / ch) | 0;
      if (px < 0 || py < 0 || col >= cols || row >= rows) continue;
      const idx = row * cols + col;
      if (z2 <= zbuf[idx]) continue;
      zbuf[idx] = z2;

      x = nrm[k] * cs - nrm[k + 1] * ss;
      y = nrm[k] * ss + nrm[k + 1] * cs;
      z = nrm[k + 2];
      x1 = x * cy + z * sy;
      z1 = -x * sy + z * cy;
      y2 = y * cp - z1 * sp;
      z2 = y * sp + z1 * cp;
      const d = x1 * L[0] + y2 * L[1] + z2 * L[2];
      const diffuse = Math.max(0, d);
      // Blinn-ish highlight with the viewer along +z.
      const hz = norm([L[0], L[1], L[2] + 1]);
      const spec = Math.pow(Math.max(0, x1 * hz[0] + y2 * hz[1] + z2 * hz[2]), 24);
      let b = 0.12 + 0.78 * diffuse + 0.4 * spec + 0.1 * (1 - Math.abs(z2));
      bbuf[idx] = b > 1 ? 1 : b;
      hbuf[idx] = (hue[i] * HUES + time * 0.00008 * HUES) % HUES | 0;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // Breathing glow behind the knot.
    const breathe = 1 + 0.07 * Math.sin(time * 0.0014);
    const gr = Math.min(W, H) * 0.55 * breathe;
    const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, gr);
    const rgb = palette.glow.join(",");
    g.addColorStop(0, "rgba(" + rgb + ",0.2)");
    g.addColorStop(0.5, "rgba(" + rgb + ",0.07)");
    g.addColorStop(1, "rgba(" + rgb + ",0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    ctx.font = font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    let last = "";
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const id = r * cols + c;
        const hI = hbuf[id];
        if (hI === 255) continue;
        const bv = bbuf[id];
        const style = palette.lut[hI][(bv * (SHADES - 1) + 0.5) | 0];
        if (style !== last) { ctx.fillStyle = style; last = style; }
        const ci = Math.min(RAMP.length - 1, (bv * RAMP.length) | 0);
        ctx.fillText(RAMP.charAt(ci), c * cw + cw / 2, r * ch + ch / 2);
      }
    }
  }

  return { resize, draw, setGeometry, refreshPalette };
}
