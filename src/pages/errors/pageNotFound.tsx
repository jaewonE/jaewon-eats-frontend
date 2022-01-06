import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedInVar } from '../../apollo';

export const PageNotFound = ({ error }: { error?: string }) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  if (error) {
    alert(error);
  }
  return (
    <div className="screen-full flex-center bg-[#ff822d] opacity-80">
      <div className=" text-[10rem] font-bold text-white opacity-80">404</div>
      <div className="text-2xl text-center text-white relative bottom-7">
        We're sorry but it looks like that page doesn't exist anymore
      </div>
      <div className="text-xl text-center text-white">
        move to{' '}
        {isLoggedIn ? (
          <Link
            to="/"
            className="text-blue-600 underline text-opacity-80 font-bold text-extralight"
          >
            Home page &rarr;
          </Link>
        ) : (
          <Link
            to="/login"
            className="text-blue-600 underline text-opacity-80 font-bold text-extralight"
          >
            Login page &rarr;
          </Link>
        )}
      </div>
    </div>
  );
};
