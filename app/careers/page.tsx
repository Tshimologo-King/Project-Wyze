'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CareerCard from '../components/CareerCard';
import CareerModal from '../components/CareerModal';
import CareerFilter from '../components/CareerFilter';

interface Career {
  id: number;
  name: string;
  industry: string;
  description: string;
  whatItIs: string;
  whatTheyDo: string;
  skillsNeeded: string[];
  certifications: string[];
  tertiaryInstitutions: string[];
  image: string;
  createdAt: string;
  updatedAt: string;
}

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');

  // Fetch careers from database
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/careers');
        
        if (!response.ok) {
          throw new Error('Failed to fetch careers');
        }
        
        const data = await response.json();
        console.log('Fetched careers:', data);
        console.log('Number of careers:', data.length);
        setCareers(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching careers:', err);
        setError('Failed to load careers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  const industries = Array.from(new Set(careers.map(c => c.industry))).sort();

  const filteredCareers = useMemo(() => {
    console.log('Filtering careers. Total:', careers.length, 'Search:', searchTerm, 'Industry:', selectedIndustry, 'Letter:', selectedLetter);
    
    const result = careers.filter(career => {
      try {
        const matchesSearch = (career.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                             (career.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        const matchesIndustry = !selectedIndustry || career.industry === selectedIndustry;
        const matchesLetter = !selectedLetter || career.name.toUpperCase().startsWith(selectedLetter);
        const matches = matchesSearch && matchesIndustry && matchesLetter;
        
        if (!matches) {
          console.log(`Filtered out: ${career.name} - search: ${matchesSearch}, industry: ${matchesIndustry}, letter: ${matchesLetter}`);
        }
        
        return matches;
      } catch (e) {
        console.error('Error filtering career:', career, e);
        return false;
      }
    });
    
    console.log('Filtered result:', result.length);
    return result;
  }, [careers, searchTerm, selectedIndustry, selectedLetter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 scroll-smooth">
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Explore All Careers
          </h1>
          <p className="text-xl text-slate-300">
            {loading ? 'Loading careers...' : `Discover ${careers.length} exciting career opportunities at Wyze`}
          </p>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="px-6 pb-12">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
            </div>
            <p className="text-slate-300 mt-4">Loading careers from database...</p>
          </div>
        </section>
      )}

      {/* Error State */}
      {error && (
        <section className="px-6 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="bg-red-900/30 border border-red-500 rounded-lg p-6">
              <p className="text-red-200">{error}</p>
            </div>
          </div>
        </section>
      )}

      {/* Filter Section */}
      {!loading && careers.length > 0 && (
        <section className="px-6 pb-12">
          <div className="max-w-7xl mx-auto">
            <CareerFilter
              searchTerm={searchTerm}
              selectedIndustry={selectedIndustry}
              selectedLetter={selectedLetter}
              onSearchChange={setSearchTerm}
              onIndustryChange={setSelectedIndustry}
              onLetterChange={setSelectedLetter}
              industries={industries}
            />

            {/* Results Count */}
            <p className="text-slate-300 text-sm mb-6">
              Showing {filteredCareers.length} of {careers.length} careers
            </p>

            {/* Career Cards Grid */}
            {filteredCareers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCareers.map((career, index) => (
                  <CareerCard
                    key={`${career.name}-${index}`}
                    name={career.name}
                    description={career.description}
                    onClick={() => setSelectedCareer(career.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-300 text-lg">
                  No careers found matching your search. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Career Modal */}
      {selectedCareer !== null && careers.find(c => c.id === selectedCareer) && (
        <CareerModal
          image={careers.find(c => c.id === selectedCareer)?.image || ''}
          name={careers.find(c => c.id === selectedCareer)?.name || ''}
          description={careers.find(c => c.id === selectedCareer)?.description || ''}
          whatItIs={careers.find(c => c.id === selectedCareer)?.whatItIs || ''}
          whatTheyDo={careers.find(c => c.id === selectedCareer)?.whatTheyDo || ''}
          skillsNeeded={careers.find(c => c.id === selectedCareer)?.skillsNeeded || []}
          certifications={careers.find(c => c.id === selectedCareer)?.certifications || []}
          tertiaryInstitutions={careers.find(c => c.id === selectedCareer)?.tertiaryInstitutions || []}
          onClose={() => setSelectedCareer(null)}
        />
      )}
    </div>
  );
}
