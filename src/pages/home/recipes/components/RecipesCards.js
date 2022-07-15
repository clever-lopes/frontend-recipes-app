import React, { useContext } from 'react';
import AppContext from '../../../../store/index';

export default function RecipesCard(props) {
  const { context: { productList } } = useContext();
  const { isFood } = props.isFood;
  let list = [];
  if (isFood) {
    list = productList.map((item) => {
      const { Meal, MealThumb } = item;
      return [Meal, MealThumb];
    });
  } else {
    list = productList.map((item) => {
      const { Drink, DrinkThumb } = item;
      return [Drink, DrinkThumb];
    });
  }
  return (
    list.map((element, index) => {
      const [name, thumb] = element;
      <div
      data-testid={`${index}-recipe-card`}
      key={`element=${index}`}
      >
      <img
        alt={ name }
        src={ thumb }
        data-testid={`${index}-card-img`}
      />
     <h3 data-testid= {`${index}-card-name`} >
        { name }
      </h3>
      </div>
    }))
}
