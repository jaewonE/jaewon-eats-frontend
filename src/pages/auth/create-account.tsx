import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { FormError } from '../../components/form-errors';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CreateUserInput, UserRole } from '../../__generated__/globalTypes';
import {
  createAccount,
  createAccountVariables,
} from '../../__generated__/createAccount';

const LOGIN_MUTATION = gql`
  mutation createAccount($createAccountInput: CreateUserInput!) {
    createUser(input: $createAccountInput) {
      sucess
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const navigate = useNavigate();
  <Helmet>
    <title>JaewonEats | Create Account</title>
  </Helmet>;
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<ILoginForm>({
    mode: 'onChange',
    defaultValues: {
      role: UserRole.Client,
    },
  });
  const [createAccount, { loading }] = useMutation<
    createAccount,
    createAccountVariables
  >(LOGIN_MUTATION, {
    onCompleted: ({ createUser: { error, sucess } }: createAccount) => {
      if (sucess) {
        alert('Account Created! Log in now!');
        navigate('/login', { replace: true });
      } else {
        alert(error);
      }
    },
  });
  const onSubmit = ({ email, password, name, role }: CreateUserInput) => {
    if (!loading) {
      createAccount({
        variables: {
          createAccountInput: {
            email,
            password,
            name,
            role,
          },
        },
      });
    }
  };
  return (
    <div className=" bg-[#95a5a6] screen-full flex-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#ecf0f1] w-full max-w-sm h-[26rem] flex flex-col justify-start items-center shadow-lg shadow-gray-600"
      >
        <div className="bg-gradient-to-r from-yellow-500 via-purple-500 to-green-600 h-2 w-full"></div>
        <div className=" text-4xl font-extralight mt-5 mb-3">
          Create Account
        </div>
        <input
          required
          className="auth-input my-2"
          {...register('name', { required: 'Name is required.' })}
          name="name"
          type="text"
          placeholder="Name"
        />
        {errors.name?.message && (
          <FormError errorMessage={errors.name?.message} />
        )}
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
          className="auth-input my-2"
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
        <select
          className="auth-input h-8 my-2"
          {...register('role', { required: 'role is required.' })}
          name="role"
          required
          defaultValue={UserRole.Client}
        >
          {Object.keys(UserRole).map((role, index) => (
            <option key={index}>{role}</option>
          ))}
        </select>
        <button
          className={`w-2/3 h-11 bg-red-500 text-white text-xl rounded-md mt-2 " ${
            isValid ? '' : 'bg-gray-400 pointer-events-none'
          }`}
        >
          Sign up
        </button>
        <div className=" text-xs mt-3">
          Already have an account?{' '}
          <Link to="/login" className=" underline text-blue-400">
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
};
