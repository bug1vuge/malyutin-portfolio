import { useEffect, useRef, useState } from 'react';
import { sections } from '../data/sections';
import { isFinePointer } from '../lib/motion';
import { useActiveSection } from '../lib/useActiveSection';
import { BranchIcon } from './Icons';
import './StatusBar.css';

/** VS Code-style status bar: the "cursor position" is your scroll and pointer. */
export function StatusBar() {
  const active = useActiveSection();
  const meta = sections.find((s) => s.id === active) ?? sections[0];
  const [pos, setPos] = useState({ ln: 1, col: 1, pct: 0 });
  const col = useRef(1);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPos({
        ln: Math.max(1, Math.round(window.scrollY / 24) + 1),
        col: col.current,
        pct: max > 0 ? Math.round((window.scrollY / max) * 100) : 0,
      });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onMove = (e: PointerEvent) => {
      col.current = Math.max(1, Math.round(e.clientX / 9));
      schedule();
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    if (isFinePointer()) window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <div className="statusbar" aria-hidden="true">
      <div className="statusbar__group">
        <span className="statusbar__item statusbar__branch">
          <BranchIcon />
          main
        </span>
        <span className="statusbar__item statusbar__ok">✓ 0 ошибок</span>
        <span className="statusbar__item statusbar__file">{meta.file}</span>
      </div>
      <div className="statusbar__group">
        <span className="statusbar__item statusbar__hide-sm">
          Ln {pos.ln}, Col {pos.col}
        </span>
        <span className="statusbar__item statusbar__hide-sm">UTF-8</span>
        <span className="statusbar__item statusbar__hide-sm">{meta.lang}</span>
        <span className="statusbar__item statusbar__pct">{pos.pct}%</span>
      </div>
    </div>
  );
}
