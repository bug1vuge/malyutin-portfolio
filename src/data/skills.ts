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

export const levelLabel: Record<Level, string> = {
  core: 'основной стек',
  confident: 'уверенно',
  familiar: 'есть опыт',
};

/** What I can build — the "scripts" of package.json. */
export const capabilities = [
  { cmd: 'spa', text: 'SPA и личные кабинеты на React + TypeScript с продуманной архитектурой состояния' },
  { cmd: 'admin', text: 'Административные панели: таблицы, фильтры, формы, роли и управление данными' },
  { cmd: 'analytics', text: 'Аналитические экраны и графики — прибыль, клиенты, продажи' },
  { cmd: 'svg', text: 'Интерактивные SVG-схемы: от жилого комплекса до конкретной квартиры' },
  { cmd: 'maps', text: 'Карты с сотнями объектов, фильтрами и расчётом инфраструктуры' },
  { cmd: 'payments', text: 'Платёжные сценарии и интеграции с банковским эквайрингом' },
  { cmd: 'api', text: 'REST API на Node.js, PostgreSQL/MySQL и интеграция с frontend' },
  { cmd: 'perf', text: 'Оптимизация: PageSpeed 95+, лёгкие изображения, быстрые запросы' },
] as const;
