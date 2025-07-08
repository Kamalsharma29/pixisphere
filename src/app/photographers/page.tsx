'use client';

import { useEffect, useState } from 'react';
import PhotographerCard from '@/components/PhotographerCard';
import SearchBar from '@/components/SearchBar';
import FilterSidebar from '@/components/FilterSidebar';
import { Photographer } from '@/types';

const CategoryListingPage = () => {
  const [allPhotographers, setAllPhotographers] = useState<Photographer[]>([]);
  const [filteredPhotographers, setFilteredPhotographers] = useState<Photographer[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const res = await fetch('/data/photographers.json');
        if (!res.ok) throw new Error('Failed to load data');
        const data = await res.json();
        setAllPhotographers(data.photographers);
        setFilteredPhotographers(data.photographers);
      } catch (err) {
        console.error('Error loading photographers:', err);
        setError(true);
      }
    };

    fetchPhotographers();
  }, []);

  const handleSearch = (query: string) => {
    const searchText = query.toLowerCase().trim();

    if (!searchText) {
      setFilteredPhotographers(allPhotographers);
      setVisibleCount(6);
      return;
    }

    const filtered = allPhotographers.filter((p) =>
      p.name.toLowerCase().includes(searchText) ||
      p.location.toLowerCase().includes(searchText) ||
      p.tags?.some((tag) => tag.toLowerCase().includes(searchText))
    );

    setFilteredPhotographers(filtered);
    setVisibleCount(6);
  };

  const handleFilter = (filters: {
    price?: number;
    rating?: number;
    styles?: string[];
    city?: string;
  }) => {
    let results = [...allPhotographers];

    const maxPrice = filters.price ?? Infinity;
    const minRating = filters.rating ?? 0;
    const selectedStyles = filters.styles ?? [];

    results = results.filter((p) => p.price <= maxPrice);
    results = results.filter((p) => p.rating >= minRating);

    if (selectedStyles.length > 0) {
      results = results.filter((p) =>
        selectedStyles.every((style) => p.styles?.includes(style))
      );
    }

    if (filters.city) {
      results = results.filter((p) => p.location === filters.city);
    }

    setFilteredPhotographers(results);
    setVisibleCount(6);
  };

  const visiblePhotographers = filteredPhotographers.slice(0, visibleCount);

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Photographers</h1>

      {error ? (
        <p className="text-red-500">Failed to load photographers data.</p>
      ) : (
        <div className="flex gap-6">
          <div className="hidden md:block">
            <FilterSidebar
              onFilter={handleFilter}
              photographers={allPhotographers}
            />
          </div>

          <div className="flex-1">
            <SearchBar onSearch={handleSearch} />
            {visiblePhotographers.length > 0 ? (
              <>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {visiblePhotographers.map((photographer) => (
                    <PhotographerCard key={photographer.id} {...photographer} />
                  ))}
                </div>
                {visibleCount < filteredPhotographers.length && (
                  <div className="text-center mt-6">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500">No photographers found.</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default CategoryListingPage;

