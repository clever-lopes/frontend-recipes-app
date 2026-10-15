import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The components were written for Create React App, which reads JSX in .js
// files. Vite does not, so both the dev transform and the dependency scan are
// told to.
const jsxInJs = { loader: 'jsx', include: /src\/.*\.jsx?$/, exclude: [] };

// The tests were written against Create React App's Jest setup, which turned
// every imported image into its file name (src="whiteHeartIcon.svg"). Under
// Vitest the same import is a /src/images/... path, so the tests get CRA's
// behavior back instead of 11 rewritten assertions.
const imageImportsAsFileNames = {
  name: 'cra-image-file-names',
  enforce: 'pre',
  load(id) {
    if (!/\.(svg|png|jpe?g|gif)$/.test(id)) return null;
    return `export default ${JSON.stringify(path.basename(id))};`;
  },
};

export default defineConfig(({ command, mode }) => ({
  // Published at https://cleverlopes.com/frontend-recipes-app/; served from
  // the root in development and tests.
  base: command === 'build' ? '/frontend-recipes-app/' : '/',
  plugins: mode === 'test' ? [react(), imageImportsAsFileNames] : [react()],
  esbuild: jsxInJs,
  optimizeDeps: { esbuildOptions: { loader: { '.js': 'jsx' } } },
  test: {
    environment: 'jsdom',
    // Same page URL as Create React App's Jest: the image assertions compare
    // absolute src values.
    environmentOptions: { jsdom: { url: 'http://localhost/' } },
    globals: true,
    setupFiles: './src/setupTests.js',
    // Create React App's Jest config resets every mock before each test, and
    // the call counts in these tests depend on it.
    mockReset: true,
  },
}));
