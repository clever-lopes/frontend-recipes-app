import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import mealAPI from '../services/mealAPI';
import drinkAPI from '../services/drinkAPI';
import { AppContext } from '../store';
import searchIcon from '../images/searchIcon.svg';

export default function SearchBar(props) {
  const { changeContext } = useContext(AppContext);
  const [searchState, setSearchState] = useState({
    showSearch: false,
    searchType: '',
    searchInput: '',
  });
  const { searchType, searchInput, showSearch } = searchState;
  const history = useHistory();
  const { location: { pathname } } = history;
  const { currentPage } = props;

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

  const handleChange = ({ target: { name, value } }) => {
    if (value) {
      setSearchState({ ...searchState, [name]: value });
    }
  };

  const readsSearch = () => {
    const searchMap = {
      foods: mealAPI,
      drinks: drinkAPI,
    };
    switch (searchType) {
    case 'byIngredient':
      return searchMap[currentPage].filterByIngredient(searchInput);
    case 'byName':
      return searchMap[currentPage].name(searchInput);
    default:
      return searchMap[currentPage].firstLetter(searchInput);
    }
  };

  const searchRecipe = async () => {
    changeContext({
      key: 'productList',
      info: await readsSearch(),
    });
  };

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={ () => setSearchState({ ...searchState, showSearch: !showSearch }) }
        >
          <img
            src={ searchIcon }
            alt="searchIcon"
            data-testid="search-top-btn"
          />
        </button>
        { showSearch && (
          <input
            type="text"
            data-testid="search-input"
            placeholder="pesquisar"
            name="searchInput"
            value={ searchInput }
            onChange={ handleChange }
          />
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
              onChange={ handleChange }
              value="byIngredient"
              checked={ searchType === 'byIngredient' }
            />
          </label>
          <label htmlFor="nameSearch">
            Name
            <input
              type="radio"
              id="nameSearch"
              name="searchType"
              data-testid="name-search-radio"
              onChange={ handleChange }
              value="byName"
              checked={ searchType === 'byName' }
            />
          </label>
          <label htmlFor="firstLetterSearch">
            First Letter
            <input
              type="radio"
              id="firstLetterSearch"
              name="searchType"
              data-testid="first-letter-search-radio"
              onChange={ (e) => {
                if (searchInput.length <= 1) {
                  handleChange(e);
                } else {
                  global.alert('Your search must have only 1 (one) character');
                }
              } }
              value="byLetter"
              checked={ searchType === 'byLetter' }
            />
          </label>
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ searchRecipe }
          >
            Search
          </button>
        </div>
      )}
    </div>
  );
}

SearchBar.propTypes = {
  currentPage: propTypes.string.isRequired,
};
