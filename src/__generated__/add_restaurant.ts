/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: add_restaurant
// ====================================================

export interface add_restaurant_createRestaurant {
  __typename: "CreateRestaurantOutput";
  sucess: boolean;
  error: string | null;
  restaurantId: number | null;
}

export interface add_restaurant {
  createRestaurant: add_restaurant_createRestaurant;
}

export interface add_restaurantVariables {
  input: CreateRestaurantInput;
}
