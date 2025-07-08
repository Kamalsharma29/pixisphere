'use client';

import React from 'react';
import Link from 'next/link';

interface PhotographerCardProps {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  tags: string[];
  profilePic: string;
}

const PhotographerCard: React.FC<PhotographerCardProps> = ({
  id,
  name,
  location,
  price,
  rating,
  tags,
  profilePic,
}) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition">
      <img src={profilePic} alt={name} className="w-full h-48 object-cover rounded" />
      <div className="mt-4 space-y-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{location}</p>
        <p className="text-sm">Starting at ₹{price}</p>
        <p className="text-sm">Rating: {rating}⭐</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-200 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/photographers/${id}`}
          className="block text-center bg-blue-600 text-white mt-4 py-2 rounded hover:bg-blue-700"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default PhotographerCard;

