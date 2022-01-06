import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Raect from 'react';
import { Link } from 'react-router-dom';
import { authTokenVar, isLoggedInVar } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../constants';
import { Logo } from './logo';

export const Header = () => {
  const handleLogOut = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    isLoggedInVar(false);
    authTokenVar(undefined);
  };
  return (
    <div className=" w-full flex relative top-0 h-20 p-2 pt-4 md:px-3 lg:px-5 xl:px-8">
      <Logo position="mx-2" />
      <div className="flex justify-end items-center w-full">
        <div className="text-xs ml-2 sm:ml-1 w-9 text-center">
          <Link to="/edit-profile">
            <FontAwesomeIcon icon={faUser} className="text-2xl" />
          </Link>
        </div>
        <div className="text-xs ml-2 w-9 text-center">
          <Link to="/login" onClick={handleLogOut}>
            <FontAwesomeIcon icon={faSignOutAlt} className="text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};
