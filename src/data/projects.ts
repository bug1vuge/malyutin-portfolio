import type { Localized, MaybeLocalized } from '../i18n/lang';

/**
 * Портфолио проектов.
 *
 * Поля:
 *   title       — название проекта
 *   description — 1–2 предложения: что это и что в нём сделано
 *   category    — одна из категорий ниже (по ней работает фильтр)
 *   domain      — адрес, который показывается в шапке карточки и на обложке
 *   stack       — технологии
 *   demoUrl     — ссылка на живой продукт
 *   repoUrl     — ссылка на код на GitHub (null — вместо кнопки «Закрытый код»)
 *   cover       — обложка, нарисованная кодом: сюжет (scene), акцентный цвет (tone)
 *                 и надписи, которые появляются в окне браузера на обложке
 *   featured    — карточка во всю ширину двух колонок
 *
 * Текстовые поля пишутся либо одной строкой (одинаково на обоих языках),
 * либо парой { ru: '…', en: '…' }.
 */

export type ProjectCategory = 'realestate' | 'saas' | 'sites' | 'interactive';

export type CoverScene =
  | 'dashboard'
  | 'landing'
  | 'genplan'
  | 'facade'
  | 'chess'
  | 'catalog'
  | 'village'
  | 'studio'
  | 'event'
  | 'carrent'
  | 'letter'
  | 'transcript'
  | 'ticket';
export type CoverTone = 'kw' | 'fn' | 'str' | 'num' | 'caret';

export interface ProjectCover {
  scene: CoverScene;
  tone: CoverTone;
  /** Big headline inside the mock window — the site's own name or slogan. */
  headline: string;
  /** Small line above the headline. */
  kicker?: string;
  /** Scene-specific labels (cards, statuses, tooltips). */
  labels?: string[];
}

export interface Project {
  id: string;
  title: MaybeLocalized;
  description: MaybeLocalized;
  category: ProjectCategory;
  domain: string;
  stack: MaybeLocalized[];
  demoUrl: string;
  repoUrl: string | null;
  cover: ProjectCover;
  /** Extra links shown under the description, e.g. a companion tool. */
  links?: { label: Localized; url: string }[];
  featured?: boolean;
}

export const categories: { key: ProjectCategory | 'all'; label: Localized }[] = [
  { key: 'all', label: { ru: 'Все', en: 'All' } },
  { key: 'saas', label: { ru: 'CRM и SaaS', en: 'CRM & SaaS' } },
  { key: 'realestate', label: { ru: 'Недвижимость', en: 'Real estate' } },
  { key: 'interactive', label: { ru: 'Интерактив', en: 'Interactive' } },
  { key: 'sites', label: { ru: 'Сайты', en: 'Websites' } },
];

export const categoryTag: Record<ProjectCategory, Localized> = {
  saas: { ru: 'crm / saas', en: 'crm / saas' },
  realestate: { ru: 'недвижимость', en: 'real estate' },
  sites: { ru: 'сайт', en: 'website' },
  interactive: { ru: 'интерактив', en: 'interactive' },
};

/* ───── Stacks, as listed for each group of projects ───── */

const STACK_REAL_ESTATE: MaybeLocalized[] = [
  'HTML / PUG',
  'CSS / SCSS',
  'JavaScript',
  'PHP',
  'MySQL',
  { ru: 'Яндекс Карты', en: 'Yandex Maps' },
  'SVG',
  { ru: 'Своя админ-панель', en: 'Custom admin panel' },
];

const STACK_MODX: MaybeLocalized[] = [
  'HTML / PUG',
  'SCSS',
  'JavaScript',
  'PHP',
  'MySQL',
  { ru: 'Яндекс Карты', en: 'Yandex Maps' },
  'MODX',
];

const STACK_REACT: MaybeLocalized[] = [
  'React',
  'TypeScript',
  'Redux Toolkit',
  'React Router',
  'GraphQL',
  'CSS Modules',
  'Vite',
  'Docker',
  'PostgreSQL',
];

