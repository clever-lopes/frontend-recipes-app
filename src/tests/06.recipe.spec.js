import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mealCategories from './mocks/mealCategories';
import mockFetch from './mocks/fecthControl';
import drinksCategories from './mocks/drinksCategories';
import meals from './mocks/mealsMock';
import drinks from './mocks/drinksMock';
import chickenMeals from './mocks/chickenMock';
import { beefMealsNerfed, mealsNerfed } from './mocks/fecthMockSmall';
import beefMeals from './mocks/beefMock';
import mockSmallFetch from './mocks/fecthMockSmall';
import cocktailDrinks from './mocks/cocktailMock';
import cocoaDrinks from './mocks/cocoaMock';


describe('teste da pagina recipes', () => {
  afterEach(() => jest.clearAllMocks());

  test('se renderiza as 5 primeiras categorias de comidas', async () => {
    const { history } = renderWithRouter(<App />);
    global.fetch = jest.fn().mockImplementation(mockFetch);
    history.push('/foods');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(screen.getByTestId('Beef-category-filter')).toBeInTheDocument());

    mealCategories.meals.slice(0, 5).forEach(({ strCategory: category }) => {
      expect(
        screen.getByTestId(`${category}-category-filter`)
      ).toBeInTheDocument();
    });
    expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
  });
  test('se renderiza as 5 primeiras categorias de bebidas', async () => {
    const { history } = renderWithRouter(<App />);
    global.fetch = jest.fn().mockImplementation(mockFetch);
    history.push('/drinks');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    await waitFor(() =>
      expect(screen.getByTestId('Cocoa-category-filter')).toBeInTheDocument()
    );

    drinksCategories.drinks.slice(0, 5).forEach(({ strCategory: category }) => {
      expect(
        screen.getByTestId(`${category}-category-filter`)
      ).toBeInTheDocument();
    });
    expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
  });
  test('Em foods se selecionar as categorias traz as receitas da categoria, e se clicar novamente ou se clicar no All, traz as receitas sem filtro por categoria ', async () => {
    global.fetch = jest.fn().mockImplementation(mockFetch);

    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    const btnBeef = screen.getByTestId('Beef-category-filter');
    userEvent.click(btnBeef);

    const beefSlice = beefMeals.meals.slice(0, 12);
    await waitFor(() =>
      expect(screen.getByText(beefSlice[0].strMeal)).toBeInTheDocument()
    );
    beefSlice.forEach(({ strMeal }) => {
      expect(screen.getByText(strMeal)).toBeInTheDocument();
    });

    userEvent.click(btnBeef);

    const allmealSlice = meals.meals.slice(0, 12);
    await waitFor(() =>
      expect(screen.getByText(allmealSlice[0].strMeal)).toBeInTheDocument()
    );
    allmealSlice.forEach(({ strMeal }) => {
      expect(screen.getByText(strMeal)).toBeInTheDocument();
    });

    const btnChicken = screen.getByTestId('Chicken-category-filter');
    userEvent.click(btnChicken);

    const chickenSlice = chickenMeals.meals.slice(0, 12);
    await waitFor(() =>
      expect(screen.getByText(chickenSlice[0].strMeal)).toBeInTheDocument()
    );
    chickenSlice.forEach(({ strMeal }) => {
      expect(screen.getByText(strMeal)).toBeInTheDocument();
    });

    const btnAll = screen.getByTestId('All-category-filter');
    userEvent.click(btnAll);

    await waitFor(() =>
      expect(screen.getByText(allmealSlice[0].strMeal)).toBeInTheDocument()
    );
    allmealSlice.forEach(({ strMeal }) => {
      expect(screen.getByText(strMeal)).toBeInTheDocument();
    });
  });

  test('se é renderizado menos de 12 items', async () => {
    global.fetch = jest.fn().mockImplementation(mockSmallFetch);

    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    const btnBeef = screen.getByTestId('Beef-category-filter');
    userEvent.click(btnBeef);

    await waitFor(() =>
      expect(
        screen.getByText(beefMealsNerfed.meals[0].strMeal)
      ).toBeInTheDocument()
    );
    beefMealsNerfed.meals.forEach(meals => {
      expect(screen.getByText(meals.strMeal)).toBeInTheDocument();
    });

    const btnAll = screen.getByTestId('All-category-filter');
    userEvent.click(btnAll);

    await waitFor(() =>
      expect(screen.getByText(mealsNerfed.meals[0].strMeal)).toBeInTheDocument()
    );
    mealsNerfed.meals.forEach(meals => {
      expect(screen.getByText(meals.strMeal)).toBeInTheDocument();
    });
  });
  test('Redirecione a pessoa usuária ao clicar no card para a tela de detalhes para comida', async () => {
    global.fetch = jest.fn().mockImplementation(mockFetch);

    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    userEvent.click(screen.getByTestId('0-card-name'));

    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(history.location.pathname).toBe('/foods/52973');
  });
  test('Redirecione a pessoa usuária ao clicar no card para a tela de detalhes para bebida', async () => {
    global.fetch = jest.fn().mockImplementation(mockFetch);

    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    userEvent.click(screen.getByText(/a1/i));

    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(history.location.pathname).toBe('/drinks/17222');
  });
  test('Em drinks se selecionar as categorias traz as receitas da categoria, e se clicar novamente ou se clicar no All, traz as receitas sem filtro por categoria ', async () => {
    global.fetch = jest.fn().mockImplementation(mockFetch);

    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    const btnCocktail = screen.getByTestId('Cocktail-category-filter');
    userEvent.click(btnCocktail);

    const cocktailSlice = cocktailDrinks.drinks.slice(0, 12);
    await waitFor(() =>
      expect(screen.getByText(cocktailSlice[0].strDrink)).toBeInTheDocument()
    );
    cocktailSlice.forEach(({ strDrink }) => {
      expect(screen.getByText(strDrink)).toBeInTheDocument();
    });

    userEvent.click(btnCocktail);

    const allDrinkSlice = drinks.drinks.slice(0, 12);
    await waitFor(() =>
      expect(screen.getByText(allDrinkSlice[0].strDrink)).toBeInTheDocument()
    );
    allDrinkSlice.forEach(({ strDrink }) => {
      expect(screen.getByText(strDrink)).toBeInTheDocument();
    });

    const btnCocoa = screen.getByTestId('Cocoa-category-filter');
    userEvent.click(btnCocoa);

    // const chickenSlice = chickenMeals.meals.slice(0, 12);
    await waitFor(() =>
      expect(screen.getByText(cocoaDrinks.drinks[0].strDrink)).toBeInTheDocument()
     );

     cocoaDrinks.drinks.forEach(({ strDrink }) => {
      expect(screen.getByText(strDrink)).toBeInTheDocument();
    });

    const btnAll = screen.getByTestId('All-category-filter');
    userEvent.click(btnAll);

    await waitFor(() =>
      expect(screen.getByText(allDrinkSlice[0].strDrink)).toBeInTheDocument()
    );
    allDrinkSlice.forEach(({ strDrink }) => {
      expect(screen.getByText(strDrink)).toBeInTheDocument();
    });
  });
});
