import React from 'react';
import { Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { CreateAccount } from '../pages/auth/create-account';
import { Login } from '../pages/auth/login';
import { PageNotFound } from '../pages/errors/pageNotFound';

export const LoggedOutRouter = () => {
  return (
    <Routes>
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path="/page-not-found" element={<PageNotFound />} />
      <Route path="*" element={<Navigate to="/page-not-found" />} />
    </Routes>
  );
};
