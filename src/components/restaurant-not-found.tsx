import React from 'react';

interface IPropertyNotFound {
  mainMessage: string;
  subMessage?: string;
}

export const PropertyNotFound: React.FC<IPropertyNotFound> = ({
  mainMessage,
  subMessage,
}) => (
  <div className="w-full h-full flex-center justify-start pt-10">
    <div className=" text-[13rem] font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-500 via-purple-500 to-blue-600">
      0
    </div>
    <div className="text-2xl font-semibold text-center px-3 relative bottom-7">
      {mainMessage}
    </div>
    {subMessage && (
      <div className="text-xl text-center py-7 px-3 relative bottom-7">
        {subMessage}
      </div>
    )}
  </div>
);
