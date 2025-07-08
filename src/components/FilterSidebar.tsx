'use client';

import { useEffect, useState } from 'react';
import { Photographer } from '@/types';

interface FilterSidebarProps {
  photographers: Photographer[];
  onFilter: (filters: {
    maxPrice?: number;
    rating?: number;
    styles?: string[];
    city?: string;
  }) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ photographers, onFilter }) => {
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [rating, setRating] = useState<number>();
  const [styles, setStyles] = useState<string[]>([]);
  const [city, setCity] = useState('');

  const allStyles = Array.from(
    new Set(
      photographers.flatMap((p) => Array.isArray(p.styles) ? p.styles : [])
    )
  );

  const allCities = Array.from(
    new Set(photographers.map((p) => p.location ?? ''))
  );

  useEffect(() => {
    onFilter({ maxPrice, rating, styles, city });
  }, [maxPrice, rating, styles, city]);

  const handleStyleChange = (style: string) => {
    setStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  return (
    <aside className="bg-white p-4 rounded-lg shadow-md w-64">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Max Price (₹)</label>
        <input
          type="range"
          min={1000}
          max={30000}
          step={500}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-sm text-gray-600">Up to ₹{maxPrice}</div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Minimum Rating</label>
        <select
          value={rating || ''}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">Any</option>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r}+ stars
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Styles</label>
        <div className="flex flex-wrap gap-2">
          {allStyles.map((style) => (
            <label key={style} className="text-sm flex items-center gap-1">
              <input
                type="checkbox"
                checked={styles.includes(style)}
                onChange={() => handleStyleChange(style)}
              />
              {style}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">City</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">All</option>
          {allCities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
};

export default FilterSidebar;

