import { useEffect, useState } from 'react';
import { sections } from '../data/sections';
import { LANGS, useLang } from '../i18n/lang';
import { useActiveSection } from '../lib/useActiveSection';
import { CloseIcon, MenuIcon } from './Icons';
import './Header.css';

/** RU / EN switch styled as an editor encoding selector. */
function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label={t.header.language}>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          className={`lang-switch__btn${lang === l ? ' is-active' : ''}`}
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
        >
          {l}
        </button>
      ))}
      <span className="lang-switch__thumb" data-lang={lang} aria-hidden="true" />
    </div>
  );
}

/** Editor tab bar: each section is an open file, the active one follows the scroll. */
export function Header() {
  const { t } = useLang();
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="header__inner">
          <a className="header__logo" href="#top" aria-label={t.header.home}>
            <span className="header__logo-mark" aria-hidden="true">
              <span className="t-kw">&lt;</span>MM<span className="t-kw">/&gt;</span>
            </span>
            <span className="header__logo-path">~/malyutin</span>
          </a>

          <nav className="header__tabs" aria-label={t.header.nav}>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`tab${active === s.id ? ' is-active' : ''}`}
                aria-current={active === s.id ? 'location' : undefined}
                title={t.sections[s.id]}
              >
                <span className={`tab__dot tab__dot--${s.tone}`} aria-hidden="true" />
                {s.file}
              </a>
            ))}
          </nav>

          <LangSwitch className="header__lang" />

          <a className="btn header__cta" href="#contacts">
            {t.header.contact}
          </a>

          <button
            className="header__burger"
            type="button"
            aria-expanded={open}
            aria-controls="explorer"
            aria-label={open ? t.header.closeMenu : t.header.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      {/* Outside <header>: its backdrop-filter would become the containing block of this fixed panel. */}
      <div id="explorer" className={`explorer${open ? ' is-open' : ''}`} inert={!open}>
        <p className="explorer__title t-com">// explorer</p>
        <ul>
          {sections.map((s, i) => (
            <li key={s.id} style={{ transitionDelay: `${0.05 + i * 0.04}s` }}>
              <a href={`#${s.id}`} onClick={() => setOpen(false)} className={active === s.id ? 'is-active' : undefined}>
                <span className={`tab__dot tab__dot--${s.tone}`} aria-hidden="true" />
                <span className="explorer__file">{s.file}</span>
                <span className="explorer__label">{t.sections[s.id]}</span>
              </a>
            </li>
          ))}
        </ul>
        <a className="btn explorer__cta" href="#contacts" onClick={() => setOpen(false)}>
          {t.header.contact}
        </a>
      </div>
    </>
  );
}
