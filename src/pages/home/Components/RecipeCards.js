import React, { useContext } from 'react';
import { AppContext } from '../../../store';
import '../CSS/RecipeCards.css';

export default function RecipeCards() {
  const { context } = useContext(AppContext);
  const { productList } = context;
  return (
    <div className="recipe-cards-container">
      {
        productList.map((product, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ product.idMeal || product.idDrink }
            className="recipe-card"
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ product.MealThumb || product.DrinkThumb }
              alt={ product.Meal || product.Drink }
              className="recipe-card-img"
            />
            <div className="recipe-card-text">
              <p
                data-testid={ `${index}-card-name` }
              >
                { product.Meal || product.Drink }
              </p>
              <div className="recipe-card-extra">
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
