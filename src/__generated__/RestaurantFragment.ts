/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RestaurantFragment
// ====================================================

export interface RestaurantFragment_category {
  __typename: "Category";
  slug: string;
  name: string;
}

export interface RestaurantFragment {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: RestaurantFragment_category | null;
  address: string;
  isPromoted: boolean;
}
