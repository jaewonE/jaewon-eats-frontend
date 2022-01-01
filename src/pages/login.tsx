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
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<ILoginForm>({ mode: 'onChange' });
  const [loginMutation] = useMutation<loginMutation, loginMutationVariables>(
    LOGIN_MUTATION,
    {
      onCompleted: ({ login: { error, sucess, token } }: loginMutation) => {
        if (sucess) {
          console.log(token);
        } else {
          alert(error);
        }
      },
    }
  );
  const onSubmit = ({ email, password }: LoginInput) => {
    loginMutation({
      variables: {
        loginInput: {
          email,
          password,
        },
      },
    });
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
          className="w-2/3 h-12 border-[1px] border-gray-400 rounded-md my-3 pl-3 placeholder:font-medium outline-none focus:ring-1 focus:ring-green-500 mt-7"
          {...register('email', { required: 'Email is required.' })}
          name="email"
          type="email"
          placeholder="Email"
        />
        {errors.email?.message && (
          <FormError errorMessage={errors.email?.message} />
        )}
        <input
          required
          className="w-2/3 h-12 border-[1px] border-gray-400 rounded-md my-3 pl-3 placeholder:font-medium outline-none focus:ring-1 focus:ring-green-500"
          {...register('password', {
            required: 'Password is required.',
            minLength: 4,
          })}
          name="password"
          type="password"
          placeholder="Password"
        />
        {errors.password?.message && (
          <FormError errorMessage={errors.password?.message} />
        )}
        {errors.password?.type === 'minLength' && (
          <FormError errorMessage="Password must be more than 4 chars." />
        )}
        <button
          className={`w-2/3 h-11 bg-red-500 text-white text-xl rounded-md mt-3" ${
            isValid ? 'mt-3' : 'bg-gray-400 pointer-events-none'
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
