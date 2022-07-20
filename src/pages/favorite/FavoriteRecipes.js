import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

export default function FavoriteRecipes(props) {
  const { history } = props;
  const [data, setData ] = useState([]);
  const [heartImg, setHeartImg] = useState(blackHeartIcon);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(favoriteRecipes);
    setData(favoriteRecipes);
    console.log(data)
  }, []);

  function onFavoriteBtnClick() {
    data.map((element) => {
      console.log(element)
      const { image, name, alcoholicOrNot, category, nationality, type, id } = element;
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      console.log(favoriteRecipes)

      if (favoriteRecipes) {
        const favoriteRecipesObj = [...favoriteRecipes, {
          id,
          type,
          nationality,
          category,
          alcoholicOrNot,
          name,
          image,
        }];
        if (heartImg === whiteHeartIcon) {
          localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesObj));
          setHeartImg(heartImg === whiteHeartIcon ? blackHeartIcon : whiteHeartIcon);
        }
        if (heartImg === blackHeartIcon) {
          const newFavoriteRecipes = favoriteRecipes
            .filter((recipe) => recipe.id !== id);
          localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
          setHeartImg(heartImg === whiteHeartIcon ? blackHeartIcon : whiteHeartIcon);
        }
      } else {
        const favoriteRecipesObj = [{
          id, type, nationality, category, alcoholicOrNot, name, image,
        }];
  
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesObj));
      }
      // setHeartImg(heartImg === whiteHeartIcon ? blackHeartIcon : whiteHeartIcon);
    })
  }

  function filteredFood() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const result = favoriteRecipes.filter((recipe) => recipe.type === 'food');
    // console.log(result)
    setData(result);
  }

  function filteredAll() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setData(favoriteRecipes);
  }

  function filteredDrink() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const result = favoriteRecipes.filter((recipe) => recipe.type === 'drink');
    // console.log(result)
    setData(result);
  }

  return (
    <div>
      <h2>Favorite Recipes</h2>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ filteredAll }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ filteredFood }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ filteredDrink }
        >
          Drinks
        </button>
      </div>
      <p>{ console.log(data) }</p>
      <div>
        { data.map((item, index) => (
          <div key={ index }>
            <img
              width="250px"
              src={ item.image }
              alt={ item.name }
              data-testid={ `${index}-horizontal-image` }
              onClick={ () => history.push(`/${item.type}s/${item.id}`) }
            />
            <button
              type="button"
              // data-testid={ `${index}-horizontal-share-btn` }
              style={ {
                border: 'none',
                background: 'transparent',
              } }
            >
              <img data-testid={ `${index}-horizontal-share-btn` } src={ shareIcon } alt="share" width="17px" />
            </button>
            <button
              data-testid={ `${index}-horizontal-favorite-btn` }
              type="button"
              style={ {
                border: 'none',
                background: 'transparent',
              } }
              onClick={ onFavoriteBtnClick }
            >
              <img
                data-testid="favorite-btn"
                src={ heartImg }
                alt="favorite"
                width="17px"
              />
            </button>
            <span
              data-testid={ `${index}-horizontal-top-text` }
            >
              { item.category }
            </span>
            <h5
              data-testid={ `${index}-horizontal-name` }
              onClick={ () => history.push(`/${item.type}s/${item.id}`) }
            >
              { item.name }
            </h5>
            {/* <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              { `Done in: ${item.data}` }
            </p> */}
            {/* {
              item.tags.map((tag, index) => {
                <span key={ index }>
                  { tag }
                </span>
              })
            } */}
          </div>
        ))}
      </div>
    </div>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape(
    PropTypes.func.isRequired,
  ).isRequired,
};
