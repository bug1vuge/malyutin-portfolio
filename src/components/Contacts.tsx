import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { contacts, profile } from '../data/profile';
import { useLang } from '../i18n/lang';
import { CheckIcon, CopyIcon, GithubIcon, MailIcon, PhoneIcon, TelegramIcon } from './Icons';
import { SectionHead } from './SectionHead';
import { Terminal } from './Terminal';
import './Contacts.css';

function CopyButton({ text }: { text: string }) {
  const { t } = useLang();
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      window.setTimeout(() => setDone(false), 1800);
    } catch {
      /* clipboard unavailable — the address is still selectable */
    }
  };
  return (
    <button
      type="button"
      className={`copy${done ? ' is-done' : ''}`}
      onClick={copy}
      aria-label={done ? t.contacts.copied : t.contacts.copyEmail}
    >
      {done ? <CheckIcon /> : <CopyIcon />}
      <span aria-live="polite">{done ? t.contacts.copied : t.contacts.copy}</span>
    </button>
  );
}

type RowLabel = string | ((t: ReturnType<typeof useLang>['t']) => string);

const ROWS: { key: string; icon: ReactNode; label: RowLabel; value: string; href: string; external?: boolean; copy?: boolean }[] = [
  { key: 'telegram', icon: <TelegramIcon />, label: 'Telegram', value: contacts.telegram, href: contacts.telegramHref, external: true },
  { key: 'email', icon: <MailIcon />, label: 'Email', value: contacts.email, href: `mailto:${contacts.email}`, copy: true },
  { key: 'phone', icon: <PhoneIcon />, label: (t) => t.contacts.phone, value: contacts.phone, href: contacts.phoneHref },
  {
    key: 'github',
    icon: <GithubIcon />,
    label: 'GitHub',
    value: `github.com/${contacts.github}`,
    href: contacts.githubHref,
    external: true,
  },
];

export function Contacts() {
  const { t, tr } = useLang();
  const termWrap = useRef<HTMLDivElement>(null);
  const [termVisible, setTermVisible] = useState(false);

  useEffect(() => {
    const el = termWrap.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTermVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const year = new Date().getFullYear();

  return (
    <section className="section contacts" id="contacts" aria-labelledby="contacts-title">
      <div className="container">
        <SectionHead id="contacts" path={['contact.sh']} prefix="$ ./contact.sh" title={t.contacts.title} lead={t.contacts.lead} />

        <div className="contacts__grid">
          <ul className="contacts__list">
            {ROWS.map((r, i) => (
              <li key={r.key} className="contact" data-reveal="up" style={{ '--delay': `${i * 0.07}s` } as CSSProperties}>
                <a
                  className="contact__link"
                  href={r.href}
                  target={r.external ? '_blank' : undefined}
                  rel={r.external ? 'noopener noreferrer' : undefined}
                  data-glow
                >
                  <span className="contact__icon">{r.icon}</span>
                  <span className="contact__label">{typeof r.label === 'function' ? r.label(t) : r.label}</span>
                  <span className="contact__value">{r.value}</span>
                </a>
                {r.copy && <CopyButton text={r.value} />}
              </li>
            ))}
          </ul>

          <div ref={termWrap} data-reveal="right">
            <Terminal autoplay={termVisible} />
          </div>
        </div>

        <footer className="footer">
          <p>
            © {year} {tr(profile.firstName)} {tr(profile.lastName)}
          </p>
          <p className="t-com">{t.contacts.footerNote}</p>
          <a className="footer__top" href="#top">
            {t.contacts.toTop} <span aria-hidden="true">↑</span>
          </a>
        </footer>
      </div>
    </section>
  );
}
