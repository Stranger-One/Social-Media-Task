import React from 'react';
import SubmissionForm from '../components/SubmissionForm';

const Home: React.FC = () => {
    return (
        <div className='w-full min-h-screen bg-gray-200 flex items-center justify-center'>
            <SubmissionForm/>
        </div>
    );
};

export default Home;
