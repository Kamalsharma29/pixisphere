'use client';

import { useState, useEffect } from 'react';
import PhotographerCard from '@/components/PhotographerCard';
import SearchBar from '@/components/SearchBar';
import FilterSidebar from '@/components/FilterSidebar';
import { Photographer } from '@/types';

const CategoryListingPage = () => {
  const [allPhotographers, setAllPhotographers] = useState<Photographer[]>([]);
  const [filteredPhotographers, setFilteredPhotographers] = useState<Photographer[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const res = await fetch('/data/photographers.json');
        if (!res.ok) throw new Error('Failed to load data');
        const data = await res.json();

        setAllPhotographers(data.photographers || []);
        setFilteredPhotographers(data.photographers || []);
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
      return;
    }

    const filtered = allPhotographers.filter((p) =>
      p.name.toLowerCase().includes(searchText) ||
      p.location.toLowerCase().includes(searchText) ||
      p.tags?.some((tag) => tag.toLowerCase().includes(searchText))
    );

    setFilteredPhotographers(filtered);
  };

  const handleFilter = (filters: {
    maxPrice?: number;
    rating?: number;
    styles?: string[];
    city?: string;
  }) => {
    const { maxPrice, rating, styles = [], city } = filters;

    let results = [...allPhotographers];

    if (maxPrice !== undefined) {
      results = results.filter((p) => p.price <= maxPrice);
    }

    if (rating !== undefined) {
      results = results.filter((p) => p.rating >= rating);
    }

    if (styles.length > 0) {
      results = results.filter((p) =>
        styles.every((style) => p.styles?.includes(style))
      );
    }

    if (city) {
      results = results.filter((p) => p.location === city);
    }

    setFilteredPhotographers(results);
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Photographers</h1>

      {error ? (
        <p className="text-red-500">Failed to load photographers data.</p>
      ) : (
        <div className="flex gap-6">
          <div className="hidden md:block">
            <FilterSidebar
              photographers={allPhotographers}
              onFilter={handleFilter}
            />
          </div>

          <div className="flex-1">
            <SearchBar onSearch={handleSearch} />
            {filteredPhotographers.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPhotographers.map((photographer) => (
                  <PhotographerCard key={photographer.id} {...photographer} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mt-6">No photographers found.</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default CategoryListingPage;

