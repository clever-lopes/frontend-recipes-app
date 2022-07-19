import propTypes from 'prop-types';
import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

export default function Header(props) {
  const {
    currentPage,
    history,
    isSearchBar,
  } = props;

  const { location: { pathname } } = history;
  const createTitle = (title) => {
    const split = title.toLowerCase().split('');
    split[0] = split[0].toUpperCase();
    return split;
  };

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
      <h3 data-testid="page-title">{ createTitle(currentPage) }</h3>
      { isSearchBar && <SearchBar
        history={ history }
        key={ currentPage }
        currentPage={ currentPage }
      /> }
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
  isSearchBar: propTypes.bool.isRequired,
};
