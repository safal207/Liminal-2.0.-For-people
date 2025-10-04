# LIMINAL 2.0 — For People

MVP: утренние 3 инсайта (микропривычка, рефрейм, мировой штрих) и вечерняя свёртка.  
TTFI < 60s. Next.js 15, React 19, TS, Tailwind, Prisma (схема), Playwright.

## Запуск
```bash
npm install
npm run dev   # http://localhost:3000
npm run test  # e2e
```

Страницы: /morning, /evening, /history.

---

## Коммиты (последовательно)

chore(init): bootstrap Next 15 (TS, Tailwind, app router, src)
feat(prisma): add schema (User, Entry, Insight, Rule) and .env.example
feat(pages): add morning/evening/history pages (MVP, no DB)
test(e2e): add Playwright config and morning TTFI test
ci: add GitHub Actions minimal workflow
docs: update README (run instructions)

## Критерии успеха
- `npm run dev` стартует без ошибок, страницы доступны.
- Тест `tests/morning.spec.ts` проходит.
- Build (`npm run build`) успешен.
- CI зелёный на `main`.
- В коде нет route-groups, `.git` на месте.

---

Если окружение у агента будет «ломаться из-за .git» — пересоздать сессию/воркспейс и повторить команды **только в корне репо**. Дальше допилим PWA, БД и auth — уже на Неделе 2.
