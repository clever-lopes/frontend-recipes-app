import propTypes from 'prop-types';
import React from 'react';
import Header from '../../../components/Header';
import profileIcon from '../../../images/profileIcon.svg';
import searchIcon from '../../../images/searchIcon.svg';
import Footer from '../../../components/Footer';

export default function Foods(props) {
  const { history } = props;
  return (
    <div>
      <Header
        currentPage="Foods"
        iconProfile={ profileIcon }
        iconSearch={ searchIcon }
        showSearchIcon
        history={ history }
      />
      <main>
        <h1>Hello World</h1>
      </main>
      <Footer />
    </div>
  );
}

Foods.propTypes = {
  history: propTypes.shape.isRequired,
};
