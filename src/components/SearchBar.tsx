'use client';

import { useState, useEffect } from 'react';

interface Props {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(input);
    }, 400); // Debounce

    return () => clearTimeout(timeout);
  }, [input]);

  return (
    <input
      type="text"
      placeholder="Search by name, location, or tag"
      className="w-full border px-4 py-2 rounded mb-4"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};

export default SearchBar;
