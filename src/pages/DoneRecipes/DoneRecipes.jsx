import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import FilterButtonAll from '../../components/RecipeCardComponents/FilterButtonAll';
import FilterButtonType from '../../components/RecipeCardComponents/FilterButtonType';
import RecipeCardAttribute
from '../../components/RecipeCardComponents/RecipeCardAttrbiute';
import RecipeCardGoToButton
from '../../components/RecipeCardComponents/RecipeCardGoToButton';
import RecipeCardImg from '../../components/RecipeCardComponents/RecipeCardImg';
import RecipeCardShareButton, { setPopUpInit }
from '../../components/RecipeCardComponents/RecipeCardShareButton';

export default function DoneRecipes() {
  const getDone = () => {
    if (localStorage.doneRecipes) {
      return JSON.parse(localStorage.getItem('doneRecipes'));
    }
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    return [];
  };
  const [data, setData] = useState(getDone());
  const [popUp, setPopUp] = useState(setPopUpInit());
  const history = useHistory();

  return (
    <div>
      <Header
        currentPage="Done Recipes"
        history={ history }
        isSearchBar={ false }
      />
      <div>
        <FilterButtonAll setState={ setData } target="doneRecipes" />
        <FilterButtonType type="food" setState={ setData } target="doneRecipes" />
        <FilterButtonType type="drink" setState={ setData } target="doneRecipes" />
      </div>
      <div>
        {
          data.map((item, index) => (
            <div key={ item.id }>
              <RecipeCardImg
                image={ item.image }
                recipe={ item.name }
                index={ index }
                type={ item.type }
                id={ item.id }
              />
              <RecipeCardShareButton
                id={ item.id }
                state={ popUp }
                setState={ setPopUp }
                popUp={ popUp[item.id] || false }
                type={ item.type }
                index={ index }
                page="/done-recipes"
              />
              <div>
                <RecipeCardAttribute
                  index={ index }
                  items={ [item.nationality || item.alcoholicOrNot, item.category] }
                />
                <RecipeCardGoToButton
                  index={ index }
                  type={ item.type }
                  id={ item.id }
                  itemName={ item.name }
                />
                <span
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  { item.doneDate }
                </span>
                <div>
                  {
                    item.tags.map((tag) => (
                      <span
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                        key={ `${index}-${tag}` }
                      >
                        { tag }
                      </span>
                    ))
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
