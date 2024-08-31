import React from 'react';
import { Route, Routes } from 'react-router-dom';
import appsConfig from '../config/appsConfig';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {appsConfig.map((app) => (
        <Route key={app.path} path={app.path} element={<app.component />} />
      ))}
    </Routes>
  );
};

export default AppRoutes;