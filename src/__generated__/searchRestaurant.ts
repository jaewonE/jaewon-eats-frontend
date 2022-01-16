/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchRestaurantByNameInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchRestaurant
// ====================================================

export interface searchRestaurant_searchRestaurant_restaurants_category {
  __typename: "Category";
  slug: string;
  name: string;
}

export interface searchRestaurant_searchRestaurant_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: searchRestaurant_searchRestaurant_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface searchRestaurant_searchRestaurant {
  __typename: "SearchRestaurantByNameOutput";
  sucess: boolean;
  error: string | null;
  totalPages: number | null;
  totalResult: number | null;
  restaurants: searchRestaurant_searchRestaurant_restaurants[] | null;
}

export interface searchRestaurant {
  searchRestaurant: searchRestaurant_searchRestaurant;
}

export interface searchRestaurantVariables {
  input: SearchRestaurantByNameInput;
}
