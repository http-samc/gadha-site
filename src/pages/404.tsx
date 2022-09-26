import React from 'react';

const PageNotFound = () => {
  return (
    <div className="grid min-h-[400px] place-items-center">
      <div className="flex items-center space-x-4 font-mono text-red-400/75">
        <h1 className="text-2xl font-bold">404 |</h1>
        <h2 className="text-lg font-bold lowercase">Page Not Found</h2>
      </div>
    </div>
  );
};

export default PageNotFound;
