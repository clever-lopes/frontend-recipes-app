import React from 'react';
import propTypes from 'prop-types';

function filteredAll(target) {
  return JSON.parse(localStorage.getItem(target));
}

export default function FilterButtonAll(props) {
  const { setState, target } = props;
  return (
    <button
      type="button"
      data-testid="filter-by-all-btn"
      onClick={ () => setState(filteredAll(target)) }
    >
      All
    </button>
  );
}

FilterButtonAll.propTypes = {
  setState: propTypes.func.isRequired,
  target: propTypes.string.isRequired,
};
