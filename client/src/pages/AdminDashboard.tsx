import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate('/')
    }

    return (
        <div className='w-full min-h-screen bg-gray-200 relative'>
            <div className="flex items-center justify-between border-b-2 bg-gray-200 border-gray-600 p-4 sticky top-0">
                <h1 className='text-3xl font-bold'>Admin Dashboard</h1>
                <button
                type='button'
                onClick={handleLogout}
                    className=" bg-blue-500 font-semibold text-lg text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Log out
                </button>
            </div>

            <Outlet/>
        </div>
    );
};

export default AdminDashboard;
