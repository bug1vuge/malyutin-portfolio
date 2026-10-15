import { CODE_GLYPHS } from './motion';

/**
 * Background "glyph field": a grid of faint code characters. Cells near the
 * pointer light up and re-roll their glyph; a few random cells twinkle on
 * their own so the field never looks frozen.
 */
export interface GlyphField {
  setPointer(x: number, y: number): void;
  clearPointer(): void;
  setActive(active: boolean): void;
  destroy(): void;
}

const COLORS = [
  [183, 156, 255], // kw
  [108, 196, 255], // fn
  [126, 224, 181], // str
  [255, 181, 71], // caret
];

export function createGlyphField(canvas: HTMLCanvasElement, opts: { reduced: boolean }): GlyphField {
  const ctx = canvas.getContext('2d');
  let w = 0;
  let h = 0;
  let cols = 0;
  let rows = 0;
  let cell = 26;
  let dpr = 1;
  let glyphs: string[] = [];
  let heat: Float32Array = new Float32Array(0);
  let tint: Uint8Array = new Uint8Array(0);
  let px = -9999;
  let py = -9999;
  let active = true;
  let raf = 0;
  let last = 0;

  const rnd = () => CODE_GLYPHS[(Math.random() * CODE_GLYPHS.length) | 0];

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    cell = w < 600 ? 22 : 26;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    cols = Math.ceil(w / cell) + 1;
    rows = Math.ceil(h / cell) + 1;
    glyphs = Array.from({ length: cols * rows }, rnd);
    heat = new Float32Array(cols * rows);
    tint = Uint8Array.from({ length: cols * rows }, () => (Math.random() * COLORS.length) | 0);
    draw();
  };

  const draw = () => {
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.font = `500 ${Math.round(cell * 0.55)}px 'JetBrains Mono', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        const x = c * cell + cell / 2;
        const y = r * cell + cell / 2;
        const k = heat[i];
        // Fade the field toward the bottom so the content stays readable.
        const fade = 1 - Math.min(1, y / (h * 1.05));
        const base = 0.05 + fade * 0.04;
        if (k < 0.02) {
          ctx.fillStyle = `rgba(141, 155, 180, ${base})`;
        } else {
          const [cr, cg, cb] = COLORS[tint[i]];
          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${(base + k * 0.75).toFixed(3)})`;
        }
        ctx.fillText(glyphs[i], x, y);
      }
    }
  };

  const step = (now: number) => {
    raf = 0;
    if (!active) return;
    // ~40 fps is plenty for a background
    if (now - last < 24) {
      raf = requestAnimationFrame(step);
      return;
    }
    last = now;
    const radius = w < 600 ? 110 : 170;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        const dx = c * cell + cell / 2 - px;
        const dy = r * cell + cell / 2 - py;
        const d = Math.hypot(dx, dy);
        const target = d < radius ? Math.pow(1 - d / radius, 1.6) : 0;
        if (target > heat[i]) {
          heat[i] = heat[i] + (target - heat[i]) * 0.5;
          if (Math.random() < 0.18) glyphs[i] = rnd();
        } else {
          heat[i] *= 0.93;
        }
      }
    }
    // Ambient twinkles
    for (let n = 0; n < 3; n++) {
      if (Math.random() < 0.6) {
        const i = (Math.random() * heat.length) | 0;
        heat[i] = Math.max(heat[i], 0.35 + Math.random() * 0.3);
        glyphs[i] = rnd();
      }
    }
    draw();
    raf = requestAnimationFrame(step);
  };

  const start = () => {
    if (opts.reduced || raf || !active) return;
    raf = requestAnimationFrame(step);
  };

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();
  // Redraw once the mono font is in, so the first frame isn't in a fallback face.
  document.fonts?.ready.then(() => draw());
  start();

  return {
    setPointer(x, y) {
      const rect = canvas.getBoundingClientRect();
      px = x - rect.left;
      py = y - rect.top;
      start();
    },
    clearPointer() {
      px = -9999;
      py = -9999;
    },
    setActive(v) {
      active = v;
      if (v) start();
      else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    },
    destroy() {
      ro.disconnect();
      cancelAnimationFrame(raf);
    },
  };
}
