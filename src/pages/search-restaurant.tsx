import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const SearchRestaurant = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const searchValue = location.search.split('?search=')[1];
    if (searchValue) {
      console.log(searchValue);
    } else {
      navigate('/restaurant');
    }
  }, [location, navigate]);
  return <div>SearchRestaurtants</div>;
};
