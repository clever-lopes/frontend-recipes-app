import React, { useContext } from 'react';
import { AppContext } from '../../../store';

export default function RecipeCards() {
  const { context } = useContext(AppContext);
  const { productList } = context;
  return (
    <div>
      {
        productList.map((product, index) => (
          <div key={ `data-testid="${index}-recipe-card"` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ product.MealThumb || product.DrinkThumb }
              alt={ product.Meal || product.Drink }
            />
            <div>
              <p
                data-testid={ `${index}-card-name` }
              >
                { product.Meal || product.Drink }
              </p>
              <div>
                <p>{ product.Area }</p>
                <p>{ product.Category }</p>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

RecipeCards.propTypes = {

};
