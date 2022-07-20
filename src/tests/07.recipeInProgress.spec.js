import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mealCategories from './mocks/mealCategories';
import mockFetch from './mocks/fecthControl';
import drinksCategories from './mocks/drinksCategories';
import meals from './mocks/mealsMock';
import chickenMeals from './mocks/chickenMock';
import { beefMealsNerfed, mealsNerfed } from './mocks/fecthMockSmall';
import beefMeals from './mocks/beefMock';
import mockSmallFetch from './mocks/fecthMockSmall';
import CORBA from './mocks/corba';
import mealFormat from '../services/helpers/mealFormat';
describe('testando a tela de receitas em proguesso', () => {
  it('verifica elementos de uma receita de comida', async () => {
    global.fetch = jest.fn().mockImplementation(mockFetch);
    const { history } = renderWithRouter(<App />);

    history.push('foods/52977/in-progress');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-title').innerHTML).toBe('Corba');
    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('finish-recipe-btn')).toBeInTheDocument();
    const listOfIngredients = Array.from(screen.getByRole('list').children);
    expect(listOfIngredients).toHaveLength(13);
  });

  it('verifica elementos de uma receita de bebida', async () => {
    global.fetch = jest.fn().mockImplementation(mockFetch);
    const { history } = renderWithRouter(<App />);

    history.push('drinks/17222/in-progress');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-title').innerHTML).toBe('A1');
    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('finish-recipe-btn')).toBeInTheDocument();
    const listOfIngredients = Array.from(screen.getByRole('list').children);
    expect(listOfIngredients).toHaveLength(4);
  });

  test('todos os ingredientes de uma receita de comida possuem um checkbox', async () => {
    global.fetch = jest.fn().mockImplementation(mockFetch);
    const { history } = renderWithRouter(<App />);

    history.push('foods/52977/in-progress');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const ingredients = mealFormat(CORBA.meals)[0].ingredients;
    
    const listaDeIngredientes = [];
    const allCheckBox = Array.from(screen.getAllByRole('checkbox'));
    ingredients.forEach(cada => {
      listaDeIngredientes.push(screen.getByText(`${cada.measure} ${cada.ingredient}`));
    });

    console.log(listaDeIngredientes);
    expect(allCheckBox.length).toBe(13);
    console.log(allSpan[0]);
    allCheckBox.forEach(cada => {
      userEvent.click(cada);
      expect(cada).toBeChecked();
    });
  });
});
