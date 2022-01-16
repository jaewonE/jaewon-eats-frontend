import React from 'react';
import { useNavigate } from 'react-router-dom';

interface IFormRestaurantCard {
  id: number;
  name: string;
  coverImg: string;
  categoryName?: string;
  address: string;
}

export const FormRestaurantCard: React.FC<IFormRestaurantCard> = ({
  id,
  name,
  coverImg,
  categoryName,
  address,
}) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(
      {
        pathname: `/restaurant/${id}`,
      },
      { replace: false }
    );
  };
  return (
    <div
      key={id}
      className=" h-56 w-96 my-3 rounded-2xl bg-red-50 shadow-md shadow-gray-400"
      onClick={onClick}
    >
      <img
        className="w-full h-2/3 object-cover overflow-hidden rounded-t-2xl"
        alt={name}
        src={require(`../images/coverImg/restaurants/${coverImg}`)}
      />
      <div className="flex flex-col items-start justify-start w-full py-2 px-4">
        <div className="text-xl font-medium pb-[2px]">{`${name}`}</div>
        <div className="text-sm whitespace-nowrap overflow-hidden">
          {categoryName ? (
            `${categoryName} | ${
              address.length + categoryName.length > 40
                ? `${address.substring(0, 48 - categoryName.length)}...`
                : address
            }`
          ) : (
            <div>
              {address.length > 49 ? `${address.substring(0, 49)}...` : address}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
