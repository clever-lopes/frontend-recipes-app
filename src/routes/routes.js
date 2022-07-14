import React from 'react';
import { useRoutes } from 'react-router-dom';

export default function Routes() { 
  return (
    useRoutes([
      {
        path: '/',
        element: <Login />,
      },
      {
        path: 'home',
        element: <Home />,
      }
    ])
  );
}