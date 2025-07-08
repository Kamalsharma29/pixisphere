'use client';

import { useState, useEffect } from 'react';
import PhotographerCard from '@/components/PhotographerCard';
import SearchBar from '@/components/SearchBar';
import FilterSidebar from '@/components/FilterSidebar';

const CategoryListingPage = () => {
  const [allPhotographers, setAllPhotographers] = useState([]);
  const [filteredPhotographers, setFilteredPhotographers] = useState([]);

  useEffect(() => {
    const fetchPhotographers = async () => {
      const res = await fetch('http://localhost:3001/photographers');
      const data = await res.json();
      setAllPhotographers(data);
      setFilteredPhotographers(data);
    };
    fetchPhotographers();
  }, []);

  const handleSearch = (query: string) => {
    const searchText = query.toLowerCase();
    const filtered = allPhotographers.filter(
      (p) =>
        p.name.toLowerCase().includes(searchText) ||
        p.location.toLowerCase().includes(searchText) ||
        p.tags.some((tag: string) => tag.toLowerCase().includes(searchText))
    );
    setFilteredPhotographers(filtered);
  };

  const handleFilter = (filters: any) => {
    let results = [...allPhotographers];

    if (filters.price) {
      results = results.filter((p) => p.price <= filters.price);
    }
    if (filters.rating) {
      results = results.filter((p) => p.rating >= filters.rating);
    }
    if (filters.styles.length > 0) {
      results = results.filter((p) =>
        filters.styles.every((style: string) => p.styles.includes(style))
      );
    }
    if (filters.city) {
      results = results.filter((p) => p.location === filters.city);
    }

    setFilteredPhotographers(results);
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Photographers</h1>

      <div className="flex gap-6">
        <div className="hidden md:block">
          <FilterSidebar
            onFilter={handleFilter}
            photographers={allPhotographers}
          />
        </div>

        <div className="flex-1">
          <SearchBar onSearch={handleSearch} />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPhotographers.map((photographer) => (
              <PhotographerCard key={photographer.id} {...photographer} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CategoryListingPage;
