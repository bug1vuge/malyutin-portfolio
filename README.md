# malyutin-portfolio

Сайт-портфолио Максима Малютина — frontend-разработчика (React / TypeScript).
Оформлен как редактор кода: вкладки-файлы, git log опыта, `package.json` навыков, живой терминал в контактах.

**Демо:** https://bug1vuge.github.io/malyutin-portfolio/

## Стек

- React 19 + TypeScript (strict)
- Vite
- Чистый CSS с дизайн-токенами, без UI-библиотек
- Анимации на CSS + `requestAnimationFrame` / `IntersectionObserver`, без сторонних зависимостей
- Деплой на GitHub Pages через GitHub Actions

## Что внутри

| Раздел       | Файл в «редакторе» | Что происходит                                                         |
| ------------ | ------------------ | ---------------------------------------------------------------------- |
| Главная      | `index.tsx`        | Поле из символов кода реагирует на курсор, имя «компилируется» из глифов |
| Обо мне      | `README.md`        | Цифры считаются при появлении на экране                               |
| Опыт         | `experience.log`   | `git log --graph`: ветка заполняется по мере скролла, достижения — диф  |
| Проекты      | `projects/`        | Сетка с фильтром, 3D-наклон и подсветка карточек за курсором           |
| Навыки       | `package.json`     | Подсветка технологий по уровню владения                                |
| Контакты     | `contact.sh`       | Рабочий терминал: `help`, `whoami`, `contacts`, `github`…                |

Плюс прелоадер-терминал, миникарта справа (на широких экранах) и статус-бар.
Сайт двуязычный (RU / EN): язык определяется по браузеру, запоминается после переключения
и может быть задан ссылкой — `?lang=en` или `?lang=ru`.
Все анимации уважают `prefers-reduced-motion`.

## Запуск

```bash
npm ci
npm run dev        # локальная разработка
npm run build      # typecheck + production-сборка в dist/
npm run preview    # просмотр собранной версии
npm run format     # prettier
```

## Как добавить проект

Все проекты лежат в [`src/data/projects.ts`](src/data/projects.ts). Добавьте объект в массив `projects`:

```ts
{
  id: 'my-project',
  title: { ru: 'Название', en: 'Title' },
  description: { ru: 'Что это и что в нём сделано.', en: 'What it is and what was built.' },
  category: 'saas',                  // saas | realestate | sites
  domain: 'example.com',             // показывается в шапке карточки и на обложке
  stack: ['React', 'TypeScript'],
  demoUrl: 'https://example.com/',
  repoUrl: null,                     // null — вместо кнопки «Код на GitHub» будет «Закрытый код»
  cover: {
    scene: 'dashboard',              // dashboard | landing | genplan | facade | chess | catalog | village | studio | event
    tone: 'kw',                      // kw | fn | str | num | caret — акцентный цвет обложки
    headline: 'Название в окне',
    kicker: 'Подпись над заголовком',
    labels: ['…'],                   // надписи внутри сцены: статусы, карточки, подсказки
  },
  featured: true,                    // необязательно: первая карточка на всю ширину
}
```

Обложки рисуются кодом (`src/components/ProjectCover.tsx`): общая рамка — сетка, свечение,
окно браузера с адресом сайта — и сцена, которая показывает суть проекта.

Текстовые поля можно писать одной строкой, если текст одинаков на обоих языках,
или парой `{ ru: '…', en: '…' }`.

Остальной контент: `src/data/profile.ts` (о себе, контакты), `src/data/experience.ts`, `src/data/skills.ts`.
Тексты интерфейса (кнопки, заголовки, терминал) — в `src/i18n/ui.ts`.

## Деплой

Каждый пуш в `main` собирает сайт и публикует его на GitHub Pages
(`.github/workflows/deploy.yml`, Settings → Pages → Source: GitHub Actions).
