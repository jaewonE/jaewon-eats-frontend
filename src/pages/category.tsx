import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormCategoryIcon } from '../components/form-category-icon';
import { FormRestaurantCard } from '../components/form-restaurant-card';
import { Header } from '../components/header';
import { PageToggle } from '../components/pageToggle';
import { PropertyNotFound } from '../components/restaurant-not-found';
import { CATEGORY_FRAGMENT } from '../fragments/category.fragment';
import {
  getCategory,
  getCategoryVariables,
} from '../__generated__/getCategory';

const GET_CATEGORY = gql`
  query getCategory($input: GetCategoryInput!) {
    getAllCategory {
      sucess
      error
      categories {
        ...CategoryFragment
      }
    }
    getCategory(input: $input) {
      sucess
      error
      totalPages
      totalResult
      category {
        ...CategoryFragment
        restaurants {
          id
          name
          coverImg
          address
          isPromoted
        }
      }
    }
  }
  ${CATEGORY_FRAGMENT}
`;

export const Category = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(1);
  const categoryName = useRef('');
  const [callQuery, { loading, data, called }] = useLazyQuery<
    getCategory,
    getCategoryVariables
  >(GET_CATEGORY);
  useEffect(() => {
    categoryName.current = location.search.split('?search=')[1];
    if (categoryName.current) {
      callQuery({
        variables: {
          input: {
            page: pageNum,
            take: 6,
            selector: {
              slug: categoryName.current,
            },
          },
        },
      });
    } else {
      if (data?.getAllCategory.categories)
        navigate(
          data?.getAllCategory.categories
            ? `/category?search=${data.getAllCategory.categories[0].slug}`
            : '/restaurant'
        );
    }
  }, [location, navigate, callQuery, pageNum, data?.getAllCategory.categories]);
  return (
    <div className="screen-full flex flex-col">
      <Header />
      {!loading && (
        <div className="flex justify-around items-center h-auto min-h-min flex-wrap mt-1 xl:mt-3 bg-gray-100 max-w-full">
          {data?.getAllCategory.categories?.map((category) => (
            <FormCategoryIcon
              key={category.id}
              name={category.name}
              slug={category.slug}
              coverImg={category.coverImg}
              select={category.slug === categoryName.current}
            />
          ))}
        </div>
      )}
      {called && !loading && (
        <>
          {data?.getCategory.totalResult ? (
            <div className="flex justify-around items-center flex-wrap gap-x-4 w-full h-auto mt-3 px-2">
              {data?.getCategory.category?.restaurants?.map((restaurant) => (
                <FormRestaurantCard
                  key={restaurant.id}
                  id={restaurant.id}
                  name={restaurant.name}
                  coverImg={restaurant.coverImg}
                  categoryName={data.getCategory.category?.name}
                  address={restaurant.address}
                />
              ))}
              {!loading && data && data.getCategory.totalPages && (
                <PageToggle
                  page={pageNum}
                  totalPage={data.getCategory.totalPages}
                  setPage={setPageNum}
                />
              )}
            </div>
          ) : (
            <PropertyNotFound
              mainMessage={`There is no restaurant with category ${
                data?.getCategory.category
                  ? data.getCategory.category.name
                  : categoryName.current
              }`}
              subMessage="Find a restaurant by clicking on another category!"
            />
          )}
        </>
      )}
    </div>
  );
};
