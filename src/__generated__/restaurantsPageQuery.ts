/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaginationInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restaurantsPageQuery
// ====================================================

export interface restaurantsPageQuery_getAllCategory_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImg: string;
  slug: string;
}

export interface restaurantsPageQuery_getAllCategory {
  __typename: "GetAllCategoryOutput";
  sucess: boolean;
  error: string | null;
  categories: restaurantsPageQuery_getAllCategory_categories[] | null;
}

export interface restaurantsPageQuery_findAllRestaurant_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface restaurantsPageQuery_findAllRestaurant_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: restaurantsPageQuery_findAllRestaurant_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface restaurantsPageQuery_findAllRestaurant {
  __typename: "FindAllRestaurantOutput";
  sucess: boolean;
  error: string | null;
  totalPages: number | null;
  totalResult: number | null;
  restaurants: restaurantsPageQuery_findAllRestaurant_restaurants[] | null;
}

export interface restaurantsPageQuery {
  getAllCategory: restaurantsPageQuery_getAllCategory;
  findAllRestaurant: restaurantsPageQuery_findAllRestaurant;
}

export interface restaurantsPageQueryVariables {
  input: PaginationInput;
}
