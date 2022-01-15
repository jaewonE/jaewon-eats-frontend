import { Navigate, Route } from 'react-router-dom';
import { Category } from '../pages/category';
import { Restaurants } from '../pages/restaurant';
import { SearchRestaurant } from '../pages/search-restaurant';

export const ClientRoutes = [
  <Route key={0} path="/" element={<Navigate to="/restaurant" />} />,
  <Route key={1} path="/restaurant" element={<Restaurants />} />,
  <Route key={2} path="/search" element={<SearchRestaurant />} />,
  <Route key={3} path="/category" element={<Category />} />,
];
