import PropTypes from 'prop-types';
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Profile(props) {
  const { history } = props;
  return (
    <div>
      <Header
        currentPage="profile"
        history={ history }
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
