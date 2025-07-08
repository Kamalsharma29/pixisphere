'use client';

import React, { useState, useEffect } from 'react';

interface FilterProps {
  onFilter: (filters: any) => void;
  photographers: any[];
}

const FilterSidebar: React.FC<FilterProps> = ({ onFilter, photographers }) => {
  const [price, setPrice] = useState(20000); // max range
  const [rating, setRating] = useState<number | null>(null);
  const [styles, setStyles] = useState<string[]>([]);
  const [city, setCity] = useState('');

  const allStyles = Array.from(new Set(photographers.flatMap((p) => p.styles)));
  const allCities = Array.from(new Set(photographers.map((p) => p.location)));

  useEffect(() => {
    onFilter({ price, rating, styles, city });
  }, [price, rating, styles, city]);

  const toggleStyle = (style: string) => {
    setStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  return (
    <div className="bg-white p-4 rounded shadow w-full max-w-xs">
      <h3 className="text-lg font-semibold mb-3">Filters</h3>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Max Price: ₹{price}</label>
        <input
          type="range"
          min={5000}
          max={20000}
          step={1000}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Rating */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Rating</label>
        {[4, 3].map((r) => (
          <label key={r} className="block text-sm">
            <input
              type="radio"
              name="rating"
              value={r}
              checked={rating === r}
              onChange={() => setRating(r)}
              className="mr-2"
            />
            {r}+
          </label>
        ))}
        <label className="block text-sm">
          <input
            type="radio"
            name="rating"
            value=""
            checked={rating === null}
            onChange={() => setRating(null)}
            className="mr-2"
          />
          All Ratings
        </label>
      </div>

      {/* Styles */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Styles</label>
        {allStyles.map((style) => (
          <label key={style} className="block text-sm">
            <input
              type="checkbox"
              value={style}
              checked={styles.includes(style)}
              onChange={() => toggleStyle(style)}
              className="mr-2"
            />
            {style}
          </label>
        ))}
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium mb-1">City</label>
        <select
          className="w-full border p-2 rounded"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">All Cities</option>
          {allCities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;
