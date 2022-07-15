import PropTypes from 'prop-types';
import React from 'react';
import Header from '../../components/Header';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

export default function Foods(props) {
  const { history } = props;
  return (
    <body>
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
    </body>
  );
}

Foods.propTypes = {
  history: PropTypes.shape.isRequired,
};
