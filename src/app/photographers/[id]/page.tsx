'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import InquiryModal from '@/components/InquiryModal';

const PhotographerProfilePage = () => {
  const { id } = useParams();
  const [photographer, setPhotographer] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchPhotographer = async () => {
      const res = await fetch(`http://localhost:3001/photographers/${id}`);
      const data = await res.json();
      setPhotographer(data);
    };

    if (id) fetchPhotographer();
  }, [id]);

  if (!photographer) return <p className="p-6">Loading...</p>;

  return (
    <main className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-2">{photographer.name}</h1>
      <p className="text-gray-600 mb-4">{photographer.bio}</p>

      <div className="mb-4">
        <strong>Location:</strong> {photographer.location} <br />
        <strong>Price:</strong> ₹{photographer.price} <br />
        <strong>Rating:</strong> {photographer.rating}⭐
      </div>

      <div className="mb-4">
        <strong>Styles:</strong>{' '}
        {photographer.styles.map((style: string) => (
          <span key={style} className="inline-block bg-gray-200 rounded px-2 py-1 text-sm mr-2">
            {style}
          </span>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photographer.portfolio.map((img: string, index: number) => (
            <img key={index} src={img} alt="Portfolio" className="rounded shadow" />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        {photographer.reviews.map((review: any, index: number) => (
          <div key={index} className="mb-3 border-b pb-2">
            <p className="font-semibold">{review.name} ({review.rating}⭐)</p>
            <p className="text-sm text-gray-600">{review.date}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>

      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        onClick={() => setOpenModal(true)}
      >
        Send Inquiry
      </button>

      <InquiryModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </main>
  );
};

export default PhotographerProfilePage;
