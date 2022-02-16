import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { FormRestaurantCard } from '../../components/form-restaurant-card';
import { Header } from '../../components/header';
import { RESTAURANT_FRAGMENT } from '../../fragments/restaurant.fragment';
import { IOwnerRoutesElements } from '../../routers/owner-routes';
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

export const MyRestaurants = ({ user }: IOwnerRoutesElements) => {
  const { data, loading } = useQuery<getMyRestaurants>(MY_RESTAURANTS, {
    fetchPolicy: 'cache-and-network',
  });
  return (
    <div className="screen-full">
      <Header />
      <div className="w-full mt-1 h-12 px-7 flex justify-start items-center font-semibold text-2xl">
        <span className="border-b-4 border-b-orange-200 border-l-4 border-l-orange-200 pl-2 rounded-bl-2xl">
          {user?.name ? user.name : undefined}'s restaurants...
          <span className="opacity-0">__</span>
        </span>
      </div>
      {data?.myRestaurants.sucess && !loading ? (
        <>
          {data?.myRestaurants.restaurants.length ? (
            <div className="flex justify-around items-center flex-wrap gap-x-4 w-full h-full mt-3 px-2 scroll-auto">
              {data?.myRestaurants.restaurants?.map((restaurant) => (
                <FormRestaurantCard
                  key={restaurant.id}
                  id={restaurant.id}
                  name={restaurant.name}
                  coverImg={restaurant.coverImg}
                  categoryName={restaurant.category?.name}
                  address={restaurant.address}
                />
              ))}
            </div>
          ) : (
            <div>No Restaurants</div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center text-2xl font-bold">
          loading...
        </div>
      )}
    </div>
  );
};
