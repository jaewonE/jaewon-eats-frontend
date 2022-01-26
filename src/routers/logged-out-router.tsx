import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/auth/login';
import { ClientRoutes } from './client-routes';

export const LoggedOutRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {ClientRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element()} />
      ))}
      <Route path="*" element={<Navigate to="/restaurant" />} />
    </Routes>
  );
};
