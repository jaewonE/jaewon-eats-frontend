import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { FormCategoryIcon } from '../../components/form-category-icon';
import { FormRestaurantCard } from '../../components/form-restaurant-card';
import { SearchInput } from '../../components/form-search-input';
import { Header } from '../../components/header';
import { PageToggle } from '../../components/pageToggle';
import { CATEGORY_FRAGMENT } from '../../fragments/category.fragment';
import { RESTAURANT_FRAGMENT } from '../../fragments/restaurant.fragment';
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from '../../__generated__/restaurantsPageQuery';

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: PaginationInput!) {
    getAllCategory {
      sucess
      error
      categories {
        ...CategoryFragment
      }
    }
    findAllRestaurant(input: $input) {
      sucess
      error
      totalPages
      totalResult
      restaurants {
        ...RestaurantFragment
      }
    }
  }
  ${CATEGORY_FRAGMENT}
  ${RESTAURANT_FRAGMENT}
`;

export const Restaurants = () => {
  const [pageNum, setPageNum] = useState<number>(1);
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: { input: { page: pageNum, take: 4 } },
  });
  return (
    <div className="screen-full min-w-[460px]">
      <Header />
      <SearchInput />
      {!loading && (
        <div className="flex justify-around items-center h-auto min-h-min flex-wrap mt-3 md:mt-5 bg-gray-100 max-w-full">
          {data?.getAllCategory.categories?.map((category) => (
            <FormCategoryIcon
              key={category.id}
              name={category.name}
              slug={category.slug}
              coverImg={category.coverImg}
            />
          ))}
        </div>
      )}
      {!loading && (
        <div className="flex justify-around items-center flex-wrap gap-x-4 w-full h-auto mt-3 px-2">
          {data?.findAllRestaurant.restaurants?.map((restaurant) => (
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
      )}
      {!loading && data && data.findAllRestaurant.totalPages && (
        <PageToggle
          page={pageNum}
          totalPage={data.findAllRestaurant.totalPages}
          setPage={setPageNum}
        />
      )}
    </div>
  );
};
