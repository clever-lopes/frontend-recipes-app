function formatName(str) {
  const RANGE = 3;
  const strFormat = str.split('');
  if (strFormat.slice(0, RANGE).join('').includes('str')) {
    return strFormat.slice(RANGE).join('');
  }
  return strFormat.join('');
}

function mealFormat(mealList) {
  if (mealList === null) return [];
  return mealList.map((meal) => {
    const ingredients = Object.entries(meal)
      .filter((item) => item[0].includes('strIngredient'))
      .map((item) => item[1]);
    const measures = Object.entries(meal)
      .filter((item) => item[0].includes('strMeasure'))
      .map((item) => item[1]);
    const ingredientList = ingredients.reduce((acc, ingredient, i) => {
      const accPosition = {
        ingredient,
        measure: measures[i],
      };
      if (ingredient !== '' && ingredient !== null && ingredient) acc.push(accPosition);
      return acc;
    }, []);
    const otherKeys = Object.entries(meal)
      .filter((item) => (
        !item[0].includes('strIngredient') && !item[0].includes('strMeasure')
      )).reduce((acc, item) => {
        const [name, value] = item;
        acc[formatName(name)] = value;
        return acc;
      }, {});
    return {
      ...otherKeys,
      ingredients: ingredientList,
    };
  });
}

export default mealFormat;
