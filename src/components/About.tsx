import { useEffect, useRef, type CSSProperties } from 'react';
import { education, profile } from '../data/profile';
import { useLang, type Localized } from '../i18n/lang';
import { countUp } from '../lib/motion';
import { SectionHead } from './SectionHead';
import './About.css';

function Fact({ value, suffix, label, index }: { value: number; suffix: string; label: Localized; index: number }) {
  const { tr } = useLang();
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => (ref.current ? countUp(ref.current, value) : undefined), [value]);
  return (
    <div className="fact" data-reveal="up" data-glow style={{ '--delay': `${index * 0.08}s` } as CSSProperties}>
      <dt className="fact__label">{tr(label)}</dt>
      <dd className="fact__value">
        <span ref={ref}>{value}</span>
        {suffix}
      </dd>
    </div>
  );
}

export function About() {
  const { t, tr } = useLang();
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHead id="about" path={['README.md']} prefix="#" title={t.about.title} />

        <div className="about__grid">
          <div className="about__text">
            {profile.about.map((p, i) => (
              <p key={i} className="about__p" data-reveal="up" style={{ '--delay': `${i * 0.08}s` } as CSSProperties}>
                {tr(p)}
              </p>
            ))}

            <div className="about__edu" data-reveal="up">
              <h3 className="about__edu-title">
                <span className="t-com">## </span>
                {t.about.education}
              </h3>
              <ul>
                {education.map((e) => (
                  <li key={e.year}>
                    <span className="about__edu-year t-num">{e.year}</span>
                    <div>
                      <p className="about__edu-name">{tr(e.title)}</p>
                      <p className="about__edu-detail">{tr(e.detail)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <dl className="about__facts">
            {profile.facts.map((f, i) => (
              <Fact key={f.value} {...f} index={i} />
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
