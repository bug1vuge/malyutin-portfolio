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

export type ProjectCategory = 'realestate' | 'saas' | 'sites';

export type CoverScene = 'dashboard' | 'landing' | 'genplan' | 'facade' | 'chess' | 'catalog' | 'village' | 'studio' | 'event';
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
  featured?: boolean;
}

export const categories: { key: ProjectCategory | 'all'; label: Localized }[] = [
  { key: 'all', label: { ru: 'Все', en: 'All' } },
  { key: 'saas', label: { ru: 'CRM и SaaS', en: 'CRM & SaaS' } },
  { key: 'realestate', label: { ru: 'Недвижимость', en: 'Real estate' } },
  { key: 'sites', label: { ru: 'Сайты', en: 'Websites' } },
];

export const categoryTag: Record<ProjectCategory, Localized> = {
  saas: { ru: 'crm / saas', en: 'crm / saas' },
  realestate: { ru: 'недвижимость', en: 'real estate' },
  sites: { ru: 'сайт', en: 'website' },
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
    domain: 'bug1vuge.github.io',
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
