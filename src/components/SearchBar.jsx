// Start

// {showSearchIcon
//   && (
//     <button
//       type="button"
//       onClick={ () => setShowInoutSearch(!showInputSearch) }
//     >
//       <img
//         src={ searchIcon }
//         alt="searchIcon"
//         data-testid="search-top-btn"
//       />
//     </button>
//   )}
//   {showInputSearch && <SearchBar />}

import React, { useEffect, useContext, useState } from 'react';
import propTypes from 'prop-types';
import mealAPI from '../services/mealAPI';
import drinkAPI from '../services/drinkAPI';
import { AppContext } from '../store';
import searchIcon from '../images/searchIcon.svg';

export default function SearchBar(props) {
  const { changeContext } = useContext(AppContext);
  const [searchState, setSearchState] = useState({ showSearch: false });
  const { history } = props;
  const { location: { pathname } } = history;

  const { showSearch } = searchState;

  useEffect(() => {
    const firstCall = async () => {
      let productList = null;
      if (pathname === '/foods') {
        productList = await mealAPI.name('');
      } else {
        productList = await drinkAPI.name('');
      }
      console.log(productList);
      changeContext({
        key: 'productList',
        info: productList.slice(0, +'12'),
      });
    };
    firstCall();
  }, []);

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={ () => setSearchState({ showSearch: !showSearch }) }
        >
          <img
            src={ searchIcon }
            alt="searchIcon"
            data-testid="search-top-btn"
          />
        </button>
        { showSearch && (
          <input type="text" data-testid="search-input" placeholder="pesquisar" />
        ) }
      </div>
      {showSearch && (
        <div>
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
      )}
    </div>
  );
}

SearchBar.propTypes = {
  history: propTypes.shape({
    location: propTypes.shape({
      pathname: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
