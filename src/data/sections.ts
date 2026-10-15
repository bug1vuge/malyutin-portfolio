/** Every section is a "file" open in the editor: the header tabs, minimap and status bar read from here. */
export interface SectionMeta {
  id: string;
  file: string;
  label: string;
  /** Language shown in the status bar while this section is active. */
  lang: string;
  /** Color of the file icon dot. */
  tone: 'kw' | 'str' | 'fn' | 'num' | 'caret';
}

export const sections: SectionMeta[] = [
  { id: 'top', file: 'index.tsx', label: 'Главная', lang: 'TypeScript React', tone: 'fn' },
  { id: 'about', file: 'README.md', label: 'Обо мне', lang: 'Markdown', tone: 'str' },
  { id: 'experience', file: 'experience.log', label: 'Опыт', lang: 'Git Log', tone: 'num' },
  { id: 'projects', file: 'projects/', label: 'Проекты', lang: 'Directory', tone: 'caret' },
  { id: 'skills', file: 'package.json', label: 'Навыки', lang: 'JSON', tone: 'kw' },
  { id: 'contacts', file: 'contact.sh', label: 'Контакты', lang: 'Shell Script', tone: 'str' },
];
