import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function NotFound() {
  return (
    <div>
      <Header
        currentPage="not found"
        isSearchBar={ false }
        history={ useHistory() }
      />
      <h1>Página não encontrada</h1>
      <Footer />
    </div>
  );
}
