import React from 'react';
// import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
    >
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
      >
        <img src={ drinkIcon } alt="drinkIcon" />
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
        onClick={ () => history.push('/foods') }
      >
        <img src={ mealIcon } alt="mealIcon" />
      </button>
    </footer>
  );
}

Footer.propTypes = {

};
