import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import mealAPI from '../../services/mealAPI';
import drinkAPI from '../../services/drinkAPI';
import NotFound from '../notFound';

export default function Progress() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const params = pathname.split('/').filter((item) => item);
  const [page, id] = params;
  const funcMap = page === 'foods' ? mealAPI : drinkAPI;
  const [progressState, setProgressState] = useState({
    prodInfo: {},
  });
  const { prodInfo } = progressState;

  useEffect(() => {
    const callRecipe = async () => {
      const response = await funcMap.getById(id);
      if (response) {
        setProgressState({ ...progressState, prodInfo: response });
      } else {
        setProgressState({ ...progressState, prodInfo: 'notFound' });
      }
    };
    callRecipe();
  }, []);

  if (prodInfo === 'notFound') {
    return <NotFound />;
  }

  return (
    <div>
      <div>
        <h1>{ prodInfo.Meal || prodInfo.Drink }</h1>
      </div>
      <div>
        <img
          src={ prodInfo.MealThumb || prodInfo.DrinkThumb }
          alt={ prodInfo.Meal || prodInfo.Drink }
        />
      </div>
      <div>
        {
          prodInfo.Alcoholic
            ? (
              <div>
                <p>{ prodInfo.Alcoholic }</p>
              </div>
            )
            : (
              <div>
                <p>{ prodInfo.Category }</p>
              </div>
            )
        }
      </div>
    </div>
  );
}
