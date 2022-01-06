import { Route } from 'react-router-dom';
import { Restaurants } from '../pages/restaurant';

export const ClientRoutes = [
  <Route key={1} path="/restaurant" element={<Restaurants />} />,
];
