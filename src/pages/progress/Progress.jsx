import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import mealAPI from '../../services/mealAPI';
import drinkAPI from '../../services/drinkAPI';
import NotFound from '../notFound';
import './CSS/Progress.css';

const copy = require('clipboard-copy');

export default function Progress() {
  const history = useHistory();
  const { location: { pathname, href } } = history;
  const params = pathname.split('/').filter((item) => item);
  const [page, id] = params;
  const funcMap = page === 'foods' ? mealAPI : drinkAPI;
  const type = page === 'foods' ? 'meals' : 'cocktails';
  const KEY_NAME = 'inProgressRecipes';

  const getProgress = () => {
    if (localStorage.inProgressRecipes) {
      const inProgress = JSON.parse(localStorage.getItem(KEY_NAME));
      if (inProgress[type]) {
        if (inProgress[type][id]) {
          return inProgress[type][id];
        }
        localStorage
          .setItem(KEY_NAME, JSON
            .stringify({ ...inProgress, [type]: { ...inProgress[type], [id]: [] } }));
        return [];
      }
      localStorage
        .setItem(KEY_NAME, JSON
          .stringify({ ...inProgress, [type]: { [id]: [] } }));
      return [];
    }
    localStorage
      .setItem(KEY_NAME, JSON
        .stringify({ [type]: { [id]: [] } }));
    return [];
  };

  const [progressState, setProgressState] = useState({
    prodInfo: {},
    checkList: getProgress(),
  });
  const { prodInfo, checkList } = progressState;

  useEffect(() => {
    const callRecipe = async () => {
      const response = await funcMap.getById(id);
      // console.log(response);
      if (response) {
        setProgressState({ ...progressState, prodInfo: response });
      } else {
        setProgressState({ ...progressState, prodInfo: 'notFound' });
      }
    };
    callRecipe();
  }, []);

  const addItem = (item) => {
    let progress = JSON.parse(localStorage.getItem(KEY_NAME));
    progress = {
      ...progress,
      [type]: { ...progress[type], [id]: [...progress[type][id], item] },
    };
    localStorage.setItem(KEY_NAME, JSON.stringify(progress));
  };

  const removeItem = (item) => {
    const progress = JSON.parse(localStorage.getItem(KEY_NAME));
    const filtered = progress[type][id].filter((ingredient) => ingredient !== item);
    const info = JSON
      .stringify({ ...progress, [type]: { ...progress[type], [id]: filtered } });
    localStorage
      .setItem(KEY_NAME, info);
  };

  const checkHandle = ({ target: { value } }) => {
    if (checkList.includes(value)) {
      removeItem(value);
      setProgressState({
        ...progressState,
        checkList: checkList.filter((item) => item !== value),
      });
    } else {
      addItem(value);
      setProgressState({
        ...progressState,
        checkList: [...checkList, value],
      });
    }
  };

  const timerID = null;
  const shareHandle = () => {
    const treatedHREF = href.split('/');
    copy(href);
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
        <button
          type="button"
          data-testid="share-btn"
        >
          share
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          favorite
        </button>
      </div>
      <div>
        <p
          data-testid="recipe-category"
        >
          {
            prodInfo.Alcoholic || prodInfo.Category
          }
        </p>
      </div>
      <div>
        <ul>
          {
            prodInfo.ingredients.map((item, i) => {
              const checked = checkList.includes(item.ingredient);
              return (
                <li
                  data-testid={ `${i}-ingredient-step` }
                  key={ `${item.ingredient}-${i}` }
                >
                  <label
                    htmlFor={ `${i}-ingredient-step-checkbox` }
                  >
                    <input
                      type="checkbox"
                      name="ingredient-step"
                      value={ item.ingredient }
                      onChange={ checkHandle }
                      id={ `${i}-ingredient-step-checkbox` }
                      checked={ checked }
                    />
                    <span
                      className={ `${checked ? 'checkedIngredient' : ''}` }
                    >
                      { `${item.measure} ${item.ingredient}` }
                    </span>
                  </label>
                </li>
              );
            })
          }
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
        >
          Finish
        </button>
      </div>
    </div>
  );
}
