import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function FavoriteRecipes(props) {
  const getFavorites = () => {
    if (localStorage.favoriteRecipes) {
      return JSON.parse(localStorage.getItem('favoriteRecipes'));
    }
    return [];
  };
  const setPopUpInit = () => {
    const favList = getFavorites();
    return favList.reduce((acc, item) => {
      acc[item.id] = false;
      return acc;
    }, {});
  };
  const { history } = props;
  const [data, setData] = useState(getFavorites());
  const [popUp, setPopUp] = useState(setPopUpInit());

  const popUpUpdate = () => {
    const favList = getFavorites();
    const newPopUpList = Object.entries(popUp).reduce((acc, item) => {
      if (favList.some((recipe) => recipe.id === item[0])) {
        const [id, value] = item;
        acc[id] = value;
        return acc;
      }
      return acc;
    }, {});
    setPopUp(newPopUpList);
  };

  let timerID = null;

  useEffect(() => {
    clearTimeout(timerID);
  }, []);

  const popUpMessage = (id) => {
    let timeOutId = null;
    if (timerID === null) {
      setPopUp({ ...popUp, [id]: true });
      timeOutId = setTimeout(() => {
        timerID = null;
        setPopUp({ ...popUp, [id]: false });
      }, +'500');
    }
    timerID = timeOutId;
  };

  function favorite(e) {
    const id = e.target.alt;
    const favList = JSON.parse(localStorage.getItem('favoriteRecipes'))
      .filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favList]));
    setData([...favList]);
    popUpUpdate();
  }

  function filterType(type) {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return favoriteRecipes.filter((recipe) => recipe.type === type);
  }

  function filteredAll() {
    return JSON.parse(localStorage.getItem('favoriteRecipes'));
  }

  // const shareHandle = async () => {
  //   const treatedHREF = window.location.href.split('/in-progress')[0];
  //   copy(treatedHREF);
  //   setPopUp(true);
  //   timerID = setTimeout(() => {
  //     setPopUp(false);
  //   }, +'2000');
  // };

  if (data.length <= 0) {
    return (
      <div>
        <p>No Favorite Recipes...</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Favorite Recipes</h2>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setData(filteredAll()) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setData(filterType('food')) }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setData(filterType('drink')) }
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
                onClick={ async () => {
                  copy(`${window.location.href
                    .split('/favorite-recipes')[0]}/${item.type}s/${item.id}`);
                  popUpMessage(item.id);
                  clearTimeout(timerID);
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
                popUp[item.id] && (
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
                src={ blackHeartIcon }
                alt={ item.id }
                width="17px"
                value={ item.id }
              />
            </button>
            <span
              data-testid={ `${index}-horizontal-top-text` }
            >
              { item.type === 'food'
                ? `${item.nationality} - ${item.category}`
                : `${item.alcoholicOrNot} - ${item.category}` }
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
