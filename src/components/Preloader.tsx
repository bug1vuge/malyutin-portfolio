import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';
import './Preloader.css';

const LINES = [
  { text: '$ npm run dev', cls: 'cmd' },
  { text: '> malyutin-portfolio@1.0.0 dev', cls: 'mut' },
  { text: '> vite', cls: 'mut' },
  { text: '', cls: '' },
  { text: '  VITE ready in 412 ms', cls: 'ok' },
  { text: '  ➜  compiling experience, projects, skills…', cls: 'mut' },
];

const LINE_STEP = 170;

/** Terminal boot sequence shown once on load, then the panel lifts away. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = prefersReducedMotion();
  const [shown, setShown] = useState(reduced ? LINES.length : 0);
  const [progress, setProgress] = useState(reduced ? 100 : 0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduced) {
      onDone();
      setGone(true);
      return;
    }
    document.body.classList.add('is-locked');
    const timers: number[] = [];
    LINES.forEach((_, i) => timers.push(window.setTimeout(() => setShown(i + 1), 120 + i * LINE_STEP)));

    const total = 120 + LINES.length * LINE_STEP + 200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      setProgress(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    timers.push(
      window.setTimeout(() => {
        setLeaving(true);
        document.body.classList.remove('is-locked');
        onDone();
      }, total + 150),
    );
    timers.push(window.setTimeout(() => setGone(true), total + 1200));

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      document.body.classList.remove('is-locked');
    };
  }, []);

  if (gone) return null;

  const filled = Math.round(progress / 5);

  return (
    <div className={`preloader${leaving ? ' is-leaving' : ''}`} aria-hidden="true">
      <div className="preloader__half preloader__half--top" />
      <div className="preloader__half preloader__half--bottom" />
      <div className="preloader__term">
        {LINES.slice(0, shown).map((l, i) => (
          <div key={i} className={`preloader__line preloader__line--${l.cls}`}>
            {l.text || ' '}
          </div>
        ))}
        <div className="preloader__bar">
          <span className="t-caret">{'█'.repeat(filled)}</span>
          <span className="t-com">{'░'.repeat(20 - filled)}</span>
          <span className="preloader__pct">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