export const projects: Project[] = [
  {
    id: 'floxy-panel',
    featured: true,
    title: { ru: 'FloxyCRM — панель управления', en: 'FloxyCRM dashboard' },
    description: {
      ru: 'Административная панель CRM для байеров: заказы с восемью этапами статусов, клиенты, мультивалютные счета и платёжные ссылки, аналитика прибыли с графиками и отчётами.',
      en: 'The admin panel of a CRM for buyers: orders with an eight-stage status pipeline, customers, multi-currency invoices and payment links, and profit analytics with charts and reports.',
    },
    category: 'saas',
    domain: 'panel.floxy.pro',
    stack: STACK_REACT,
    demoUrl: 'https://panel.floxy.pro/',
    repoUrl: null,
    cover: {
      scene: 'dashboard',
      tone: 'kw',
      headline: 'FloxyCRM',
      labels: ['Заказы', 'Выручка', 'Прибыль', 'Оплачен', 'Выкуплен', 'На таможне', 'В пункте выдачи'],
    },
  },
  {
    id: 'floxy-site',
    title: { ru: 'FloxyCRM — сайт сервиса', en: 'FloxyCRM website' },
    description: {
      ru: 'Продуктовый сайт сервиса: онлайн-терминал оплат и CRM для байеров. Калькулятор экономии, тарифы, интеграции с банками и запуск бесплатного пробного периода.',
      en: 'The product website of the service: an online payment terminal and CRM for buyers. A savings calculator, pricing plans, bank integrations, and a free trial sign-up.',
    },
    category: 'saas',
    domain: 'floxy.pro',
    stack: STACK_REACT,
    demoUrl: 'https://floxy.pro/',
    repoUrl: null,
    cover: {
      scene: 'landing',
      tone: 'fn',
      headline: 'Терминал оплат и CRM',
      kicker: 'FloxyCRM',
      labels: ['Начать бесплатно', 'Счёт на оплату', 'Оплатить', 'Оплачен', 'Выкуплен', 'В пути'],
    },
  },
  {
    id: 'rent-car',
    title: { ru: 'RentCar — аренда авто', en: 'RentCar car rental' },
    description: {
      ru: 'Прототип сервиса аренды авто в Томске с интерфейсом в стиле экрана автомобиля. Каталог с фильтрами и календарём занятости, бронирование в 4 шага с подписью договора пальцем, имитация онлайн-оплаты и панель владельца с диаграммой Ганта. Работает офлайн как PWA.',
      en: "A prototype of a car rental service in Tomsk with an interface styled as a car's dashboard. A catalog with filters and availability calendars, 4-step booking with a finger-signed contract, simulated online payment, and an owner panel with a Gantt chart. Works offline as a PWA.",
    },
    category: 'sites',
    domain: 'bug1vuge.github.io/rent-car',
    // Taken from the project's repository: static site without a build step.
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Service Worker / PWA', 'localStorage', 'Canvas API'],
    demoUrl: 'https://bug1vuge.github.io/rent-car/',
    repoUrl: 'https://github.com/bug1vuge/rent-car',
    cover: {
      scene: 'carrent',
      tone: 'fn',
      headline: 'Аренда авто',
      kicker: 'Томск, ул. Пушкина',
      labels: ['Эконом', 'Комфорт', 'Премиум', 'Мои даты', 'Забронировать', '15 мин', 'до ключей'],
    },
  },
  {
    id: 'animated-letter',
    title: { ru: 'Animated Letter — именное письмо', en: 'Animated Letter' },
    description: {
      ru: 'Персональное письмо: конверт с именем получателя переворачивается, клапан открывается, и письмо выезжает к читателю, а внизу звучит голосовое сообщение от отправителя. Имя берётся из ссылки, а для рассылки есть генератор именных ссылок с выгрузкой в CSV.',
      en: 'A personal letter: an envelope addressed to the recipient turns over, the flap lifts, and the letter slides out to the reader, with a voice note from the sender at the bottom. The name comes from the link, and a link maker creates personal links in bulk with CSV export.',
    },
    category: 'interactive',
    domain: 'bug1vuge.github.io/animated-letter',
    // Taken from the project's repository: static files, no framework or build step.
    stack: ['JavaScript', 'CSS 3D', 'Web Animations API', 'HTML Audio', 'node:test', 'GitHub Actions'],
    demoUrl: 'https://bug1vuge.github.io/animated-letter/invite/?name=Anna',
    repoUrl: 'https://github.com/bug1vuge/animated-letter',
    links: [
      {
        label: { ru: 'Генератор именных ссылок', en: 'Personal link maker' },
        url: 'https://bug1vuge.github.io/animated-letter/compose/',
      },
    ],
    cover: {
      scene: 'letter',
      tone: 'caret',
      headline: 'Maison Orée',
      labels: ['MAISON ORÉE', 'Anna,', 'LISTEN', '0:42', 'ANNA'],
    },
  },
  {
    id: 'transcript',
    title: { ru: 'Transcript — аудиоэссе', en: 'Transcript' },
    description: {
      ru: 'Аудиоэссе, где текст проявляется вслед за голосом. Каждое слово привязано к таймингу записи, текущее слово ищется бинарным поиском на каждом кадре, а паузы в речи превращаются в пробелы в тексте. Нажмите на любое слово, и запись перемотается к нему.',
      en: 'An audio essay whose text inks itself in as it is spoken. Every word is tied to a timestamp in the recording, the current word is found with a binary search on every frame, and pauses in the voice become extra space on the page. Tap any word to jump the audio to it.',
    },
    category: 'interactive',
    domain: 'bug1vuge.github.io/transcript-project',
    // Taken from the project's repository: static files, no framework or build step.
    stack: ['JavaScript', 'HTML Audio', 'requestAnimationFrame', 'CSS', 'node:test', 'GitHub Actions'],
    demoUrl: 'https://bug1vuge.github.io/transcript-project/',
    repoUrl: 'https://github.com/bug1vuge/transcript-project',
    cover: {
      scene: 'transcript',
      tone: 'fn',
      headline: 'On keeping voicemails',
      kicker: 'MARGIN',
      labels: ['PAUSE', '0:34 / 1:24'],
    },
  },
  {
    id: 'admit-one',
    title: { ru: 'Admit One — именной билет', en: 'Admit One' },
    description: {
      ru: 'Именной билет на закрытый показ: чтобы подтвердить участие, нужно оторвать корешок. Он следует за пальцем и шуршит звуками бумаги, сгенерированными через Web Audio API, а после подтверждения показ можно добавить в календарь файлом .ics.',
      en: 'A personal ticket to a private screening: to confirm, you tear off the stub. It follows your finger with paper sounds generated by the Web Audio API, and once you confirm, you can add the screening to your calendar as an .ics file.',
    },
    category: 'interactive',
    domain: 'bug1vuge.github.io/admit-one',
    // Taken from the project's repository: static files, no framework or build step.
    stack: ['JavaScript', 'Pointer Events', 'Web Audio API', 'CSS Masks', 'iCalendar (.ics)', 'node:test'],
    demoUrl: 'https://bug1vuge.github.io/admit-one/?name=Anna&seat=F7',
    repoUrl: 'https://github.com/bug1vuge/admit-one',
    cover: {
      scene: 'ticket',
      tone: 'num',
      headline: 'Halflight',
      labels: ['ADMIT ONE', 'SMALL HOURS FILM CLUB', 'ANNA', 'F', '7', 'FRI 14 NOV', 'No 0417'],
    },
  },
  {
    id: 'bereg',
    title: { ru: 'ЖК «Берег»', en: 'Bereg residential complex' },
    description: {
      ru: 'Сайт жилого комплекса в Светлогорске: 2 корпуса и 241 квартира. Визуальный выбор квартиры, подбор по параметрам, шахматка, избранное и ход строительства.',
      en: 'The website of a residential complex in Svetlogorsk with 2 buildings and 241 apartments. Visual apartment selection, search by parameters, a unit grid, favorites, and construction progress.',
    },
    category: 'realestate',
    domain: 'bereg.ksi39.ru',
    stack: STACK_REAL_ESTATE,
    demoUrl: 'https://bereg.ksi39.ru/',
    repoUrl: null,
    cover: {
      scene: 'genplan',
      tone: 'fn',
      headline: 'Берег',
      kicker: 'Светлогорск',
      labels: ['Корпус 1', '7 этажей', 'Корпус 2'],
    },
  },
  {
    id: 'salvador',
    title: { ru: 'ЖК «Сальвадор»', en: 'Salvador residential complex' },
    description: {
      ru: 'Сайт жилого комплекса у моря в Пионерском. Подбор квартир по параметрам, на генплане и в шахматке, ипотечный калькулятор и карта инфраструктуры с фильтрами.',
      en: 'The website of a seaside residential complex in Pionersky. Apartment search by parameters, on the site plan, and in a unit grid, plus a mortgage calculator and an amenities map with filters.',
    },
    category: 'realestate',
    domain: 'sal.makrostroy39.ru',
    stack: STACK_REAL_ESTATE,
    demoUrl: 'https://sal.makrostroy39.ru/',
    repoUrl: null,
    cover: {
      scene: 'facade',
      tone: 'caret',
      headline: 'Сальвадор',
      kicker: 'Пионерский, у моря',
      labels: ['Выбрать квартиру', 'Кв. 4', '30,9 м²'],
    },
  },
  {
    id: 'three-symphonies',
    title: { ru: 'ЖК «3 Симфонии»', en: '3 Symphonies residential complex' },
    description: {
      ru: 'Сайт камерного дома у моря в Пионерском: 16 квартир на 5 этажах. Шахматка, подбор по параметрам, интерактивные планировки квартир и формы бронирования.',
      en: 'The website of a boutique seaside building in Pionersky with 16 apartments on 5 floors. A unit grid, search by parameters, interactive apartment plans, and booking forms.',
    },
    category: 'realestate',
    domain: 'sim.makrostroy39.ru',
    stack: STACK_REAL_ESTATE,
    demoUrl: 'https://sim.makrostroy39.ru/',
    repoUrl: null,
    cover: {
      scene: 'chess',
      tone: 'kw',
      headline: '3 Симфонии',
      kicker: '16 квартир, 5 этажей',
      labels: ['Свободно', 'Бронь', 'Продано'],
    },
  },
  {
    id: 'ksi',
    title: { ru: 'КалининградСтройИнвест', en: 'KaliningradStroyInvest' },
    description: {
      ru: 'Корпоративный сайт застройщика с 15 проектами в продаже. Подбор квартир по локации, числу комнат и цене, объекты на карте, акции, новости и своя админ-панель.',
      en: 'The corporate website of a developer with 15 projects on sale. Apartment search by location, number of rooms, and price, properties on a map, promotions, news, and a custom admin panel.',
    },
    category: 'realestate',
    domain: 'ksi39.ru',
    stack: STACK_REAL_ESTATE,
    demoUrl: 'https://ksi39.ru/',
    repoUrl: null,
    cover: {
      scene: 'catalog',
      tone: 'str',
      headline: 'Новостройки у моря',
      kicker: 'КалининградСтройИнвест',
      labels: ['Калининград', 'Побережье', 'Берег', 'Парад', 'Шелест'],
    },
  },
  {
    id: 'rrr',
    title: { ru: '«Развитие Регионов России»', en: 'Razvitie Regionov Rossii' },
    description: {
      ru: 'Сайт застройщика загородных и курортных проектов: Ласкино Парк, Полесье, Деревушка. Каталог с фильтрами по типу, проекту, цене и площади, ход строительства по годам.',
      en: 'The website of a developer of suburban and resort projects, including Laskino Park, Polesye, and Derevushka. A catalog filtered by type, project, price, and area, plus construction progress by year.',
    },
    category: 'realestate',
    domain: 'rrr39.ru',
    stack: STACK_REAL_ESTATE,
    demoUrl: 'https://rrr39.ru/',
    repoUrl: null,
    cover: {
      scene: 'catalog',
      tone: 'num',
      headline: 'Квартиры и дома',
      kicker: 'Развитие Регионов России',
      labels: ['Квартиры', 'Дома', 'Ласкино Парк', 'Полесье', 'Деревушка'],
    },
  },
  {
    id: 'derevushka',
    title: { ru: 'Деревушка', en: 'Derevushka' },
    description: {
      ru: 'Сайт загородного комплекса домов из клеёного бруса в 4 км от Калининграда: дома и планировки, расположение на карте и формы заявок.',
      en: 'The website of a country complex of glued laminated timber houses 4 km from Kaliningrad: houses and floor plans, location on a map, and inquiry forms.',
    },
    category: 'realestate',
    domain: 'деревушка39.рф',
    stack: STACK_REAL_ESTATE,
    demoUrl: 'https://xn--39-6kchjga5bzc6a7c.xn--p1ai/',
    repoUrl: null,
    cover: {
      scene: 'village',
      tone: 'str',
      headline: 'Деревушка',
      kicker: 'Дома из клеёного бруса',
      labels: ['Дом 2', 'Клеёный брус'],
    },
  },
  {
    id: 'forest-web',
    title: { ru: 'ForestWeb', en: 'ForestWeb' },
    description: {
      ru: 'Корпоративный сайт веб-студии из Воронежа. Сверстал все страницы и сделал анимацию фона, анимации при скролле и эффекты, реагирующие на курсор.',
      en: 'The corporate website of a web studio in Voronezh. I built every page and created the background animation, scroll animations, and cursor-reactive effects.',
    },
    category: 'sites',
    domain: 'forest-web.ru',
    stack: STACK_MODX,
    demoUrl: 'https://forest-web.ru/',
    repoUrl: null,
    cover: {
      scene: 'studio',
      tone: 'str',
      headline: 'forest',
      kicker: 'веб-студия, Воронеж',
      labels: ['web'],
    },
  },
  {
    id: 'dambiev',
    title: { ru: 'Леонид Дамбиев — ведущий', en: 'Leonid Dambiev, event host' },
    description: {
      ru: 'Сайт ведущего мероприятий. Танцующие буквы и зеркальный шар на canvas, которые реагируют на курсор, параллакс, пререндер для SEO и форма заявки с валидацией.',
      en: 'The website of an event host. Cursor-reactive dancing letters and a canvas mirror ball, parallax, prerendering for SEO, and a booking form with validation.',
    },
    category: 'sites',
    domain: 'bug1vuge.github.io/dambiev-site',
    // Taken from the project's package.json.
    stack: ['React', 'TypeScript', 'Vite', 'Canvas API', { ru: 'SSR-пререндер', en: 'SSR prerendering' }],
    demoUrl: 'https://bug1vuge.github.io/dambiev-site/',
    repoUrl: 'https://github.com/bug1vuge/dambiev-site',
    cover: {
      scene: 'event',
      tone: 'caret',
      headline: 'Леонид',
      kicker: 'ведущий мероприятий',
      labels: ['Дамбиев', 'Забронировать дату', 'свадьбы ✦ юбилеи ✦ корпоративы ✦ выпускные ✦'],
    },
  },
];

