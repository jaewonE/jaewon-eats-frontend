import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/header';
import { DISH_FRAGMENT } from '../../fragments/dish.fragment';
import { RESTAURANT_FRAGMENT } from '../../fragments/restaurant.fragment';
import {
  findRestaurant,
  findRestaurantVariables,
} from '../../__generated__/findRestaurant';

const GET_RESTAURANT = gql`
  query findRestaurant($input: FindRestaurantByIdInput!) {
    findRestaurant(input: $input) {
      sucess
      error
      restaurant {
        ...RestaurantFragment
        ownerId
        menu {
          ...DishFragment
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

export const RestaurantDetail = () => {
  const { id: restaurantId } = useParams();
  const navigate = useNavigate();
  const [callQuery, { loading, data, called }] = useLazyQuery<
    findRestaurant,
    findRestaurantVariables
  >(GET_RESTAURANT);
  useEffect(() => {
    if (restaurantId) {
      callQuery({
        variables: {
          input: {
            restaurantId: Number(restaurantId),
          },
        },
      });
    } else {
      navigate('/restaurant');
    }
  }, [navigate, restaurantId, callQuery]);
  const goToCategory = () => {
    if (data?.findRestaurant.restaurant?.category) {
      navigate({
        pathname: '/category',
        search: `?${createSearchParams({
          search: data?.findRestaurant.restaurant?.category?.slug,
        })}`,
      });
    }
  };
  return (
    <div className="screen-full flex flex-col">
      <Header />
      {called && !loading && data?.findRestaurant.restaurant && (
        <div className="w-full h-80 bg-gray-500 mt-3 relative">
          <img
            className="w-full h-full object-cover overflow-hidden"
            alt={data.findRestaurant.restaurant.coverImg}
            src={require(`../../images/coverImg/restaurants/${data.findRestaurant.restaurant.coverImg}`)}
          />
          <div
            className="absolute top-[30%] left-0 w-1/3 max-w-sm min-w-[18rem] h-40 md:max-w-md lg:h-48 bg-white 
                      flex flex-col justify-start items-start p-2 pl-3 pt-2 lg:pt-3 lg:pl-5"
          >
            <div className="text-4xl py-3 xl:text-5xl xl:py-4">
              {data.findRestaurant.restaurant.name}
            </div>
            <div className="text-lg pb-1 overflow-hidden lg:text-lg xl:text-xl xl:pb-2">
              {data.findRestaurant.restaurant.category ? (
                <span
                  className="underline underline-offset-2"
                  onClick={goToCategory}
                >
                  {data.findRestaurant.restaurant.category.name}
                </span>
              ) : (
                ''
              )}
              {data.findRestaurant.restaurant.menu.length > 0 &&
                ` | ${data.findRestaurant.restaurant.menu[0].name}`}
            </div>
            <div className="font-light text-xs pt-1 md:text-sm lg:text-base xl:font-normal xl:text-md">
              {data.findRestaurant.restaurant.address}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
