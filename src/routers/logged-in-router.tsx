import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useUser } from '../hooks/getCurrentUser';
import { PageNotFound } from '../pages/pageNotFound';
import { UserRole } from '../__generated__/globalTypes';
import { ClientRoutes } from './client-routes';

export const LoggedInRouter = () => {
  const { data, loading, error } = useUser();
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
            <BrowserRouter>
              <Routes>
                {data.getCurrentUser.user?.role === UserRole.Client &&
                  ClientRoutes}
                <Route element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
          )}
        </>
      )}
    </div>
  );
};