/** Public repositories listed on the GitHub card that closes the grid. */
export const publicRepos: { name: string; lang: string; tone: CoverTone; about: Localized }[] = [
  {
    name: 'malyutin-portfolio',
    lang: 'TypeScript',
    tone: 'fn',
    about: { ru: 'Этот сайт: React, TypeScript, Vite, RU/EN', en: 'This website: React, TypeScript, Vite, RU/EN' },
  },
  {
    name: 'rent-car',
    lang: 'JavaScript',
    tone: 'caret',
    about: { ru: 'Прототип сервиса аренды авто, PWA', en: 'Car rental service prototype, PWA' },
  },
  {
    name: 'animated-letter',
    lang: 'JavaScript',
    tone: 'caret',
    about: { ru: 'Именное письмо с голосовым сообщением', en: 'Personal letter with a voice note' },
  },
  {
    name: 'transcript-project',
    lang: 'JavaScript',
    tone: 'caret',
    about: { ru: 'Аудиоэссе, где текст идёт за голосом', en: 'Audio essay where text follows the voice' },
  },
  {
    name: 'admit-one',
    lang: 'JavaScript',
    tone: 'caret',
    about: { ru: 'Билет, корешок которого нужно оторвать', en: 'A ticket you tear to RSVP' },
  },
  {
    name: 'dambiev-site',
    lang: 'TypeScript',
    tone: 'fn',
    about: { ru: 'Сайт ведущего мероприятий с пререндером', en: 'Event host website with prerendering' },
  },
];
