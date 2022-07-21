import React from 'react';
import propTypes from 'prop-types';
import createTitle from '../helpers/createTitle';

function filterType(type, target) {
  const favoriteRecipes = JSON.parse(localStorage.getItem(target));
  return favoriteRecipes.filter((recipe) => recipe.type === type);
}

export default function FilterButtonType(props) {
  const { type, setState, target } = props;
  return (
    <button
      type="button"
      data-testid={ `filter-by-${type}-btn` }
      onClick={ () => setState(filterType(type, target)) }
    >
      {createTitle(type)}
    </button>
  );
}

FilterButtonType.propTypes = {
  type: propTypes.string.isRequired,
  setState: propTypes.func.isRequired,
  target: propTypes.string.isRequired,
};
