import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import mealAPI from '../../services/mealAPI';
import drinkAPI from '../../services/drinkAPI';
import NotFound from '../notFound';
import './CSS/Progress.css';

export default function Progress() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const params = pathname.split('/').filter((item) => item);
  const [page, id] = params;
  const funcMap = page === 'foods' ? mealAPI : drinkAPI;
  const [progressState, setProgressState] = useState({
    prodInfo: {},
    checkList: [],
  });
  const { prodInfo, checkList } = progressState;

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
  }, []);

  const addItem = (item) => {
    let progress;
    if (localStorage.progressRecipes) {
      progress = JSON.parse(localStorage.getItem('progressRecipes'));
      if (progress.some((position) => position.id === id)) {
        progress = progress.map((position) => {
          if (position.id === id) {
            return {
              id,
              progress: [...position.progress, item],
            };
          }
          return position;
        });
      } else {
        progress = [...progress, {
          id,
          progress: [item],
        }];
      }
      localStorage.setItem('progressRecipes', JSON.stringify(progress));
    } else {
      progress = [
        {
          id,
          progress: [item],
        },
      ];
      localStorage.setItem('progressRecipes', JSON.stringify(progress));
    }
  };

  const checkHandle = ({ target: { value } }) => {
    if (checkList.includes(value)) {
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
