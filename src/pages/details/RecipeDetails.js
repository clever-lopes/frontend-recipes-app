import React, { useState, useEffect } from 'react';
import mealAPI from '../../services/mealAPI';
import drinkAPI from '../../services/drinkAPI';

export default function RecipeDetails(props) {
  const [foodObject, setFoodObject] = useState({
    DrinkThumb: '',
    Drink: '',
    Alcoholic: '',
    ingredients: [],
    Instructions: '',
  });
  const [recomendation, setRecomendation] = useState([]);
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
      //}
      // console.log(drink)
      const result = await drinkAPI.getById(id);
      // console.log(result);
      setFoodObject(result);
    };
    firstCall();
    
  }, []);

  useEffect(() => {
    const recomend = async () => {
      // if (page === 'foods') {
      //   const result = await drinkAPI.recommendationsDrinks();
      //   setRecomendation(result);
      // } else {
      //   const result = await drinkAPI.recommendationsMeals();
      //   setRecomendation(result);
      // }
      const result = await mealAPI.name('');
      console.log(result);
      setRecomendation(result);
      console.log(recomendation);
    };
    recomend();
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
         {/* <RecipeCard data-testid={`${index}-recomendation-card`}/> */}
      {/* </div> */}
        <div>
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
          <ul >
            {
              foodObject.ingredients.map((item, index) => (
                <li
                  key={ index }
                  data-testid={`${index}-ingredient-name-and-measure`}
                > 
                  { ` ${item.measure} of ${item.ingredient} ` }
                </li>
              ))
            }
          </ul>
          <p data-testid="instructions"> { foodObject.Instructions }</p>
          {/* <RecipeCard data-testid={`${index}-recomendation-card`}/> */}
          { recomendation.map((item, index) => (
            <div key={index} data-testid={`${index}-recomendation-card`}>
              <img
                src={ item.MealThumb }
                alt={ item.Meal }
              />
              <p>{ item.Category }</p>
              <h5>{ item.Meal }</h5>
            </div>
            )
          )}
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
