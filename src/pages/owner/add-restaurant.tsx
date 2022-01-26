import { gql, useMutation, useReactiveVar } from '@apollo/client';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { authTokenVar } from '../../apollo';
import { FormError } from '../../components/form-errors';
import { Header } from '../../components/header';
import { InputFileForm } from '../../components/input-file-form';
import { IRouterProps } from '../../routers/owner-routes';
import {
  add_restaurant,
  add_restaurantVariables,
} from '../../__generated__/add_restaurant';

const ADD_RESTAURANT = gql`
  mutation add_restaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      sucess
      error
      restaurantId
    }
  }
`;

export interface IAddRestaurantForm {
  name: string;
  coverImg: FileList;
  address: string;
  categoryName: string;
}

export const AddRestaurant = () => {
  <Helmet>
    <title>JaewonEats | Restaurants overview</title>
  </Helmet>;
  const authToken = useReactiveVar(authTokenVar);
  const [processing, setProcessing] = useState(false);
  const [addRestaurantMutation, { data }] = useMutation<
    add_restaurant,
    add_restaurantVariables
  >(ADD_RESTAURANT, {
    onCompleted: () => {
      setProcessing(false);
      if (data?.createRestaurant.sucess) {
        console.log(data?.createRestaurant.sucess);
      } else {
        console.log(data?.createRestaurant.error);
      }
    },
    onError: (error) => {
      setProcessing(false);
      console.error(error.message);
      alert('Can not add restaurant');
    },
  });
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IAddRestaurantForm>({ mode: 'onChange' });
  const onSubmit = async () => {
    try {
      setProcessing(true);
      const { coverImg, ...formValue } = getValues();
      const actualFile = coverImg[0];
      const formBody = new FormData();
      formBody.append('file', actualFile);
      const data = await (
        await fetch('http://localhost:4000/upload', {
          method: 'POST',
          body: formBody,
          headers: new Headers({
            'x-jwt': authToken ? authToken : '',
            'restaurant-name': encodeURI(formValue.name),
          }),
        })
      ).json();
      console.log(data);
      // addRestaurantMutation({
      //   variables: { input: { ...formValue, coverImg: file } },
      // });
      setProcessing(false);
    } catch (e) {
      console.error(e);
    }
  };
  const switchHeight = (length: number) => {
    switch (length) {
      case 0:
        return 'h-[27rem]';
      case 1:
        return 'h-[28rem]';
      case 2:
        return 'h-[29rem]';
      case 3:
        return 'h-[31rem]';
      case 4:
        return 'h-[33rem]';
      default:
        return 'h-[34rem]';
    }
  };
  return (
    <div className="screen-full flex-center">
      <Header />
      <div className="flex-center bg-[#95a5a6]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`bg-[#ecf0f1] w-full max-w-sm ${switchHeight(
            Object.keys(errors).length
          )} flex flex-col justify-start items-center shadow-lg shadow-gray-600`}
        >
          <div className="bg-gradient-to-r from-yellow-500 via-purple-500 to-green-600 h-2 w-full"></div>
          <div className=" text-4xl font-extralight mt-7 mb-3">
            Add New Restaurant
          </div>
          <div className="flex justify-center items-center w-full mt-3 mb-2">
            <div className=" text-center w-20">
              <span>Name</span>
            </div>
            <input
              {...register('name', { required: 'Name is Required' })}
              className="auth-input h-11"
              name="name"
              required
              placeholder="Name"
              type="text"
            />
          </div>
          {errors.name?.message && (
            <FormError errorMessage={errors.name.message} />
          )}
          <div className="flex justify-center items-center w-full mt-3 mb-2">
            <div className=" text-center w-20">
              <span>Image</span>
            </div>
            <InputFileForm
              watch={watch}
              register={register}
              propertyName="coverImg"
            />
          </div>
          {errors.coverImg?.message && (
            <FormError errorMessage={errors.coverImg.message} />
          )}
          <div className="flex justify-center items-center w-full mt-3 mb-2">
            <div className=" text-center w-20">
              <span>Address</span>
            </div>
            <input
              {...register('address', { required: 'Address is Required' })}
              className="auth-input h-11"
              name="address"
              required
              placeholder="Address"
              type="text"
            />
          </div>
          {errors.address?.message && (
            <FormError errorMessage={errors.address.message} />
          )}
          <div className="flex justify-center items-center w-full mt-3 mb-2">
            <div className=" text-center w-20">
              <span>Category</span>
            </div>
            <input
              {...register('categoryName', {
                required: 'CategoryName is Required',
              })}
              className="auth-input h-11"
              name="categoryName"
              required
              placeholder="CategoryName"
              type="text"
            />
          </div>
          {errors.categoryName?.message && (
            <FormError errorMessage={errors.categoryName.message} />
          )}
          <button
            className={`w-2/3 h-11 text-white text-xl rounded-md mt-4 ${
              isValid ? 'bg-red-500' : 'bg-gray-400'
            } ${(processing || !isValid) && 'pointer-events-none'}`}
          >
            {processing ? 'Processing...' : 'Add Restaurant'}
          </button>
        </form>
      </div>
    </div>
  );
};
