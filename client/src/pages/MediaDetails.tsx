import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface mediaFace {
    _id: string;
    images: string[];
    name: string;
    socialMediaHandle: string;
}

const MediaDetails: React.FC = () => {
    const [media, setMedia] = useState<mediaFace>()
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchMediaDetails = async () => {

            const token = JSON.parse(localStorage.getItem("token") || '""');
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/media/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response?.data?.success) {
                setMedia(response.data.data);
                // console.log(response.data.data);
            }
            setLoading(false)
        };
        fetchMediaDetails();
    }, [id]);

    return (
        <div className='w-full min-h-screen bg-gray-200 p-4'>
            {!loading ? (
                <>
                    <div className="">
                        <h2 className='text-xl capitalize'><span className='font-bold'>Name:</span> {media?.name}</h2>
                        <h2 className='text-xl'><span className='font-bold'>Social Media:</span> {media?.socialMediaHandle} </h2>
                    </div>
                    <div className="columns-[250px] gap-2 mt-5 border-2 border-gray-600 p-2">
                        {media?.images?.map((image: string, index: number) => (
                            <img key={index} src={image} alt={`Media Image ${index + 1}`} className="w-full h-auto mb-2" />
                        ))}
                    </div>
                </>
            ) : (
                <div className="w-full h-full col-span-full flex items-center justify-center">
                    <h1 className='text-3xl font-bold'>Loading...</h1>
                </div>
            )}
        </div>
    );
};

export default MediaDetails;
