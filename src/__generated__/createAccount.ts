/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createAccount
// ====================================================

export interface createAccount_createUser {
  __typename: "CoreOuput";
  sucess: boolean;
  error: string | null;
}

export interface createAccount {
  createUser: createAccount_createUser;
}

export interface createAccountVariables {
  createAccountInput: CreateUserInput;
}
