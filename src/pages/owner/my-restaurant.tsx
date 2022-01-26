import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { RESTAURANT_FRAGMENT } from '../../fragments/restaurant.fragment';
import { getMyRestaurants } from '../../__generated__/getMyRestaurants';

const MY_RESTAURANTS = gql`
  query getMyRestaurants {
    myRestaurants {
      sucess
      error
      restaurants {
        ...RestaurantFragment
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const MyRestaurants = () => {
  const { data, loading } = useQuery<getMyRestaurants>(MY_RESTAURANTS);
  if (!loading && data) {
    if (data.myRestaurants.sucess) {
      console.log(data.myRestaurants.restaurants);
    } else {
      console.log(data.myRestaurants.error);
    }
  }
  return (
    <div>
      {data?.myRestaurants.sucess && !loading ? (
        <>
          {data?.myRestaurants.restaurants.length ? (
            <div>myRestaurants</div>
          ) : (
            <div>No Restaurants</div>
          )}
        </>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};
