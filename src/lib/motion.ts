/** Page-wide motion: scroll reveal, parallax, pointer glare, text scramble, count-up. */

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isFinePointer = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Glyphs used when text "compiles" into place. */
export const CODE_GLYPHS = '{}[]<>/\\=+-*;:_$#&|!?01';

export const randomGlyph = (): string => CODE_GLYPHS[(Math.random() * CODE_GLYPHS.length) | 0];

/**
 * [data-reveal] elements get a data-in attribute when they enter the viewport.
 * An attribute (not a class) so React re-renders of className never wipe it.
 * Safe to call again after new [data-reveal] nodes mount.
 */
export function initReveal(root: ParentNode = document): () => void {
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]:not([data-in])'));
  const show = (el: HTMLElement) => el.setAttribute('data-in', '');
  if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
    items.forEach(show);
    return () => undefined;
  }
  // Clipped elements are "invisible" to IntersectionObserver — watch the parent instead.
  const targetFor = new Map<Element, HTMLElement[]>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        (targetFor.get(e.target) ?? [e.target as HTMLElement]).forEach(show);
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.06 },
  );
  items.forEach((el) => {
    const clipped = el.dataset.reveal === 'curtain' || el.dataset.reveal === 'type';
    const watch = clipped && el.parentElement ? el.parentElement : el;
    targetFor.set(watch, [...(targetFor.get(watch) ?? []), el]);
    io.observe(watch);
  });
  return () => io.disconnect();
}

/**
 * Parallax: data-parallax="0.15" (speed, may be negative) drives --py
 * (or --px with data-parallax-axis="x"). Values ease toward the target in rAF,
 * and only visible elements are computed.
 */
export function initParallax(): () => void {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return () => undefined;
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  const visible = new Set<HTMLElement>();
  const current = new Map<HTMLElement, number>();
  const EASE = 0.1;

  const target = (el: HTMLElement, vh: number) => {
    const speed = parseFloat(el.dataset.parallax ?? '0');
    const host = el.parentElement ?? el;
    const r = host.getBoundingClientRect();
    return -(r.top + r.height / 2 - vh / 2) * speed;
  };
  const apply = (el: HTMLElement, v: number) => {
    const prop = el.dataset.parallaxAxis === 'x' ? '--px' : '--py';
    el.style.setProperty(prop, `${v.toFixed(2)}px`);
  };

  let raf = 0;
  const tick = () => {
    raf = 0;
    const vh = window.innerHeight;
    let moving = false;
    visible.forEach((el) => {
      const t = target(el, vh);
      const c = current.get(el);
      const next = c === undefined ? t : c + (t - c) * EASE;
      const done = Math.abs(t - next) < 0.1;
      current.set(el, done ? t : next);
      apply(el, done ? t : next);
      if (!done) moving = true;
    });
    if (moving) raf = requestAnimationFrame(tick);
  };
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const el = e.target as HTMLElement;
        if (e.isIntersecting) visible.add(el);
        else {
          visible.delete(el);
          current.delete(el);
        }
      }
      schedule();
    },
    { rootMargin: '25% 0px' },
  );
  els.forEach((el) => io.observe(el));
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  schedule();
  return () => {
    io.disconnect();
    cancelAnimationFrame(raf);
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
  };
}

/** Glare on .btn and .glow-follow elements tracks the pointer (--mx / --my). */
export function initPointerGlow(): () => void {
  if (!isFinePointer()) return () => undefined;
  const onMove = (e: PointerEvent) => {
    const el = (e.target as Element | null)?.closest?.('.btn, [data-glow]') as HTMLElement | null;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  document.addEventListener('pointermove', onMove, { passive: true });
  return () => document.removeEventListener('pointermove', onMove);
}

/**
 * Scramble text into its final value: characters resolve left to right,
 * unresolved ones flicker as code glyphs. Returns a cancel function.
 */
export function scrambleText(el: HTMLElement, finalText: string, duration = 700): () => void {
  if (prefersReducedMotion()) {
    el.textContent = finalText;
    return () => undefined;
  }
  const start = performance.now();
  let raf = 0;
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    const resolved = Math.floor(p * finalText.length);
    let out = '';
    for (let i = 0; i < finalText.length; i++) {
      const ch = finalText[i];
      out += i < resolved || ch === ' ' ? ch : randomGlyph();
    }
    el.textContent = out;
    if (p < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

/** Count a number up from 0 once the element is visible. */
export function countUp(el: HTMLElement, to: number, duration = 1400): () => void {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    el.textContent = String(to);
    return () => undefined;
  }
  el.textContent = '0';
  let raf = 0;
  const io = new IntersectionObserver(
    ([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = String(Math.round(to * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    },
    { threshold: 0.6 },
  );
  io.observe(el);
  return () => {
    io.disconnect();
    cancelAnimationFrame(raf);
  };
}
