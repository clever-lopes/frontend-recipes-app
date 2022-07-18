import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste da pagina "Drinks"', () => {
  test('se contém os elementos', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    
});
});