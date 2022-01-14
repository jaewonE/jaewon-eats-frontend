/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserGender, UserRole } from "./globalTypes";

// ====================================================
// GraphQL fragment: EditedUser
// ====================================================

export interface EditedUser {
  __typename: "User";
  email: string;
  emailVarifed: boolean;
  name: string;
  age: number | null;
  gender: UserGender | null;
  role: UserRole;
}
