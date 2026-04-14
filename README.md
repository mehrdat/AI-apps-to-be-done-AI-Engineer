# AI Engineer TODO Planner

A lightweight React app that renders a single Planner UI (ai_project_planner.jsx). It presents curated big-project ideas, phased todo lists, resources, and documentation templates for an AI engineering portfolio. This repository is a Vite + React app whose entry now renders the planner component as the main UI.

**What it is**:
- **Planner UI:** A single-page, interactive planner component that lists big projects, phased todo items, curated resources, and README templates.
- **Session progress only:** The checkboxes are stored in-memory for the session (no persistence to disk or backend).

**Quickstart (run locally)**

1. Install deps

```bash
npm install
```

2. Run dev server (HMR)

```bash
npm run dev
```

Open the printed local URL (usually http://localhost:5173) in your browser.

3. Build for production

```bash
npm run build
```

4. Preview the production build

```bash
npm run preview
```

**What changed in this repo**
- The app entry (`src/App.jsx`) now renders the planner component from the repo root file `ai_project_planner.jsx`.
- Global styles were simplified in `src/index.css` so the planner controls the page layout and colors.

**Project structure (important files)**
- `ai_project_planner.jsx` — The full Planner React component (UI, data, state).
- `src/App.jsx` — App entry that returns the Planner component.
- `src/main.jsx` — React bootstrap (creates root and renders `App`).
- `src/index.css` — Minimal global CSS used by the planner.
- `package.json` — Scripts: `dev`, `build`, `preview`, `lint`.

**Notes & next steps**
- Persistence: If you want checked items saved between sessions, I can add localStorage or a small backend.
- File organization: I can move `ai_project_planner.jsx` into `src/` and split it into components for maintainability.
- Accessibility & tests: We can add keyboard focus states and basic unit tests if you want.

**Contributing**
- Make small, focused commits (use conventional prefixes like `feat:`, `fix:`, `docs:`). The repo already includes an example of commit hygiene in the planner UI.

**License**
- Add a license file if you want this public. I can add an MIT license on request.

---

If you want I can: move `ai_project_planner.jsx` into `src/`, persist checkboxes with `localStorage`, or split the file into smaller components — tell me which and I’ll implement it.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
