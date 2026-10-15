import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import { sections } from '../data/sections';
import { useActiveSection } from '../lib/useActiveSection';
import './Minimap.css';

const TONES = ['kw', 'fn', 'str', 'num', 'tx', 'tx', 'tx'] as const;

/** Editor minimap on the right edge: section blocks, a viewport slider, click or drag to scroll. */
export function Minimap() {
  const active = useActiveSection();
  const mapRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<{ id: string; top: number; height: number }[]>([]);
  const [view, setView] = useState({ top: 0, height: 0 });
  const dragging = useRef(false);

  // Fake code lines per section, stable between renders.
  const lines = useMemo(() => {
    let s = 7;
    const rnd = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
    return sections.map(() =>
      Array.from({ length: 60 }, () => ({
        indent: Math.floor(rnd() * 4),
        width: 15 + rnd() * 60,
        tone: TONES[Math.floor(rnd() * TONES.length)],
      })),
    );
  }, []);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const map = mapRef.current;
      if (!map) return;
      const doc = document.documentElement.scrollHeight;
      const h = map.clientHeight;
      const k = h / doc;
      setLayout(
        sections.map((s) => {
          const el = document.getElementById(s.id);
          return { id: s.id, top: (el?.offsetTop ?? 0) * k, height: (el?.offsetHeight ?? 0) * k };
        }),
      );
      setView({ top: window.scrollY * k, height: window.innerHeight * k });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  const scrollToPointer = (clientY: number, smooth: boolean) => {
    const map = mapRef.current;
    if (!map) return;
    const r = map.getBoundingClientRect();
    const k = document.documentElement.scrollHeight / r.height;
    const y = (clientY - r.top) * k - window.innerHeight / 2;
    window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'instant' });
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    scrollToPointer(e.clientY, true);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current && e.buttons) scrollToPointer(e.clientY, false);
  };
  const onUp = () => {
    dragging.current = false;
  };

  return (
    <div className="minimap" ref={mapRef} aria-hidden="true" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp}>
      {layout.map((b, i) => (
        <div key={b.id} className={`minimap__block${active === b.id ? ' is-active' : ''}`} style={{ top: b.top, height: b.height }}>
          <span className="minimap__name">{sections[i].file}</span>
          {lines[i].slice(0, Math.max(1, Math.floor(b.height / 4))).map((l, j) => (
            <span key={j} className={`minimap__line minimap__line--${l.tone}`} style={{ marginLeft: l.indent * 4, width: `${l.width}%` }} />
          ))}
        </div>
      ))}
      <div className="minimap__view" style={{ transform: `translateY(${view.top}px)`, height: view.height }} />
    </div>
  );
}
