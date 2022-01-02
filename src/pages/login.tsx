import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-errors';
import {
  loginMutation,
  loginMutationVariables,
} from '../__generated__/loginMutation';
import { Link } from 'react-router-dom';
import { LoginInput } from '../__generated__/globalTypes';
import { Helmet } from 'react-helmet-async';

import { isLoggedInVar } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../constants';

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      sucess
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
  resultError?: string;
}

export const Login = () => {
  <Helmet>
    <title>JaewonEats | Login</title>
  </Helmet>;
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<ILoginForm>({ mode: 'onChange' });
  const [loginMutation, { loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted: ({ login: { error, sucess, token } }: loginMutation) => {
      if (sucess && token) {
        localStorage.setItem(LOCALSTORAGE_TOKEN, token);
        isLoggedInVar(true);
      } else {
        alert(error);
      }
    },
  });
  const onSubmit = ({ email, password }: LoginInput) => {
    if (!loading) {
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <div className=" bg-[#95a5a6] screen-full-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#ecf0f1] w-full max-w-sm h-96 flex flex-col justify-start items-center shadow-lg shadow-gray-600"
      >
        <div className="bg-gradient-to-r from-green-600 via-purple-500 to-yellow-500 h-2 w-full"></div>
        <div className=" text-4xl font-extralight mt-8">Login</div>
        <input
          required
          className="auth-input my-2"
          {...register('email', {
            required: 'Email is required.',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Please enter a valid email',
            },
          })}
          name="email"
          type="email"
          placeholder="Email"
        />
        {errors.email?.message && (
          <FormError errorMessage={errors.email?.message} />
        )}
        <input
          required
          className="auth-input my-3"
          {...register('password', {
            required: 'Password is required.',
          })}
          name="password"
          type="password"
          placeholder="Password"
        />
        {errors.password?.message && (
          <FormError errorMessage={errors.password?.message} />
        )}
        <button
          className={`w-2/3 h-11 bg-red-500 text-white text-xl rounded-md mt-3 " ${
            isValid ? '' : 'bg-gray-400 pointer-events-none'
          }`}
        >
          Sign in
        </button>
        <div className=" text-xs mt-7">
          Don't have an account?{' '}
          <Link to="/create-account" className=" underline text-blue-400">
            Create account here
          </Link>
        </div>
      </form>
    </div>
  );
};
