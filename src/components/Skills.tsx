import { useState, type CSSProperties, type ReactNode } from 'react';
import { capabilities, levelLabel, skillGroups, type Level } from '../data/skills';
import { SectionHead } from './SectionHead';
import './Skills.css';

type Line = { key: string; content: ReactNode; level?: Level };

function buildLines(): Line[] {
  const lines: Line[] = [
    { key: 'open', content: <span className="t-mut">{'{'}</span> },
    {
      key: 'name',
      content: (
        <>
          {'  '}
          <span className="t-fn">"name"</span>: <span className="t-str">"maxim-malyutin"</span>,
        </>
      ),
    },
    {
      key: 'version',
      content: (
        <>
          {'  '}
          <span className="t-fn">"version"</span>: <span className="t-str">"4.4.0"</span>, <span className="t-com">// 4 года 4 месяца</span>
        </>
      ),
    },
  ];
  skillGroups.forEach((g, gi) => {
    lines.push({
      key: `${g.key}-open`,
      content: (
        <>
          {'  '}
          <span className="t-fn">"{g.key}"</span>: {'{'} <span className="t-com">// {g.title}</span>
        </>
      ),
    });
    g.items.forEach((it, i) => {
      lines.push({
        key: `${g.key}-${it.name}`,
        level: it.level,
        content: (
          <>
            {'    '}
            <span className="t-kw">"{it.name}"</span>: <span className={`lvl lvl--${it.level}`}>"{it.level}"</span>
            {i < g.items.length - 1 ? ',' : ''}
          </>
        ),
      });
    });
    lines.push({ key: `${g.key}-close`, content: <>{`  }${gi < skillGroups.length - 1 ? ',' : ''}`}</> });
  });
  lines.push({ key: 'close', content: <span className="t-mut">{'}'}</span> });
  return lines;
}

const LINES = buildLines();
const LEVELS: Level[] = ['core', 'confident', 'familiar'];

export function Skills() {
  const [focus, setFocus] = useState<Level | null>(null);

  return (
    <section className="section section--sunk skills" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead
          id="skills"
          path={['package.json']}
          prefix="$ cat"
          title="Навыки и стек"
          lead="Наведите на уровень, чтобы подсветить технологии."
        />

        <div className="skills__grid">
          <div className="json window" data-reveal="up" data-focus={focus ?? undefined}>
            <div className="window__bar">
              <span className="window__file">package.json</span>
              <div className="json__legend" role="group" aria-label="Уровень владения">
                {LEVELS.map((l) => (
                  <button
                    key={l}
                    type="button"
                    className={`json__legend-btn lvl--${l}${focus === l ? ' is-active' : ''}`}
                    aria-pressed={focus === l}
                    onMouseEnter={() => setFocus(l)}
                    onMouseLeave={() => setFocus(null)}
                    onFocus={() => setFocus(l)}
                    onBlur={() => setFocus(null)}
                    onClick={() => setFocus((f) => (f === l ? null : l))}
                  >
                    <span className="json__legend-dot" aria-hidden="true" />
                    {levelLabel[l]}
                  </button>
                ))}
              </div>
            </div>
            <pre className="json__code">
              {LINES.map((line, i) => (
                <span
                  key={line.key}
                  className={`json__line${line.level ? ` is-dep lvl-line--${line.level}` : ''}`}
                  style={{ '--l': i } as CSSProperties}
                >
                  <span className="json__ln" aria-hidden="true">
                    {i + 1}
                  </span>
                  {line.content}
                  {'\n'}
                </span>
              ))}
            </pre>
          </div>

          <div className="scripts">
            <h3 className="scripts__title" data-reveal="type">
              <span className="t-fn">"scripts"</span>
              <span className="t-mut">: {'{'}</span> <span className="t-com">// что я делаю</span>
            </h3>
            <ul className="scripts__list">
              {capabilities.map((c, i) => (
                <li key={c.cmd} className="scripts__item" data-reveal="left" style={{ '--delay': `${i * 0.06}s` } as CSSProperties}>
                  <code className="scripts__cmd">
                    <span className="t-com">$</span> npm run <span className="t-caret">{c.cmd}</span>
                  </code>
                  <p className="scripts__text">{c.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
