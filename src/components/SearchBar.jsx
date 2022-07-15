// Start

import React, { useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import mealAPI from '../services/mealAPI';
import drinkAPI from '../services/drinkAPI';
import { AppContext } from '../store';

export default function SearchBar(props) {
  const { changeContext } = useContext(AppContext);
  const { page } = props;
  useEffect(() => {
    const firstCall = () => {
      let productList = null;
      if (page === 'foods') {
        productList = mealAPI.name('');
      } else {
        productList = drinkAPI.name('');
      }
      changeContext({
        key: productList,
        info: productList.slice(0, +'12'),
      });
    };
    firstCall();
  }, []);
  return (
    <div>
      <input type="text" data-testid="search-input" placeholder="pesquisar" />
      <label htmlFor="ingredientSearch">
        Ingredient
        <input
          type="radio"
          id="ingredientSearch"
          name="searchType"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="nameSearch">
        Name
        <input
          type="radio"
          id="nameSearch"
          name="searchType"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="firstLetterSearch">
        First Letter
        <input
          type="radio"
          id="firstLetterSearch"
          name="searchType"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  page: propTypes.string.isRequired,
};
