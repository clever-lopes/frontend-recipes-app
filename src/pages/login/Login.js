import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkLogin = () => {
    const testEmail = /\S+@\S+\.\S+/;
    const numberMin = 6;
    const result = !((testEmail.test(email) && password.length > numberMin));

    return result;
  };

  const onLoginBtnClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/foods');
  };

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
    case 'email-input': setEmail(value);
      break;
    case 'password-input': setPassword(value);
      break;
    default: break;
    }
  };

  return (
    <form>
      <label htmlFor="emailLogin">
        <input
          id="emailLogin"
          type="email"
          name="email-input"
          data-testid="email-input"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="passwordLogin">
        <input
          id="passwordLogin"
          type="password"
          name="password-input"
          data-testid="password-input"
          onChange={ handleChange }
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        onClick={ onLoginBtnClick }
        disabled={ checkLogin() }
      >
        Entrar
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};
