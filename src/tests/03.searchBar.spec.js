import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import meals from './mocks/mealsMock';
import MEAL_BY_LETTER from './mocks/mealByLetter';
import mockFetch from './mocks/fecthControl';
import drinkByLetter from './mocks/drinksByLetter';

describe('teste do componente barra de pesquisa', () => {
  test('se contém todos os elementos necessarios para a pesquisa', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const iconSearchBar = screen.getByTestId('search-top-btn');

    userEvent.click(iconSearchBar);
    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const letterRadio = screen.getByTestId('first-letter-search-radio');
    const searchbtn = screen.getByTestId('exec-search-btn');

    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(letterRadio).toBeInTheDocument();
    expect(searchbtn).toBeInTheDocument();
  });
  test('Se o radio selecionado for Name, a busca na API é feita corretamente pelo nome', async () => {
    const endpoint =
      'https://www.themealdb.com/api/json/v1/1/search.php?s=soup';

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals)
    });

    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const iconSearchBar = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearchBar);

    const searchInput = screen.getByTestId('search-input');
    const nameRadio = screen.getByTestId('name-search-radio');
    const searchbtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'soup');
    userEvent.click(nameRadio);
    userEvent.click(searchbtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(endpoint));
  });
  test('Se o radio selecionado for First letter, a busca de comida na API é feita corretamente pelo primeira letra', async () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(MEAL_BY_LETTER)
    });

    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const iconSearchBar = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearchBar);

    const searchInput = screen.getByTestId('search-input');
    const letterRadio = screen.getByTestId('first-letter-search-radio');
    const searchbtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'a');
    userEvent.click(letterRadio);
    userEvent.click(searchbtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(endpoint));
  });
  test('Se o radio selecionado for First letter, a busca de bebida na API é feita corretamente pelo primeira letra', async () => {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkByLetter)
    });

    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const iconSearchBar = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearchBar);

    const searchInput = screen.getByTestId('search-input');
    const letterRadio = screen.getByTestId('first-letter-search-radio');
    const searchbtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'a');
    userEvent.click(letterRadio);
    userEvent.click(searchbtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(endpoint));
  });
  test('Se o radio selecionado for First letter, e nenhum item for encontrado, deve aparecer um alert ', async () => {
    global.fetch.mockImplementation(mockFetch);

    window.alert = jest.fn();
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    await waitFor(()=> expect(global.fetch).toHaveBeenCalledTimes(2));
    const iconSearchBar = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearchBar);

    const searchInput = screen.getByTestId('search-input');
    const letterRadio = screen.getByTestId('first-letter-search-radio');
    const searchbtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'xx');
    userEvent.click(letterRadio);
    userEvent.click(searchbtn);
    await waitFor(()=> expect(global.fetch).toHaveBeenCalledTimes(2));
    expect(window.alert).toBeCalled();
  });

  test('Se o radio selecionado for First letter e a busca na API for feita com mais de uma letra, deve-se exibir um alert', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: null })
    });

    window.alert = jest.fn();
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const iconSearchBar = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearchBar);

    const searchInput = screen.getByTestId('search-input');
    const letterRadio = screen.getByTestId('first-letter-search-radio');
    const searchbtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'aaa');
    userEvent.click(letterRadio);
    userEvent.click(searchbtn);

    expect(window.alert).toBeCalled();
  });

  test('Em foods se o radio selecionado for Igredientes, a busca na API é feita corretamente pelo igrediente', async () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken';

    global.fetch = jest.fn(mockFetch);

    const { history } = renderWithRouter(<App />);
    history.push('/foods');
     await waitFor(()=> expect(global.fetch).toHaveBeenCalledTimes(2));
    const iconSearchBar = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearchBar);
    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const searchbtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'Chicken');
    userEvent.click(ingredientRadio);
    userEvent.click(searchbtn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(endpoint));
  });

  test('Em drinks se o radio selecionado for Igredientes, a busca na API é feita corretamente pelo igrediente', async () => {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka';

    global.fetch = jest.fn(mockFetch)

    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    await waitFor(()=> expect(global.fetch).toHaveBeenCalledTimes(2));
    const iconSearchBar = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearchBar);

    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const searchbtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'Vodka');
    userEvent.click(ingredientRadio);
    userEvent.click(searchbtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(endpoint));
  });
  test('Se não encontrar nenhuma receita por nome deve-se exibir um alert', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: null })
    });

    window.alert = jest.fn();
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const iconSearchBar = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearchBar);

    const searchInput = screen.getByTestId('search-input');
    const nameRadio = screen.getByTestId('name-search-radio');
    const searchbtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'comidainexistente');
    userEvent.click(nameRadio);
    userEvent.click(searchbtn);

    await waitFor(() => expect(window.alert).toBeCalled());
  });
  test('Se não encontrar nenhuma receita por ingrediente deve-se exibir um alert', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: null })
    });

    window.alert = jest.fn();
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const iconSearchBar = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearchBar);

    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const searchbtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'igrediente inexistente');
    userEvent.click(ingredientRadio);
    userEvent.click(searchbtn);

    await waitFor(() => expect(window.alert).toBeCalled());
  });
  test('Se apesquisar uma comida por nome e retornar só uma receita, redireciona para "/foods/{id}" ', async () => {
    global.fetch = jest.fn().mockImplementation(mockFetch);
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const iconSearchBar = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearchBar);

    const searchInput = screen.getByTestId('search-input');
    const nameRadio = screen.getByTestId('name-search-radio');
    const searchbtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'Corba');
    userEvent.click(nameRadio);
    userEvent.click(searchbtn);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(history.location.pathname).toBe('/foods/52977'));
  });
  test('Se apesquisa por uma bebida por nome retornar só uma receita redireciona para "/drinks/{id}" ', async () => {
    global.fetch = jest.fn().mockImplementation(mockFetch);

    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const iconSearchBar = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearchBar);

    const searchInput = screen.getByTestId('search-input');
    const nameRadio = screen.getByTestId('name-search-radio');
    const searchbtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'A1');
    userEvent.click(nameRadio);
    userEvent.click(searchbtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() =>
      expect(history.location.pathname).toBe('/drinks/17222')
    );
  });
});
