'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    router.push(`/summary?key=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="What can I help with?"
          className="w-full px-6 py-4 text-lg rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm placeholder-gray-500"
        />
        <button
          title='search'
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#2563EB] text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none"
        >
          <MagnifyingGlassIcon className="h-6 w-6" />
        </button>
      </div>
    </form>
  );
}