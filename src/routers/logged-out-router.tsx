import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateAccount } from '../pages/create-account';
import { Login } from '../pages/login';

export const LoggedOutRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
