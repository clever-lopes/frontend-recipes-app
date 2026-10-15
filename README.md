# Recipes App

**Live demo:** https://cleverlopes.com/frontend-recipes-app/

A React app to browse meals and drinks, search them by name, first letter or ingredient, filter by category, save favorites, and follow a recipe step by step until it is done. Recipes come from two public APIs, [TheMealDB](https://www.themealdb.com/) and [TheCocktailDB](https://www.thecocktaildb.com/); favorites and progress are kept in the browser's localStorage.

## Team

Built in 2022 as a group project at [Trybe](https://www.betrybe.com/) by four people:

- [Samuelr499](https://github.com/Samuelr499)
- [Victorpagotto](https://github.com/Victorpagotto)
- Luciano Dutra Cavalcante de Souza
- [Clever Lopes](https://github.com/clever-lopes)

My part during the course was small: the initial folder structure, changes to the carousel component, and two pair-programmed commits. In 2026 I maintained it alone: fixed the drinks page after TheCocktailDB changed its empty-search response, set up the GitHub Pages deploy, moved it from Create React App to Vite and React 18, and fixed done recipes being saved with the wrong month.

## Stack

React 18, React Router 5, Context API, Vite. Tests with Vitest and React Testing Library (75 tests).

## Running locally

Needs Node 20 or newer.

```bash
git clone https://github.com/clever-lopes/frontend-recipes-app.git
cd frontend-recipes-app
npm ci
npm run dev
```

```bash
npm test
```

## Deploy

Every push to `main` runs the tests, builds the app and publishes it to GitHub Pages (`.github/workflows/pages.yml`); a failing test stops the deploy. `vite.config.js` sets the `/frontend-recipes-app/` base for builds, and the workflow copies `index.html` to `404.html` so links straight to a route such as `/foods/52771` still load the app.

## License

MIT
