'use client';

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import CareerCard from './components/CareerCard';
import CareerModal from './components/CareerModal';

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

export default function Home() {
  const [selectedCareer, setSelectedCareer] = useState<number | null>(null);
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch first 6 careers from database
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/careers');
        
        if (!response.ok) {
          throw new Error('Failed to fetch careers');
        }
        
        const data = await response.json();
        // Shuffle and get 6 random careers
        const shuffled = data.sort(() => Math.random() - 0.5);
        setCareers(shuffled.slice(0, 6));
      } catch (err) {
        console.error('Error fetching careers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 scroll-smooth">
      <Navbar />

      {/* Hero Section with Split Layout */}
      <section className="flex flex-col lg:flex-row items-stretch justify-between min-h-[calc(100vh-80px)] pt-20">
        {/* Banner Section - Left Side */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center px-6 py-12 lg:py-0">
          <div className="space-y-8 flex flex-col justify-center h-full">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Welcome to
            </h2>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Wyze
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-md mx-auto">
              Find your dream job with Wyze — where innovation meets opportunity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button className="relative px-8 py-3 font-semibold text-white overflow-hidden rounded-lg group">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 ease-out transform scale-x-0 group-hover:scale-x-100 origin-left" />
                <span className="relative z-10 block transition-all duration-300 group-hover:text-white">
                  Explore Jobs
                </span>
              </button>
              <button className="relative px-8 py-3 font-semibold text-white border border-slate-400 rounded-lg hover:border-white transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Section - Right Side */}
        <div className="w-full lg:w-1/2 h-80 lg:h-auto px-6 py-12 lg:py-0">
          <Carousel />
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="py-20 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Explore Exciting Careers
            </h2>
            <p className="text-xl text-slate-300">
              Discover diverse career paths and find your perfect fit at Wyze
            </p>
          </div>

          {/* Career Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careers.map((career, index) => (
              <CareerCard
                key={index}
                name={career.name}
                description={career.description}
                onClick={() => setSelectedCareer(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Career Modal */}
      {selectedCareer !== null && careers[selectedCareer] && (
        <CareerModal
          image={careers[selectedCareer].image || ''}
          name={careers[selectedCareer].name}
          description={careers[selectedCareer].description}
          whatItIs={careers[selectedCareer].whatItIs}
          whatTheyDo={careers[selectedCareer].whatTheyDo}
          skillsNeeded={careers[selectedCareer].skillsNeeded || []}
          certifications={careers[selectedCareer].certifications || []}
          tertiaryInstitutions={careers[selectedCareer].tertiaryInstitutions || []}
          onClose={() => setSelectedCareer(null)}
        />
      )}
    </div>
  );
}