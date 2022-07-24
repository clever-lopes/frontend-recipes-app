import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mockFetch from './mocks/fecthControl';

const listaDefavoritos = [
  {
    alcoholicOrNot: '',
    category: 'Vegetarian',
    id: '52771',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    name: 'Spicy Arrabiata Penne',
    nationality: 'Italian',
    type: 'food'
  },
  {
    alcoholicOrNot: 'Alcoholic',
    category: 'Cocktail',
    id: '178319',
    image:
      'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    name: 'Aquamarine',
    nationality: '',
    type: 'drink'
  }
];

describe('testando a tela de detalhes da receita de', () => {
  beforeEach(() => (global.fetch = jest.fn().mockImplementation(mockFetch)));

  afterEach(() => jest.clearAllMocks());

  test('verifica se contem todos os elementos na tela de detalhes de comida', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('foods/52771');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    const recipePhoto = screen.getByTestId('recipe-photo');
    const recipleTitle = screen.getByTestId('recipe-title');
    const favoriteBtn = screen.getByTestId('favorite-btn');
    const shareBtn = screen.getByTestId('share-btn');
    const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    const recipeCategory = screen.getByTestId('recipe-category');
    const recipeInstruction = screen.getByTestId('instructions');

    const ingredientsAndMesures = [
      '1 pound of penne rigate',
      '1/4 cup of olive oil',
      '3 cloves of garlic',
      '1 tin  of chopped tomatoes',
      '1/2 teaspoon of red chile flakes',
      '1/2 teaspoon of italian seasoning',
      '6 leaves of basil',
      'spinkling of Parmigiano-Reggiano',
      ,
    ];

    ingredientsAndMesures.forEach((ingredient, index) => {
      const getIngredientFromScreen = screen.getByTestId(
        `${index}-ingredient-name-and-measure`
      );
      expect(getIngredientFromScreen.innerHTML).toBe(ingredient);
    });

    expect(recipePhoto).toBeInTheDocument();
    expect(recipleTitle).toBeInTheDocument();
    expect(recipleTitle).toBeInTheDocument('Spicy Arrabiata Penne');
    expect(favoriteBtn).toBeInTheDocument();
    expect(startRecipeBtn).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(recipeCategory.innerHTML).toBe('Vegetarian');
    expect(recipeInstruction).toBeInTheDocument();
  });

  test('verifica se contem todos os elementos na tela de detalhes de bebida', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('drinks/178319');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    const recipePhoto = screen.getByTestId('recipe-photo');
    const recipleTitle = screen.getByTestId('recipe-title');
    const shareBtn = screen.getByTestId('share-btn');
    const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    const recipeCategory = screen.getByTestId('recipe-category');
    const recipeInstruction = screen.getByTestId('instructions');
    const favoriteBtn = screen.getByTestId('favorite-btn');

    const ingredientsAndMesures = [
      '2 oz of Hpnotiq',
      '1 oz of Pineapple Juice',
      '1 oz of Banana Liqueur'
    ];

    ingredientsAndMesures.forEach((ingredient, index) => {
      const getIngredientFromScreen = screen.getByTestId(
        `${index}-ingredient-name-and-measure`
      );
      expect(getIngredientFromScreen.innerHTML).toBe(ingredient);
    });

    expect(recipePhoto).toBeInTheDocument();
    expect(recipleTitle).toBeInTheDocument();
    expect(recipleTitle).toBeInTheDocument('Spicy Arrabiata Penne');
    expect(favoriteBtn).toBeInTheDocument();
    expect(startRecipeBtn).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(recipeCategory.innerHTML).toBe('Alcoholic');
    expect(recipeInstruction).toBeInTheDocument();
  });

  test('testa se ao clicar no botão de favoritos,', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('foods/52771');

    const favoriteBtn = screen.getByTestId('favorite-btn');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    expect(favoriteBtn.src).toBe('http://localhost/whiteHeartIcon.svg');
    userEvent.click(favoriteBtn);
    expect(favoriteBtn.src).toBe('http://localhost/blackHeartIcon.svg');
  });

  test('testa se ao recarregar a pagina continua como favorito,', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('foods/52771');

    const favoriteBtn = screen.getByTestId('favorite-btn');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    expect(favoriteBtn.src).toBe('http://localhost/blackHeartIcon.svg');

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).toBeDefined();
  });

  test('se da pra adicionar mais de um favorito e se remover, remove do local storage', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('drinks/178319');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    const favoriteBtn = screen.getByTestId('favorite-btn');

    userEvent.click(favoriteBtn);

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    expect(favoriteRecipes).toEqual(listaDefavoritos);

    userEvent.click(favoriteBtn);

    const favoriteRecipesUpdated = JSON.parse(
      localStorage.getItem('favoriteRecipes')
    );

    expect(favoriteRecipesUpdated).toHaveLength(1);
  });

  test('testa se clicar em share, é copiado o link da receita', async () => {
    const { history } = renderWithRouter(<App />);
    document.execCommand = jest.fn().mockResolvedValue();
    history.push('drinks/178319');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    userEvent.click(screen.getByTestId('share-btn'));

    await new Promise(res => setTimeout(res, +'500'));
    expect(document.execCommand).toHaveBeenCalledWith('copy');

    const spanCopied = await waitFor(() => screen.findByText(/link copied!/i));
    await waitFor(() => expect(spanCopied).toBeInTheDocument());

    await new Promise(res => setTimeout(res, 3000));
    expect(spanCopied).not.toBeInTheDocument();
  });

  test('se clicar em start recipes redireciona para recipe-in-progress', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('foods/52771');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    expect(screen.getByTestId('start-recipe-btn').innerHTML).toBe(
      'Start Recipe'
    );
    userEvent.click(screen.getByTestId('start-recipe-btn'));
    expect(history.location.pathname).toBe('/foods/52771/in-progress');
  });
  test('se entrar em detalhes de uma comida, e ja estiver em andamento aparece o botao continuar receita', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('foods/52771');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    expect(screen.getByTestId('start-recipe-btn').innerHTML).toBe(
      'Continue Recipe'
    );
  });
  test('se entrar em detalhes de uma bebida, e clicar no botao start recipe, é redirecionado para start recipe', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('drinks/17222');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    expect(screen.getByTestId('start-recipe-btn').innerHTML).toBe(
      'Start Recipe'
    );
    userEvent.click(screen.getByTestId('start-recipe-btn'));
    expect(
      Object.keys(JSON.parse(localStorage.getItem('inProgressRecipes')))
    ).toHaveLength(2);
  });

  test('se a receita estiver concluida, nao mostra o botão "Start recipe"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52771');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    const startRecipe = screen.getByTestId('start-recipe-btn');
    expect(startRecipe).toBeInTheDocument();

    localStorage.doneRecipes = JSON.stringify(
      [
        {
          alcoholicOrNot: '',
          category: 'Vegetarian',
          doneDate: '22/6/2022',
          id: '52771',
          image:
            'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
          name: 'Spicy Arrabiata Penne',
          nationality: 'Italian',
          tags: ['Pasta', 'Curry'],
          type: 'food',
        }
      ]
    )

    history.push('/foods');
    history.push('/foods/52771')
    await waitFor(()=>expect(startRecipe).not.toBeInTheDocument());
  });
});
