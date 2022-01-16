import React from 'react';
import { Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { CreateAccount } from '../pages/auth/create-account';
import { Login } from '../pages/auth/login';
import { Category } from '../pages/category';
import { PageNotFound } from '../pages/errors/pageNotFound';
import { Restaurants } from '../pages/restaurant';
import { RestaurantDetail } from '../pages/restaurant-detail';
import { SearchRestaurant } from '../pages/search-restaurant';

export const LoggedOutRouter = () => {
  return (
    <Routes>
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path="/page-not-found" element={<PageNotFound />} />
      <Route path="/restaurant/:id" element={<RestaurantDetail />} />
      <Route path="/restaurant" element={<Restaurants />} />
      <Route path="/search" element={<SearchRestaurant />} />
      <Route path="/category" element={<Category />} />
      <Route path="*" element={<Navigate to="/restaurant" />} />
    </Routes>
  );
};
