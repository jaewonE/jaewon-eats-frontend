import React from 'react';

interface IFormCategoryIcon {
  name: string;
  coverImg: string;
  slug: string;
}

export const FormCategoryIcon: React.FC<IFormCategoryIcon> = ({
  name,
  coverImg,
  slug,
}: IFormCategoryIcon) => (
  <div className="flex-center min-w-max sm:w-28 sm:h-28 w-24 h-24 pt-3 pb-1 m-2">
    <img
      alt={slug}
      src={require(`../images/icons/category/${coverImg}`)}
      className="object-center rounded-full p-1 sm:w-16 w-14 bg-gray-300"
    />
    <div className="mt-1 text-sm sm:text-md font-medium text-center">
      {name}
    </div>
  </div>
);
