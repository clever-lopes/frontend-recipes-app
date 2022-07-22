import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('testando a tela de prifile :)', () => {
  it('se clicar em logout na tela de profile.. é redirecionado para login', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const loginSubmitBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'tryber@trybe.com');
    userEvent.type(inputPassword, 'impossible123');
    userEvent.click(loginSubmitBtn);
    expect(JSON.parse(localStorage.getItem('user'))).toEqual({
      email: 'tryber@trybe.com'
    });
    userEvent.click(screen.getByTestId('profile-top-btn'));

    expect(history.location.pathname).toBe('/profile');
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();
    userEvent.click(logoutBtn);

    expect(history.location.pathname).toBe('/');
  });

  test('se clicar em done Recipes, vai para a pagina de receitas prontas', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const loginSubmitBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'tryber@trybe.com');
    userEvent.type(inputPassword, 'impossible123');
    userEvent.click(loginSubmitBtn);
    expect(JSON.parse(localStorage.getItem('user'))).toEqual({
      email: 'tryber@trybe.com'
    });
    userEvent.click(screen.getByTestId('profile-top-btn'));

    expect(history.location.pathname).toBe('/profile');
    userEvent.click(screen.getByTestId('profile-done-btn'));
    expect(history.location.pathname).toBe('/done-recipes');
  });
  test('se clicar em Favorites Recipes, vai para a pagina de favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const loginSubmitBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'tryber@trybe.com');
    userEvent.type(inputPassword, 'impossible123');
    userEvent.click(loginSubmitBtn);
    expect(JSON.parse(localStorage.getItem('user'))).toEqual({
      email: 'tryber@trybe.com'
    });
    userEvent.click(screen.getByTestId('profile-top-btn'));

    expect(history.location.pathname).toBe('/profile');
    userEvent.click(screen.getByTestId('profile-favorite-btn'));
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  test('se clicar em Favorites Recipes, vai para a pagina de favoritos', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.clear()
    history.push('/profile');
    expect(screen.getByRole('heading', { name: /not logged/i })).toBeInTheDocument();

  });
});
