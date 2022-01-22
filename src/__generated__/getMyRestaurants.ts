/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMyRestaurants
// ====================================================

export interface getMyRestaurants_myRestaurants_restaurants_category {
  __typename: "Category";
  slug: string;
  name: string;
}

export interface getMyRestaurants_myRestaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: getMyRestaurants_myRestaurants_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface getMyRestaurants_myRestaurants {
  __typename: "MyRestaurantsOutput";
  sucess: boolean;
  error: string | null;
  restaurants: getMyRestaurants_myRestaurants_restaurants[];
}

export interface getMyRestaurants {
  myRestaurants: getMyRestaurants_myRestaurants;
}
