import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Carousel({ recommendation }) {
  const [recommend, setRecommend] = useState([]);
  const [newRecommend, setNewRecommend] = useState([]);

  useEffect(() => {
    const fill = () => {
      const newResult = recommendation.filter((_item, index) => index <= +'5');
      setRecommend(newResult);
      const result = recommend.filter((_item, index) => index < 2);
      setNewRecommend(result);
    };
    fill();
  }, [recommendation]);

  // const handleWhell = () => {

  // }

  return (
    <div
      className="carousel"
      style={ {
        position: 'relative',
        height: '600px',
        margin: '0px auto',
        width: '80%',
      } }
    >
      <div className="carousel__track-container">
        <ul
          className="carousel__track"
          style={ {
            padding: 0,
            margin: 0,
            listStyle: 'none',
            display: 'flex',
          } }
        >
          { newRecommend.map((item, index) => (
            <li
              key={ index }
              className="carousel__slide"
              data-testid={ `${index}-recommendation-card` }
              // onWheel={ handleWheel }
            >
              <img
                width="300px"
                height="200px"
                src={ item.MealThumb }
                alt={ item.Meal }
              />
              <p>{ item.Category }</p>
              <h5>{ item.Meal }</h5>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

Carousel.propTypes = {
  recommendation: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
