import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { jobs, type Job } from '../data/experience';
import { ChevronIcon, ExternalIcon } from './Icons';
import { SectionHead } from './SectionHead';
import './Experience.css';

const REFS = ['HEAD -> main', 'tag: v2.0', 'tag: v1.0'];
const VISIBLE = 4;

function Commit({ job, index }: { job: Job; index: number }) {
  const [open, setOpen] = useState(false);
  const listId = `achievements-${job.hash}`;
  const rest = job.achievements.length - VISIBLE;

  return (
    <li className="commit" data-reveal="up" style={{ '--delay': `${index * 0.05}s` } as CSSProperties}>
      <span className="commit__node" aria-hidden="true" />

      <p className="commit__meta">
        <span className="t-caret">commit {job.hash}</span> <span className="commit__ref">({REFS[index] ?? 'tag'})</span>
        <br />
        <span className="t-com">Date: </span>
        <time>{job.period}</time>
        <span className="t-com">, {job.duration}</span>
      </p>

      <div className="commit__card" data-glow>
        <header className="commit__head">
          <h3>
            {job.role}
            <span className="commit__at t-com"> @ </span>
            <a className="commit__company" href={job.url} target="_blank" rel="noopener noreferrer">
              {job.company}
              <ExternalIcon />
            </a>
          </h3>
          <p className="commit__city">{job.city}</p>
        </header>

        <p className="commit__summary">{job.summary}</p>

        <dl className="commit__metrics">
          {job.metrics.map((m) => (
            <div key={m.label}>
              <dt>{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>

        <ul id={listId} className={`commit__diff${open ? ' is-open' : ''}`}>
          {job.achievements.map((a, i) => (
            <li key={i} className={i >= VISIBLE ? 'commit__extra' : undefined} style={{ '--n': i - VISIBLE } as CSSProperties}>
              <span className="commit__plus" aria-hidden="true">
                +
              </span>
              {a}
            </li>
          ))}
        </ul>

        {rest > 0 && (
          <button className="commit__toggle" type="button" aria-expanded={open} aria-controls={listId} onClick={() => setOpen((v) => !v)}>
            <ChevronIcon />
            {open ? 'Свернуть' : `Ещё ${rest} ${rest === 1 ? 'изменение' : rest < 5 ? 'изменения' : 'изменений'}`}
          </button>
        )}

        <ul className="commit__stack" aria-label="Технологии">
          {job.stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/** Work history rendered as `git log --graph`; the branch line fills as you scroll. */
export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = list.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
      list.style.setProperty('--progress', p.toFixed(4));
      list.querySelectorAll<HTMLElement>('.commit').forEach((li) => {
        const top = li.offsetTop + 10;
        li.classList.toggle('is-reached', p * r.height >= top);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    const ro = new ResizeObserver(onScroll);
    ro.observe(list);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="section section--sunk experience" id="experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHead
          id="experience"
          path={['experience.log']}
          prefix="$ git log"
          title="Опыт работы"
          lead="4 года 4 месяца коммерческой разработки. Свежие коммиты сверху."
        />

        <ol ref={listRef} className="git-log">
          {jobs.map((job, i) => (
            <Commit key={job.hash} job={job} index={i} />
          ))}
          <li className="commit commit--root" data-reveal="up">
            <span className="commit__node" aria-hidden="true" />
            <p className="commit__meta">
              <span className="t-caret">commit 0000000</span> <span className="commit__ref">(initial commit)</span>
              <br />
              <span className="t-com">2022 — первая коммерческая строка кода</span>
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
