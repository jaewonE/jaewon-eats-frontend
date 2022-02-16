import { AddRestaurant } from '../pages/owner/add-restaurant';
import { MyRestaurants } from '../pages/owner/my-restaurant';
import { RestaurantProfile } from '../pages/owner/restaurant-profile';
import { getCurrentUser_getCurrentUser_user } from '../__generated__/getCurrentUser';

export interface IOwnerRoutesElements {
  user?: getCurrentUser_getCurrentUser_user;
}

export const OwnerRoutes = [
  {
    path: '/',
    element: ({ user }: IOwnerRoutesElements) => <MyRestaurants user={user} />,
  },
  {
    path: 'add-restaurant',
    element: () => <AddRestaurant />,
  },
  {
    path: '/restaurant/:id',
    element: () => <RestaurantProfile />,
  },
];
