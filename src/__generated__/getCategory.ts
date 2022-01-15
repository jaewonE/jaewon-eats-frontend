/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetCategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getCategory
// ====================================================

export interface getCategory_getAllCategory_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImg: string;
  slug: string;
}

export interface getCategory_getAllCategory {
  __typename: "GetAllCategoryOutput";
  sucess: boolean;
  error: string | null;
  categories: getCategory_getAllCategory_categories[] | null;
}

export interface getCategory_getCategory_category_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  address: string;
  isPromoted: boolean;
}

export interface getCategory_getCategory_category {
  __typename: "Category";
  id: number;
  name: string;
  coverImg: string;
  slug: string;
  restaurants: getCategory_getCategory_category_restaurants[] | null;
}

export interface getCategory_getCategory {
  __typename: "GetCategoryOutput";
  sucess: boolean;
  error: string | null;
  totalPages: number | null;
  totalResult: number | null;
  category: getCategory_getCategory_category | null;
}

export interface getCategory {
  getAllCategory: getCategory_getAllCategory;
  getCategory: getCategory_getCategory;
}

export interface getCategoryVariables {
  input: GetCategoryInput;
}
