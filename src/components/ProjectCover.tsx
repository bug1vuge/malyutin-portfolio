import { useId, type ReactNode } from 'react';
import type { ProjectCover as Cover } from '../data/projects';
import './ProjectCover.css';

/**
 * Illustrated project cover. Every cover shares one frame — dotted canvas,
 * accent glow, a browser window with the real domain — and draws a scene
 * that matches what the site actually does. Coordinates live in a 640×400 box.
 */

const W = 560; // window content width

/* ───── Shared bits ───── */

function Nav({ brand }: { brand: string }) {
  return (
    <g>
      <text x={24} y={30} className="cv-brand">
        {brand}
      </text>
      <rect x={300} y={24} width={36} height={4} rx={2} className="cv-line" />
      <rect x={350} y={24} width={44} height={4} rx={2} className="cv-line" />
      <rect x={408} y={24} width={30} height={4} rx={2} className="cv-line" />
      <rect x={462} y={15} width={74} height={22} rx={6} className="cv-acc-soft" />
      <rect x={474} y={24} width={50} height={4} rx={2} className="cv-acc" />
    </g>
  );
}

function Hero({
  kicker,
  headline,
  cta,
  x = 24,
  y = 92,
  size = 34,
}: {
  kicker?: string;
  headline: string;
  cta?: string;
  x?: number;
  y?: number;
  size?: number;
}) {
  return (
    <g>
      {kicker && (
        <text x={x} y={y - size - 6} className="cv-kicker">
          {kicker}
        </text>
      )}
      <text x={x} y={y} className="cv-headline" style={{ fontSize: size }}>
        {headline}
      </text>
      <rect x={x} y={y + 18} width={180} height={5} rx={2.5} className="cv-line" />
      <rect x={x} y={y + 30} width={140} height={5} rx={2.5} className="cv-line" />
      {cta && (
        <g className="cv-lift">
          <rect x={x} y={y + 50} width={cta.length * 6.4 + 28} height={28} rx={7} className="cv-acc" />
          <text x={x + 14} y={y + 68} className="cv-btn-text">
            {cta}
          </text>
        </g>
      )}
    </g>
  );
}

function Tooltip({ x, y, title, sub }: { x: number; y: number; title: string; sub?: string }) {
  const w = Math.max(title.length, sub?.length ?? 0) * 6.6 + 24;
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="cv-tooltip">
        <rect x={0} y={0} width={w} height={sub ? 44 : 28} rx={8} className="cv-card" />
        <circle cx={12} cy={14} r={3.5} className="cv-acc" />
        <text x={22} y={18} className="cv-tip-title">
          {title}
        </text>
        {sub && (
          <text x={12} y={35} className="cv-tip-sub">
            {sub}
          </text>
        )}
      </g>
    </g>
  );
}

/* ───── Scenes ───── */

