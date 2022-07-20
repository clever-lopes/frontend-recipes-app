import React, { useEffect, useState } from 'react';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

export default function FavoriteRecipes() {
  const [data, setData ] = useState([]);
  const [heartImg, setHeartImg] = useState(blackHeartIcon);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(favoriteRecipes);
    setData(favoriteRecipes);
    console.log(data)
  }, []);

  function onFavoriteBtnClick(id) {
    // const { image, name, alcoholicOrNot, category, nationality, type, id } = data;
    // const image = data.image;
    // const name = data.name;
    // const alcoholicOrNot = data.alcoholicOrNot;
    // const category = data.category;
    // const nationality = data.nationality;
    // const type = data.type;
    // const id = data.id;
    const identificacao = id;
    data.map((element) => {
      console.log(element)
      const { image, name, alcoholicOrNot, category, nationality, type, id } = element;
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      console.log(favoriteRecipes)

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
          setHeartImg(heartImg === whiteHeartIcon ? blackHeartIcon : whiteHeartIcon);
        }
        if (heartImg === blackHeartIcon) {
          const newFavoriteRecipes = favoriteRecipes
            .filter((recipe) => recipe.id !== id);
          localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
          setHeartImg(heartImg === whiteHeartIcon ? blackHeartIcon : whiteHeartIcon);
        }
      } else {
        const favoriteRecipesObj = [{
          id, type, nationality, category, alcoholicOrNot, name, image,
        }];
  
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesObj));
      }
      // setHeartImg(heartImg === whiteHeartIcon ? blackHeartIcon : whiteHeartIcon);
      // setData(favoriteRecipes)
    })
  }

  return (
    <div>
      <h2>Favorite Recipes</h2>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      <p>{ console.log(data) }</p>
      <div>
        { data.map((item, index) => (
          <div key={ index }>
            <img
              width="250px"
              src={ item.image }
              alt={ item.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <button
              type="button"
              // data-testid={ `${index}-horizontal-share-btn` }
              style={ {
                border: 'none',
                background: 'transparent',
              } }
            >
              <img data-testid={ `${index}-horizontal-share-btn` } src={ shareIcon } alt="share" width="17px" />
            </button>
            <button
              type="button"
              style={ {
                border: 'none',
                background: 'transparent',
              } }
              onClick={ onFavoriteBtnClick(item.id) }
            >
              <img
                data-testid="favorite-btn"
                src={ heartImg }
                alt="favorite"
                width="17px"
              />
            </button>
            <span
              data-testid={ `${index}-horizontal-top-text` }
            >
              { item.category }
            </span>
            <h5
              data-testid={ `${index}-horizontal-name` }
            >
              { item.name }
            </h5>
            {/* <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              { `Done in: ${item.data}` }
            </p> */}
            {/* {
              item.tags.map((tag, index) => {
                <span key={ index }>
                  { tag }
                </span>
              })
            } */}
          </div>
        ))}
      </div>
    </div>
  );
}
