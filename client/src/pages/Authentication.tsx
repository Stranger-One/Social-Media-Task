import React from 'react';
import { Outlet } from 'react-router-dom';

const Authentication: React.FC = () => {
    return (
        <div className='w-full min-h-screen bg-gray-200 flex items-center justify-center'>
            <Outlet/>
        </div>
    );
};

export default Authentication;
