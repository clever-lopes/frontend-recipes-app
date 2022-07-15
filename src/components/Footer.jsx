import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer
      data-testid="footer"
    >
      <button
        type="button"
        data-testid="drinks-bottom-btn"
      >
        <img src={ drinkIcon } alt="drinkIcon" />
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
      >
        <img src={ mealIcon } alt="mealIcon" />
      </button>
    </footer>
  );
}
