import type { Localized, MaybeLocalized } from '../i18n/lang';

export interface Job {
  /** Short pseudo commit hash shown in the git-log timeline. */
  hash: string;
  company: string;
  url: string;
  city: Localized;
  role: Localized;
  period: Localized;
  duration: Localized;
  summary: Localized;
  stack: MaybeLocalized[];
  /** Numbers that deserve to be shown big. */
  metrics: { value: string; label: Localized }[];
  achievements: Localized[];
}

export const jobs: Job[] = [
  {
    hash: 'f1o2x3y',
    company: 'FLOXY',
    url: 'https://floxy.pro/',
    city: { ru: 'Таганрог', en: 'Taganrog' },
    role: { ru: 'Fullstack-разработчик', en: 'Full-stack Developer' },
    period: { ru: 'окт 2025 — сен 2026', en: 'Oct 2025 – Sep 2026' },
    duration: { ru: '1 год', en: '1 year' },
    summary: {
      ru: 'Веб-сервис, административная система и внутренние инструменты компании. Frontend на React и TypeScript, REST API на Node.js, платежи, автоматизация бизнес-процессов.',
      en: "The company's web service, admin system, and internal tools. Frontend in React and TypeScript, REST APIs in Node.js, payments, and business process automation.",
    },
    stack: ['React', 'TypeScript', 'Redux Toolkit', 'Ant Design', 'Node.js', 'PostgreSQL', 'MySQL', 'Nginx'],
    metrics: [
      { value: '85 → 97', label: { ru: 'PageSpeed основных страниц', en: 'PageSpeed score of key pages' } },
      { value: '20+', label: { ru: 'backend-методов REST API', en: 'REST API backend methods' } },
      { value: '~90%', label: { ru: 'ключевой логики покрыто тестами', en: 'of core logic covered by tests' } },
    ],
    achievements: [
      {
        ru: 'С нуля разработал 5 административных модулей: история заказов, аналитика прибыли и клиентов, управление заказами, архив и настройки бренда.',
        en: 'Built 5 admin modules from scratch: order history, profit and customer analytics, order management, archive, and brand settings.',
      },
      {
        ru: 'Реализовал 15+ экранов, 6+ таблиц и 8 форм с фильтрацией и сложными пользовательскими сценариями.',
        en: 'Delivered 15+ screens, 6+ tables, and 8 forms with filtering and complex user flows.',
      },
      {
        ru: 'Реализовал платёжные ссылки и 5 банковских интеграций: Т-Банк, Точка, СберБанк, ВТБ и Совкомбанк.',
        en: 'Implemented payment links and 5 bank integrations: T-Bank, Tochka, Sberbank, VTB, and Sovcombank.',
      },
      {
        ru: 'Трекинг статусов заказов и email-уведомления экономят пользователям 3–4 часа ручной коммуникации в день.',
        en: 'Order status tracking and email notifications save users 3–4 hours of manual communication per day.',
      },
      {
        ru: 'Автоматизировал подготовку оферты и политики конфиденциальности: документ собирается за 1–2 минуты вместо 10–15.',
        en: 'Automated the preparation of the public offer agreement and privacy policy: a document now takes 1–2 minutes instead of 10–15.',
      },
      {
        ru: 'Сделал автоматический расчёт прибыли и расходов с графиками вместо ручных таблиц Excel.',
        en: 'Built automatic profit and expense calculations with charts, replacing manual Excel spreadsheets.',
      },
      {
        ru: 'Ускорил ключевые сценарии сервиса примерно в 1,5–2 раза.',
        en: 'Made key user flows roughly 1.5–2 times faster.',
      },
      {
        ru: 'Системой ежемесячно пользуются около 150 человек.',
        en: 'About 150 people use the system every month.',
      },
    ],
  },
  {
    hash: 's4k5y6n',
    company: 'Skyneex',
    url: 'https://xn--80aklcdqyg.xn--p1ai/',
    city: { ru: 'Калининград', en: 'Kaliningrad' },
    role: { ru: 'Frontend-разработчик', en: 'Frontend Developer' },
    period: { ru: 'сен 2023 — сен 2025', en: 'Sep 2023 – Sep 2025' },
    duration: { ru: '2 года 1 месяц', en: '2 years 1 month' },
    summary: {
      ru: 'Коммерческие проекты для застройщиков: интерактивные схемы жилых комплексов, подбор квартир, ипотечные калькуляторы, карты, интеграции с CRM.',
      en: 'Commercial projects for real estate developers: interactive residential complex plans, apartment search, mortgage calculators, maps, and CRM integrations.',
    },
    stack: ['JavaScript', 'SVG', { ru: 'Яндекс Карты', en: 'Yandex Maps' }, 'CRM API', 'Excel import/export'],
    metrics: [
      { value: '12', label: { ru: 'проектов с нуля', en: 'projects built from scratch' } },
      { value: '1000+', label: { ru: 'интерактивных SVG-выделений квартир', en: 'interactive SVG apartment areas' } },
      { value: '75 → 98', label: { ru: 'PageSpeed после оптимизации', en: 'PageSpeed score after optimization' } },
    ],
    achievements: [
      {
        ru: 'Разработал сценарий выбора недвижимости: ЖК → корпус → этаж → квартира → карточка объекта.',
        en: 'Designed the property selection flow: complex → building → floor → apartment → property page.',
      },
      {
        ru: 'Сделал интерактивные схемы до 8 корпусов и 13 этажей, до 50 квартир на одной схеме этажа.',
        en: 'Built interactive plans of up to 8 buildings and 13 floors, with up to 50 apartments on a single floor plan.',
      },
      {
        ru: 'Интегрировал Яндекс Карты: до 500 объектов, фильтры, ближайшая инфраструктура и расчёт времени в пути.',
        en: 'Integrated Yandex Maps: up to 500 properties, filters, nearby amenities, and travel time estimates.',
      },
      {
        ru: 'Статусы и характеристики квартир обновляются на сайте сразу после правки в админ-панели.',
        en: 'Apartment statuses and details update on the site as soon as they are edited in the admin panel.',
      },
      {
        ru: 'Реализовал экспорт данных по квартирам в Excel и обратный импорт после редактирования.',
        en: 'Implemented exporting apartment data to Excel and importing it back after editing.',
      },
      {
        ru: 'Сократил число frontend-ошибок на 30–40% за счёт валидации и обработки исключений.',
        en: 'Reduced frontend errors by 30–40% through data validation and exception handling.',
      },
      {
        ru: 'Уменьшил вес изображений на 62–78% с помощью автоматической оптимизации без потери качества.',
        en: 'Cut image size by 62–78% with automatic optimization and no visible loss of quality.',
      },
      {
        ru: 'Поддерживал ещё 5–6 проектов, разработанных другими специалистами.',
        en: 'Maintained 5–6 more projects built by other developers.',
      },
    ],
  },
  {
    hash: 'f7w8e9b',
    company: 'ForestWeb',
    url: 'https://forest-web.ru/',
    city: { ru: 'Воронеж', en: 'Voronezh' },
    role: { ru: 'Frontend-разработчик', en: 'Frontend Developer' },
    period: { ru: 'июн 2022 — авг 2023', en: 'Jun 2022 – Aug 2023' },
    duration: { ru: '1 год 3 месяца', en: '1 year 3 months' },
    summary: {
      ru: 'Коммерческие сайты в составе веб-студии: вёрстка, клиентская логика на JavaScript, интеграция с CMS MODX, формы, калькуляторы и интерактивные элементы.',
      en: 'Commercial websites at a web studio: markup, client-side JavaScript logic, MODX CMS integration, forms, calculators, and interactive elements.',
    },
    stack: ['JavaScript', 'HTML / PUG', 'SCSS', 'MODX', { ru: 'PHP-шаблоны', en: 'PHP templates' }, 'AJAX'],
    metrics: [
      { value: '10', label: { ru: 'сайтов с нуля до релиза', en: 'websites from scratch to launch' } },
      { value: '86 → 96', label: { ru: 'PageSpeed основных страниц', en: 'PageSpeed score of key pages' } },
      { value: '10–12', label: { ru: 'исправленных ошибок в неделю', en: 'bugs fixed per week' } },
    ],
    achievements: [
      {
        ru: 'Полностью отвечал за frontend проектов — от дизайн-макета до публикации.',
        en: 'Fully owned the frontend of projects, from design mockup to launch.',
      },
      {
        ru: 'Разрабатывал сложные формы с масками ввода, валидацией и AJAX-отправкой.',
        en: 'Built complex forms with input masks, validation, and AJAX submission.',
      },
      {
        ru: 'Создал калькуляторы стоимости услуг и ипотечные калькуляторы.',
        en: 'Created service cost calculators and mortgage calculators.',
      },
      {
        ru: 'Сверстал все frontend-страницы корпоративного сайта студии в команде из 5 человек.',
        en: "Built every frontend page of the studio's corporate website as part of a team of 5.",
      },
      {
        ru: 'Сделал анимацию фона, анимации при скролле и реакцию на курсор на сайте агентства.',
        en: "Created the background animation, scroll animations, and cursor-reactive effects on the agency's website.",
      },
    ],
  },
];
