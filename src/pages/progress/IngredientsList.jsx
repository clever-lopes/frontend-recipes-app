import React from 'react';
import propTypes from 'prop-types';

export default function IngredientsList(props) {
  const { ingredients, checkList, checkHandle } = props;
  return (
    <ul>
      {
        ingredients.map((item, i) => {
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
                  data-testid="ingredient-in-list"
                >
                  { `${item.measure} ${item.ingredient}` }
                </span>
              </label>
            </li>
          );
        })
      }
    </ul>
  );
}

IngredientsList.propTypes = {
  ingredients: propTypes.arrayOf(propTypes.object).isRequired,
  checkList: propTypes.arrayOf(propTypes.string).isRequired,
  checkHandle: propTypes.func.isRequired,
};
