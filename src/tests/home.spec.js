import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import SearchBar from '../components/SearchBar';

describe('teste da pagina Home', () => {
  test('se no componente Foods aparece icones, e o respectivo nome da pagina ', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.type(screen.getByTestId('email-input'), 'tryber@trybe.com');
    userEvent.type(screen.getByTestId('password-input'), 'impossible123');
    userEvent.click(screen.getByTestId('login-submit-btn'));

    const { pathname } = history.location;
    expect(pathname).toBe('/foods');

    //============ VERIFICA SE O HEADER E O FOOTER APARECE CORRETAMENTE ============//
    expect(
      screen.getByRole('img', { name: /profileicon/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /foods/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /drinkicon/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /mealicon/i })).toBeInTheDocument();
  });

  test('testa se o o botão do profile redireciona para /profile', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    expect(
      screen.getByRole('img', { name: /profileicon/i })
    ).toBeInTheDocument();
    userEvent.click(screen.getByRole('img', { name: /profileicon/i }));
    expect(
      screen.getByRole('heading', { name: /profile/i })
    ).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  test('testa se o o botão de profile redireciona para /profile e se clicar novamente volta para /foods', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchBtn = screen.getByRole('img', { name: /searchicon/i });
    expect(
      screen.getByRole('img', { name: /profileicon/i })
    ).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    //================================== FIRST CLICK =========================================//
    userEvent.click(screen.getByRole('img', { name: /profileicon/i }));
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');

    expect(
      screen.getByRole('heading', { name: /profile/i })
    ).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
    //================================== SECOUND CLICK =========================================//
    userEvent.click(screen.getByRole('img', { name: /profileicon/i }));
    expect(history.location.pathname).toBe('/foods');
    expect(screen.getByRole('heading', { name: /foods/i })).toBeInTheDocument();
  });
  test(' ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const searchBtn = screen.getByRole('img', { name: /searchicon/i });
    userEvent.click(searchBtn);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('exec-search-btn')).toBeInTheDocument();
  });
});
