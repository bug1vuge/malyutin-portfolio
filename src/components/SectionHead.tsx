import type { CSSProperties, ReactNode } from 'react';

interface Props {
  id: string;
  /** File path segments, the last one is the file itself. */
  path: string[];
  prefix?: string;
  title: ReactNode;
  lead?: ReactNode;
}

/** Breadcrumb path + title typed in. The path matches the header tab. */
export function SectionHead({ id, path, prefix, title, lead }: Props) {
  return (
    <div className="section-head">
      <p className="section-head__path" data-reveal="type">
        <i>~</i>
        {path.map((p, i) => (
          <span key={p}>
            <span>/</span>
            {i === path.length - 1 ? <b>{p}</b> : p}
          </span>
        ))}
      </p>
      <h2 id={`${id}-title`} data-reveal="up">
        {prefix && <span className="punct">{prefix} </span>}
        {title}
      </h2>
      {lead && (
        <p data-reveal="up" style={{ '--delay': '0.1s' } as CSSProperties}>
          {lead}
        </p>
      )}
    </div>
  );
}
