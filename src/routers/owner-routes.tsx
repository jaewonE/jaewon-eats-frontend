import { AddRestaurant } from '../pages/owner/add-restaurant';
import { MyRestaurants } from '../pages/owner/my-restaurant';

export const OwnerRoutes = [
  { path: '/', element: () => <MyRestaurants /> },
  {
    path: 'add-restaurant',
    element: () => <AddRestaurant />,
  },
];
