import { AddRestaurant } from '../pages/owner/add-restaurant';
import { MyRestaurants } from '../pages/owner/my-restaurant';
import { getCurrentUser_getCurrentUser_user } from '../__generated__/getCurrentUser';

export interface IRouterProps {
  user?: getCurrentUser_getCurrentUser_user;
}

export const OwnerRoutes = [
  { path: '/', element: () => <MyRestaurants /> },
  {
    path: 'add-restaurant',
    element: () => <AddRestaurant />,
  },
];
