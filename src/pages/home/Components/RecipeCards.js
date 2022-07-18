import React, { useContext } from 'react';
import { AppContext } from '../../../store';

export default function RecipeCards() {
  const { context } = useContext(AppContext);
  const { productList } = context;
  return (
    <div>
      {
        productList.map((product, id) => (
          <p key={ id }>{ product.Meal || product.Drink }</p>
        ))
      }
    </div>
  );
}

RecipeCards.propTypes = {

};
