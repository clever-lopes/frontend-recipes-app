import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Carousel({ recommendation }) {
  const [recommend, setRecommend] = useState([]);

  useEffect(() => {
    const fill = () => {
      const newResult = recommendation.filter((_item, index) => index <= +'5');
      setRecommend(newResult);
    }
    fill();
  }, [recommendation]);

  return (
        <div
          className="carousel__track"
          style={ {
            padding: '10px',
            margin: 0,
            listStyle: 'none',
            display: 'flex',
            border: '1px solid black',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            backgroundColor: 'orange',
            width: '100%',
          } }
        >
          { recommend.map((item, index) => (
            <div
              key={ index }
              className="carousel__slide"
              data-testid={ `${index}-recommendation-card` }
              style={ {
                minWidth: '160px',
                padding:'6px',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                width="100%"
                height="200px"
                src={ item.MealThumb }
                alt={ item.Meal }
              />
              <p>{ item.Category }</p>
              <h5>{ item.Meal }</h5>
            </div>
          ))}
        </div>
  );
}

Carousel.propTypes = {
  recommendation: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
