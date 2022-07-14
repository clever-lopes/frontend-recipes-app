import React from 'react';
import Header from '../../components/Header';
import profileIcon from '../../images/profileIcon.svg';

export default function Profile() {
  return (
    <Header showSearchIcon iconProfile={ profileIcon } currentPage="Profile" />
  );
}
