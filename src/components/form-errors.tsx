import React from 'react';

interface IFromError {
  errorMessage: string;
}

export const FormError: React.FC<IFromError> = ({ errorMessage }) => (
  <span className="text-red-600 font-bold text-md">{errorMessage}</span>
);
