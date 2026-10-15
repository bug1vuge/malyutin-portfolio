import './Marquee.css';

const STACK = ['React', 'TypeScript', 'Redux Toolkit', 'Node.js', 'PostgreSQL', 'REST API', 'Next.js', 'Vite', 'Vitest'];
const WORK = ['SPA', 'админ-панели', 'SVG-схемы', 'карты', 'платежи', 'аналитика', 'тесты', 'PageSpeed 95+'];

function Band({ items, sep, variant }: { items: string[]; sep: string; variant: 'a' | 'b' }) {
  const row = (key: string) => (
    <span className="marquee__row" key={key}>
      {items.map((m) => (
        <span className="marquee__item" key={m}>
          {m}
          <span className="marquee__sep">{sep}</span>
        </span>
      ))}
    </span>
  );
  return (
    <div className={`marquee__band marquee__band--${variant}`}>
      <div className="marquee__track">{[row('1'), row('2')]}</div>
    </div>
  );
}

/** Two crossing tapes: what I write with, and what I build. */
export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <Band items={WORK} sep=";" variant="b" />
      <Band items={STACK} sep="✦" variant="a" />
    </div>
  );
}
