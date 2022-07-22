import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Profile(props) {
  const { history } = props;

  function btnLogout() {
    localStorage.clear();
    history.push('/');
  }

  const getUser = () => {
    if (localStorage.user) {
      return JSON.parse(localStorage.getItem('user')).email;
    }
    return 'not logged';
  };

  return (
    <div>
      <Header
        currentPage="profile"
        history={ history }
        isSearchBar={ false }
      />
      <div>
        <h3
          data-testid="profile-email"
        >
          { getUser() }
        </h3>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ btnLogout }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape(
    PropTypes.func.isRequired,
  ).isRequired,
};
