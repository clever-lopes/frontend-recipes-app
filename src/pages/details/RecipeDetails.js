import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import mealAPI from '../../services/mealAPI';
import drinkAPI from '../../services/drinkAPI';
import Carousel from './components/Carousel';

export default function RecipeDetails(props) {
  const [recommendation, setRecommendation] = useState([]);
  const [foodObject, setFoodObject] = useState({
    DrinkThumb: '',
    Drink: '',
    Alcoholic: '',
    ingredients: [],
    Instructions: '',
  });
  const { match: { params: { id } } } = props;
  // console.log(id);

  useEffect(() => {
    const firstCall = async () => {
      // if (page === 'foods') {
      // const result = await mealAPI.getById(id);
      // setFoodObject(result);
      // } else {
      // const result = await drinkAPI.getById(id);
      // setFoodObject(result);
      // }
      // console.log(drink)
      const result = await drinkAPI.getById(id);
      // console.log(result);
      setFoodObject(result);
    };
    firstCall();
  }, []);

  useEffect(() => {
    const recommend = async () => {
      // if (page === 'foods') {
      //   const result = await drinkAPI.recommendationsDrinks();
      //   setRecomendation(result);
      // } else {
      //   const result = await drinkAPI.recommendationsMeals();
      //   setRecomendation(result);
      // }
      const result = await mealAPI.name('');
      console.log(result);
      setRecommendation(result);
      console.log(recommendation);
    };
    recommend();
  }, []);

  return (
    <div>
      <p>Olá mundo</p>
      {/* { console.log(foodObject) } */}
      {/* <div>
        <img
          src={ foodObject.MealThumb }
          alt={ foodObject.Meal }
          data-testid="recipe-photo"
        />
        <h3
          data-testid="recipe-title"
        >
          { foodObject.Meal }
        </h3>
        <p data-testid="recipe-category">{ foodObject.Category }</p>
          <ul >
            {
              foodObject.ingredients.map((item, index) => (
                <li
                  key={ index }
                  data-testid={`${index}-ingredient-name-and-measure`}
                >
                  { item }
                </li>
              ))
            }
         </ul>
         <p data-testid="instructions"> { foodObject.Instructions }</p>
         <iframe width="420" height="315" data-testid="video"
            src={ foodObject.Youtube }>
         </iframe>
         {/* <Carousel /> */}
      {/* </div> */}
      <div style={ {
        display: 'flex',
        flexDirection: 'column',
        width: '250px',
      } }
      >
        <img
          width="250px"
          src={ foodObject.DrinkThumb }
          alt={ foodObject.Drink }
          data-testid="recipe-photo"
        />
        <h3
          data-testid="recipe-title"
        >
          { foodObject.Drink }
        </h3>
        <p data-testid="recipe-category">{ foodObject.Alcoholic }</p>
        <ul>
          {
            foodObject.ingredients.map((item, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { ` ${item.measure} of ${item.ingredient} ` }
              </li>
            ))
          }
        </ul>
        <p data-testid="instructions">{ foodObject.Instructions }</p>
        <div style={{
          backgroundColor: 'green',
        }}>
          <Carousel recommendation={ recommendation } />
        </div>
      </div>
      <div>
        <button
          type="button"
          data-testid="start-recipe-btn"
        >
          Start Recipe
        </button>
      </div>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
