export const profile = {
  firstName: 'Максим',
  lastName: 'Малютин',
  role: 'Frontend-разработчик',
  stack: 'React / TypeScript',
  city: 'Томск',
  timezone: 'UTC+7',
  focus: 'SPA, админ-панели, data-driven интерфейсы',
  lead: 'Делаю SPA, административные панели и сложные data-driven интерфейсы. Веду задачу целиком — от требований и архитектуры до API, тестов и релиза в production.',
  about: [
    'Frontend-разработчик с 4+ годами коммерческого опыта и более чем 30 реализованными проектами для компаний из России, Европы и США. Основной стек — React, TypeScript, Redux Toolkit, React Router, REST API, Vite и Webpack.',
    'Пишу формы, таблицы, фильтры, аналитические экраны, интерактивные SVG-схемы, карты и калькуляторы. Самостоятельно декомпозирую задачи, выбираю архитектурное решение, интегрирую API, покрываю тестами и оптимизирую производительность.',
    'Есть практический backend-опыт: на последнем проекте проектировал REST API на Node.js, работал с PostgreSQL и MySQL, платёжными интеграциями и Nginx. Проводил code review и работал в командах до 15 человек.',
  ],
  facts: [
    { value: 4, suffix: '+', label: 'года коммерческой разработки' },
    { value: 30, suffix: '+', label: 'коммерческих проектов в production' },
    { value: 97, suffix: '', label: 'PageSpeed после оптимизации' },
    { value: 150, suffix: '', label: 'пользователей в месяц у последней системы' },
  ],
} as const;

export const contacts = {
  email: 'malutinm11@gmail.com',
  phone: '+7 (923) 422-44-04',
  phoneHref: 'tel:+79234224404',
  telegram: '@develop_3r',
  telegramHref: 'https://t.me/develop_3r',
  github: 'bug1vuge',
  githubHref: 'https://github.com/bug1vuge',
} as const;

export const education = [
  {
    year: '2026',
    title: 'Томский государственный университет систем управления и радиоэлектроники',
    detail: 'Факультет вычислительных систем, разработка программного обеспечения',
  },
  {
    year: '2024',
    title: 'IT-INCUBATOR',
    detail: 'Курс frontend-разработки',
  },
] as const;
