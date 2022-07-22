import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import mealAPI from '../../services/mealAPI';
import drinkAPI from '../../services/drinkAPI';
import Carousel from './components/Carousel';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

const copy = require('clipboard-copy');

const startRecipe = 'Start Recipe';
export default function RecipeDetails(props) {
  const [recommendation, setRecommendation] = useState([]);
  const [recipeState, setRecipeState] = useState(startRecipe);
  const [heartImg, setHeartImg] = useState(whiteHeartIcon);
  const [isFinished, setIsFinished] = useState(true);
  const [foodObject, setFoodObject] = useState({
    DrinkThumb: '',
    Drink: '',
    Alcoholic: '',
    ingredients: [],
    Instructions: '',
  });
  const [popUp, setPopUp] = useState(false);
  const { history, match: { params: { id } } } = props;
  const { location: { pathname } } = useHistory();
  const path = pathname.split('/').filter((item) => item);
  const funcMap = path[0] === 'foods' ? mealAPI : drinkAPI;
  const recommendMap = (path[0] !== 'foods') ? mealAPI : drinkAPI;

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (favoriteRecipes) {
      const result = favoriteRecipes.find((recipe) => recipe.id === id);
      if (result) {
        setHeartImg(blackHeartIcon);
      }
    }
  }, []);

  useEffect(() => {
    const firstCall = async () => {
      const result = await funcMap.getById(id);
      setFoodObject(result);
    };
    const recommend = async () => {
      const result = await recommendMap.name('');
      setRecommendation(result);
    };
    recommend();
    firstCall();
  }, []);

  useEffect(() => {
    const doneRecipes = localStorage.getItem('doneRecipes');
    const inProgressRecipes = localStorage.getItem('inProgressRecipes');

    if (inProgressRecipes) {
      if (inProgressRecipes.includes(id)) {
        setRecipeState('Continue Recipe');
      } else {
        setRecipeState(startRecipe);
      }
    } else {
      setRecipeState(startRecipe);
    }

    if (doneRecipes) {
      if (doneRecipes.includes(id)) {
        setIsFinished(false);
      } else {
        setIsFinished(true);
      }
    } else {
      setIsFinished(true);
    }
  }, []);

  function onFavoriteBtnClick() {
    const image = foodObject.MealThumb || foodObject.DrinkThumb;
    const name = foodObject.Meal || foodObject.Drink;
    const alcoholicOrNot = foodObject.Alcoholic ? foodObject.Alcoholic : '';
    const category = foodObject.Category;
    const nationality = foodObject.Area ? foodObject.Area : '';
    const ObjectWithType = { ...foodObject, type: foodObject.Meal ? 'food' : 'drink' };
    const { type } = ObjectWithType;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (favoriteRecipes) {
      const favoriteRecipesObj = [...favoriteRecipes, {
        id,
        type,
        nationality,
        category,
        alcoholicOrNot,
        name,
        image,
      }];
      if (heartImg === whiteHeartIcon) {
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesObj));
      }
      if (heartImg === blackHeartIcon) {
        const newFavoriteRecipes = favoriteRecipesObj
          .filter((recipe) => recipe.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      }
    } else {
      const favoriteRecipesObj = [{
        id, type, nationality, category, alcoholicOrNot, name, image,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesObj));
    }
    setHeartImg(heartImg === whiteHeartIcon ? blackHeartIcon : whiteHeartIcon);
  }

  const shareHandle = async () => {
    copy(window.location.href);
    setPopUp(true);
    setTimeout(() => {
      setPopUp(false);
    }, +'2000');
  };

  return (
    <div
      style={ {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      } }
    >
      <div>
        <img
          width="250px"
          src={ foodObject.DrinkThumb || foodObject.MealThumb }
          alt={ foodObject.Drink || foodObject.Meal }
          data-testid="recipe-photo"
        />
        <h3
          data-testid="recipe-title"
        >
          { foodObject.Drink || foodObject.Meal }
        </h3>
        <button
          type="button"
          style={ {
            border: 'none',
            background: 'transparent',
          } }
          onClick={ onFavoriteBtnClick }
        >
          <img
            data-testid="favorite-btn"
            src={ heartImg }
            alt="favorite"
            width="17px"
          />
        </button>
        <div>
          <button
            type="button"
            style={ {
              border: 'none',
              background: 'transparent',
            } }
            onClick={ shareHandle }
          >
            <img data-testid="share-btn" src={ shareIcon } alt="share" width="17px" />
          </button>
          {
            popUp && (
              <span>Link copied!</span>
            )
          }
        </div>
        <p
          data-testid="recipe-category"
        >
          { foodObject.Alcoholic || foodObject.Category }
        </p>
        <ul>
          {
            foodObject.ingredients.map((item, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${item.measure} of ${item.ingredient}` }
              </li>
            ))
          }
        </ul>
        <p data-testid="instructions">{ foodObject.Instructions }</p>
        {
          path[0] === 'foods' && <iframe
            title={ `${foodObject.Meal || foodObject.Drink}-video` }
            width="420"
            height="315"
            data-testid="video"
            src={ foodObject.Youtube }
          />
        }
      </div>
      <Carousel recommendation={ recommendation } />
      <div>
        {
          isFinished && (
            <button
              type="button"
              data-testid="start-recipe-btn"
              style={ {
                position: 'fixed',
                bottom: '0',
              } }
              onClick={ () => history.push(`${pathname}/in-progress`) }
            >
              { recipeState }
            </button>)
        }
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
  history: PropTypes.shape(
    PropTypes.func.isRequired,
  ).isRequired,
};
