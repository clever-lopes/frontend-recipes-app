import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Login({ history }) {
  const [login, setLogin] = useState({email:'', password:''});
  const {email, password} = login;

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
    setLogin((old)=>({...old, [name]:value }) );
  };

  return (
    <form>
      <label htmlFor="emailLogin">
        <input
          id="emailLogin"
          type="email"
          name="email"
          value={ email }
          data-testid="email-input"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="passwordLogin">
        <input
          id="passwordLogin"
          type="password"
          name="password"
          value={ password }
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
