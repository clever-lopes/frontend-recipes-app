import propTypes from 'prop-types';
import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function Foods(props) {
  const { history } = props;
  return (
    <div>
      <Header
        currentPage="foods"
        history={ history }
        isSearchBar
      />
      <main>
        <h1>Hello World</h1>
      </main>
      <Footer />
    </div>
  );
}

Foods.propTypes = {
  history: propTypes.shape({}).isRequired,
};
