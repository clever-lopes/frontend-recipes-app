import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import MEAL_BY_NAME from './mocks/MealByNome';
import MEAL_BY_LETTER from './mocks/mealByLetter';
import MEAL_BY_IGREDIENTE from './mocks/mealByIgrediente';
import CORBA from './mocks/corba';
import A1_DRINK from './mocks/a1Drink';

describe('teste do componente barra de pesquisa', () => {
    test('se contém todos os elementos necessarios para a pesquisa',()=>{
        const { history } =  renderWithRouter(<App />);
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
    test('Se o radio selecionado for Name, a busca na API é feita corretamente pelo nome',async()=>{
        
        const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=soup';
        
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(MEAL_BY_NAME)
        });

        const { history } =  renderWithRouter(<App />);
        history.push('/foods');
      
        const iconSearchBar = screen.getByTestId('search-top-btn');
        userEvent.click(iconSearchBar);
        
        const searchInput = screen.getByTestId('search-input');
        const nameRadio = screen.getByTestId('name-search-radio');
        const searchbtn = screen.getByTestId('exec-search-btn');
        
        userEvent.type(searchInput,'soup');
        userEvent.click(nameRadio);
        userEvent.click(searchbtn);
        
        await waitFor(()=> expect(global.fetch).toHaveBeenCalledWith(endpoint));
        
    });
    test('Se o radio selecionado for First letter, a busca na API é feita corretamente pelo primeira letra', async()=>{
    
        const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';
    
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(MEAL_BY_LETTER)
        });

        const { history } =  renderWithRouter(<App />);
        history.push('/foods');

        const iconSearchBar = screen.getByTestId('search-top-btn');
        userEvent.click(iconSearchBar);

        const searchInput = screen.getByTestId('search-input');
        const letterRadio = screen.getByTestId('first-letter-search-radio');
        const searchbtn = screen.getByTestId('exec-search-btn');
        
        userEvent.type(searchInput,'a');
        userEvent.click(letterRadio);
        userEvent.click(searchbtn);
        
        await waitFor(()=> expect(global.fetch).toHaveBeenCalledWith(endpoint));
    });

    test('Se o radio selecionado for First letter e a busca na API for feita com mais de uma letra, deve-se exibir um alert', async()=>{
    
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue({meals: null})
        });

        window.alert = jest.fn();
        const { history } =  renderWithRouter(<App />);
        history.push('/foods');

        const iconSearchBar = screen.getByTestId('search-top-btn');
        userEvent.click(iconSearchBar);

        const searchInput = screen.getByTestId('search-input');
        const letterRadio = screen.getByTestId('first-letter-search-radio');
        const searchbtn = screen.getByTestId('exec-search-btn');
        
        userEvent.type(searchInput,'aaa');
        userEvent.click(letterRadio);
        userEvent.click(searchbtn);
        
        expect(window.alert).toBeCalled();
    });

    test('Se o radio selecionado for Igredientes, a busca na API é feita corretamente pelo igrediente', async()=>{
    
        const endpoint = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken';
    
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(MEAL_BY_IGREDIENTE)
        });

        const { history } =  renderWithRouter(<App />);
        history.push('/foods');

        const iconSearchBar = screen.getByTestId('search-top-btn');
        userEvent.click(iconSearchBar);

        const searchInput = screen.getByTestId('search-input');
        const ingredientRadio = screen.getByTestId('ingredient-search-radio');
        const searchbtn = screen.getByTestId('exec-search-btn');
        
        userEvent.type(searchInput,'chicken');
        userEvent.click(ingredientRadio);
        userEvent.click(searchbtn);
        
        await waitFor(()=> expect(global.fetch).toHaveBeenCalledWith(endpoint));
    });
    test('Se não encontrar nenhuma receita por nome deve-se exibir um alert', async()=>{
    
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue({meals: null})
        });

        window.alert = jest.fn();
        const { history } =  renderWithRouter(<App />);
        history.push('/foods');

        const iconSearchBar = screen.getByTestId('search-top-btn');
        userEvent.click(iconSearchBar);

        const searchInput = screen.getByTestId('search-input');
        const nameRadio = screen.getByTestId('name-search-radio');
        const searchbtn = screen.getByTestId('exec-search-btn');
        
        userEvent.type(searchInput,'comidainexistente');
        userEvent.click(nameRadio);
        userEvent.click(searchbtn);

        await waitFor( ()=> expect(window.alert).toBeCalled());
    });
    test('Se não encontrar nenhuma receita por ingrediente deve-se exibir um alert', async()=>{
    
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue({meals: null})
        });

        window.alert = jest.fn();
        const { history } =  renderWithRouter(<App />);
        history.push('/foods');

        const iconSearchBar = screen.getByTestId('search-top-btn');
        userEvent.click(iconSearchBar);

        const searchInput = screen.getByTestId('search-input');
        const ingredientRadio = screen.getByTestId('ingredient-search-radio');
        const searchbtn = screen.getByTestId('exec-search-btn');
        
        userEvent.type(searchInput,'igrediente inexistente');
        userEvent.click(ingredientRadio);
        userEvent.click(searchbtn);
        
       await waitFor( ()=> expect(window.alert).toBeCalled());
    });
    test('Se apesquisa  uma comida por nome retornar só uma receita redireciona para "/foods/{id}" ',async()=>{
               
        const { history } =  renderWithRouter(<App />);
        history.push('/foods');
        const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Corba';
        
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(CORBA)
        });

      
        const iconSearchBar = screen.getByTestId('search-top-btn');
        userEvent.click(iconSearchBar);
        
        const searchInput = screen.getByTestId('search-input');
        const nameRadio = screen.getByTestId('name-search-radio');
        const searchbtn = screen.getByTestId('exec-search-btn');
        
        userEvent.type(searchInput,'Corba');
        userEvent.click(nameRadio);
        userEvent.click(searchbtn);
        await waitFor(()=> expect(global.fetch).toHaveBeenCalledWith(endpoint));
        await waitFor(()=> expect(history.location.pathname).toBe('/foods/52977'));
    })
    test('Se apesquisa por uma bebida por nome retornar só uma receita redireciona para "/drinks/{id}" ',async()=> {
               
        const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=A1';
        
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(A1_DRINK)
        });
      
        const { history } =  renderWithRouter(<App />);
        history.push('/drinks');
      
        const iconSearchBar = screen.getByTestId('search-top-btn');
        userEvent.click(iconSearchBar);
        
        const searchInput = screen.getByTestId('search-input');
        const nameRadio = screen.getByTestId('name-search-radio');
        const searchbtn = screen.getByTestId('exec-search-btn');

        userEvent.type(searchInput,'A1');
        userEvent.click(nameRadio);
        userEvent.click(searchbtn);
        
        await waitFor(()=> expect(global.fetch).toHaveBeenCalledWith(endpoint));
        await waitFor(()=> expect(history.location.pathname).toBe('/drinks/17222'));
    })
});
