import propTypes from 'prop-types';
import React from 'react';
import Header from '../../../components/Header';
import profileIcon from '../../../images/profileIcon.svg';
import searchIcon from '../../../images/searchIcon.svg';
import Footer from '../../../components/Footer';

export default function Drinks(props) {
  const { history } = props;
  return (
    <body>
      <Header
        currentPage="Drinks"
        iconProfile={ profileIcon }
        iconSearch={ searchIcon }
        showSearchIcon
        history={ history }
      />
      <main>
        <h1>Drinks</h1>
      </main>
      <Footer />
    </body>
  );
}
Drinks.propTypes = {
  history: propTypes.shape.isRequired,
};
