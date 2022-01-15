import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormRestaurantCard } from '../components/form-restaurant-card';
import { SearchInput } from '../components/form-search-input';
import { Header } from '../components/header';
import { PageToggle } from '../components/pageToggle';
import { PropertyNotFound } from '../components/restaurant-not-found';
import { RESTAURANT_FRAGMENT } from '../fragments/restaurant.fragment';
import {
  searchRestaurant,
  searchRestaurantVariables,
} from '../__generated__/searchRestaurant';

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantByNameInput!) {
    searchRestaurant(input: $input) {
      sucess
      error
      totalPages
      totalResult
      restaurants {
        ...RestaurantFragment
      }
    }
  }

  ${RESTAURANT_FRAGMENT}
`;

export const SearchRestaurant = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(1);
  const searchValue = useRef('');
  const [callQuery, { loading, data, called }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);
  useEffect(() => {
    searchValue.current = location.search.split('?search=')[1];
    if (searchValue.current) {
      callQuery({
        variables: {
          input: {
            page: pageNum,
            take: 6,
            restaurantName: searchValue.current,
          },
        },
      });
    } else {
      navigate('/restaurant');
    }
  }, [location, navigate, callQuery, pageNum]);
  return (
    <div className="screen-full flex flex-col">
      <Header />
      <SearchInput
        defaultValues={
          searchValue.current
            ? searchValue.current
            : location.search.split('?search=')[1]
        }
      />
      {called && !loading && (
        <>
          {data?.searchRestaurant.totalResult ? (
            <div className="flex justify-around items-center flex-wrap gap-x-4 w-full h-auto mt-3 px-2">
              {data?.searchRestaurant.restaurants?.map((restaurant) => (
                <FormRestaurantCard
                  key={restaurant.id}
                  id={restaurant.id}
                  name={restaurant.name}
                  coverImg={restaurant.coverImg}
                  categoryName={restaurant.category?.name}
                  address={restaurant.address}
                />
              ))}
              {!loading && data && data.searchRestaurant.totalPages && (
                <PageToggle
                  page={pageNum}
                  totalPage={data.searchRestaurant.totalPages}
                  setPage={setPageNum}
                />
              )}
            </div>
          ) : (
            <PropertyNotFound
              mainMessage={`There is no restaurant name that contains an ${searchValue.current}`}
              subMessage="Enter a different search term to find a restaurant!"
            />
          )}
        </>
      )}
    </div>
  );
};
