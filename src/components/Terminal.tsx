import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react';
import { jobs } from '../data/experience';
import { contacts, profile } from '../data/profile';
import { skillGroups } from '../data/skills';

type Entry = { id: number; cmd?: string; out: ReactNode };

const PROMPT = 'guest@malyutin:~$';

const link = (href: string, text: string) => (
  <a className="t-str" href={href} target="_blank" rel="noopener noreferrer">
    {text}
  </a>
);

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const COMMANDS: Record<string, { help: string; run: () => ReactNode }> = {
  help: {
    help: 'список команд',
    run: () => (
      <>
        {Object.entries(COMMANDS).map(([name, c]) => (
          <div key={name}>
            <span className="t-caret">{name.padEnd(11, ' ')}</span>
            <span className="t-com">{c.help}</span>
          </div>
        ))}
      </>
    ),
  },
  whoami: {
    help: 'кто я',
    run: () => (
      <>
        {profile.firstName} {profile.lastName} — {profile.role} ({profile.stack}).
        <br />
        <span className="t-com">
          {profile.city}, {profile.timezone}. {profile.focus}.
        </span>
      </>
    ),
  },
  contacts: {
    help: 'все способы связи',
    run: () => (
      <>
        <div>email {link(`mailto:${contacts.email}`, contacts.email)}</div>
        <div>telegram {link(contacts.telegramHref, contacts.telegram)}</div>
        <div>phone {link(contacts.phoneHref, contacts.phone)}</div>
        <div>github {link(contacts.githubHref, `github.com/${contacts.github}`)}</div>
      </>
    ),
  },
  stack: {
    help: 'основной стек',
    run: () =>
      skillGroups
        .flatMap((g) => g.items)
        .filter((i) => i.level === 'core')
        .map((i) => i.name)
        .join(', '),
  },
  experience: {
    help: 'краткий опыт',
    run: () => (
      <>
        {jobs.map((j) => (
          <div key={j.hash}>
            <span className="t-caret">{j.hash}</span> {j.role} @ {j.company} <span className="t-com">({j.period})</span>
          </div>
        ))}
      </>
    ),
  },
  projects: {
    help: 'перейти к проектам',
    run: () => {
      window.setTimeout(() => scrollTo('projects'), 350);
      return <span className="t-com">cd ~/projects …</span>;
    },
  },
  github: {
    help: 'открыть мой GitHub',
    run: () => {
      window.open(contacts.githubHref, '_blank', 'noopener,noreferrer');
      return <>Открываю {link(contacts.githubHref, `github.com/${contacts.github}`)} …</>;
    },
  },
  clear: { help: 'очистить экран', run: () => null },
};

let uid = 0;

/** A small working shell: type `help` to see what it can do. */
export function Terminal({ autoplay }: { autoplay: boolean }) {
  const [history, setHistory] = useState<Entry[]>([
    { id: uid++, out: <span className="t-com">Введите help, чтобы увидеть команды. Tab дополняет, ↑ ↓ — история.</span> },
  ]);
  const [value, setValue] = useState('');
  const [past, setPast] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    const name = cmd.split(/\s+/)[0].toLowerCase();
    if (name === 'clear') {
      setHistory([]);
      return;
    }
    const sudo = name === 'sudo';
    const out = sudo ? (
      <span className="t-num">Permission granted. Но проще написать в Telegram: {link(contacts.telegramHref, contacts.telegram)}</span>
    ) : COMMANDS[name] ? (
      COMMANDS[name].run()
    ) : (
      <span>
        <span className="t-num">command not found:</span> {name}. Попробуйте <span className="t-caret">help</span>
      </span>
    );
    setHistory((h) => [...h, { id: uid++, cmd, out }]);
    setPast((p) => [cmd, ...p].slice(0, 30));
    setCursor(-1);
  };

  // Type `whoami` by itself the first time the terminal scrolls into view.
  useEffect(() => {
    if (!autoplay || played.current) return;
    const text = 'whoami';
    const timers: number[] = [];
    for (let i = 1; i <= text.length; i++) timers.push(window.setTimeout(() => setValue(text.slice(0, i)), 500 + i * 90));
    timers.push(
      window.setTimeout(
        () => {
          played.current = true;
          run(text);
          setValue('');
        },
        500 + text.length * 90 + 350,
      ),
    );
    return () => timers.forEach(clearTimeout);
  }, [autoplay]);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [history]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    run(value);
    setValue('');
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(cursor + 1, past.length - 1);
      if (past[next] !== undefined) {
        setCursor(next);
        setValue(past[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(Math.max(next, -1));
      setValue(next >= 0 ? past[next] : '');
    } else if (e.key === 'Tab') {
      const match = Object.keys(COMMANDS).find((c) => value && c.startsWith(value.toLowerCase()));
      if (match) {
        e.preventDefault();
        setValue(match);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  return (
    <div className="term window" onClick={() => inputRef.current?.focus({ preventScroll: true })}>
      <div className="window__bar">
        <span className="window__file">zsh — contact.sh</span>
        <span className="window__lang">80×24</span>
      </div>
      <div className="term__body" ref={bodyRef} aria-live="polite">
        {history.map((h) => (
          <div key={h.id} className="term__entry">
            {h.cmd !== undefined && (
              <div className="term__cmd">
                <span className="term__prompt">{PROMPT}</span> {h.cmd}
              </div>
            )}
            {h.out && <div className="term__out">{h.out}</div>}
          </div>
        ))}
        <form className="term__form" onSubmit={onSubmit}>
          <label htmlFor="term-input" className="term__prompt">
            {PROMPT}
          </label>
          <input
            id="term-input"
            ref={inputRef}
            className="term__input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="send"
            aria-label="Команда терминала"
          />
        </form>
      </div>
    </div>
  );
}
