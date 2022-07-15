import React from 'react';
import propTypes from 'prop-types';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer(props) {
  const { history } = props;
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
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
