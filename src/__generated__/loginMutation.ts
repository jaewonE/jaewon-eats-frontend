/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: loginMutation
// ====================================================

//front에서설정한명령어이름_back에서설정한명령어이름
export interface loginMutation_login {
  __typename: 'LoginOutput';
  sucess: boolean;
  token: string | null;
  error: string | null;
}

export interface loginMutation {
  login: loginMutation_login;
}

export interface loginMutationVariables {
  loginInput: LoginInput;
}
