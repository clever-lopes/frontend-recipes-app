import PropTypes from 'prop-types';
import React, { useState } from 'react';
// import profileIcon from '../images/profileIcon.svg'; - use esses caminhos quando precisar usar os icones
// import searchIcon from '../images/searchIcon.svg';

export default function Header(props) {
  const { currentPage, history, iconProfile, iconSearch, showSearchIcon } = props;

  const [showInputSearch, setShowInoutSearch] = useState(false);
  console.log(showInputSearch);
  return (
    <header>
      <button
        type="button"
        onClick={ () => history.push('/profile') }
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
      {showInputSearch && <input
        type="text"
        data-testid="search-input"
        onChange={ console.log('') }
      />}
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
  showSearchIcon: PropTypes.bool.isRequired,
};
