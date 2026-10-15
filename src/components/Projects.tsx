import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { contacts } from '../data/profile';
import { categories, categoryTag, projects, type Project, type ProjectCategory } from '../data/projects';
import { useLang } from '../i18n/lang';
import { isFinePointer } from '../lib/motion';
import { ExternalIcon, GithubIcon, LockIcon } from './Icons';
import { ProjectCover } from './ProjectCover';
import { SectionHead } from './SectionHead';
import './Projects.css';

const STACK_VISIBLE = 5;

function ProjectCard({ project, index, featured }: { project: Project; index: number; featured: boolean }) {
  const { t, tr } = useLang();
  const [allStack, setAllStack] = useState(false);
  const title = tr(project.title);
  const hidden = project.stack.length - STACK_VISIBLE;
  const stack = allStack || hidden <= 1 ? project.stack : project.stack.slice(0, STACK_VISIBLE);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!isFinePointer()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    const k = featured ? 4 : 7;
    el.style.setProperty('--ry', `${(nx * k).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${(-ny * k).toFixed(2)}deg`);
  };
  const onLeave = (e: PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty('--ry', '0deg');
    e.currentTarget.style.setProperty('--rx', '0deg');
  };

  return (
    <li className={`project-cell${featured ? ' project-cell--featured' : ''}`} style={{ '--i': index } as CSSProperties}>
      <article className="project" data-glow onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="project__bar">
          <span className="project__file">
            <span className="project__folder" aria-hidden="true" />
            {project.domain}
          </span>
          <span className="t-com">// {tr(categoryTag[project.category])}</span>
        </div>

        <a className="project__media" href={project.demoUrl} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
          <ProjectCover cover={project.cover} domain={project.domain} />
        </a>

        <div className="project__content">
          <div className="project__body">
            <h3 className="project__title">{title}</h3>
            <p className="project__desc">{tr(project.description)}</p>
            <ul className="project__stack" aria-label={t.projects.stack}>
              {stack.map((s) => (
                <li key={tr(s)} className="chip">
                  {tr(s)}
                </li>
              ))}
              {hidden > 1 && (
                <li>
                  <button type="button" className="chip chip--more" aria-expanded={allStack} onClick={() => setAllStack((v) => !v)}>
                    {allStack ? '−' : `+${hidden}`}
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div className="project__links">
            <a className="project__link project__link--demo" href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalIcon />
              {t.projects.demo}
            </a>
            {project.repoUrl ? (
              <a className="project__link" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <GithubIcon />
                {t.projects.repo}
              </a>
            ) : (
              <span className="project__link project__link--private" title={t.projects.privateHint}>
                <LockIcon />
                {t.projects.private}
              </span>
            )}
          </div>
        </div>
      </article>
    </li>
  );
}

export function Projects() {
  const { t, tr } = useLang();
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
        <SectionHead id="projects" path={['projects']} prefix="$ ls" title={t.projects.title} lead={t.projects.lead} />

        <div className="filters" role="toolbar" aria-label={t.projects.filter} data-reveal="up">
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
                {tr(c.label)}
                <span className="filters__count">{count(c.key)}</span>
              </button>
            ))}
        </div>

        <div ref={gridWrap}>
          <ul className={`projects__grid${seen ? ' is-in' : ''}`} key={filter} aria-live="polite">
            {visible.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} featured={Boolean(p.featured) && i === 0} />
            ))}
            <li className="project-cell project-cell--more" style={{ '--i': visible.length } as CSSProperties}>
              <a className="project project--more" href={contacts.githubHref} target="_blank" rel="noopener noreferrer" data-glow>
                <GithubIcon className="project__more-icon" />
                <span className="project__more-text">
                  <span className="project__more-title">{t.projects.moreTitle}</span>
                  <span className="project__more-handle t-str">github.com/{contacts.github}</span>
                </span>
                <span className="project__more-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
