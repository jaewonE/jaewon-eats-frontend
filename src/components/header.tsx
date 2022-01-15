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
    <div className=" w-full flex relative top-0 h-20 min-h-[5rem] pl-3 pr-5 py-2 lg:px-5 xl:px-7">
      <Logo />
      <div className="flex justify-end items-center w-full">
        <div className="text-xs ml-2 lg:ml-3 sm:ml-1 w-9 text-center">
          <Link to="/edit-profile">
            <FontAwesomeIcon icon={faUser} className="text-2xl" />
          </Link>
        </div>
        <div className="text-xs ml-2 lg:ml-3 w-9 text-center">
          <Link to="/login" onClick={handleLogOut}>
            <FontAwesomeIcon icon={faSignOutAlt} className="text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};
