# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR at http://localhost:5173
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

## Architecture

This is a minimal React 19 + Vite 7 starter app.

- **Entry point**: `src/main.jsx` mounts `<App />` into `#root` using `createRoot`
- **App component**: `src/App.jsx` — the single top-level component
- **Styling**: Component-scoped CSS files (`App.css`, `index.css`)
- **Static assets**: `public/` (served at root) and `src/assets/` (imported in JS)

**React Compiler** (`babel-plugin-react-compiler`) is enabled via Vite's Babel config in `vite.config.js`. This auto-memoizes components — avoid manual `useMemo`/`useCallback` unless profiling shows a need.

**ESLint** is configured with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`. The `no-unused-vars` rule ignores variables matching `^[A-Z_]` (constants/components).

No router, state management library, or test framework is set up — this is a blank-slate starter.
