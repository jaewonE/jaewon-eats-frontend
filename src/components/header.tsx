import { useReactiveVar } from '@apollo/client';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Raect from 'react';
import { Link } from 'react-router-dom';
import { authTokenVar, isLoggedInVar } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../constants';
import { Logo } from './logo';

interface IHeaderOptions {
  fixed?: boolean;
}

export const Header = ({ fixed = false }: IHeaderOptions) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const handleLogOut = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    isLoggedInVar(false);
    authTokenVar(undefined);
  };
  return (
    <div
      className={`w-full flex top-0 h-20 min-h-[5rem] pl-3 pr-5 py-2 lg:px-5 xl:px-7 bg-white ${
        fixed ? 'fixed' : 'relative'
      }`}
    >
      <Logo />
      <div className="flex justify-end items-center w-full">
        <div className="text-xs ml-2 lg:ml-3 sm:ml-1 w-9 text-center">
          <Link to={isLoggedIn ? '/edit-profile' : '/login'}>
            <FontAwesomeIcon icon={faUser} className="text-2xl" />
          </Link>
        </div>
        {isLoggedIn && (
          <div className="text-xs ml-2 lg:ml-3 w-9 text-center">
            <Link to="/login" onClick={handleLogOut}>
              <FontAwesomeIcon icon={faSignOutAlt} className="text-2xl" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
