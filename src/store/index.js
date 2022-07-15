import React, { createContext, useState } from 'react';
import propTypes from 'prop-types';
import initialContext from './initialContext';

const AppContext = createContext();

function AppProvider({ children }) {
  const [context, setContext] = useState(initialContext);

  const useContext = ({ key, info }) => {
    setContext({ ...context, [key]: info });
  };

  return (
    <AppContext.Provider value={ { useContext, context } }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: propTypes.oneOf([
    propTypes.node,
    propTypes.arrayOf(propTypes.node),
  ]).isRequired,
};

export default AppProvider;
