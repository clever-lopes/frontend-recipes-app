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

const shareHandle = async () => {
  const treatedHREF = window.location.href.split('/in-progress')[0];
  copy(treatedHREF);
  setPopUp(true);
  timerID = setTimeout(() => {
    setPopUp(false);
  }, +'1000');
};
describe('testando a tela de receitas em progresso', () => {
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

  test('verifica se ao clicar em um igrediente de alguma comida, ele é marcado', async () => {
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

  test('verifica se ao clicar em um igredientede alguam bebida, ele é marcado', async () => {
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
    const allSpanMarked = Array.from(
      screen.getAllByTestId('ingredient-in-list')
    );
    allSpanMarked.forEach(span => {
      expect(span).toHaveClass('checkedIngredient');
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
  test('se a tela de detalhes for de um produto invalido retorna notFound', async () => {
    global.fetch = jest.fn().mockImplementation(mockFetch);

    const { history } = renderWithRouter(<App />);
    history.push('foods/01234/in-progress');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const notFound = screen.getByRole('heading', {
      name: /página não encontrada/i
    });

    expect(notFound).toBeInTheDocument();
  });

  // test('testa botão de share na pagina de progresso em comidas', async() => {
  //    global.fetch = jest.fn().mockImplementation(mockFetch)

  //   const { history } = renderWithRouter(<App />);
  //   history.push('foods/52977/in-progress');

  //   await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

  //   const shareBtn = screen.getByRole('button', { name: /share icon/i });

  //   expect(shareBtn).toBeInTheDocument();

  //   userEvent.click(shareBtn);

  //   expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
  // });

  // test('testa botão de share na pagina de progresso em bebidas', async () => {
  //   global.fetch = jest.fn().mockImplementation(mockFetch);

  //   delete window.location;
  //   window.location = Object.create(window);
  //   window.location.href = 'my-url';

  //   const { history } = renderWithRouter(<App />);
  //   history.push('drinks/17222/in-progress');
  //   await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

  //   const shareBtn = screen.getByRole('button', { name: /share icon/i });

  //   expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
  //   expect(shareBtn).toBeInTheDocument();

  //   userEvent.click(shareBtn);
  //   // Document.execCommand()

  //     expect(window.location.href.split('/in-progress')[0]).not.toBe('my url');

  //    await waitFor(()=> expect(screen.getByText(/link copied!/i)).toBeInTheDocument());
  // });
  test('se clicar no favoritos salva em favoritos, e se clicar novamente remove, para progress de bebidas', async () => {
    global.fetch = jest.fn().mockImplementation(mockFetch);
    const { history } = renderWithRouter(<App />);
    history.push('drinks/17222/in-progress');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const favoriteBtn = screen.getByRole('img', { name: /heart/i });
    expect(favoriteBtn.src).toBe('http://localhost/whiteHeartIcon.svg');
    userEvent.click(favoriteBtn);
    expect(favoriteBtn.src).toBe('http://localhost/blackHeartIcon.svg');
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).toHaveLength(1);

    userEvent.click(favoriteBtn);
    expect(favoriteBtn.src).toBe('http://localhost/whiteHeartIcon.svg');
    const favoriteRecipesUpdated = JSON.parse(
      localStorage.getItem('favoriteRecipes')
    );
    expect(favoriteRecipesUpdated).toHaveLength(0);
  });
  test('se clicar no favoritos salva em favoritos, e se clicar novamente remove,  para progress de comidas', async () => {
    global.fetch = jest.fn().mockImplementation(mockFetch);
    const { history } = renderWithRouter(<App />);
    history.push('foods/52977/in-progress');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const favoriteBtn = screen.getByRole('img', { name: /heart/i });

    expect(favoriteBtn.src).toBe('http://localhost/whiteHeartIcon.svg');

    userEvent.click(favoriteBtn);
    expect(favoriteBtn.src).toBe('http://localhost/blackHeartIcon.svg');
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).toHaveLength(1);

    userEvent.click(favoriteBtn);
    expect(favoriteBtn.src).toBe('http://localhost/whiteHeartIcon.svg');
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toHaveLength(0);
  });

  test('teste se ao clicar em done  redireciona para "/done-recipe"', async () => {
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
    userEvent.click(screen.getByTestId('finish-recipe-btn'));
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