function Dashboard({ c }: { c: Cover }) {
  const [orders = 'Orders', revenue = 'Revenue', profit = 'Profit', ...statuses] = c.labels ?? [];
  const chart = 'M0 70 C 30 62, 50 40, 80 46 S 130 70, 160 52 S 210 18, 240 26 S 290 40, 320 12';
  return (
    <g>
      {/* sidebar */}
      <rect x={0} y={0} width={52} height={400} className="cv-panel" />
      <text x={14} y={30} className="cv-brand" style={{ fontSize: 13 }}>
        F
      </text>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={16} y={58 + i * 34} width={20} height={20} rx={5} className={i === 0 ? 'cv-acc' : 'cv-chip'} />
      ))}
      {/* top bar */}
      <rect x={72} y={16} width={160} height={22} rx={7} className="cv-chip" />
      <rect x={84} y={25} width={70} height={4} rx={2} className="cv-line" />
      <text x={W - 92} y={31} className="cv-brand" style={{ fontSize: 12 }}>
        {c.headline}
      </text>
      {/* KPI tiles */}
      {[orders, revenue, profit].map((label, i) => (
        <g key={label} transform={`translate(${72 + i * 160} 54)`}>
          <rect width={148} height={62} rx={9} className="cv-card" />
          <text x={12} y={20} className="cv-tip-sub">
            {label}
          </text>
          <rect x={12} y={30} width={56 + i * 10} height={12} rx={3} className={i === 2 ? 'cv-acc' : 'cv-strong'} />
          <path d={`M86 46 l10 -6 l10 3 l10 -10 l10 4 l10 -12`} className="cv-spark" style={{ animationDelay: `${i * 0.15}s` }} />
        </g>
      ))}
      {/* chart */}
      <g transform="translate(72 132)">
        <rect width={308} height={122} rx={9} className="cv-card" />
        <g transform="translate(14 22) scale(0.875 1)">
          <path d={`${chart} L320 86 L0 86 Z`} className="cv-area" />
          <path d={chart} className="cv-chart" />
        </g>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={14} y={30 + i * 30} width={280} height={1} className="cv-grid" />
        ))}
      </g>
      {/* status funnel */}
      <g transform="translate(392 132)">
        <rect width={160} height={122} rx={9} className="cv-card" />
        {statuses.slice(0, 4).map((s, i) => (
          <g key={s} transform={`translate(12 ${14 + i * 26})`}>
            <rect width={136} height={20} rx={5} className="cv-chip" />
            <rect width={136 - i * 26} height={20} rx={5} className="cv-acc-soft" />
            <text x={8} y={14} className="cv-tip-sub" style={{ fill: 'var(--cv-text)' }}>
              {s}
            </text>
          </g>
        ))}
      </g>
      {/* orders table */}
      <g transform="translate(72 266)">
        <rect width={480} height={130} rx={9} className="cv-card" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(14 ${16 + i * 30})`}>
            <text y={11} className="cv-mono">
              #{1042 - i * 7}
            </text>
            <rect x={60} y={4} width={120 - i * 18} height={6} rx={3} className="cv-line" />
            <rect x={240} y={-2} width={84} height={18} rx={9} className={i === 0 ? 'cv-acc-soft' : 'cv-chip'} />
            <text x={252} y={11} className="cv-tip-sub" style={i === 0 ? { fill: 'var(--acc)' } : undefined}>
              {statuses[i] ?? ''}
            </text>
            <rect x={380} y={4} width={60} height={6} rx={3} className="cv-strong" />
          </g>
        ))}
      </g>
    </g>
  );
}

function Landing({ c }: { c: Cover }) {
  const [cta = 'Start', invoice = 'Invoice', pay = 'Pay', ...statuses] = c.labels ?? [];
  return (
    <g>
      <Nav brand={c.kicker ?? c.headline} />
      <text x={24} y={96} className="cv-headline" style={{ fontSize: 27 }}>
        {c.headline.split(' ').slice(0, 2).join(' ')}
      </text>
      <text x={24} y={128} className="cv-headline cv-headline--acc" style={{ fontSize: 27 }}>
        {c.headline.split(' ').slice(2).join(' ')}
      </text>
      <rect x={24} y={148} width={200} height={5} rx={2.5} className="cv-line" />
      <rect x={24} y={160} width={160} height={5} rx={2.5} className="cv-line" />
      <g className="cv-lift">
        <rect x={24} y={182} width={cta.length * 6.4 + 28} height={28} rx={7} className="cv-acc" />
        <text x={38} y={200} className="cv-btn-text">
          {cta}
        </text>
      </g>
      {statuses.map((s, i) => (
        <g key={s} transform={`translate(${24 + i * 86} 236)`}>
          <rect width={78} height={22} rx={11} className={i === 0 ? 'cv-acc-soft' : 'cv-chip'} />
          <text x={39} y={15} textAnchor="middle" className="cv-tip-sub" style={i === 0 ? { fill: 'var(--acc)' } : undefined}>
            {s}
          </text>
        </g>
      ))}
      {/* payment card */}
      <g transform="translate(330 60)">
        <rect x={22} y={-10} width={196} height={236} rx={14} className="cv-card cv-card--ghost" transform="rotate(5 120 110)" />
        <g className="cv-float">
          <rect width={200} height={236} rx={14} className="cv-card" />
          <text x={18} y={30} className="cv-tip-sub">
            {invoice}
          </text>
          <rect x={18} y={44} width={110} height={18} rx={4} className="cv-strong" />
          <rect x={18} y={74} width={164} height={1} className="cv-grid" />
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(18 ${90 + i * 22})`}>
              <rect width={60 + i * 12} height={5} rx={2.5} className="cv-line" />
              <rect x={124} width={40} height={5} rx={2.5} className="cv-line" />
            </g>
          ))}
          <rect x={18} y={172} width={164} height={32} rx={8} className="cv-acc" />
          <text x={100} y={192} textAnchor="middle" className="cv-btn-text">
            {pay}
          </text>
        </g>
      </g>
    </g>
  );
}

function Facade({ c }: { c: Cover }) {
  const [cta, apt = '', area = ''] = c.labels ?? [];
  const floors = 5;
  const cols = 6;
  const bx = 318;
  const by = 74;
  const cw = 34;
  const ch = 40;
  const status = (f: number, k: number) => ((f * 7 + k * 3) % 5 === 0 ? 'sold' : (f + k) % 3 === 0 ? 'free' : 'base');
  return (
    <g>
      <Nav brand={c.headline} />
      <Hero kicker={c.kicker} headline={c.headline} cta={cta} y={140} />
      {/* building */}
      <rect x={bx - 14} y={by - 18} width={cols * cw + 28} height={floors * ch + 40} rx={6} className="cv-building" />
      <rect x={bx - 22} y={by - 24} width={cols * cw + 44} height={8} rx={3} className="cv-strong" />
      {Array.from({ length: floors }).map((_, f) =>
        Array.from({ length: cols }).map((__, k) => {
          const s = status(f, k);
          const sel = f === 2 && k === 3;
          return (
            <rect
              key={`${f}-${k}`}
              x={bx + k * cw + 3}
              y={by + f * ch + 4}
              width={cw - 6}
              height={ch - 10}
              rx={3}
              className={sel ? 'cv-acc cv-pulse' : s === 'free' ? 'cv-acc-soft' : s === 'sold' ? 'cv-window--sold' : 'cv-window'}
            />
          );
        }),
      )}
      <rect x={bx - 40} y={by + floors * ch + 22} width={cols * cw + 80} height={2} className="cv-strong" />
      <Tooltip x={bx + 3 * cw - 70} y={by + 2 * ch - 52} title={apt} sub={area} />
    </g>
  );
}

