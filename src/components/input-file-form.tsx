import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

interface IInputFileForm {
  watch: UseFormWatch<any>;
  register: UseFormRegister<any>;
  propertyName: string;
}

export const InputFileForm: React.FC<IInputFileForm> = ({
  watch,
  register,
  propertyName,
}) => {
  const getCoverImgLenght = () => {
    try {
      const length = watch()[propertyName].length;
      return length;
    } catch (e) {
      return 0;
    }
  };
  return (
    <div className="flex items-center justify-center w-2/3 h-11">
      <label
        htmlFor="add-restaurant-file-input"
        className="relative flex flex-col w-full h-full border-4 border-dashed rounded-md hover:bg-gray-100 hover:border-gray-300"
      >
        <div
          className={`flex items-center ${
            getCoverImgLenght() ? 'justify-start pl-3' : 'justify-center'
          } w-full h-full pb-1 whitespace-nowrap`}
        >
          {getCoverImgLenght() ? (
            <p className="truncate ...">{watch()[propertyName][0].name}</p>
          ) : (
            <>
              {' '}
              <FontAwesomeIcon
                icon={faImage}
                size="sm"
                className="mt-1 opacity-40 mr-2"
              />
              <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                Select a photo
              </p>
            </>
          )}
        </div>
        <input
          {...register(propertyName, {
            required: 'Cover Image is Required',
          })}
          type="file"
          id="add-restaurant-file-input"
          className="opacity-0 pointer-events-none absolute"
          name={propertyName}
          required
        />
      </label>
    </div>
  );
};
