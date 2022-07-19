import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste do componente Footer', () => {
  test('se clicar no botão de comida vá para /foods, e se clicar no botão de bebidas vá para /drinks', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const foodBtn = screen.getByRole('img', {  name: /mealicon/i});
    const drinkBtn = screen.getByRole('img', { name: /drinkicon/i });
    
    userEvent.click(drinkBtn);
    const drinkTitle = screen.getByRole('heading', { name: /drinks/i });
    expect(drinkTitle).toBeInTheDocument();
    expect(history.location.pathname).toBe('/drinks');

    userEvent.click(foodBtn);
    const foodTitle = screen.getByRole('heading', {  name: /foods/i});
    expect(foodTitle).toBeInTheDocument();
    expect(history.location.pathname).toBe('/foods');

});
});
