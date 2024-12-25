'use client';

import SearchBar from '../components/SearchBar';

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-[#FFFFFF] to-[#F8F9FF] flex flex-col items-center justify-start px-4 py-8">
      <div className="text-center w-full max-w-3xl mx-auto mt-16">
        <h1 className="text-[#2563EB] text-7xl font-bold mb-3">LitScout</h1>
        <p className="text-[#6B7280] text-xl mb-12">Your handy literature review companion</p>
        <SearchBar />
      </div>
    </main>
  );
}
