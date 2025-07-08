'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import InquiryModal from '@/components/InquiryModal';

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface Photographer {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  styles: string[];
  tags: string[];
  bio: string;
  profilePic: string;
  portfolio: string[];
  reviews: Review[];
}

export default function PhotographerProfilePage() {
  const { id } = useParams();
  const [photographer, setPhotographer] = useState<Photographer | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        const res = await fetch('/data/photographers.json');
        const data = await res.json();

        const match = data.photographers.find((p: Photographer) => p.id === Number(id));
        setPhotographer(match || null);
      } catch (error) {
        console.error('Failed to fetch photographer:', error);
        setPhotographer(null);
      }
    };

    if (id) fetchPhotographer();
  }, [id]);

  if (!photographer) {
    return <div className="p-6">Photographer not found.</div>;
  }

  return (
    <main className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-2">{photographer.name}</h1>
      <p className="text-gray-600 mb-4">{photographer.bio}</p>

      <div className="mb-4 space-y-1">
        <p><strong>Location:</strong> {photographer.location}</p>
        <p><strong>Price:</strong> ₹{photographer.price}</p>
        <p><strong>Rating:</strong> {photographer.rating}⭐</p>
      </div>

      <div className="mb-4">
        <strong>Styles:</strong>{' '}
        {photographer.styles.map((style) => (
          <span key={style} className="inline-block bg-gray-200 rounded px-2 py-1 text-sm mr-2">
            {style}
          </span>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photographer.portfolio.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="Portfolio"
              width={300}
              height={200}
              className="rounded shadow w-full object-cover"
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        {photographer.reviews.map((review, i) => (
          <div key={i} className="mb-3 border-b pb-2">
            <p className="font-semibold">
              {review.name} ({review.rating}⭐)
            </p>
            <p className="text-sm text-gray-600">{review.date}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => setOpenModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send Inquiry
      </button>

      <InquiryModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </main>
  );
}


