import React, { useEffect, useState } from 'react';
import SocialCard from '../components/SocialCard';
import axios from 'axios';



const AllMedia: React.FC = () => {
    const [allMedia, setAllMedia] = useState([])
    const [loading, setLoading] = useState(true)


    const fetchAllMedia = async () => {
        const token = JSON.parse(localStorage.getItem("token") || '""');
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/media/get-all`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("response", response.data);
        if(response?.data?.success){
            setAllMedia(response.data.media)
        }
        setLoading(false)

    }

    useEffect(()=>{
        fetchAllMedia()
    }, [])

    interface mediaFormat{
        _id: string,
        images: string[],
        name: string,
        socialMediaHandle: string
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mt-5">
            {!loading ?( allMedia.length ? allMedia.map((media: mediaFormat) => (
                <SocialCard key={media._id} media={media} />
            )) : (
                <div className="w-full h-full col-span-full flex items-center justify-center">
                    <h1 className='text-3xl font-bold'>No Media Added Yet</h1>
                </div>
            )) : (
                <div className="w-full h-full col-span-full flex items-center justify-center">
                    <h1 className='text-3xl font-bold'>Loading...</h1>
                </div>
            )}
        </div>
    );
};

export default AllMedia;
