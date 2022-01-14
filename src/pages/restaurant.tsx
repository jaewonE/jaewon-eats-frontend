import { gql, useQuery } from '@apollo/client';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { FormCategoryIcon } from '../components/form-category-icon';
import { FormRestaurantCard } from '../components/form-restaurant-card';
import { Header } from '../components/header';
import { PageToggle } from '../components/pageToggle';
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from '../__generated__/restaurantsPageQuery';

interface ISearchForm {
  input: string;
}

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: PaginationInput!) {
    getAllCategory {
      sucess
      error
      categories {
        id
        name
        coverImg
        slug
      }
    }
    findAllRestaurant(input: $input) {
      sucess
      error
      totalPages
      totalResult
      restaurants {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const Restaurants = () => {
  const { handleSubmit, register, watch } = useForm<ISearchForm>({
    mode: 'onSubmit',
  });
  const navigate = useNavigate();
  const searchInput = watch('input', '');
  const [pageNum, setPageNum] = useState<number>(1);
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: { input: { page: pageNum, take: 4 } },
  });
  const onSubmit = ({ input }: ISearchForm) => {
    navigate({
      pathname: '/search',
      search: `?${createSearchParams({ search: input })}`,
    });
  };
  return (
    <div className="screen-full min-w-[460px]">
      <Header />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="group flex-center h-1/6 sm:h-1/5 md:h-1/4 bg-gray-500 relative"
      >
        <input
          required
          className="auth-input h-14 text-xl pl-7 group-focus:ring-2"
          {...register('input', { required: 'Enter restaurants...' })}
          name="input"
          type="text"
          placeholder="Search restaurants..."
        />
        <button type="submit">
          <FontAwesomeIcon
            icon={faSearch}
            className={`sm:text-2xl text-xl absolute top-[46%] sm:right-[19%] right-[20%]
             opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out ${
               searchInput
                 ? 'sm:opacity-100'
                 : 'sm:opacity-0 pointer-events-none'
             }`}
          />
        </button>
      </form>
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
