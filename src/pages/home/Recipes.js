import React, { useEffect, useState } from 'react';
import RecipesCard from './RecipesCard';
import mealAPI from '../../services/mealAPI'

export default function Recipes() {
  const [data, setData] = useState([]);
  const [food, setFood] = useState([]);
  // const [condicional, setCondicional] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setData(await mealAPI.name(''))
    }
    getData();
  }, [mealAPI, setData]);

  useEffect(() => {
    const filterFood = () => {
      const result = data.filter((element, index) => index < 12);
      result.forEach((element) => setFood(food.push({ name: element.Meal, image: element.MealThumb })));
    } 
    filterFood();
    console.log(food);
  }, [data, setFood]);
  
  
  // foodType={ data } 

  return (
    // <div><p>Olá mundo</p></div>
    <RecipesCard foodType={ food } />
  );
}
