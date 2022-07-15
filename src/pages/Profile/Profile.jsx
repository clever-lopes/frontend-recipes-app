import PropTypes from 'prop-types';
import React from 'react';
import Header from '../../components/Header';
import profileIcon from '../../images/profileIcon.svg';

export default function Profile(props) {
  const { history } = props;
  return (
    <Header
      showSearchIcon={ false }
      iconProfile={ profileIcon }
      currentPage="Profile"
      history={ history }
      isInProfile
    />
  );
}

Profile.propTypes = {
  history: PropTypes.shape.isRequired,
};