function Chess({ c }: { c: Cover }) {
  const [free = 'Free', booked = 'Booked', sold = 'Sold'] = c.labels ?? [];
  const floors = 5;
  const perFloor = [4, 3, 3, 3, 3]; // 16 apartments, top floor first
  const statusOf = (n: number) => (n % 5 === 0 ? 'sold' : n % 4 === 0 ? 'booked' : 'free');
  let n = 16;
  return (
    <g>
      <Nav brand={c.headline} />
      <Hero kicker={c.kicker} headline={c.headline} y={140} />
      <g transform="translate(300 62)">
        <rect width={236} height={250} rx={10} className="cv-card" />
        {Array.from({ length: floors }).map((_, f) => (
          <g key={f} transform={`translate(14 ${16 + f * 40})`}>
            <text y={20} className="cv-mono">
              {floors - f}
            </text>
            {Array.from({ length: perFloor[f] }).map((__, k) => {
              const num = n--;
              const s = statusOf(num);
              const sel = num === 9;
              return (
                <g key={k} transform={`translate(${22 + k * 48} 0)`}>
                  <rect
                    width={42}
                    height={30}
                    rx={5}
                    className={sel ? 'cv-acc cv-pulse' : s === 'free' ? 'cv-acc-soft' : s === 'booked' ? 'cv-booked' : 'cv-window--sold'}
                  />
                  <text x={21} y={19} textAnchor="middle" className={sel ? 'cv-btn-text' : 'cv-mono'}>
                    {num}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
        {[
          [free, 'cv-acc-soft'],
          [booked, 'cv-booked'],
          [sold, 'cv-window--sold'],
        ].map(([label, cls], i) => (
          <g key={label} transform={`translate(${14 + i * 74} 222)`}>
            <rect width={10} height={10} rx={3} className={cls} />
            <text x={15} y={9} className="cv-tip-sub">
              {label}
            </text>
          </g>
        ))}
      </g>
    </g>
  );
}

function Genplan({ c }: { c: Cover }) {
  const [b1 = '1', floorsLabel = '', b2 = '2'] = c.labels ?? [];
  return (
    <g>
      {/* land */}
      <rect width={W} height={400} className="cv-land" />
      {/* sea with waves */}
      <path d="M330 0 C 360 70, 420 110, 560 130 L560 0 Z" className="cv-water" />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${380 + i * 34} ${14 + i * 22} q 10 -6 20 0 t 20 0`}
          className="cv-wave"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
      <path d="M330 0 C 360 70, 420 110, 560 130" className="cv-shore" />
      {/* paths */}
      <path d="M0 300 C 120 280, 220 300, 320 250 S 470 190, 560 200" className="cv-road" />
      <path d="M150 400 C 170 330, 200 280, 260 230" className="cv-road cv-road--thin" />
      {/* trees */}
      {[
        [70, 220],
        [96, 244],
        [60, 262],
        [250, 330],
        [276, 352],
        [430, 290],
        [460, 312],
        [500, 280],
        [520, 330],
        [120, 360],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={9 + (i % 3) * 3} className="cv-tree" />
      ))}
      {/* buildings */}
      <g transform="rotate(-14 260 170)">
        <rect x={160} y={140} width={120} height={46} rx={6} className="cv-acc cv-pulse" />
        <rect x={300} y={150} width={110} height={42} rx={6} className="cv-building cv-building--top" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={172 + i * 26} y={150} width={18} height={26} rx={2} className="cv-roof" />
        ))}
        <text x={355} y={176} textAnchor="middle" className="cv-mono">
          {b2}
        </text>
      </g>
      <Tooltip x={140} y={74} title={b1} sub={floorsLabel} />
      {/* title card */}
      <g transform="translate(20 240)">
        <rect width={180} height={70} rx={10} className="cv-card" />
        <text x={16} y={26} className="cv-kicker">
          {c.kicker}
        </text>
        <text x={16} y={56} className="cv-headline" style={{ fontSize: 28 }}>
          {c.headline}
        </text>
      </g>
    </g>
  );
}

function Village({ c }: { c: Cover }) {
  const [house = '', material = ''] = c.labels ?? [];
  const plots = [
    [120, 150],
    [250, 120],
    [380, 150],
    [300, 250],
  ];
  return (
    <g>
      <rect width={W} height={400} className="cv-land" />
      <path d="M-10 220 C 120 200, 220 210, 300 196 S 470 170, 570 190" className="cv-road" />
      {/* trees around */}
      {Array.from({ length: 22 }).map((_, i) => {
        const x = (i * 97) % 560;
        const y = 40 + ((i * 53) % 330);
        const nearPlot = plots.some(([px, py]) => Math.abs(px - x) < 70 && Math.abs(py - y) < 60);
        return nearPlot ? null : <circle key={i} cx={x} cy={y} r={8 + (i % 4) * 2} className="cv-tree" />;
      })}
      {plots.map(([x, y], i) => {
        const sel = i === 1;
        return (
          <g key={i} transform={`translate(${x - 50} ${y - 38})`}>
            <rect width={100} height={76} rx={6} className={sel ? 'cv-plot cv-plot--sel' : 'cv-plot'} />
            <path d="M30 46 L50 28 L70 46 L70 62 L30 62 Z" className={sel ? 'cv-acc cv-pulse' : 'cv-house'} />
            <text x={8} y={16} className="cv-mono">
              {i + 1}
            </text>
          </g>
        );
      })}
      <Tooltip x={300} y={64} title={house} sub={material} />
      <g transform="translate(376 236)">
        <rect width={164} height={70} rx={10} className="cv-card" />
        <text x={16} y={26} className="cv-kicker">
          {c.kicker}
        </text>
        <text x={16} y={56} className="cv-headline" style={{ fontSize: 26 }}>
          {c.headline}
        </text>
      </g>
    </g>
  );
}

function Catalog({ c }: { c: Cover }) {
  const [chipA = '', chipB = '', ...names] = c.labels ?? [];
  return (
    <g>
      <Nav brand={c.kicker ?? ''} />
      <text x={24} y={84} className="cv-headline" style={{ fontSize: 26 }}>
        {c.headline}
      </text>
      {/* filters */}
      <g transform="translate(24 100)">
        <rect width={chipA.length * 6.6 + 24} height={24} rx={12} className="cv-acc" />
        <text x={12} y={16} className="cv-btn-text" style={{ fontSize: 10 }}>
          {chipA}
        </text>
        <g transform={`translate(${chipA.length * 6.6 + 32} 0)`}>
          <rect width={chipB.length * 6.6 + 24} height={24} rx={12} className="cv-chip" />
          <text x={12} y={16} className="cv-tip-sub" style={{ fill: 'var(--cv-text)' }}>
            {chipB}
          </text>
        </g>
        {['1', '2', '3+'].map((r, i) => (
          <g key={r} transform={`translate(${260 + i * 34} 0)`}>
            <rect width={28} height={24} rx={7} className={i === 1 ? 'cv-acc-soft' : 'cv-chip'} />
            <text x={14} y={16} textAnchor="middle" className="cv-tip-sub" style={{ fill: 'var(--cv-text)' }}>
              {r}
            </text>
          </g>
        ))}
        <rect x={372} width={140} height={24} rx={7} className="cv-chip" />
        <rect x={384} y={10} width={52} height={4} rx={2} className="cv-line" />
      </g>
      {/* project cards */}
      {names.slice(0, 3).map((name, i) => (
        <g key={name} transform={`translate(${24 + i * 172} 142)`}>
          <g className={i === 0 ? 'cv-lift' : undefined}>
            <rect width={160} height={200} rx={10} className="cv-card" />
            <g>
              <path
                d="M0 10 a10 10 0 0 1 10 -10 h140 a10 10 0 0 1 10 10 v108 h-160 Z"
                className="cv-photo"
                style={{ opacity: 1 - i * 0.18 }}
              />
              {/* skyline */}
              {[
                [14, 40, 30],
                [50, 60, 26],
                [82, 30, 34],
                [122, 50, 24],
              ].map(([x, h, w], j) => (
                <rect key={j} x={x} y={118 - h - (i % 2) * 8} width={w} height={h + (i % 2) * 8} rx={2} className="cv-skyline" />
              ))}
            </g>
            <text x={14} y={146} className="cv-tip-title" style={{ fontSize: 13 }}>
              {name}
            </text>
            <rect x={14} y={160} width={90} height={5} rx={2.5} className="cv-line" />
            <rect x={14} y={174} width={60} height={8} rx={3} className={i === 0 ? 'cv-acc' : 'cv-strong'} />
          </g>
        </g>
      ))}
    </g>
  );
}

function Studio({ c, uid }: { c: Cover; uid: string }) {
  const [second = 'web'] = c.labels ?? [];
  return (
    <g>
      <g filter={`url(#${uid}-blur)`} className="cv-blobs">
        <circle cx={420} cy={140} r={90} className="cv-acc" style={{ opacity: 0.55 }} />
        <circle cx={330} cy={260} r={70} style={{ fill: 'var(--fn)', opacity: 0.35 }} />
        <circle cx={500} cy={280} r={60} style={{ fill: 'var(--kw)', opacity: 0.3 }} />
      </g>
      <Nav brand="ForestWeb" />
      <text x={24} y={96} className="cv-kicker">
        {c.kicker}
      </text>
      <text x={20} y={186} className="cv-giant">
        {c.headline}
      </text>
      <text x={20} y={268} className="cv-giant cv-giant--outline">
        {second}
      </text>
      <rect x={24} y={300} width={200} height={5} rx={2.5} className="cv-line" />
      <rect x={24} y={312} width={150} height={5} rx={2.5} className="cv-line" />
      <g className="cv-cursor">
        <circle cx={392} cy={190} r={26} className="cv-cursor-ring" />
        <circle cx={392} cy={190} r={4} className="cv-acc" />
      </g>
    </g>
  );
}

function Event({ c, uid }: { c: Cover; uid: string }) {
  const [last = '', cta = '', tape = ''] = c.labels ?? [];
  return (
    <g>
      {/* rays */}
      {Array.from({ length: 7 }).map((_, i) => (
        <path key={i} d={`M440 70 L${300 + i * 46} 400`} className="cv-ray" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
      {/* mirror ball */}
      <line x1={440} y1={0} x2={440} y2={30} className="cv-strong-stroke" />
      <g className="cv-ball">
        <circle cx={440} cy={70} r={40} className="cv-ball-body" />
        <g clipPath={`url(#${uid}-ball)`}>
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`h${i}`} x1={398} x2={482} y1={34 + i * 9} y2={34 + i * 9} className="cv-facet" />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <path key={`v${i}`} d={`M${404 + i * 9} 30 Q ${440 + (i - 4) * 14} 70 ${404 + i * 9} 110`} className="cv-facet" />
          ))}
          <circle cx={424} cy={54} r={8} className="cv-acc cv-pulse" />
        </g>
      </g>
      <text x={24} y={70} className="cv-kicker">
        {c.kicker}
      </text>
      <text x={22} y={124} className="cv-headline" style={{ fontSize: 46 }}>
        {c.headline}
      </text>
      <text x={60} y={172} className="cv-headline cv-headline--acc" style={{ fontSize: 46 }}>
        {last}
      </text>
      <g className="cv-lift">
        <rect x={24} y={198} width={cta.length * 6.4 + 34} height={30} rx={15} className="cv-acc" />
        <text x={41} y={217} className="cv-btn-text">
          {cta}
        </text>
      </g>
      {/* arch photo */}
      <g transform="translate(400 150)">
        <path d="M0 200 L0 70 A 60 60 0 0 1 120 70 L120 200 Z" className="cv-arch" />
        <path d="M0 200 L0 70 A 60 60 0 0 1 120 70 L120 200 Z" className="cv-arch-ring" />
      </g>
      {/* tape */}
      <g transform="rotate(-4 280 300)">
        <rect x={-40} y={282} width={640} height={30} className="cv-acc" />
        <text x={0} y={302} className="cv-tape">
          {`${tape} ${tape} ${tape}`}
        </text>
      </g>
    </g>
  );
}

function CarRent({ c }: { c: Cover }) {
  const [eco = '', comfort = '', premium = '', datesLabel = '', cta = '', mins = '', minsSub = ''] = c.labels ?? [];
  const car =
    'M0 52 C0 44 6 40 18 38 L60 34 C78 20 96 12 128 12 L168 12 C186 12 200 22 214 34 L238 38 C248 40 252 46 252 52 L252 58 C252 62 248 64 244 64 L8 64 C3 64 0 61 0 58 Z';
  return (
    <g>
      {/* rail */}
      <rect width={52} height={400} className="cv-panel" />
      <rect x={13} y={14} width={26} height={26} rx={8} className="cv-acc" />
      <text x={26} y={31} textAnchor="middle" className="cv-btn-text" style={{ fontSize: 9 }}>
        RC
      </text>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={16} y={62 + i * 34} width={20} height={20} rx={6} className={i === 0 ? 'cv-acc-soft' : 'cv-chip'} />
      ))}
      {/* status line */}
      <text x={66} y={20} className="cv-mono" style={{ fill: 'var(--cv-text)' }}>
        21:40
      </text>
      <text x={104} y={20} className="cv-tip-sub">
        {c.kicker}
      </text>
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={520 + i * 6}
          y={20 - (i + 1) * 3}
          width={3.5}
          height={(i + 1) * 3}
          rx={1}
          className={i < 3 ? 'cv-strong' : 'cv-line'}
        />
      ))}
      {/* stage */}
      <g transform="translate(64 32)">
        <rect width={322} height={206} rx={14} className="cv-card" />
        <text x={18} y={30} className="cv-headline" style={{ fontSize: 22 }}>
          {c.headline}
        </text>
        <rect x={18} y={42} width={120} height={5} rx={2.5} className="cv-line" />
        {/* road */}
        <ellipse cx={161} cy={152} rx={128} ry={9} className="cv-shadow" />
        <g className="cv-streaks">
          {[0, 1, 2].map((i) => (
            <rect key={i} x={6 + i * 10} y={104 + i * 14} width={50 - i * 10} height={2} rx={1} className="cv-acc-soft" />
          ))}
        </g>
        <g className="cv-car" transform="translate(36 84)">
          <path d={car} className="cv-car-body" />
          <path d="M70 34 C84 22 98 17 124 17 L126 34 Z" className="cv-car-glass" />
          <path d="M132 17 L164 17 C178 17 190 25 200 34 L132 34 Z" className="cv-car-glass" />
          <rect x={240} y={44} width={10} height={5} rx={2} className="cv-acc" />
          <rect x={2} y={44} width={7} height={5} rx={2} style={{ fill: 'var(--num)' }} />
          {[54, 200].map((x) => (
            <g key={x}>
              <circle cx={x} cy={64} r={16} className="cv-wheel" />
              <circle cx={x} cy={64} r={7} className="cv-strong" />
            </g>
          ))}
        </g>
        {/* drive-mode switch */}
        <g transform="translate(40 168)">
          <rect width={242} height={28} rx={14} className="cv-chip" />
          <rect x={83} y={3} width={76} height={22} rx={11} className="cv-acc" />
          {[eco, comfort, premium].map((l, i) => (
            <text
              key={l}
              x={40 + i * 81}
              y={18}
              textAnchor="middle"
              className={i === 1 ? 'cv-btn-text' : 'cv-tip-sub'}
              style={i === 1 ? undefined : { fill: 'var(--cv-text)' }}
            >
              {l}
            </text>
          ))}
        </g>
      </g>
      {/* dates widget */}
      <g transform="translate(398 32)">
        <rect width={150} height={118} rx={14} className="cv-card" />
        <text x={14} y={24} className="cv-tip-title">
          {datesLabel}
        </text>
        {Array.from({ length: 21 }).map((_, i) => {
          const inRange = i >= 9 && i <= 12;
          return (
            <rect
              key={i}
              x={14 + (i % 7) * 18}
              y={38 + Math.floor(i / 7) * 22}
              width={14}
              height={16}
              rx={4}
              className={inRange ? (i === 9 || i === 12 ? 'cv-acc' : 'cv-acc-soft') : 'cv-chip'}
            />
          );
        })}
      </g>
      {/* booking widget */}
      <g transform="translate(398 160)">
        <rect width={150} height={78} rx={14} className="cv-card" />
        <rect x={14} y={14} width={70} height={6} rx={3} className="cv-line" />
        <rect x={14} y={26} width={46} height={6} rx={3} className="cv-line" />
        <g className="cv-lift">
          <rect x={14} y={42} width={122} height={24} rx={12} className="cv-go" />
          <text x={75} y={58} textAnchor="middle" className="cv-btn-text">
            {cta}
          </text>
        </g>
      </g>
      {/* stats */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${64 + i * 164} 250)`}>
          <rect width={152} height={64} rx={14} className="cv-card" />
          <rect x={14} y={16} width={22} height={22} rx={7} className={i === 0 ? 'cv-acc-soft' : 'cv-chip'} />
          {i === 0 ? (
            <>
              <text x={46} y={32} className="cv-headline" style={{ fontSize: 18 }}>
                {mins}
              </text>
              <text x={46} y={50} className="cv-tip-sub">
                {minsSub}
              </text>
            </>
          ) : (
            <>
              <rect x={46} y={20} width={50 + i * 12} height={10} rx={3} className="cv-strong" />
              <rect x={46} y={40} width={70} height={5} rx={2.5} className="cv-line" />
            </>
          )}
        </g>
      ))}
    </g>
  );
}

const SERIF = "Georgia, 'Times New Roman', serif";

function Letter({ c }: { c: Cover }) {
  const [house = '', greeting = '', listen = '', time = '', addressee = ''] = c.labels ?? [];
  return (
    <g>
      <rect width={W} height={400} className="cv-warm" />
      {/* back flap, open */}
      <path d="M130 176 L280 92 L430 176 Z" className="cv-paper-back" />
      {/* the letter, sliding out */}
      <g className="cv-letter">
        <rect x={156} y={30} width={248} height={230} rx={4} className="cv-paper" />
        <text x={176} y={56} className="cv-paper-kicker">
          {house}
        </text>
        <text x={176} y={88} className="cv-paper-hand" style={{ fontFamily: SERIF }}>
          {greeting}
        </text>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={176} y={102 + i * 13} width={[200, 188, 196, 120][i]} height={4} rx={2} className="cv-ink-line" />
        ))}
        <text x={176} y={176} className="cv-paper-kicker" style={{ letterSpacing: '0.2em' }}>
          {listen}
        </text>
        <rect x={232} y={172} width={130} height={1.5} className="cv-ink-line" />
        <rect x={232} y={172} width={46} height={1.5} className="cv-acc cv-progress" />
        <text x={384} y={176} textAnchor="end" className="cv-paper-kicker">
          {time}
        </text>
      </g>
      {/* front pocket */}
      <path d="M130 176 L280 252 L430 176 L430 318 L130 318 Z" className="cv-paper-front" />
      <path d="M130 318 L262 240 M430 318 L298 240" className="cv-paper-fold" />
      <text x={280} y={300} textAnchor="middle" className="cv-paper-name" style={{ fontFamily: SERIF }}>
        {addressee}
      </text>
      <circle cx={280} cy={252} r={13} className="cv-acc" />
      <text x={280} y={256} textAnchor="middle" className="cv-btn-text" style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 10 }}>
        mo
      </text>
    </g>
  );
}

function Transcript({ c }: { c: Cover }) {
  const [listen = '', time = ''] = c.labels ?? [];
  const lines = [
    'My grandmother left me eleven voicemails in the',
    "last year of her life. I didn't listen to most of",
    'them at the time. They were short, and they were',
    "always the same: it's only me, nothing important,",
    'call when you can.',
  ];
  const current = 28; // index of the word being spoken, counted across lines
  let n = 0;
  return (
    <g>
      <text x={40} y={34} className="cv-kicker" style={{ letterSpacing: '0.14em' }}>
        {c.kicker}
      </text>
      <text x={40} y={70} className="cv-serif-title" style={{ fontFamily: SERIF }}>
        {c.headline}
      </text>
      {lines.map((line, li) => (
        <text key={li} x={40} y={112 + li * 26} className="cv-serif-body" style={{ fontFamily: SERIF }}>
          {line.split(' ').map((w, wi) => {
            const idx = n++;
            const cls = idx < current ? 'cv-word--inked' : idx === current ? 'cv-word--now' : 'cv-word--faint';
            return (
              <tspan key={wi} className={cls}>
                {w}{' '}
              </tspan>
            );
          })}
        </text>
      ))}
      {/* the spoken word, underlined */}
      <rect x={302} y={170} width={44} height={2} rx={1} className="cv-acc cv-pulse" />
      {/* control: one word, a hairline and a time */}
      <g transform="translate(40 268)">
        <text y={4} className="cv-mono" style={{ fill: 'var(--cv-text)', letterSpacing: '0.18em' }}>
          {listen}
        </text>
        <rect x={70} y={0} width={360} height={1.5} className="cv-line" />
        <rect x={70} y={0} width={150} height={1.5} className="cv-acc cv-progress" />
        <circle cx={220} cy={0.75} r={4} className="cv-acc" />
        <text x={480} y={4} textAnchor="end" className="cv-mono">
          {time}
        </text>
      </g>
    </g>
  );
}

function Ticket({ c, uid }: { c: Cover; uid: string }) {
  const [admit = '', club = '', guest = '', row = '', seat = '', date = '', number = ''] = c.labels ?? [];
  const field = (x: number, label: string, value: string) => (
    <g transform={`translate(${x} 196)`}>
      <text className="cv-ticket-label">{label}</text>
      <text y={20} className="cv-ticket-value">
        {value}
      </text>
    </g>
  );
  return (
    <g>
      {/* curtain */}
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={i} x={i * 40} width={40} height={400} className={i % 2 ? 'cv-curtain' : 'cv-curtain cv-curtain--dark'} />
      ))}
      <defs>
        <mask id={`${uid}-ticket`}>
          <rect x={40} y={50} width={480} height={210} rx={10} fill="#fff" />
          <circle cx={392} cy={50} r={12} fill="#000" />
          <circle cx={392} cy={260} r={12} fill="#000" />
        </mask>
      </defs>
      <g mask={`url(#${uid}-ticket)`}>
        {/* main part */}
        <rect x={40} y={50} width={352} height={210} className="cv-ticket" />
        {/* stub, swinging from the far end of the perforation */}
        <g className="cv-stub">
          <rect x={392} y={50} width={128} height={210} className="cv-ticket cv-ticket--stub" />
        </g>
      </g>
      <line x1={392} y1={66} x2={392} y2={244} className="cv-perf" />
      <text x={64} y={86} className="cv-ticket-kicker">
        {admit}
      </text>
      <text x={64} y={142} className="cv-ticket-film">
        {c.headline}
      </text>
      <text x={64} y={166} className="cv-ticket-label" style={{ letterSpacing: '0.08em' }}>
        {club}
      </text>
      {field(64, 'GUEST', guest)}
      {field(170, 'ROW', row)}
      {field(222, 'SEAT', seat)}
      {field(282, 'DATE', date)}
      <g className="cv-stub">
        <text x={456} y={155} textAnchor="middle" className="cv-ticket-kicker" transform="rotate(-90 456 155)">
          {admit}
        </text>
        <text x={492} y={155} textAnchor="middle" className="cv-ticket-label" transform="rotate(-90 492 155)">
          {number}
        </text>
      </g>
    </g>
  );
}

function Door({ c }: { c: Cover }) {
  const [cta = ''] = c.labels ?? [];
  // Real finishes from the HOLZ catalog
  const swatches = ['#b88a57', '#7d5434', '#4d3324', '#dccfba', '#6f6a66', '#3b3a3a'];
  return (
    <g>
      <rect width={W} height={400} className="cv-ink" />
      <text x={36} y={74} className="cv-kicker" style={{ letterSpacing: '0.24em' }}>
        {c.kicker}
      </text>
      <text x={32} y={136} className="cv-door-word" style={{ fontFamily: SERIF }}>
        {c.headline}
      </text>
      <rect x={36} y={158} width={170} height={4} rx={2} className="cv-line" />
      <rect x={36} y={170} width={130} height={4} rx={2} className="cv-line" />
      {swatches.map((col, i) => (
        <g key={col}>
          {i === 0 && <circle cx={46 + i * 28} cy={210} r={13} className="cv-swatch-ring" />}
          <circle cx={46 + i * 28} cy={210} r={9} fill={col} />
        </g>
      ))}
      <g className="cv-lift">
        <rect x={36} y={244} width={cta.length * 6.6 + 30} height={28} rx={2} className="cv-outline" />
        <text x={51} y={262} className="cv-mono" style={{ fill: 'var(--acc)', letterSpacing: '0.14em' }}>
          {cta}
        </text>
      </g>
      {/* wall, frame and the light behind the door */}
      <rect x={300} y={0} width={260} height={310} className="cv-wall" />
      <path d="M346 310 L474 310 L560 360 L260 360 Z" className="cv-spill" />
      <rect x={338} y={40} width={144} height={270} className="cv-frame" />
      <rect x={346} y={48} width={128} height={262} className="cv-glow-door" />
      {/* the leaf, swinging towards the viewer from the left hinge */}
      <g className="cv-leaf">
        <path d="M346 48 L414 30 L414 330 L346 310 Z" fill={swatches[0]} />
        <path d="M356 64 L404 52 L404 170 L356 176 Z" className="cv-leaf-panel" />
        <path d="M356 192 L404 188 L404 304 L356 296 Z" className="cv-leaf-panel" />
        <rect x={400} y={176} width={5} height={18} rx={2} className="cv-acc" />
      </g>
      <rect x={300} y={310} width={260} height={2} className="cv-strong" />
    </g>
  );
}

function Room({ c }: { c: Cover }) {
  const [sofa = '', shelf = '', lamp = '', total = ''] = c.labels ?? [];
  const tag = (x: number, y: number, label: string, w = 54) => (
    <g transform={`translate(${x} ${y})`}>
      <g className="cv-tag">
        <path d={`M0 9 L9 0 L${w} 0 L${w} 18 L9 18 Z`} className="cv-tag-bg" />
        <circle cx={8} cy={9} r={2} className="cv-tag-hole" />
        <text x={15} y={13} className="cv-tag-text">
          {label}
        </text>
      </g>
    </g>
  );
  return (
    <g>
      <rect width={W} height={400} className="cv-room-wall" />
      <rect y={262} width={W} height={140} className="cv-room-floor" />
      <rect y={260} width={W} height={3} className="cv-room-base" />
      <text x={32} y={44} className="cv-room-kicker">
        {c.kicker}
      </text>
      <text x={32} y={80} className="cv-room-title" style={{ fontFamily: SERIF }}>
        {c.headline}
      </text>
      {/* running total */}
      <g transform="translate(404 26)">
        <rect width={128} height={40} rx={8} className="cv-room-card" />
        <text x={12} y={17} className="cv-tag-text">
          {total}
        </text>
        <rect x={12} y={24} width={80} height={7} rx={3} className="cv-acc cv-progress" />
      </g>
      {/* rug */}
      <ellipse cx={170} cy={290} rx={150} ry={18} className="cv-rug" />
      {/* sofa */}
      <g className="cv-sofa">
        <rect x={58} y={176} width={214} height={46} rx={14} className="cv-sofa-back" />
        <rect x={50} y={208} width={230} height={44} rx={10} className="cv-sofa-seat" />
        <rect x={42} y={196} width={30} height={56} rx={10} className="cv-sofa-back" />
        <rect x={258} y={196} width={30} height={56} rx={10} className="cv-sofa-back" />
        <rect x={64} y={252} width={6} height={10} className="cv-room-leg" />
        <rect x={260} y={252} width={6} height={10} className="cv-room-leg" />
      </g>
      {tag(120, 150, sofa, 64)}
      {/* floor lamp */}
      <circle cx={340} cy={130} r={46} className="cv-lamp-glow" />
      <path d="M322 108 L358 108 L366 140 L314 140 Z" className="cv-lamp-shade" />
      <rect x={339} y={140} width={2.5} height={118} className="cv-room-leg" />
      <rect x={326} y={256} width={28} height={4} rx={2} className="cv-room-leg" />
      {tag(250, 112, lamp, 58)}
      {/* shelf */}
      <g>
        <rect x={418} y={118} width={92} height={142} className="cv-shelf" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={424} y={124 + i * 44} width={80} height={38} className="cv-shelf-hole" />
        ))}
        {[
          [430, 136, 8, 24],
          [440, 132, 10, 28],
          [452, 140, 7, 20],
          [474, 178, 22, 18],
          [432, 222, 9, 26],
          [445, 226, 9, 22],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} className={i % 3 === 1 ? 'cv-acc' : 'cv-book'} />
        ))}
      </g>
      {tag(428, 92, shelf, 66)}
    </g>
  );
}

