import propTypes from 'prop-types';
import React from 'react';
import profileIcon from '../images/profileIcon.svg';

export default function Header(props) {
  const {
    currentPage,
    history,
  } = props;

  const { location: { pathname } } = history;

  return (
    <header>
      <button
        type="button"
        onClick={ pathname === '/profile'
          ? () => history.push('/foods')
          : () => history.push('/profile') }
      >
        <img
          src={ profileIcon }
          alt="profileIcon"
          data-testid="profile-top-btn"
        />
      </button>
      <h3 data-testid="page-title">{ currentPage }</h3>
    </header>
  );
}

Header.propTypes = {
  currentPage: propTypes.string.isRequired,
  history: propTypes.shape({
    location: propTypes.shape({
      pathname: propTypes.string.isRequired,
    }).isRequired,
    push: propTypes.func.isRequired,
  }).isRequired,
};
