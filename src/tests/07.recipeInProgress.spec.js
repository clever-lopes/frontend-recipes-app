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

  test('verifica se ao clicar em um igredientede alguam comida, ele é marcado', async () => {
    global.fetch = jest.fn().mockImplementation(mockFetch);
    const { history } = renderWithRouter(<App />);

    history.push('foods/52977/in-progress');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const allCheckBox = Array.from(screen.getAllByRole('checkbox'));
    expect(allCheckBox.length).toBe(13);

    allCheckBox.forEach(cada => {
      userEvent.click(cada);
      expect(cada).toBeChecked();
    });

    const allSpanMarked = Array.from(
      screen.getAllByTestId('ingredient-in-list')
    );
    allSpanMarked.forEach(span => {
      expect(span).toHaveClass('checkedIngredient');
    });
  });

  test('verifica se a lista de igredientes da comida marcada é salva', async () => {
    global.fetch = jest.fn().mockImplementation(mockFetch);
    const { history } = renderWithRouter(<App />);
    history.push('foods/52977/in-progress');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const allCheckBox = Array.from(screen.getAllByRole('checkbox'));
    allCheckBox.forEach(cada => {
      expect(cada).toBeChecked();

      const allSpanMarked = Array.from(
        screen.getAllByTestId('ingredient-in-list')
      );
      allSpanMarked.forEach(span => {
        expect(span).toHaveClass('checkedIngredient');
      });
    });
  });

  test('verifica se clicar novamente no igrediente de comida ele é desmarcado', async () => {
    global.fetch = jest.fn().mockImplementation(mockFetch);
    const { history } = renderWithRouter(<App />);
    history.push('foods/52977/in-progress');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const allCheckBox = Array.from(screen.getAllByRole('checkbox'));
    allCheckBox.forEach(cada => {
      userEvent.click(cada);
      expect(cada).not.toBeChecked();

    
    });
  });

    test('verifica se ao clicar em um igredientede alguam bebida, ele é marcado', async ()=>{
      global.fetch = jest.fn().mockImplementation(mockFetch);
      const { history } = renderWithRouter(<App />);

      history.push('drinks/17222/in-progress');
      await waitFor(() => expect(global.fetch).toHaveBeenCalled());
      const allCheckBox = Array.from(screen.getAllByRole('checkbox'));
      expect(allCheckBox.length).toBe(4);

      allCheckBox.forEach(cada => {
          userEvent.click(cada);
          expect(cada).toBeChecked();
        });
        const allSpanMarked = Array.from(screen.getAllByTestId('ingredient-in-list'));
      allSpanMarked.forEach((span)=>{
          expect(span).toHaveClass('checkedIngredient')
      });

    });

    test('verifica se a lista de igredientes da bebida marcada é salva', async () => {
        global.fetch = jest.fn().mockImplementation(mockFetch);
        const { history } = renderWithRouter(<App />);
        history.push('drinks/17222/in-progress');
        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    
        const allCheckBox = Array.from(screen.getAllByRole('checkbox'));
        allCheckBox.forEach(cada => {
          expect(cada).toBeChecked();
    
          const allSpanMarked = Array.from(
            screen.getAllByTestId('ingredient-in-list')
          );
          allSpanMarked.forEach(span => {
            expect(span).toHaveClass('checkedIngredient');
          });
        });
      });
      test('verifica se clicar novamente no igrediente de bebida ele é desmarcado', async () => {
        global.fetch = jest.fn().mockImplementation(mockFetch);
        const { history } = renderWithRouter(<App />);
        history.push('drinks/17222/in-progress');
        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    
        const allCheckBox = Array.from(screen.getAllByRole('checkbox'));
        allCheckBox.forEach(cada => {
          userEvent.click(cada);
          expect(cada).not.toBeChecked();
    
        
        });
      });
});
