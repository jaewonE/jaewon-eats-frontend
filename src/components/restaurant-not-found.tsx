import React from 'react';

interface IRestaurantNotFound {
  searchValue?: string;
}

export const RestaurantNotFound: React.FC<IRestaurantNotFound> = ({
  searchValue,
}) => (
  <div className="w-full h-full flex-center justify-start pt-10">
    <div className=" text-[13rem] font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-500 via-purple-500 to-blue-600">
      0
    </div>
    {searchValue && (
      <div className="text-2xl font-semibold text-center relative bottom-7">
        There is no restaurant name that contains an {searchValue}
      </div>
    )}
    <div className="text-xl text-center py-7 relative bottom-7">
      Enter a different search term to find a restaurant!
    </div>
  </div>
);
