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

Все проекты лежат в [`src/data/projects.ts`](src/data/projects.ts). Замените заглушку на реальный объект:

```ts
{
  id: 'floxy-admin',
  title: 'FLOXY — админ-панель',
  description: 'Управление заказами, аналитика прибыли и платёжные интеграции.',
  category: 'admin',            // spa | admin | fullstack | landing
  stack: ['React', 'TypeScript', 'Redux Toolkit', 'Ant Design'],
  demoUrl: 'https://…',         // null — кнопка скроется
  repoUrl: 'https://github.com/bug1vuge/…',
  image: 'projects/floxy.webp', // файл в public/projects/; null — нарисуется код-превью
  year: 2026,
}
```

Скриншоты кладите в `public/projects/` (лучше `.webp`, 1600×1000).

Остальной контент: `src/data/profile.ts` (о себе, контакты), `src/data/experience.ts`, `src/data/skills.ts`.

## Деплой

Каждый пуш в `main` собирает сайт и публикует его на GitHub Pages
(`.github/workflows/deploy.yml`, Settings → Pages → Source: GitHub Actions).
