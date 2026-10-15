import type { Localized } from '../i18n/lang';

export const profile = {
  firstName: { ru: 'Максим', en: 'Maxim' },
  lastName: { ru: 'Малютин', en: 'Malyutin' },
  role: { ru: 'Frontend-разработчик', en: 'Frontend Developer' },
  stack: 'React / TypeScript',
  city: { ru: 'Томск', en: 'Tomsk' },
  timezone: 'UTC+7',
  focus: {
    ru: 'SPA, админ-панели, data-driven интерфейсы',
    en: 'SPAs, admin panels, data-driven interfaces',
  },
  lead: {
    ru: 'Делаю SPA, административные панели и сложные data-driven интерфейсы. Веду задачу целиком — от требований и архитектуры до API, тестов и релиза в production.',
    en: 'I build SPAs, admin panels, and complex data-driven interfaces. I own tasks end to end — from requirements and architecture to APIs, tests, and production releases.',
  },
  about: [
    {
      ru: 'Frontend-разработчик с 4+ годами коммерческого опыта и более чем 30 реализованными проектами для компаний из России, Европы и США. Основной стек — React, TypeScript, Redux Toolkit, React Router, REST API, Vite и Webpack.',
      en: 'Frontend developer with 4+ years of commercial experience and more than 30 projects delivered for companies in Russia, Europe, and the US. My core stack is React, TypeScript, Redux Toolkit, React Router, REST APIs, Vite, and Webpack.',
    },
    {
      ru: 'Пишу формы, таблицы, фильтры, аналитические экраны, интерактивные SVG-схемы, карты и калькуляторы. Самостоятельно декомпозирую задачи, выбираю архитектурное решение, интегрирую API, покрываю код тестами и оптимизирую производительность.',
      en: 'I build forms, tables, filters, analytics screens, interactive SVG plans, maps, and calculators. I break down tasks on my own, choose the architecture, integrate APIs, cover code with tests, and optimize performance.',
    },
    {
      ru: 'Есть практический backend-опыт: на последнем проекте проектировал REST API на Node.js, работал с PostgreSQL и MySQL, платёжными интеграциями и Nginx. Проводил code review и работал в командах до 15 человек.',
      en: 'I also have hands-on backend experience: on my latest project, I designed REST APIs with Node.js and worked with PostgreSQL, MySQL, payment integrations, and Nginx. I have conducted code reviews and worked in teams of up to 15 people.',
    },
  ] satisfies Localized[],
  facts: [
    { value: 4, suffix: '+', label: { ru: 'года коммерческой разработки', en: 'years of commercial development' } },
    { value: 30, suffix: '+', label: { ru: 'коммерческих проектов в production', en: 'commercial projects in production' } },
    { value: 97, suffix: '', label: { ru: 'баллов PageSpeed после оптимизации', en: 'PageSpeed score after optimization' } },
    { value: 150, suffix: '', label: { ru: 'пользователей в месяц у последней системы', en: 'monthly users of my latest system' } },
  ],
};

export const contacts = {
  email: 'malutinm11@gmail.com',
  phone: '+7 (923) 422-44-04',
  phoneHref: 'tel:+79234224404',
  telegram: '@develop_3r',
  telegramHref: 'https://t.me/develop_3r',
  github: 'bug1vuge',
  githubHref: 'https://github.com/bug1vuge',
} as const;

export const education: { year: string; title: Localized; detail: Localized }[] = [
  {
    year: '2026',
    title: {
      ru: 'Томский государственный университет систем управления и радиоэлектроники',
      en: 'Tomsk State University of Control Systems and Radioelectronics',
    },
    detail: {
      ru: 'Факультет вычислительных систем, разработка программного обеспечения',
      en: 'Faculty of Computer Systems, Software Development',
    },
  },
  {
    year: '2024',
    title: { ru: 'IT-INCUBATOR', en: 'IT-INCUBATOR' },
    detail: { ru: 'Курс frontend-разработки', en: 'Frontend development course' },
  },
];
