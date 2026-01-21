'use client';

import { useState } from 'react';

interface CareerFilterProps {
  searchTerm: string;
  selectedIndustry: string;
  onSearchChange: (term: string) => void;
  onIndustryChange: (industry: string) => void;
  industries: string[];
}

export default function CareerFilter({
  searchTerm,
  selectedIndustry,
  onSearchChange,
  onIndustryChange,
  industries,
}: CareerFilterProps) {
  return (
    <div className="bg-slate-800 rounded-lg p-6 mb-8 shadow-lg">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <label className="block text-slate-300 text-sm font-semibold mb-2">
            Search Careers
          </label>
          <input
            type="text"
            placeholder="Search by career title..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 text-white placeholder-slate-400 rounded-lg border border-slate-600 focus:border-cyan-400 focus:outline-none transition-colors"
          />
        </div>

        {/* Industry Filter Dropdown */}
        <div className="flex-1">
          <label className="block text-slate-300 text-sm font-semibold mb-2">
            Filter by Industry
          </label>
          <select
            value={selectedIndustry}
            onChange={(e) => onIndustryChange(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-400 focus:outline-none transition-colors cursor-pointer"
          >
            <option value="">All Industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
