import React from 'react';

interface IPageToggle {
  page: number;
  totalPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const PageToggle: React.FC<IPageToggle> = ({
  page,
  setPage,
  totalPage,
}) => {
  const onNextPageClick = () => setPage(page + 1);
  const onPrevPageClick = () => setPage(page - 1);
  return (
    <div className=" h-20 w-full flex justify-center">
      {page > 1 ? (
        <button
          onClick={onPrevPageClick}
          className="w-1/3 md:w-1/6 h-full flex justify-center items-center focus:outline-none font-medium text-2xl"
        >
          &larr;
        </button>
      ) : (
        <div className="w-1/3 md:w-1/6 h-full flex justify-center items-center "></div>
      )}
      <span className="w-1/3 h-full flex justify-center items-center ">
        Page {page} of {totalPage}
      </span>
      {page !== totalPage ? (
        <button
          onClick={onNextPageClick}
          className="w-1/3 md:w-1/6 h-full flex justify-center items-center focus:outline-none font-medium text-2xl"
        >
          &rarr;
        </button>
      ) : (
        <div className="w-1/3 md:w-1/6 h-full flex justify-center items-center "></div>
      )}
    </div>
  );
};
