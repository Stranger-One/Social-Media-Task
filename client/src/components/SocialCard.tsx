import React from 'react';
import { Link } from 'react-router-dom';

interface MediaProps {
    media: {
        _id: string;
        images: string[];
        name: string;
        socialMediaHandle: string;
    };
}

const SocialCard: React.FC<MediaProps> = ({ media }) => {
    // console.log("media", media);

    return (
        <Link to={`/dashboard/media/${media._id}`} className=" bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <div className="w-full h-[200px] bg-gray-600 rounded-md bg-cover bg-center" style={{
                backgroundImage: `url(${media.images[0]})`
            }}></div>
            <h2 className="text-lg font-semibold capitalize">{media.name}</h2>
            <p className="text-gray-500">{media.socialMediaHandle}</p>
        </Link>
    );
};

export default SocialCard;
