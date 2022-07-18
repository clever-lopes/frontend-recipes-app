import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Carousel({ recommendation }) {
  const [recommend, setRecommend] = useState([]);

  useEffect(() => {
    const fill = () => {
      const newResult = recommendation.filter((item, index) => index <= 5);
      setRecommend(newResult);
    };
    fill();
    console.log(recommend);
  }, []);
  console.log(recommendation);
  console.log(recommend);

  return (
    <ul style={ {
      display: 'flex',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: '0',
      margin: '0',
    } }
    >
      { recommend.map((item, index) => (
        <li
          key={ index }
          data-testid={ `${index}-recommendation-card` }
          style={{
            position: 'absolute', 
          }}
        >
          <img
            width="100px"
            src={ item.MealThumb }
            alt={ item.Meal }
          />
          <p>{ item.Category }</p>
          <h5>{ item.Meal }</h5>
        </li>
      ))}
    </ul>
  );
}

Carousel.propTypes = {
  recommendation: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
