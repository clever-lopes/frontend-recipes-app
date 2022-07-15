import React from 'react';
import propTypes from 'prop-types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Home(props) {
  const { history } = props;
  const { location: { pathname } } = history;
  return (
    <div>
      <Header
        currentPage={ pathname === '/foods' ? 'Comidas' : 'Bebidas' }
        history={ history }
        isSearchBar
      />
      <Footer
        history={ history }
      />
    </div>
  );
}

Home.propTypes = {
  history: propTypes.shape({
    location: propTypes.shape({
      pathname: propTypes.string.isRequired,
    }).isRequired,
    push: propTypes.func.isRequired,
  }).isRequired,
};
