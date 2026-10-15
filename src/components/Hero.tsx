import { useEffect, useRef, useState, type CSSProperties } from 'react';
import portrait from '../assets/portrait.webp';
import { contacts, profile } from '../data/profile';
import { createGlyphField } from '../lib/glyphField';
import { isFinePointer, prefersReducedMotion, randomGlyph } from '../lib/motion';
import { TelegramIcon } from './Icons';
import './Hero.css';

/** Syntax-highlighted snippet typed out in the code window. */
const SNIPPET: [string, string][][] = [
  [
    ['kw', 'const '],
    ['tx', 'maxim'],
    ['com', ': '],
    ['fn', 'Developer'],
    ['tx', ' = {'],
  ],
  [
    ['tx', '  role: '],
    ['str', "'Frontend Developer'"],
    ['tx', ','],
  ],
  [
    ['tx', '  stack: ['],
    ['str', "'React'"],
    ['tx', ', '],
    ['str', "'TypeScript'"],
    ['tx', '],'],
  ],
  [
    ['tx', '  experience: '],
    ['num', '4'],
    ['tx', ', '],
    ['com', '// years'],
  ],
  [
    ['tx', '  projects: '],
    ['num', '30'],
    ['tx', ','],
  ],
  [
    ['tx', '  backend: '],
    ['str', "'Node.js'"],
    ['tx', ','],
  ],
  [['tx', '};']],
];
const SNIPPET_LEN = SNIPPET.reduce((n, line) => n + line.reduce((m, [, t]) => m + t.length, 0) + 1, 0);

function Word({ text, offset }: { text: string; offset: number }) {
  return (
    <span className="hero__word">
      {Array.from(text).map((ch, i) => (
        <span key={i} className="hero__letter" style={{ '--i': i + offset } as CSSProperties}>
          <span className="hero__glyph" data-char={ch}>
            {ch}
          </span>
        </span>
      ))}
    </span>
  );
}

