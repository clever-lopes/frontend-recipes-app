import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('testando a tela de prifile :)', () => {
  it('se clicar em logout na tela de profile.. é redirecionado para login', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    userEvent.click(screen.getByTestId('profile-logout-btn'));
    expect(history.location.pathname).toBe('/');
  });
});
