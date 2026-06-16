# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js 16 App Router presentation app. Route entrypoints and global styles live in `app/` (`app/page.tsx`, `app/layout.tsx`, `app/globals.css`). Reusable presentation shell and animation helpers live in `components/`. Individual slides are kept in `slides/` as numbered React components such as `Slide1.tsx` through `Slide8.tsx`. End-to-end coverage lives in `tests/`, and static assets belong in `public/`. Treat `test-results/` and `.next/` as generated output, not source.

## Build, Test, and Development Commands
Use `npm run dev` to start the local deck at `http://127.0.0.1:3000`. Use `npm run build` to produce a production build, and `npm run start` to serve that build locally. Run `npm run lint` before submitting changes; this uses the shared Next.js ESLint config. Run `npm run test:e2e` to execute the Playwright suite in `tests/`; the Playwright config will start the dev server automatically.

## Coding Style & Naming Conventions
Write TypeScript with `strict` mode assumptions in mind. Follow the existing style: functional React components, PascalCase for component filenames (`SlideContainer.tsx`), camelCase for helpers and local variables, and the `@/` import alias for project-root imports. Match the repository’s formatting patterns: double quotes, semicolons, and 2-space indentation in JSX/TSX blocks. Keep slide files focused on one slide each, and put shared animation constants in `components/presentationMotion.ts`.

## Testing Guidelines
This project currently uses Playwright for end-to-end tests only. Add or update tests in `tests/*.spec.ts` when changing slide flow, keyboard navigation, animation timing, or visible copy. Prefer user-facing assertions with roles and `data-testid` hooks already used by the suite. There is no formal coverage threshold yet, but new UI behavior should ship with at least one regression test.

## Commit & Pull Request Guidelines
The visible history currently contains the scaffold commit `Initial commit from Create Next App`, so there is no deeper commit convention to inherit yet. Use short, imperative commit subjects that describe one cohesive change. For pull requests, include a concise summary, note any test coverage added or updated, and attach screenshots or a short recording for visual slide changes. Link the relevant task or issue when one exists.
