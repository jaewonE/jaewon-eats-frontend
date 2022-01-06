/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserGender, UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: getCurrentUser
// ====================================================

export interface getCurrentUser_getCurrentUser_user {
  __typename: "User";
  id: number;
  email: string;
  emailVarifed: boolean;
  name: string;
  age: number | null;
  gender: UserGender | null;
  role: UserRole;
}

export interface getCurrentUser_getCurrentUser {
  __typename: "UserOutput";
  sucess: boolean;
  error: string | null;
  user: getCurrentUser_getCurrentUser_user | null;
}

export interface getCurrentUser {
  getCurrentUser: getCurrentUser_getCurrentUser;
}
