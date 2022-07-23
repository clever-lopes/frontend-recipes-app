import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('teste do Hearder se aparece corretamente nas paginas, e se o searchbar faz pesquisa corretamente', () => {
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
      screen.getByTestId('page-title').innerHTML).toBe('Profile');
    expect(searchBtn).not.toBeInTheDocument();
    //================================== SECOUND CLICK =========================================//
    userEvent.click(screen.getByRole('img', { name: /profileicon/i }));
    expect(history.location.pathname).toBe('/foods');
    expect(screen.getByRole('heading', { name: /foods/i })).toBeInTheDocument();
  });
  test('se aparece a searchBar ao clicar no botão de pesquisa', () => {
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

  test('se estiver em /foods, renderiza comidas e se estiver em /drinks renderiza bebidas,', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
     waitFor(() => {
      expect(screen.getByText(/corba/i)).toBeInTheDocument();
      expect(screen.getByText(/big mac/i)).toBeInTheDocument();
    });

    userEvent.click(screen.getByRole('img', { name: /drinkicon/i }));
    expect(screen.getByTestId('page-title').innerHTML).toBe('Drinks');
    waitFor(() => {
      expect(screen.getByText(/gg/i)).toBeInTheDocument();
      expect(screen.getByText(/b-52/i)).toBeInTheDocument();
    });
  });
  test('se clicar em favorites vá para pagina de favorites,', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
     userEvent.click(screen.getByRole('button', { name: /favorites/i }));
     expect(history.location.pathname).toBe('/favorite-recipes');
  });
  test('se clicar em Done vá para pagina de done recipes,', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
     userEvent.click(screen.getByRole('button', { name: /done/i }));
     expect(history.location.pathname).toBe('/done-recipes');
  });
});
