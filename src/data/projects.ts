/**
 * Портфолио проектов.
 *
 * Сейчас здесь заглушки. Чтобы добавить настоящий проект — замените объект:
 *   title       — название проекта
 *   description — 1–2 предложения: что это и какую задачу решает
 *   category    — одна из категорий ниже (по ней работает фильтр)
 *   stack       — 3–5 технологий
 *   demoUrl     — ссылка на живой продукт (null — кнопка скроется)
 *   repoUrl     — ссылка на код на GitHub (null — кнопка скроется)
 *   image       — путь к скриншоту в /public, например 'projects/floxy.webp' (null — нарисуется код-превью)
 *   year        — год реализации
 */

export type ProjectCategory = 'spa' | 'admin' | 'fullstack' | 'landing';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  stack: string[];
  demoUrl: string | null;
  repoUrl: string | null;
  image: string | null;
  year: number;
  placeholder?: boolean;
}

export const categories: { key: ProjectCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'spa', label: 'SPA' },
  { key: 'admin', label: 'Админ-панели' },
  { key: 'fullstack', label: 'Fullstack' },
  { key: 'landing', label: 'Сайты' },
];

export const projects: Project[] = [
  {
    id: 'project-01',
    title: 'Проект 01',
    description: 'Заглушка. Здесь будет короткое описание: что за продукт и какую задачу он решает.',
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
    title: 'Проект 02',
    description: 'Заглушка. Fullstack-сервис: интерфейс, REST API и база данных.',
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
    title: 'Проект 03',
    description: 'Заглушка. Одностраничное приложение со сложной клиентской логикой.',
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
    title: 'Проект 04',
    description: 'Заглушка. Сайт жилого комплекса с интерактивной SVG-схемой и подбором квартир.',
    category: 'landing',
    stack: ['JavaScript', 'SVG', 'Яндекс Карты'],
    demoUrl: '#',
    repoUrl: 'https://github.com/bug1vuge',
    image: null,
    year: 2025,
    placeholder: true,
  },
  {
    id: 'project-05',
    title: 'Проект 05',
    description: 'Заглушка. Аналитический дашборд с графиками и фильтрами.',
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
    title: 'Проект 06',
    description: 'Заглушка. Корпоративный сайт с анимациями и формами заявок.',
    category: 'landing',
    stack: ['HTML', 'SCSS', 'JavaScript', 'MODX'],
    demoUrl: '#',
    repoUrl: 'https://github.com/bug1vuge',
    image: null,
    year: 2023,
    placeholder: true,
  },
];
