import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

const MyFunctionalComponent: React.FC = () => {
  return (
    <div className='w-full min-h-screen bg-gray-100'>
      <Outlet />
      <div><Toaster/></div>
    </div>
  );
};

export default MyFunctionalComponent;
