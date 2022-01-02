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

export interface CreateUserInput {
  name: string;
  age?: number | null;
  email: string;
  gender?: UserGender | null;
  password: string;
  role: UserRole;
}

export interface LoginInput {
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
