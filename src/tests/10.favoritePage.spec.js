import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mockFetch from './mocks/fecthControl';

describe('teste da pagina de favoritos', () => {
  test('se nao tem nenhum favoritos, parece a mensagem "No Favorite Recipes..."', () => {
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
});