const SCENES: Record<Cover['scene'], (p: { c: Cover; uid: string }) => ReactNode> = {
  dashboard: Dashboard,
  landing: Landing,
  facade: Facade,
  chess: Chess,
  genplan: Genplan,
  village: Village,
  catalog: Catalog,
  studio: Studio,
  event: Event,
  carrent: CarRent,
  letter: Letter,
  transcript: Transcript,
  ticket: Ticket,
  door: Door,
  room: Room,
};

export function ProjectCover({ cover, domain }: { cover: Cover; domain: string }) {
  const uid = useId().replace(/:/g, '');
  const Scene = SCENES[cover.scene];
  return (
    <svg
      className={`cover cover--${cover.tone}`}
      viewBox="0 0 640 400"
      role="presentation"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={`${uid}-dots`} width={16} height={16} patternUnits="userSpaceOnUse">
          <circle cx={1.5} cy={1.5} r={1} className="cv-dot" />
        </pattern>
        <radialGradient id={`${uid}-glow`} cx="0.75" cy="0.15" r="0.75">
          <stop offset="0" className="cv-glow-stop" />
          <stop offset="1" className="cv-glow-stop cv-glow-stop--end" />
        </radialGradient>
        <clipPath id={`${uid}-window`}>
          <rect width={W} height={420} rx={12} />
        </clipPath>
        <clipPath id={`${uid}-ball`}>
          <circle cx={440} cy={70} r={40} />
        </clipPath>
        <filter id={`${uid}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={34} />
        </filter>
      </defs>

      <rect width={640} height={400} className="cv-bg" />
      <rect width={640} height={400} fill={`url(#${uid}-dots)`} />
      <rect width={640} height={400} fill={`url(#${uid}-glow)`} className="cv-glow" />

      <g transform="translate(40 42)">
        <g className="cv-window">
          <rect width={W} height={420} rx={12} className="cv-window-bg" />
          <g clipPath={`url(#${uid}-window)`}>
            {/* address bar */}
            <rect width={W} height={30} className="cv-chrome" />
            <path d="M18 11 l-4 4 l4 4 M30 11 l4 4 l-4 4" className="cv-chrome-icon" />
            <rect x={W / 2 - 120} y={7} width={240} height={16} rx={8} className="cv-address" />
            <rect x={W / 2 - 108} y={12.5} width={6} height={5} rx={1} className="cv-lock" />
            <text x={W / 2} y={18.6} textAnchor="middle" className="cv-domain">
              {domain}
            </text>
            <rect y={30} width={W} height={1} className="cv-grid" />
            <g transform="translate(0 31)">
              <Scene c={cover} uid={uid} />
            </g>
          </g>
          <rect width={W} height={420} rx={12} className="cv-window-stroke" />
        </g>
      </g>
    </svg>
  );
}
