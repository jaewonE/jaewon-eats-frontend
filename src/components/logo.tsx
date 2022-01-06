import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ position }: { position?: string }) => {
  return (
    <div className={`${position} text-3xl flex items-center font-semibold `}>
      <Link to="/">
        <span>Jaewon</span>
        <span className="ml-1 text-green-500">Eats</span>
      </Link>
    </div>
  );
};
