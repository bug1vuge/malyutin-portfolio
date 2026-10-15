import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react';
import { jobs } from '../data/experience';
import { contacts, profile } from '../data/profile';
import { skillGroups } from '../data/skills';
import { useLang } from '../i18n/lang';
import type { Dictionary } from '../i18n/ui';

const PROMPT = 'guest@malyutin:~$';

const link = (href: string, text: string) => (
  <a className="t-str" href={href} target="_blank" rel="noopener noreferrer">
    {text}
  </a>
);

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

type Ctx = ReturnType<typeof useLang>;
type CommandName = keyof Dictionary['terminal']['help'];

interface Command {
  /** Rendered with the current language, so old output switches language too. */
  render: (ctx: Ctx) => ReactNode;
  /** Side effect, run once when the command is entered. */
  effect?: () => void;
}

const COMMANDS: Record<CommandName, Command> = {
  help: {
    render: ({ t }) => (
      <>
        {(Object.keys(COMMANDS) as CommandName[]).map((name) => (
          <div key={name}>
            <span className="t-caret">{name.padEnd(12, ' ')}</span>
            <span className="t-com">{t.terminal.help[name]}</span>
          </div>
        ))}
      </>
    ),
  },
  whoami: {
    render: ({ tr }) => (
      <>
        {tr(profile.firstName)} {tr(profile.lastName)} — {tr(profile.role)} ({profile.stack}).
        <br />
        <span className="t-com">
          {tr(profile.city)}, {profile.timezone}. {tr(profile.focus)}.
        </span>
      </>
    ),
  },
  contacts: {
    render: () => (
      <>
        <div>email {link(`mailto:${contacts.email}`, contacts.email)}</div>
        <div>telegram {link(contacts.telegramHref, contacts.telegram)}</div>
        <div>phone {link(contacts.phoneHref, contacts.phone)}</div>
        <div>github {link(contacts.githubHref, `github.com/${contacts.github}`)}</div>
      </>
    ),
  },
  stack: {
    render: () =>
      skillGroups
        .flatMap((g) => g.items)
        .filter((i) => i.level === 'core')
        .map((i) => i.name)
        .join(', '),
  },
  experience: {
    render: ({ tr }) => (
      <>
        {jobs.map((j) => (
          <div key={j.hash}>
            <span className="t-caret">{j.hash}</span> {tr(j.role)} @ {j.company} <span className="t-com">({tr(j.period)})</span>
          </div>
        ))}
      </>
    ),
  },
  projects: {
    effect: () => window.setTimeout(() => scrollTo('projects'), 350),
    render: () => <span className="t-com">cd ~/projects …</span>,
  },
  github: {
    effect: () => window.open(contacts.githubHref, '_blank', 'noopener,noreferrer'),
    render: ({ t }) => (
      <>
        {t.terminal.opening} {link(contacts.githubHref, `github.com/${contacts.github}`)} …
      </>
    ),
  },
  clear: { render: () => null },
};

const isCommand = (name: string): name is CommandName => name in COMMANDS;

type Entry = { id: number; cmd?: string; name?: string };

let uid = 0;

function Output({ name, ctx }: { name: string; ctx: Ctx }) {
  const { t } = ctx;
  if (name === 'sudo') {
    return (
      <span className="t-num">
        {t.terminal.sudo} {link(contacts.telegramHref, contacts.telegram)}
      </span>
    );
  }
  if (isCommand(name)) return <>{COMMANDS[name].render(ctx)}</>;
  return (
    <span>
      <span className="t-num">{t.terminal.notFound}</span> {name}. {t.terminal.tryHelp} <span className="t-caret">help</span>
    </span>
  );
}

/** A small working shell: type `help` to see what it can do. */
export function Terminal({ autoplay }: { autoplay: boolean }) {
  const ctx = useLang();
  const { t } = ctx;
  const [history, setHistory] = useState<Entry[]>([{ id: uid++ }]);
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
    if (isCommand(name)) COMMANDS[name].effect?.();
    setHistory((h) => [...h, { id: uid++, cmd, name }]);
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
            {h.cmd === undefined ? (
              <div className="term__out t-com">{t.terminal.intro}</div>
            ) : (
              <>
                <div className="term__cmd">
                  <span className="term__prompt">{PROMPT}</span> {h.cmd}
                </div>
                <div className="term__out">
                  <Output name={h.name ?? ''} ctx={ctx} />
                </div>
              </>
            )}
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
            aria-label={t.terminal.inputLabel}
          />
        </form>
      </div>
    </div>
  );
}
