import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testes da pagina de Login', () => {
    test('verificar a renderização dos elementos', () => {
        renderWithRouter(<App />);

        const inputEmail = screen.getByTestId('email-input');
        const inputPassword = screen.getByTestId('password-input');
        const loginSubmitBtn = screen.getByTestId('login-submit-btn');

        expect(inputEmail).toBeInTheDocument();
        expect(inputPassword).toBeInTheDocument();
        expect(loginSubmitBtn).toBeInTheDocument();
    })

     test('verifica a habilitação do botão', () => {
        renderWithRouter(<App />);

        const inputEmail = screen.getByTestId('email-input');
        const inputPassword = screen.getByTestId('password-input');
        const loginSubmitBtn = screen.getByTestId('login-submit-btn');

        userEvent.type(inputEmail, 'trybetrybe.com');
        userEvent.type(inputPassword, 'impo');
      
        expect(loginSubmitBtn).toBeDisabled();
    });

    test('verifica a habilitação do botão', () => {
        renderWithRouter(<App />);

        const inputEmail = screen.getByTestId('email-input');
        const inputPassword = screen.getByTestId('password-input');
        const loginSubmitBtn = screen.getByTestId('login-submit-btn');

        userEvent.type(inputEmail, 'tryber@trybe.com');
        userEvent.type(inputPassword, 'impossible123');
        expect(loginSubmitBtn).not.toBeDisabled();
    });

    test('verifica se foi redirecionado', () => {
        const { history } = renderWithRouter(<App />);
        
        const inputEmail = screen.getByTestId('email-input');
        const inputPassword = screen.getByTestId('password-input');
        const loginSubmitBtn = screen.getByTestId('login-submit-btn');
        
        userEvent.type(inputEmail, 'tryber@trybe.com');
        userEvent.type(inputPassword, 'impossible123');
        userEvent.click(loginSubmitBtn);
        
        const { pathname } = history.location;

        expect(pathname).toBe('/foods')
    });
});
