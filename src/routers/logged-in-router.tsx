import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { getCurrentUser } from '../__generated__/getCurrentUser';

const GET_CURRENT_USER = gql`
  query getCurrentUser {
    getCurrentUser {
      sucess
      error
      user {
        id
        email
        name
        role
      }
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<getCurrentUser>(GET_CURRENT_USER, {
    onCompleted: ({ getCurrentUser: { sucess, error, user } }) => {
      if (sucess && user) {
        console.log(user);
      } else {
        console.log(error);
      }
    },
  });
  return (
    <div>
      {loading ? (
        <div className="screen-full-center">
          <span className=" text-2xl font-bold tracking-wider">loading...</span>
        </div>
      ) : (
        <>
          {!data || error ? (
            <span>{error}</span>
          ) : (
            <span>{data?.getCurrentUser.user?.email}</span>
          )}
        </>
      )}
    </div>
  );
};
