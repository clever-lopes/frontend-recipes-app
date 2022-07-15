import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SearchBar from './SearchBar';

export default function Header(props) {
  const {
    currentPage,
    history,
    iconProfile,
    iconSearch,
    showSearchIcon,
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
          src={ iconProfile }
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
            src={ iconSearch }
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
  iconProfile: PropTypes.string.isRequired,
  iconSearch: PropTypes.string.isRequired,
  isInProfile: PropTypes.bool.isRequired,
  showSearchIcon: PropTypes.bool.isRequired,
};
