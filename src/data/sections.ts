/** Every section is a "file" open in the editor: the header tabs, minimap and status bar read from here. */
export type SectionId = 'top' | 'about' | 'experience' | 'projects' | 'skills' | 'contacts';

export interface SectionMeta {
  id: SectionId;
  file: string;
  /** Language shown in the status bar while this section is active. */
  lang: string;
  /** Color of the file icon dot. */
  tone: 'kw' | 'str' | 'fn' | 'num' | 'caret';
}

// Human-readable labels live in the UI dictionary (t.sections[id]).
export const sections: SectionMeta[] = [
  { id: 'top', file: 'index.tsx', lang: 'TypeScript React', tone: 'fn' },
  { id: 'about', file: 'README.md', lang: 'Markdown', tone: 'str' },
  { id: 'experience', file: 'experience.log', lang: 'Git Log', tone: 'num' },
  { id: 'projects', file: 'projects/', lang: 'Directory', tone: 'caret' },
  { id: 'skills', file: 'package.json', lang: 'JSON', tone: 'kw' },
  { id: 'contacts', file: 'contact.sh', lang: 'Shell Script', tone: 'str' },
];
