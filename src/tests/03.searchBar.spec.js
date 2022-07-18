import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import soups_mock from './mocks/nome';

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
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(soups_mock)
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
        
        await waitFor(()=> expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=soup'));
        // expect(global.fetch).toBeCalledWith('');
    });
})
