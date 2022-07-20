import React from 'react';
import { getByTestId, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mealCategories from './mocks/mealCategories';
import mockFetch from './mocks/fecthControl';
import drinksCategories from './mocks/drinksCategories';
import meals from './mocks/mealsMock';
import chickenMeals from './mocks/chickenMock';
import {beefMealsNerfed, mealsNerfed} from './mocks/fecthMockSmall';
import beefMeals from './mocks/beefMock';
import mockSmallFetch from './mocks/fecthMockSmall';

describe('testando a tela de receitas em proguesso', ()=>{   
    it('verifica elementos de uma receita de comida',async ()=>{
        global.fetch = jest.fn().mockImplementation(mockFetch);
        const { history } = renderWithRouter(<App />);
        
        history.push('foods/52977/in-progress');
        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
        
        expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
        expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
        expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
        expect(screen.getByRole('list').length).toBe(8);
        console.log(screen.getByRole('list').in);
    })
})