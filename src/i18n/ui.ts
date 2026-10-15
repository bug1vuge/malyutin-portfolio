/** Interface strings. Content (experience, skills, projects) lives in src/data with ru/en fields. */

/** Russian plural form: 1 изменение, 2 изменения, 5 изменений. */
const ruPlural = (n: number, one: string, few: string, many: string) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
};

const ru = {
  meta: {
    title: 'Максим Малютин — Frontend-разработчик (React / TypeScript)',
    description:
      'Максим Малютин — frontend-разработчик с 4+ годами коммерческого опыта. React, TypeScript, Node.js. SPA, админ-панели, сложные data-driven интерфейсы.',
    ogTitle: 'Максим Малютин — Frontend-разработчик',
    ogDescription: 'React, TypeScript, Node.js. 4+ года коммерческой разработки, 30+ проектов.',
  },
  skipLink: 'Перейти к содержимому',
  header: {
    home: 'Максим Малютин — в начало',
    nav: 'Разделы',
    contact: 'Связаться',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    language: 'Язык сайта',
  },
  sections: {
    top: 'Главная',
    about: 'Обо мне',
    experience: 'Опыт',
    projects: 'Проекты',
    skills: 'Навыки',
    contacts: 'Контакты',
  },
  hero: {
    hello: '// привет, меня зовут',
    viewProjects: 'Смотреть проекты',
    telegram: 'Написать в Telegram',
    location: 'город',
    experience: 'опыт',
    experienceValue: '4+ года, 30+ проектов',
    focus: 'специализация',
    scroll: 'листать',
  },
  marquee: ['SPA', 'админ-панели', 'SVG-схемы', 'карты', 'платежи', 'аналитика', 'тесты', 'PageSpeed 95+'],
  about: {
    title: 'Обо мне',
    education: 'Образование',
  },
  experience: {
    title: 'Опыт работы',
    lead: '4 года и 4 месяца коммерческой разработки. Свежие коммиты сверху.',
    date: 'Дата',
    stack: 'Технологии',
    collapse: 'Свернуть',
    more: (n: number) => `Ещё ${n} ${ruPlural(n, 'изменение', 'изменения', 'изменений')}`,
    root: '2022 — первая строка коммерческого кода',
  },
  projects: {
    title: 'Проекты',
    lead: 'Избранные работы: у каждой есть ссылка на живой продукт и на исходный код.',
    filter: 'Фильтр проектов',
    stack: 'Стек',
    screenshot: (title: string) => `Скриншот проекта «${title}»`,
    demo: 'Открыть продукт',
    repo: 'Код на GitHub',
    moreTitle: 'Остальной код — на GitHub',
  },
  skills: {
    title: 'Навыки и стек',
    lead: 'Выберите уровень, чтобы подсветить технологии.',
    levels: 'Уровень владения',
    version: '4 года 4 месяца',
    scripts: 'что я делаю',
  },
  contacts: {
    title: 'Контакты',
    lead: 'Вопросы по проектам, коду или идеям — пишите. Быстрее всего отвечаю в Telegram.',
    phone: 'Телефон',
    copy: 'Копировать',
    copied: 'Скопировано',
    copyEmail: 'Скопировать email',
    footerNote: '// собрано на React + TypeScript, задеплоено через GitHub Actions',
    toTop: 'наверх',
  },
  terminal: {
    intro: 'Введите help, чтобы увидеть команды. Tab дополняет, ↑ ↓ — история.',
    inputLabel: 'Команда терминала',
    help: {
      help: 'список команд',
      whoami: 'кто я',
      contacts: 'все способы связи',
      stack: 'основной стек',
      experience: 'опыт кратко',
      projects: 'перейти к проектам',
      github: 'открыть мой GitHub',
      clear: 'очистить экран',
    },
    notFound: 'command not found:',
    tryHelp: 'Попробуйте',
    sudo: 'Permission granted. Но проще написать в Telegram:',
    opening: 'Открываю',
  },
  statusbar: {
    errors: '0 ошибок',
  },
};

export type Dictionary = typeof ru;

const en: Dictionary = {
  meta: {
    title: 'Maxim Malyutin — Frontend Developer (React / TypeScript)',
    description:
      'Maxim Malyutin is a frontend developer with 4+ years of commercial experience. React, TypeScript, Node.js. SPAs, admin panels, and complex data-driven interfaces.',
    ogTitle: 'Maxim Malyutin — Frontend Developer',
    ogDescription: 'React, TypeScript, Node.js. 4+ years of commercial development, 30+ projects.',
  },
  skipLink: 'Skip to content',
  header: {
    home: 'Maxim Malyutin — back to top',
    nav: 'Sections',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Site language',
  },
  sections: {
    top: 'Home',
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    skills: 'Skills',
    contacts: 'Contact',
  },
  hero: {
    hello: '// hi, my name is',
    viewProjects: 'View projects',
    telegram: 'Message on Telegram',
    location: 'location',
    experience: 'experience',
    experienceValue: '4+ years, 30+ projects',
    focus: 'focus',
    scroll: 'scroll',
  },
  marquee: ['SPAs', 'admin panels', 'SVG plans', 'maps', 'payments', 'analytics', 'testing', 'PageSpeed 95+'],
  about: {
    title: 'About me',
    education: 'Education',
  },
  experience: {
    title: 'Work experience',
    lead: '4 years and 4 months of commercial development. Most recent commits first.',
    date: 'Date',
    stack: 'Technologies',
    collapse: 'Show less',
    more: (n: number) => `${n} more ${n === 1 ? 'change' : 'changes'}`,
    root: '2022 — the first line of commercial code',
  },
  projects: {
    title: 'Projects',
    lead: 'Selected work, each with a link to the live product and its source code.',
    filter: 'Filter projects',
    stack: 'Stack',
    screenshot: (title: string) => `Screenshot of ${title}`,
    demo: 'Live demo',
    repo: 'Source code',
    moreTitle: 'More code on GitHub',
  },
  skills: {
    title: 'Skills & stack',
    lead: 'Pick a level to highlight the matching technologies.',
    levels: 'Proficiency level',
    version: '4 years 4 months',
    scripts: 'what I build',
  },
  contacts: {
    title: 'Contact',
    lead: 'Have a question about my projects, code, or an idea? Write to me — Telegram is the fastest way to reach me.',
    phone: 'Phone',
    copy: 'Copy',
    copied: 'Copied',
    copyEmail: 'Copy email',
    footerNote: '// built with React + TypeScript, deployed via GitHub Actions',
    toTop: 'back to top',
  },
  terminal: {
    intro: 'Type help to see the available commands. Tab autocompletes, ↑ ↓ browse history.',
    inputLabel: 'Terminal command',
    help: {
      help: 'list commands',
      whoami: 'who I am',
      contacts: 'all contact options',
      stack: 'core stack',
      experience: 'work history in brief',
      projects: 'go to projects',
      github: 'open my GitHub',
      clear: 'clear the screen',
    },
    notFound: 'command not found:',
    tryHelp: 'Try',
    sudo: 'Permission granted. But messaging me on Telegram is easier:',
    opening: 'Opening',
  },
  statusbar: {
    errors: '0 errors',
  },
};

export const ui = { ru, en };
