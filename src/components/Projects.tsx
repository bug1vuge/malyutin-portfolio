import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent, type PointerEvent } from 'react';
import { contacts } from '../data/profile';
import { categories, projects, type Project, type ProjectCategory } from '../data/projects';
import { isFinePointer } from '../lib/motion';
import { ExternalIcon, GithubIcon } from './Icons';
import { SectionHead } from './SectionHead';
import './Projects.css';

const TONES = ['kw', 'fn', 'str', 'num', 'com', 'tx'] as const;

/** Small deterministic PRNG so every project gets its own stable "code" preview. */
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

function CodePreview({ id }: { id: string }) {
  const lines = useMemo(() => {
    const rnd = seeded(id);
    let indent = 0;
    return Array.from({ length: 22 }, () => {
      const r = rnd();
      if (r < 0.12 && indent > 0) indent -= 1;
      const tokens = Array.from({ length: 1 + Math.floor(rnd() * 4) }, () => ({
        w: 2 + Math.floor(rnd() * 9),
        tone: TONES[Math.floor(rnd() * TONES.length)],
      }));
      const line = { indent, tokens, blank: rnd() < 0.12 };
      if (r > 0.78 && indent < 3) indent += 1;
      return line;
    });
  }, [id]);

  return (
    <div className="preview" aria-hidden="true">
      <div className="preview__scroll">
        {[0, 1].map((copy) => (
          <div key={copy} className="preview__block">
            {lines.map((l, i) => (
              <div key={i} className="preview__line">
                <span className="preview__ln">{i + 1}</span>
                {!l.blank &&
                  l.tokens.map((t, j) => (
                    <span
                      key={j}
                      className={`preview__tok preview__tok--${t.tone}`}
                      style={{ width: `${t.w * 0.5}em`, marginLeft: j === 0 ? `${l.indent * 1.2}em` : undefined }}
                    />
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const isStub = (url: string | null) => url === '#';
const blockStub = (e: MouseEvent<HTMLAnchorElement>, url: string | null) => {
  if (isStub(url)) e.preventDefault();
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!isFinePointer()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${(nx * 8).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${(-ny * 8).toFixed(2)}deg`);
  };
  const onLeave = (e: PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty('--ry', '0deg');
    e.currentTarget.style.setProperty('--rx', '0deg');
  };

  const slug = project.id;

  return (
    <li className="project-cell" style={{ '--i': index } as CSSProperties}>
      <article className="project" data-glow onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="project__bar">
          <span className="project__file">
            <span className="project__folder" aria-hidden="true" />
            {slug}/
          </span>
          {project.placeholder ? <span className="project__todo">// TODO</span> : <span className="t-com">{project.year}</span>}
        </div>

        <div className="project__media">
          {project.image ? (
            <img src={`${import.meta.env.BASE_URL}${project.image}`} alt={`Скриншот проекта ${project.title}`} loading="lazy" />
          ) : (
            <CodePreview id={project.id} />
          )}
        </div>

        <div className="project__body">
          <h3 className="project__title">{project.title}</h3>
          <p className="project__desc">{project.description}</p>
          <ul className="project__stack" aria-label="Стек">
            {project.stack.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="project__links">
          {project.demoUrl && (
            <a
              className="project__link project__link--demo"
              href={project.demoUrl}
              target={isStub(project.demoUrl) ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-disabled={isStub(project.demoUrl) || undefined}
              onClick={(e) => blockStub(e, project.demoUrl)}
            >
              <ExternalIcon />
              Открыть продукт
            </a>
          )}
          {project.repoUrl && (
            <a className="project__link" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <GithubIcon />
              Код на GitHub
            </a>
          )}
        </div>
      </article>
    </li>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');
  const [seen, setSeen] = useState(false);
  const gridWrap = useRef<HTMLDivElement>(null);

  // Cards deal in once, when the grid first scrolls into view; filter changes replay it.
  useEffect(() => {
    const el = gridWrap.current;
    if (!el || !('IntersectionObserver' in window)) return setSeen(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter);
  const count = (key: ProjectCategory | 'all') => (key === 'all' ? projects.length : projects.filter((p) => p.category === key).length);

  return (
    <section className="section projects" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead
          id="projects"
          path={['projects']}
          prefix="$ ls"
          title="Проекты"
          lead="Избранные работы: у каждой — ссылка на живой продукт и на исходный код."
        />

        <div className="filters" role="toolbar" aria-label="Фильтр проектов" data-reveal="up">
          <span className="filters__prompt t-com" aria-hidden="true">
            --filter=
          </span>
          {categories
            .filter((c) => count(c.key) > 0)
            .map((c) => (
              <button
                key={c.key}
                type="button"
                className={`filters__btn${filter === c.key ? ' is-active' : ''}`}
                aria-pressed={filter === c.key}
                onClick={() => setFilter(c.key)}
              >
                {c.label}
                <span className="filters__count">{count(c.key)}</span>
              </button>
            ))}
        </div>

        <div ref={gridWrap}>
          <ul className={`projects__grid${seen ? ' is-in' : ''}`} key={filter} aria-live="polite">
            {visible.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
            <li className="project-cell" style={{ '--i': visible.length } as CSSProperties}>
              <a className="project project--more" href={contacts.githubHref} target="_blank" rel="noopener noreferrer" data-glow>
                <GithubIcon className="project__more-icon" />
                <span className="project__more-title">Остальной код — на GitHub</span>
                <span className="project__more-handle t-str">github.com/{contacts.github}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
