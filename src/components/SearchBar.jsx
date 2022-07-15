import React from 'react';

export default function SearchBar() {
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
