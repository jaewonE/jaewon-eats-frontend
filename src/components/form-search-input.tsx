import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useForm } from 'react-hook-form';
import { createSearchParams, useNavigate } from 'react-router-dom';

export interface ISearchInput {
  defaultValues?: string;
}

interface ISearchForm {
  input: string;
}

export const SearchInput: React.FC<ISearchInput> = ({ defaultValues }) => {
  const navigate = useNavigate();
  const { handleSubmit, register, watch } = useForm<ISearchForm>({
    mode: 'onSubmit',
    defaultValues: {
      input: defaultValues ? defaultValues : '',
    },
  });
  const searchInput = watch('input', '');
  const onSubmit = ({ input }: ISearchForm) => {
    navigate({
      pathname: '/search',
      search: `?${createSearchParams({ search: input })}`,
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="group flex-center h-1/6 sm:h-1/5 md:h-1/4 min-h-[20%] bg-gray-500 relative"
    >
      <input
        required
        className="auth-input h-14 text-xl pl-7 group-focus:ring-2"
        {...register('input', { required: 'Enter restaurants...' })}
        name="input"
        type="text"
        placeholder="Search restaurants..."
      />
      <button type="submit">
        <FontAwesomeIcon
          icon={faSearch}
          className={`sm:text-2xl text-xl absolute top-[45%] md:top-[46%] sm:right-[19%] right-[20%]
         opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out ${
           searchInput ? 'sm:opacity-100' : 'sm:opacity-0 pointer-events-none'
         }`}
        />
      </button>
    </form>
  );
};
