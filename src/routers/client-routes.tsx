import { Navigate } from 'react-router-dom';
import { CreateAccount } from '../pages/auth/create-account';
import { Category } from '../pages/client/category';
import { Restaurants } from '../pages/client/restaurant';
import { RestaurantDetail } from '../pages/client/restaurant-detail';
import { SearchRestaurant } from '../pages/client/search-restaurant';
import { PageNotFound } from '../pages/errors/pageNotFound';

export const ClientRoutes = [
  { path: '/create-account', element: <CreateAccount /> },
  { path: '/page-not-found', element: <PageNotFound /> },
  { path: '/restaurant/:id', element: <RestaurantDetail /> },
  { path: '/restaurant', element: <Restaurants /> },
  { path: '/search', element: <SearchRestaurant /> },
  { path: '/category', element: <Category /> },
  { path: '/', element: <Navigate to="/restaurant" /> },
];
