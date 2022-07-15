import React, { useState, useEffect } from 'react';
import mealAPI from '../../services/mealAPI';
import drinkAPI from '../../services/drinkAPI'

export default function RecipeDetails(props) {
  const [foodObject, setFoodObject] = useState({
    DrinkThumb: '',
    Drink: '',
    Alcoholic: '',
    ingredients: [],
    Instructions: '',
  });
  const { match: { params: { id } } } = props;
  console.log(id)
  
  useEffect(() => {
    const firstCall = async () => {
      // if (page === 'foods') {
      //   setFoodObject(await mealAPI.getById(id));
      // } else {
      //}
      // console.log(drink)
      const result = await drinkAPI.getById(id);
      console.log(result);
      setFoodObject(result);
    };
    firstCall();
    
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
         <p data-testid="instructions"> { foodObject.Instructions }</p> */}
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
      </div> 
    </div>  
  );
}
