import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import mealAPI from '../../services/mealAPI';
import drinkAPI from '../../services/drinkAPI';
import NotFound from '../notFound';
import shareIcon from '../../images/shareIcon.svg';
import getProgress, { addItem, removeItem } from './getProgress';
import readsFavorite,
{ addFavorite, removeFavorite } from '../../components/helpers/readsfavorite';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import './CSS/Progress.css';
import IngredientsList from './IngredientsList';

const copy = require('clipboard-copy');

export default function Progress() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const params = pathname.split('/').filter((item) => item);
  const [page, id] = params;
  const funcMap = page === 'foods' ? mealAPI : drinkAPI;
  const type = page === 'foods' ? 'meals' : 'cocktails';
  const [progressState, setProgressState] = useState({
    prodInfo: {},
    checkList: getProgress(type, id),
    isFavorite: readsFavorite(id),
  });
  const [popUp, setPopUp] = useState(false);
  const { prodInfo, checkList, isFavorite } = progressState;
  let timerID = null;
  useEffect(() => {
    const callRecipe = async () => {
      const response = await funcMap.getById(id);
      console.log(response);
      if (response) {
        setProgressState({ ...progressState, prodInfo: response });
      } else {
        setProgressState({ ...progressState, prodInfo: 'notFound' });
      }
    };
    callRecipe();
    clearTimeout(timerID);
  }, []);
  const checkHandle = ({ target: { value } }) => {
    if (checkList.includes(value)) {
      removeItem(value, type, id);
      setProgressState({
        ...progressState,
        checkList: checkList.filter((item) => item !== value),
      });
    } else {
      addItem(value, type, id);
      setProgressState({
        ...progressState,
        checkList: [...checkList, value],
      });
    }
  };
  const shareHandle = async () => {
    const treatedHREF = window.location.href.split('/in-progress')[0];
    copy(treatedHREF);
    setPopUp(true);
    timerID = setTimeout(() => {
      setPopUp(false);
    }, +'1000');
  };
  const favoriteHandle = () => {
    if (isFavorite) removeFavorite(id);
    else addFavorite(prodInfo);
    setProgressState({ ...progressState, isFavorite: !progressState.isFavorite });
  };
  if (prodInfo === 'notFound') {
    return <NotFound />;
  }

  if (!prodInfo.Meal && !prodInfo.Drink) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div>
        <h1
          data-testid="recipe-title"
        >
          { prodInfo.Meal || prodInfo.Drink }
        </h1>
      </div>
      <div>
        <img
          src={ prodInfo.MealThumb || prodInfo.DrinkThumb }
          alt={ prodInfo.Meal || prodInfo.Drink }
          data-testid="recipe-photo"
        />
      </div>
      <div>
        <div>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ shareHandle }
            src={ shareIcon }
          >
            <img
              src={ shareIcon }
              alt="share icon"
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
          data-testid="favorite-btn"
          onClick={ favoriteHandle }
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        >
          <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="heart" />
        </button>
      </div>
      <div>
        <p data-testid="recipe-category">
          {prodInfo.Alcoholic || prodInfo.Category}
        </p>
      </div>
      <div>
        <ul>
          <IngredientsList
            ingredients={ prodInfo.ingredients }
            checkList={ checkList }
            checkHandle={ checkHandle }
          />
        </ul>
      </div>
      <div>
        <h2>Instructions</h2>
        <p
          data-testid="instructions"
        >
          { prodInfo.Instructions }
        </p>
      </div>
      <div>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ prodInfo.ingredients.length !== checkList.length }
          onClick={ () => history.push('/done-recipes') }
        >
          Finish
        </button>
      </div>
    </div>
  );
}
