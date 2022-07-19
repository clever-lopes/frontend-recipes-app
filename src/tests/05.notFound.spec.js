import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste da pagina "Drinks"', () => {
  test('se contém os elementos', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pathnameerrado');
    expect(screen.getByRole('heading', {  name: /página não encontrada/i})).toBeInTheDocument();
    
});
});