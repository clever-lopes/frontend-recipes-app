import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { act, render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  // React 18 no longer flushes updates fired outside act() synchronously, and
  // the tests navigate with history.push and query the page right after.
  const push = history.push.bind(history);
  history.push = (...args) => act(() => push(...args));
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};
export default renderWithRouter;
