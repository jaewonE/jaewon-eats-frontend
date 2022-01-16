/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindRestaurantByIdInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: findRestaurant
// ====================================================

export interface findRestaurant_findRestaurant_restaurant_category {
  __typename: "Category";
  slug: string;
  name: string;
}

export interface findRestaurant_findRestaurant_restaurant_menu_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface findRestaurant_findRestaurant_restaurant_menu_options {
  __typename: "DishOption";
  name: string;
  choices: findRestaurant_findRestaurant_restaurant_menu_options_choices[] | null;
  extra: number | null;
}

export interface findRestaurant_findRestaurant_restaurant_menu {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string | null;
  options: findRestaurant_findRestaurant_restaurant_menu_options[] | null;
}

export interface findRestaurant_findRestaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: findRestaurant_findRestaurant_restaurant_category | null;
  address: string;
  isPromoted: boolean;
  ownerId: number;
  menu: findRestaurant_findRestaurant_restaurant_menu[];
}

export interface findRestaurant_findRestaurant {
  __typename: "FindRestaurantByIdOutput";
  sucess: boolean;
  error: string | null;
  restaurant: findRestaurant_findRestaurant_restaurant | null;
}

export interface findRestaurant {
  findRestaurant: findRestaurant_findRestaurant;
}

export interface findRestaurantVariables {
  input: FindRestaurantByIdInput;
}
