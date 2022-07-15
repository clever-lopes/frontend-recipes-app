import PropTypes from 'prop-types';
import React from 'react';
import Header from '../../components/Header';
import profileIcon from '../../images/profileIcon.svg';
import Footer from '../../components/Footer';

export default function Profile(props) {
  const { history } = props;
  return (
    <div>
      <Header
        showSearchIcon={ false }
        iconProfile={ profileIcon }
        currentPage="Profile"
        history={ history }
        isInProfile
        isSearchBar={ false }
      />
      <div>
        <h2>Hello World</h2>
      </div>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
