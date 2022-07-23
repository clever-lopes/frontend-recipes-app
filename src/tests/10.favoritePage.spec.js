import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mockFetch from './mocks/fecthControl';
import favorites from './mocks/favoritesMock';
import doneRecipes from './mocks/doneRecipesMock';
import FavoriteRecipes from '../pages/favorite/FavoriteRecipes';

describe('teste da pagina de favoritos', () => {
  test('se contem os botões da pagina e o titulo"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /favorites/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /done/i })).toBeInTheDocument();
    waitFor(()=> expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument());
    waitFor(()=> expect(screen.getByTestId('filter-by-food-btn')).toBeInTheDocument());
    waitFor(()=> expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument());
  });
  test('se nao tem nenhum favoritos, aparece a mensagem "No Favorite Recipes..."', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
    expect(screen.getByText(/no favorite recipes\.\.\./i)).toBeInTheDocument();
  });
  test('se adicionar uma receita de comida em favoritos, aparece em favorites', async () => {
    global.fetch = jest.fn().mockImplementation(mockFetch);
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52977');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    userEvent.click(screen.getByTestId('favorite-btn'));
    history.push('/favorite-recipes');
    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.getByText(/turkish \- side/i)).toBeInTheDocument();
  });
  test('se adicionar uma receita de bebida em favoritos, aparece em favorites', async () => {
    global.fetch = jest.fn().mockImplementation(mockFetch);
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/17222');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    userEvent.click(screen.getByTestId('favorite-btn'));
    history.push('/favorite-recipes');
    expect(screen.getByTestId('1-horizontal-image')).toBeInTheDocument();
    expect(screen.getByText(/turkish \- side/i)).toBeInTheDocument();
    expect(screen.getByText(/alcoholic \- cocktail/i)).toBeInTheDocument();
  });

  test('testa se clicar em Done mostra as receitas prontas', () => {
    localStorage.favoriteRecipes = JSON.stringify(favorites);
    localStorage.doneRecipes = JSON.stringify(doneRecipes);
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
    const doneBtn = screen.getByRole('button', { name: /done/i });
    userEvent.click(doneBtn);

    const item1 = screen.getByTestId('0-horizontal-image');
    const item2 = screen.getByTestId('1-horizontal-image');
    const item3 = screen.getByTestId('2-horizontal-image');

    expect(screen.getAllByRole('img').length).toBe(7);
    expect(item1).toBeInTheDocument();
    expect(item1.src).toBe('https://www.themealdb.com/images/media/meals/58oia61564916529.jpg')
    expect(item2).toBeInTheDocument();
    expect(item2.src).toBe('https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg')
    expect(item3).toBeInTheDocument();
    expect(item3.src).toBe('https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg')
  });
  test('testa se clicar no botão favorites mostra todos favoritos', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
    const favoritesBtn = screen.getByRole('button', { name: /favorites/i });
    userEvent.click(favoritesBtn);

    const item1 = screen.getByTestId('0-horizontal-image');
    const item2 = screen.getByTestId('1-horizontal-image');
    const item3 = screen.getByTestId('3-horizontal-image');

    expect(screen.getAllByRole('img').length).toBe(19);
    expect(item1).toBeInTheDocument();
    expect(item1.src).toBe('https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');
    expect(item2).toBeInTheDocument();
    expect(item2.src).toBe('https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg');
    expect(item3).toBeInTheDocument();
    expect(item3.src).toBe('https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg');
  });
  test('testa se clicar no botão Food mostra apenas as comidas Favoritas', () => {

    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
    const foodBtn = screen.getByRole('button', { name: /food/i });
    userEvent.click(foodBtn);

    const item1 = screen.getByTestId('0-horizontal-image');
    const item2 = screen.getByTestId('1-horizontal-image');
    const item3 = screen.getByTestId('2-horizontal-image');

    expect(screen.getAllByRole('img').length).toBe(13);
    expect(item1).toBeInTheDocument();
    expect(item1.src).toBe('https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');
    expect(item2).toBeInTheDocument();
    expect(item2.src).toBe('https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg');
    expect(item3).toBeInTheDocument();
    expect(item3.src).toBe('https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg');
  });

  test('testa se clicar no botão Drink mostra apenas as bebidas Favoritas', () => {

    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
    const drinkBtn = screen.getByRole('button', { name: /drink/i });
    userEvent.click(drinkBtn);

    const item1 = screen.getByTestId('0-horizontal-image');
    const item2 = screen.getByTestId('1-horizontal-image');

    expect(screen.getAllByRole('img').length).toBe(7);
    expect(item1).toBeInTheDocument();
    expect(item1.src).toBe('https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg');
    expect(item2).toBeInTheDocument();
    expect(item2.src).toBe('https://www.thecocktaildb.com/images/media/drink/v0at4i1582478473.jpg');
  });
  test('testa se clicar no botão All mostra todos Favoritos', () => {

    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
    const allBtn = screen.getByRole('button', { name: /all/i });
    userEvent.click(allBtn);

    const item1 = screen.getByTestId('0-horizontal-image');
    const item2 = screen.getByTestId('1-horizontal-image');
    const item3 = screen.getByTestId('3-horizontal-image');

    expect(screen.getAllByRole('img').length).toBe(19);
    expect(item1).toBeInTheDocument();
    expect(item1.src).toBe('https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');
    expect(item2).toBeInTheDocument();
    expect(item2.src).toBe('https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg');
    expect(item3).toBeInTheDocument();
    expect(item3.src).toBe('https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg');
  });
});
