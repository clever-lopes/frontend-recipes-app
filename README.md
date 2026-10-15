# Recipes App

**Live demo:** https://cleverlopes.com/frontend-recipes-app/

A React app to browse meals and drinks, search them by name, first letter or ingredient, filter by category, save favorites, and follow a recipe step by step until it is done. Recipes come from two public APIs, [TheMealDB](https://www.themealdb.com/) and [TheCocktailDB](https://www.thecocktaildb.com/); favorites and progress are kept in the browser's localStorage.

## Team

Built in 2022 as a group project at [Trybe](https://www.betrybe.com/) by four people:

- [Samuelr499](https://github.com/Samuelr499)
- [Victorpagotto](https://github.com/Victorpagotto)
- Luciano Dutra Cavalcante de Souza
- [Clever Lopes](https://github.com/clever-lopes)

My part during the course was small: the initial folder structure, changes to the carousel component, and two pair-programmed commits. In 2026 I fixed the drinks page after TheCocktailDB changed its empty-search response and set up the GitHub Pages deploy.

## Stack

React 17, React Router 5, Context API, Create React App. Tests with React Testing Library (75 tests).

## Running locally

The project pins Node 16 in `package.json`. It also builds on Node 22 if the engine check is relaxed:

```bash
git clone https://github.com/clever-lopes/frontend-recipes-app.git
cd frontend-recipes-app
npm ci --engine-strict=false
npm start
```

```bash
npm test
```

## Deploy

Every push to `main` builds the app and publishes it to GitHub Pages (`.github/workflows/pages.yml`). The build sets `PUBLIC_URL=/frontend-recipes-app` and copies `index.html` to `404.html`, so links straight to a route such as `/foods/52771` still load the app.

## License

MIT
