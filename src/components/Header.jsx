import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

export default function Header(props) {
  const {
    currentPage,
    history,
    isInProfile,
  } = props;

  const [showInputSearch, setShowInoutSearch] = useState(false);

  return (
    <header>
      <button
        type="button"
        onClick={ !isInProfile ? () => history.push('/profile')
          : () => history.push('/foods') }
      >
        <img
          src={ profileIcon }
          alt="profileIcon"
          data-testid="profile-top-btn"
        />
      </button>
      <h3 data-testid="page-title">{ currentPage }</h3>
      {showSearchIcon
      && (
        <button
          type="button"
          onClick={ () => setShowInoutSearch(!showInputSearch) }
        >
          <img
            src={ searchIcon }
            alt="searchIcon"
            data-testid="search-top-btn"
          />
        </button>
      )}
      {showInputSearch && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  currentPage: PropTypes.string.isRequired,
  history: PropTypes.shape({
    pathname: PropTypes.string,
    push: PropTypes.func.isRequired,
  }).isRequired,
  isInProfile: PropTypes.bool.isRequired,
};