function CodeWindow({ ready }: { ready: boolean }) {
  const [typed, setTyped] = useState(() => (prefersReducedMotion() ? SNIPPET_LEN : 0));

  useEffect(() => {
    if (!ready || typed >= SNIPPET_LEN) return;
    let n = 0;
    let t = 0;
    const tick = () => {
      n += 1;
      setTyped(n);
      if (n < SNIPPET_LEN) t = window.setTimeout(tick, 18 + Math.random() * 34);
    };
    const start = window.setTimeout(tick, 900);
    return () => {
      clearTimeout(start);
      clearTimeout(t);
    };
  }, [ready]);

  let left = typed;
  return (
    <div className="hero__code window" aria-hidden="true">
      <div className="window__bar">
        <span className="window__file">developer.ts</span>
        <span className="window__lang">TS</span>
      </div>
      <pre className="hero__pre">
        {SNIPPET.map((line, li) => {
          if (left <= 0) return null;
          const parts = line.map(([cls, text], pi) => {
            const visible = text.slice(0, Math.max(0, left));
            left -= text.length;
            return visible ? (
              <span key={pi} className={`tok-${cls}`}>
                {visible}
              </span>
            ) : null;
          });
          left -= 1; // newline
          const isLast = left <= 0 || li === SNIPPET.length - 1;
          return (
            <span key={li} className="hero__code-line">
              <span className="hero__ln">{li + 1}</span>
              {parts}
              {isLast && <span className="caret" />}
              {'\n'}
            </span>
          );
        })}
      </pre>
    </div>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // Intro: every letter compiles from random glyphs into its character.
  useEffect(() => {
    const name = nameRef.current;
    if (!ready || !name || prefersReducedMotion()) return;
    const glyphs = Array.from(name.querySelectorAll<HTMLElement>('.hero__glyph'));
    const timers: number[] = [];
    glyphs.forEach((g, i) => {
      const final = g.dataset.char ?? '';
      const startAt = 120 + i * 55;
      for (let s = 0; s < 6; s++) {
        timers.push(window.setTimeout(() => (g.textContent = randomGlyph()), startAt + s * 50));
      }
      timers.push(window.setTimeout(() => (g.textContent = final), startAt + 6 * 50));
    });
    return () => timers.forEach(clearTimeout);
  }, [ready]);

  // Pointer: glyph field, letters reacting to the cursor, 3D tilt of the visual.
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const name = nameRef.current;
    const visual = visualRef.current;
    if (!section || !canvas || !name || !visual) return;

    const reduced = prefersReducedMotion();
    const field = createGlyphField(canvas, { reduced });
    const io = new IntersectionObserver(([e]) => field.setActive(e.isIntersecting), { threshold: 0 });
    io.observe(section);
    const onVis = () => field.setActive(!document.hidden);
    document.addEventListener('visibilitychange', onVis);

    const letters = Array.from(name.querySelectorAll<HTMLElement>('.hero__glyph'));
    let raf = 0;
    let px = 0;
    let py = 0;

    const apply = () => {
      raf = 0;
      field.setPointer(px, py);
      if (reduced) return;
      for (const l of letters) {
        const r = l.getBoundingClientRect();
        const dx = px - (r.left + r.width / 2);
        const dy = py - (r.top + r.height / 2);
        const k = Math.max(0, 1 - Math.hypot(dx, dy) / 220);
        l.style.setProperty('--lift', `${(-k * 18).toFixed(1)}px`);
        l.style.setProperty('--heat', k.toFixed(2));
        // Letters right under the cursor flicker into code glyphs.
        const final = l.dataset.char ?? '';
        if (k > 0.72 && Math.random() < 0.35) l.textContent = randomGlyph();
        else if (k <= 0.72 && l.textContent !== final) l.textContent = final;
      }
      const vr = visual.getBoundingClientRect();
      const nx = (px - (vr.left + vr.width / 2)) / window.innerWidth;
      const ny = (py - (vr.top + vr.height / 2)) / window.innerHeight;
      visual.style.setProperty('--ry', `${(nx * 12).toFixed(2)}deg`);
      visual.style.setProperty('--rx', `${(-ny * 9).toFixed(2)}deg`);
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      field.clearPointer();
      letters.forEach((l) => {
        l.style.setProperty('--lift', '0px');
        l.style.setProperty('--heat', '0');
        l.textContent = l.dataset.char ?? '';
      });
      visual.style.setProperty('--ry', '0deg');
      visual.style.setProperty('--rx', '0deg');
    };

    // Touch: tapping the name sends a compile wave through the letters.
    const onTap = () => {
      if (reduced) return;
      name.classList.remove('is-waving');
      void name.offsetWidth;
      name.classList.add('is-waving');
    };

    if (isFinePointer()) {
      section.addEventListener('pointermove', onMove, { passive: true });
      section.addEventListener('pointerleave', onLeave);
    } else {
      section.addEventListener('pointerdown', onMove, { passive: true });
    }
    name.addEventListener('click', onTap);

    return () => {
      field.destroy();
      io.disconnect();
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVis);
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
      section.removeEventListener('pointerdown', onMove);
      name.removeEventListener('click', onTap);
    };
  }, []);

  return (
    <section ref={sectionRef} className={`hero${ready ? ' is-ready' : ''}`} id="top" aria-labelledby="hero-title">
      <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />

      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__hello t-com">
            <span className="hero__hello-text">// привет, меня зовут</span>
          </p>

          <h1 id="hero-title" className="hero__title">
            <span ref={nameRef} className="hero__name">
              <Word text={profile.firstName} offset={0} />
              <Word text={profile.lastName} offset={profile.firstName.length} />
            </span>
            <span className="hero__role">
              <span className="t-com">&lt;</span>
              <span className="t-fn">Developer</span> <span className="t-kw">focus</span>
              <span className="t-com">=</span>
              <span className="t-str">"frontend"</span> <span className="t-kw">stack</span>
              <span className="t-com">=</span>
              <span className="t-str">"{profile.stack}"</span> <span className="t-com">/&gt;</span>
            </span>
          </h1>

          <p className="hero__lead">{profile.lead}</p>

          <div className="hero__actions">
            <a className="btn" href="#projects">
              Смотреть проекты
            </a>
            <a className="btn btn--ghost" href={contacts.telegramHref} target="_blank" rel="noopener noreferrer">
              <TelegramIcon />
              Написать в Telegram
            </a>
          </div>

          <dl className="hero__meta">
            <div>
              <dt>город</dt>
              <dd>
                {profile.city}, {profile.timezone}
              </dd>
            </div>
            <div>
              <dt>опыт</dt>
              <dd>4+ года, 30+ проектов</dd>
            </div>
            <div>
              <dt>специализация</dt>
              <dd>{profile.focus}</dd>
            </div>
          </dl>
        </div>

        <div className="hero__visual" ref={visualRef}>
          <div className="hero__stage">
            <figure className="hero__photo window">
              <div className="window__bar">
                <span className="window__file">portrait.webp</span>
                <span className="window__lang">333×500</span>
              </div>
              <img src={portrait} alt="Максим Малютин" width={333} height={500} fetchPriority="high" />
            </figure>

            <CodeWindow ready={ready} />

            <svg className="hero__badge" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path id="badge-circle" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
              </defs>
              <circle cx="100" cy="100" r="97" className="hero__badge-bg" />
              <text>
                <textPath href="#badge-circle">react ✦ typescript ✦ node.js ✦ redux ✦ </textPath>
              </text>
              <text x="100" y="112" textAnchor="middle" className="hero__badge-mid">
                {'{ }'}
              </text>
            </svg>
          </div>
        </div>
      </div>

      <a className="hero__scroll" href="#about">
        <span className="t-com">scroll</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}
