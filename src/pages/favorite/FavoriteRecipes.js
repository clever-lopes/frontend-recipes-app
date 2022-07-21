import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function FavoriteRecipes(props) {
  const { history } = props;
  const [data, setData] = useState([]);
  const [heartImg, setHeartImg] = useState(blackHeartIcon);
  const [popUp, setPopUp] = useState(false);
  console.log(location)

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(favoriteRecipes);
    setData(favoriteRecipes);
    console.log(data);
  }, []);

  function favorite(e) {
    const id = e.target.alt;
    if (heartImg === blackHeartIcon) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newFavoriteRecipes = favoriteRecipes
        .filter((recipe) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      setHeartImg(whiteHeartIcon);
    } else {
      setHeartImg(blackHeartIcon);
    }
    setHeartImg(blackHeartIcon);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setData(favoriteRecipes);
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

  // const shareHandle = async () => {
  //   const treatedHREF = window.location.href.split('/in-progress')[0];
  //   copy(treatedHREF);
  //   setPopUp(true);
  //   timerID = setTimeout(() => {
  //     setPopUp(false);
  //   }, +'2000');
  // };

  let timerID;

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
            <button
              type="button"
              onClick={ () => history.push(`/${item.type}s/${item.id}`) }
              style={ {
                border: 'none',
                background: 'transparent',
              } }
            >
              <img
                width="250px"
                src={ item.image }
                alt={ item.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </button>
            <div>
              <button
                type="button"
                style={ {
                  border: 'none',
                  background: 'transparent',
                } }
                onClick={ async() => {
                  copy(`${window.location.href.split('/favorite-recipes')[0]}/${item.type}s/${item.id}`);
                  setPopUp(true);
                  timerID = setTimeout(() => {
                    setPopUp(false);
                  }, +'2000');
                } }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="share"
                  width="17px"
                />
              </button>
              {
                popUp && (
                  <span>Link copied!</span>
                )
              }
            </div>
            <button
              type="button"
              style={ {
                border: 'none',
                background: 'transparent',
              } }
              value={ item.id }
              onClick={ favorite }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ heartImg }
                alt={ item.id }
                width="17px"
                value={ item.id }
              />
            </button>
            <span
              data-testid={ `${index}-horizontal-top-text` }
            >
              { item.type === 'food' ? 
              `${item.nationality} - ${item.category}` : `${item.alcoholicOrNot} - ${item.category}` }
            </span>
            <button
              type="button"
              onClick={ () => history.push(`/${item.type}s/${item.id}`) }
              style={ {
                border: 'none',
                background: 'transparent',
              } }
            >
              <h3
                data-testid={ `${index}-horizontal-name` }
              >
                { item.name }
              </h3>
            </button>
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
