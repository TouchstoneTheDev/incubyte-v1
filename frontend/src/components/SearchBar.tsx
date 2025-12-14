import { useState } from 'react';
import { useSweetStore } from '../store/sweetStore';
import './SearchBar.css';

export function SearchBar() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const { searchSweets, fetchSweets } = useSweetStore();

  const handleSearch = async () => {
    const params: any = {};
    if (name) params.name = name;
    if (category) params.category = category;
    if (minPrice) params.minPrice = parseFloat(minPrice);
    if (maxPrice) params.maxPrice = parseFloat(maxPrice);

    await searchSweets(params);
  };

  const handleReset = async () => {
    setName('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    await fetchSweets();
  };

  return (
    <div className="search-bar">
      <div className="search-inputs">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search by name..."
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Filter by category..."
        />
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min price"
          step="0.01"
        />
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max price"
          step="0.01"
        />
      </div>
      <div className="search-actions">
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
        <button onClick={handleReset} className="btn btn-outline">
          Reset
        </button>
      </div>
    </div>
  );
}
