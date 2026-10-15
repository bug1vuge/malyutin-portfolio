import type { Localized, MaybeLocalized } from '../i18n/lang';

/**
 * Портфолио проектов.
 *
 * Сейчас здесь заглушки. Чтобы добавить настоящий проект, замените объект:
 *   title       — название проекта
 *   description — 1–2 предложения: что это и какую задачу решает
 *   category    — одна из категорий ниже (по ней работает фильтр)
 *   stack       — 3–5 технологий
 *   demoUrl     — ссылка на живой продукт (null — кнопка скроется)
 *   repoUrl     — ссылка на код на GitHub (null — кнопка скроется)
 *   image       — путь к скриншоту в /public, например 'projects/floxy.webp' (null — нарисуется код-превью)
 *   year        — год реализации
 *
 * Текстовые поля пишутся либо одной строкой (одинаково на обоих языках),
 * либо парой { ru: '…', en: '…' }.
 */

export type ProjectCategory = 'spa' | 'admin' | 'fullstack' | 'landing';

export interface Project {
  id: string;
  title: MaybeLocalized;
  description: MaybeLocalized;
  category: ProjectCategory;
  stack: MaybeLocalized[];
  demoUrl: string | null;
  repoUrl: string | null;
  image: string | null;
  year: number;
  placeholder?: boolean;
}

export const categories: { key: ProjectCategory | 'all'; label: Localized }[] = [
  { key: 'all', label: { ru: 'Все', en: 'All' } },
  { key: 'spa', label: { ru: 'SPA', en: 'SPA' } },
  { key: 'admin', label: { ru: 'Админ-панели', en: 'Admin panels' } },
  { key: 'fullstack', label: { ru: 'Fullstack', en: 'Full-stack' } },
  { key: 'landing', label: { ru: 'Сайты', en: 'Websites' } },
];

export const projects: Project[] = [
  {
    id: 'project-01',
    title: { ru: 'Проект 01', en: 'Project 01' },
    description: {
      ru: 'Заглушка. Здесь будет короткое описание: что за продукт и какую задачу он решает.',
      en: 'Placeholder. A short description will go here: what the product is and what problem it solves.',
    },
    category: 'admin',
    stack: ['React', 'TypeScript', 'Redux Toolkit', 'Ant Design'],
    demoUrl: '#',
    repoUrl: 'https://github.com/bug1vuge',
    image: null,
    year: 2026,
    placeholder: true,
  },
  {
    id: 'project-02',
    title: { ru: 'Проект 02', en: 'Project 02' },
    description: {
      ru: 'Заглушка. Fullstack-сервис: интерфейс, REST API и база данных.',
      en: 'Placeholder. A full-stack service: user interface, REST API, and database.',
    },
    category: 'fullstack',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    demoUrl: '#',
    repoUrl: 'https://github.com/bug1vuge',
    image: null,
    year: 2026,
    placeholder: true,
  },
  {
    id: 'project-03',
    title: { ru: 'Проект 03', en: 'Project 03' },
    description: {
      ru: 'Заглушка. Одностраничное приложение со сложной клиентской логикой.',
      en: 'Placeholder. A single-page application with complex client-side logic.',
    },
    category: 'spa',
    stack: ['React', 'TypeScript', 'React Router', 'Vite'],
    demoUrl: '#',
    repoUrl: 'https://github.com/bug1vuge',
    image: null,
    year: 2025,
    placeholder: true,
  },
  {
    id: 'project-04',
    title: { ru: 'Проект 04', en: 'Project 04' },
    description: {
      ru: 'Заглушка. Сайт жилого комплекса с интерактивной SVG-схемой и подбором квартир.',
      en: 'Placeholder. A residential complex website with an interactive SVG plan and apartment search.',
    },
    category: 'landing',
    stack: ['JavaScript', 'SVG', { ru: 'Яндекс Карты', en: 'Yandex Maps' }],
    demoUrl: '#',
    repoUrl: 'https://github.com/bug1vuge',
    image: null,
    year: 2025,
    placeholder: true,
  },
  {
    id: 'project-05',
    title: { ru: 'Проект 05', en: 'Project 05' },
    description: {
      ru: 'Заглушка. Аналитический дашборд с графиками и фильтрами.',
      en: 'Placeholder. An analytics dashboard with charts and filters.',
    },
    category: 'admin',
    stack: ['React', 'TypeScript', 'Charts'],
    demoUrl: '#',
    repoUrl: 'https://github.com/bug1vuge',
    image: null,
    year: 2024,
    placeholder: true,
  },
  {
    id: 'project-06',
    title: { ru: 'Проект 06', en: 'Project 06' },
    description: {
      ru: 'Заглушка. Корпоративный сайт с анимациями и формами заявок.',
      en: 'Placeholder. A corporate website with animations and inquiry forms.',
    },
    category: 'landing',
    stack: ['HTML', 'SCSS', 'JavaScript', 'MODX'],
    demoUrl: '#',
    repoUrl: 'https://github.com/bug1vuge',
    image: null,
    year: 2023,
    placeholder: true,
  },
];
