import React, { createContext, useState } from 'react';
import propTypes from 'prop-types';
import initialContext from './initialContext';

export const AppContext = createContext();

function AppProvider({ children }) {
  const [context, setContext] = useState(initialContext);

  const changeContext = ({ key, info }) => {
    setContext({ ...context, [key]: info });
  };

  return (
    <AppContext.Provider value={ { changeContext, context } }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: propTypes.oneOfType([
    propTypes.node,
    propTypes.arrayOf(propTypes.node),
  ]).isRequired,
};

export default AppProvider;
