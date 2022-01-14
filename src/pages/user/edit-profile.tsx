import { gql, useApolloClient, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormError } from '../../components/form-errors';
import { Header } from '../../components/header';
import { getCurrentUser_getCurrentUser_user } from '../../__generated__/getCurrentUser';
import {
  UpdateUserInput,
  UserGender,
  UserRole,
} from '../../__generated__/globalTypes';
import {
  updateUser,
  updateUserVariables,
} from '../../__generated__/updateUser';

const UPDATE_USER = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(input: $updateUserInput) {
      sucess
      error
    }
  }
`;

interface IEditProfileForm {
  email: string;
  age?: number;
  gender?: UserGender;
  password: string;
  name: string;
  role: UserRole;
}

export const EditProfile = ({
  user,
}: {
  user: getCurrentUser_getCurrentUser_user | null | undefined;
}) => {
  const navigate = useNavigate();
  const [updatedInfo, setUpdatedInfo] = useState<UpdateUserInput>({});
  const client = useApolloClient();
  if (!user) {
    navigate('/page-not-found');
  }
  <Helmet>
    <title>JaewonEats | Edit Profile</title>
  </Helmet>;
  const [changePassword, toggleChangePassword] = useState(false);
  const [editProfile, { loading }] = useMutation<
    updateUser,
    updateUserVariables
  >(UPDATE_USER, {
    onCompleted: ({ updateUser: { sucess, error } }: updateUser) => {
      if (sucess) {
        console.log('updatedInfo');
        console.log(updatedInfo);
        client.writeFragment({
          id: `User:${user?.id}`,
          fragment: gql`
            fragment EditedUser on User {
              email
              emailVarifed
              name
              age
              gender
              role
            }
          `,
          data: {
            email: updatedInfo.email ? updatedInfo.email : user?.email,
            emailVarifed: updatedInfo.email ? false : user?.emailVarifed,
            name: updatedInfo.name ? updatedInfo.name : user?.name,
            age: updatedInfo.age ? updatedInfo.age : user?.age,
            gender: updatedInfo.gender ? updatedInfo.gender : user?.gender,
            role: updatedInfo.role ? updatedInfo.role : user?.role,
          },
        });
        alert('Profile updated');
      } else {
        console.error(error);
        alert('Error: Can not update profile');
      }
    },
  });
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<IEditProfileForm>({
    mode: 'onChange',
    defaultValues: {
      email: user?.email ? user.email : undefined,
      age: user?.age ? user.age : undefined,
      gender: user?.gender ? user.gender : undefined,
      password: undefined,
      name: user?.name ? user.name : undefined,
      role: user?.role ? user.role : undefined,
    },
  });
  const onSubmit = (updated: UpdateUserInput) => {
    if (!loading) {
      if (!updated.email || updated.email === user?.email) delete updated.email;
      if (!updated.age || updated.age === user?.age) {
        delete updated.age;
      } else {
        updated.age = Number(updated.age);
      }
      if (!updated.gender || updated.gender === user?.gender)
        delete updated.gender;
      if (!updated.password) delete updated.password;
      if (!updated.name || updated.name === user?.name) delete updated.name;
      if (!updated.role || updated.role === user?.role) delete updated.role;
      if (Object.keys(updated).length) {
        setUpdatedInfo(updated);
        console.log('updated');
        console.log(updated);
        editProfile({
          variables: {
            updateUserInput: { ...updated },
          },
        });
      } else {
        alert('Profile updated');
      }
    }
  };
  return (
    <div className="screen-full flex flex-col justify-start">
      <Header />
      <div className=" bg-[#95a5a6] flex-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#ecf0f1] w-full max-w-sm h-[29rem] flex flex-col justify-start items-center shadow-lg shadow-gray-600"
        >
          <div className="bg-gradient-to-r from-purple-500 via-green-600 to-yellow-500 h-2 w-full"></div>
          <div className=" text-4xl font-extralight mt-4 mb-2">
            Edit Profile
          </div>
          <div className="flex justify-center items-center w-full  my-2">
            <div className=" text-center w-20">
              <label htmlFor="name">Name</label>
            </div>
            <input
              required
              className="auth-input"
              {...register('name', { required: 'Name is required.' })}
              name="name"
              id="name"
              type="text"
              placeholder="Enter your name here"
            />
          </div>
          {errors.name?.message && (
            <FormError errorMessage={errors.name?.message} />
          )}
          <div className="flex justify-center items-center w-full  my-2">
            <div className=" text-center w-20">
              <label htmlFor="email">Email</label>
            </div>
            <input
              required
              className="auth-input"
              {...register('email', {
                required: 'Email is required.',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email',
                },
              })}
              name="email"
              id="email"
              type="email"
              placeholder="Enter your email here"
            />
          </div>
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <div className="flex justify-center items-center w-full  my-2">
            <div className=" text-center w-20">
              <label htmlFor="password">Password</label>
            </div>
            {changePassword ? (
              <input
                required
                className="auth-input"
                {...register('password', {
                  required: 'Password is required.',
                  minLength: 4,
                })}
                name="password"
                id="password"
                type="password"
                placeholder="Enter your password here"
              />
            ) : (
              <button
                className="auth-input bg-green-100 text-black hover:bg-red-500 hover:bg-opacity-50 hover:text-white transition-colors"
                onClick={() => toggleChangePassword(true)}
              >
                Click to change password
              </button>
            )}
          </div>
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === 'minLength' && (
            <FormError errorMessage="Password must be more than 4 chars." />
          )}
          <div className="flex justify-center items-center w-full  my-2">
            <div className=" text-center w-20">
              <label htmlFor="age">Age</label>
            </div>
            <input
              className="auth-input"
              {...register('age')}
              name="age"
              id="age"
              type="number"
              placeholder="Enter your age here"
            />
          </div>
          <div className="flex justify-center items-center w-full  my-2">
            <div className=" text-center w-20">
              <label htmlFor="role">Role</label>
            </div>
            <select
              className="auth-input h-8"
              {...register('role', { required: 'role is required.' })}
              name="role"
              id="role"
              required
              defaultValue={UserRole.Client}
            >
              {Object.keys(UserRole).map((role, index) => (
                <option key={index}>{role}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-center items-center w-full  my-2">
            <div className=" text-center w-20">
              <label htmlFor="gender">Gender</label>
            </div>
            <select
              className="auth-input h-8"
              {...register('gender')}
              name="gender"
              id="gender"
              defaultValue={UserGender.Genderless}
            >
              {Object.keys(UserGender).map((role, index) => (
                <option key={index}>{role}</option>
              ))}
            </select>
          </div>
          {Object.keys(errors).length < 2 && (
            <button
              type="submit"
              className={`w-2/3 ${
                Object.keys(errors).length === 1
                  ? 'h-8 relative bottom-1'
                  : 'h-11'
              } bg-red-500 text-white text-xl rounded-md mt-2 ${
                !isValid && 'bg-gray-400'
              } ${(!isValid || loading) && 'pointer-events-none'}`}
            >
              {loading ? 'Loading' : 'Update'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
