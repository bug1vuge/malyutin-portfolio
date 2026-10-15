import type { Localized } from '../i18n/lang';

export type Level = 'core' | 'confident' | 'familiar';

export interface SkillGroup {
  key: string;
  title: string;
  items: { name: string; level: Level }[];
}

/** Rendered as a package.json — `dependencies`, `devDependencies` and so on. */
export const skillGroups: SkillGroup[] = [
  {
    key: 'dependencies',
    title: 'Frontend',
    items: [
      { name: 'react', level: 'core' },
      { name: 'typescript', level: 'core' },
      { name: 'javascript', level: 'core' },
      { name: '@reduxjs/toolkit', level: 'core' },
      { name: 'react-router', level: 'core' },
      { name: 'next.js', level: 'confident' },
      { name: 'antd', level: 'core' },
      { name: 'html5', level: 'core' },
      { name: 'css3 / scss', level: 'core' },
      { name: 'graphql', level: 'familiar' },
    ],
  },
  {
    key: 'backendDependencies',
    title: 'Backend',
    items: [
      { name: 'node.js', level: 'confident' },
      { name: 'rest-api', level: 'core' },
      { name: 'postgresql', level: 'confident' },
      { name: 'mysql', level: 'confident' },
      { name: 'firebase', level: 'familiar' },
      { name: 'nginx', level: 'familiar' },
      { name: 'docker', level: 'familiar' },
    ],
  },
  {
    key: 'devDependencies',
    title: 'Tooling',
    items: [
      { name: 'vite', level: 'core' },
      { name: 'webpack', level: 'confident' },
      { name: 'vitest', level: 'confident' },
      { name: '@testing-library/react', level: 'confident' },
      { name: 'git', level: 'core' },
      { name: 'modx', level: 'confident' },
      { name: 'wordpress', level: 'familiar' },
    ],
  },
];

export const levelLabel: Record<Level, Localized> = {
  core: { ru: 'основной стек', en: 'core stack' },
  confident: { ru: 'уверенно', en: 'proficient' },
  familiar: { ru: 'есть опыт', en: 'familiar' },
};

/** What I can build — the "scripts" of package.json. */
export const capabilities: { cmd: string; text: Localized }[] = [
  {
    cmd: 'spa',
    text: {
      ru: 'SPA и личные кабинеты на React + TypeScript с продуманной архитектурой состояния',
      en: 'SPAs and user dashboards in React + TypeScript with a well-structured state architecture',
    },
  },
  {
    cmd: 'admin',
    text: {
      ru: 'Административные панели: таблицы, фильтры, формы, роли и управление данными',
      en: 'Admin panels: tables, filters, forms, roles, and data management',
    },
  },
  {
    cmd: 'analytics',
    text: {
      ru: 'Аналитические экраны и графики: прибыль, клиенты, продажи',
      en: 'Analytics screens and charts: profit, customers, and sales',
    },
  },
  {
    cmd: 'svg',
    text: {
      ru: 'Интерактивные SVG-схемы: от жилого комплекса до конкретной квартиры',
      en: 'Interactive SVG plans, from an entire residential complex down to a single apartment',
    },
  },
  {
    cmd: 'maps',
    text: {
      ru: 'Карты с сотнями объектов, фильтрами и расчётом инфраструктуры',
      en: 'Maps with hundreds of properties, filters, and nearby amenities',
    },
  },
  {
    cmd: 'payments',
    text: {
      ru: 'Платёжные сценарии и интеграции с банковским эквайрингом',
      en: 'Payment flows and bank acquiring integrations',
    },
  },
  {
    cmd: 'api',
    text: {
      ru: 'REST API на Node.js с PostgreSQL/MySQL и интеграция с frontend',
      en: 'REST APIs with Node.js and PostgreSQL/MySQL, integrated with the frontend',
    },
  },
  {
    cmd: 'perf',
    text: {
      ru: 'Оптимизация: PageSpeed 95+, лёгкие изображения, быстрые запросы',
      en: 'Performance: PageSpeed 95+, lightweight images, and fast queries',
    },
  },
];
