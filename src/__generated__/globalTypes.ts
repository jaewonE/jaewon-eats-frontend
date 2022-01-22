/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserGender {
  Female = "Female",
  Genderless = "Genderless",
  Male = "Male",
}

export enum UserRole {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
}

export interface CategorySelector {
  slug?: string | null;
  id?: number | null;
}

export interface CreateRestaurantInput {
  name: string;
  coverImg: string;
  address: string;
  categoryName: string;
}

export interface CreateUserInput {
  name: string;
  age?: number | null;
  email: string;
  gender?: UserGender | null;
  password: string;
  role: UserRole;
}

export interface FindRestaurantByIdInput {
  restaurantId: number;
}

export interface GetCategoryInput {
  page: number;
  take: number;
  selector: CategorySelector;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface PaginationInput {
  page: number;
  take: number;
}

export interface SearchRestaurantByNameInput {
  page: number;
  take: number;
  restaurantName: string;
}

export interface UpdateUserInput {
  name?: string | null;
  age?: number | null;
  email?: string | null;
  gender?: UserGender | null;
  password?: string | null;
  role?: UserRole | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
