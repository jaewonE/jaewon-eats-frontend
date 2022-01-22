import { gql, useLazyQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  add_restaurant,
  add_restaurantVariables,
} from '../../__generated__/add_restaurant';

const ADD_RESTAURANT = gql`
  mutation add_restaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      sucess
      error
    }
  }
`;

export const AddRestaurant = () => {
  <Helmet>
    <title>JaewonEats | Restaurants overview</title>
  </Helmet>;
  const [callQuery, { loading, data, called }] = useLazyQuery<
    add_restaurant,
    add_restaurantVariables
  >(ADD_RESTAURANT);
  return <div>addRestarurant</div>;
};
