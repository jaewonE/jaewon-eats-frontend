import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { isLoggedInVar } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../constants';
import { UseUser } from '../hooks/getCurrentUser';
import { LoadingForm } from '../pages/errors/loading';
import { PageNotFound } from '../pages/errors/pageNotFound';
import { EditProfile } from '../pages/user/edit-profile';
import { UserRole } from '../__generated__/globalTypes';
import { ClientRoutes } from './client-routes';

export const LoggedInRouter = () => {
  const { data, loading, error } = UseUser();
  if (!data || loading || error) {
    if (!loading && error) {
      if (error.message === 'Failed to fetch') {
        console.error('Server Error');
        localStorage.removeItem(LOCALSTORAGE_TOKEN);
        isLoggedInVar(false);
      }
      const response: any = error.graphQLErrors[0].extensions.response;
      if (
        response?.statusCode === 404 &&
        response?.message === 'User not found'
      ) {
        localStorage.removeItem(LOCALSTORAGE_TOKEN);
        isLoggedInVar(false);
        return <PageNotFound error="User Not Found" />;
      } else {
        return <PageNotFound error="Unexpected Error" />;
      }
    }
    if (!loading && error?.message.includes('jwt')) {
      localStorage.removeItem(LOCALSTORAGE_TOKEN);
      isLoggedInVar(false);
      return <PageNotFound error="Error: jwt malformed" />;
    }
    if (data?.getCurrentUser.error) {
      console.error(data?.getCurrentUser.error);
    }
    return <LoadingForm />;
  }
  const user = data.getCurrentUser.user;
  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/" />} />,
      <Route path="/page-not-found" element={<PageNotFound />} />
      <Route path="/edit-profile" element={<EditProfile user={user} />} />,
      {user?.role === UserRole.Client && ClientRoutes}
      <Route path="/" element={<Navigate to="/edit-profile" />} />,
      {/* <Route path="*" element={<Navigate to="/page-not-found" />} /> */}
    </Routes>
  );
};
