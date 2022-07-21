import React from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function RecipeCardGoToButton(props) {
  const { index, type, id, itemName } = props;
  const history = useHistory();
  return (
    <button
      type="button"
      onClick={ () => history.push(`/${type}s/${id}`) }
      style={ {
        border: 'none',
        background: 'transparent',
      } }
    >
      <h3
        data-testid={ `${index}-horizontal-name` }
      >
        { itemName }
      </h3>
    </button>
  );
}

RecipeCardGoToButton.propTypes = {
  index: propTypes.number.isRequired,
  type: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  itemName: propTypes.string.isRequired,
};
