# News API — TypeScript

RS School task [migration-newip-to-ts](https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/tasks/TS-news-api/migration-newip-to-ts.md): the news-JS app migrated to TypeScript.

Deploy: https://yurechik22.github.io/news-JS/

## Run

- Copy `.env.example` to `.env` and set your variables (without `.env` the app uses the RS School proxy mocks)
- `npm install`
- `npm start` — dev server
- `npm run build` — production build into `dist`
- `npm run lint` — ESLint (typescript-eslint, `no-explicit-any`)
- `npm run typecheck` — `tsc --noEmit` with `strict` and `noImplicitAny`
- `npm run deploy` — build and publish `dist` to the `gh-pages` branch
