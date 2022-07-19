import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mealCategories from './mocks/mealCategories';
import mockFetch from './mocks/fecthControl';
import drinksCategories from './mocks/drinksCategories';


describe('teste da pagina recipes',()=>{
    test('se renderiza as 5 primeiras categorias de comidas',async()=>{
        const {history} = renderWithRouter(<App />)
        global.fetch = mockFetch;
        history.push('/foods')

        mealCategories.meals.slice(0, 5).forEach(async ({ strCategory: category })=>{
           await waitFor(()=> expect(screen.getByTestId(`${category}-category-filter`)).toBeInTheDocument());
        });
        expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
    });
    test('se renderiza as 5 primeiras categorias de bebidas',async()=>{
        const {history} = renderWithRouter(<App />)
        global.fetch = mockFetch;
        history.push('/drinks')

        drinksCategories.drinks.slice(0, 5).forEach(async ({ strCategory: category })=>{
           await waitFor(()=> expect(screen.getByTestId(`${category}-category-filter`)).toBeInTheDocument());
        });
        expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();

    });

})