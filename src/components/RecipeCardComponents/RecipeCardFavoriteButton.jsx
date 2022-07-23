import React from 'react';
import propTypes from 'prop-types';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
// import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { popUpUpdate } from './RecipeCardShareButton';

const unFavorite = (id, setState, popUp, setPopUp) => {
  const favList = JSON.parse(localStorage.getItem('favoriteRecipes'))
    .filter((item) => item.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify([...favList]));
  setState([...favList]);
  popUpUpdate(popUp, setPopUp);
};

export default function RecipeCardFavoriteButton(props) {
  const { id, index, setState, popUp, setPopUp, isFavorite } = props;
  return (
    <button
      type="button"
      style={ {
        border: 'none',
        background: 'transparent',
      } }
      value={ id }
      onClick={ () => unFavorite(id, setState, popUp, setPopUp) }
    >
      <img
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ isFavorite && blackHeartIcon }
        alt={ id }
        width="17px"
        value={ id }
      />
    </button>
  );
}

RecipeCardFavoriteButton.propTypes = {
  id: propTypes.string.isRequired,
  setState: propTypes.func.isRequired,
  index: propTypes.number.isRequired,
  popUp: propTypes.shape({}).isRequired,
  setPopUp: propTypes.func.isRequired,
  isFavorite: propTypes.bool.isRequired,
};
