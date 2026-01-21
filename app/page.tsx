'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import CareerCard from './components/CareerCard';
import CareerModal from './components/CareerModal';

export default function Home() {
  const [selectedCareer, setSelectedCareer] = useState<number | null>(null);

  const careers = [
    {
      image: 'https://picsum.photos/400/300?random=10',
      name: 'Aeronautical Engineer',
      description: 'Design and develop aircraft and aerospace systems',
      whatItIs: 'Aeronautical engineering is the field dedicated to designing, developing, and maintaining aircraft and spacecraft.',
      whatTheyDo: 'Aeronautical engineers design aircraft structures, propulsion systems, and aerodynamic components while testing and optimizing performance.',
      skillsNeeded: ['Physics', 'CAD Software', 'Mathematics', 'Problem Solving', 'Team Collaboration'],
      certifications: ['Certified Flight Test Engineer (CFTE)', 'Professional Engineer (PE)', 'Certified Aeronautical Engineer (CAE)'],
    },
    {
      image: 'https://picsum.photos/400/300?random=11',
      name: 'Software Developer',
      description: 'Build and maintain software applications',
      whatItIs: 'Software development is the process of designing, coding, testing, and maintaining software applications and systems.',
      whatTheyDo: 'Developers write code, debug applications, collaborate with teams, and implement new features and improvements.',
      skillsNeeded: ['Programming Languages', 'Problem Solving', 'Version Control', 'Database Design', 'API Integration'],
      certifications: ['AWS Certified Developer', 'Microsoft Azure Developer', 'Certified Associate Cloud Engineer'],
    },
    {
      image: 'https://picsum.photos/400/300?random=12',
      name: 'Data Scientist',
      description: 'Analyze data to drive business decisions',
      whatItIs: 'Data science combines statistics, programming, and domain expertise to extract insights from data.',
      whatTheyDo: 'Data scientists collect, process, and analyze data to identify patterns and create predictive models.',
      skillsNeeded: ['Python/R', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization'],
      certifications: ['Google Data Analytics Certificate', 'IBM Data Science Professional', 'Microsoft Data Scientist'],
    },
    {
      image: 'https://picsum.photos/400/300?random=13',
      name: 'Product Manager',
      description: 'Lead product strategy and development',
      whatItIs: 'Product management involves guiding a product through its entire lifecycle from conception to launch and beyond.',
      whatTheyDo: 'PMs define product vision, prioritize features, manage stakeholders, and ensure successful product launches.',
      skillsNeeded: ['Strategic Thinking', 'Communication', 'Analytics', 'User Research', 'Leadership'],
      certifications: ['Certified Product Manager (CPM)', 'Pragmatic Marketing Certificate', 'AIPMM Certification'],
    },
    {
      image: 'https://picsum.photos/400/300?random=14',
      name: 'UX Designer',
      description: 'Create intuitive and beautiful user experiences',
      whatItIs: 'UX design focuses on creating products that provide meaningful and relevant experiences to users.',
      whatTheyDo: 'UX designers research user needs, create wireframes, prototypes, and iterate based on user feedback.',
      skillsNeeded: ['Figma/Sketch', 'User Research', 'Wireframing', 'Prototyping', 'Communication'],
      certifications: ['Google UX Design Certificate', 'Adobe XD Certification', 'Nielsen Norman UX Certification'],
    },
    {
      image: 'https://picsum.photos/400/300?random=15',
      name: 'Cybersecurity Analyst',
      description: 'Protect systems from cyber threats',
      whatItIs: 'Cybersecurity involves protecting computer networks and systems from digital attacks and unauthorized access.',
      whatTheyDo: 'Analysts monitor networks, identify vulnerabilities, implement security measures, and respond to incidents.',
      skillsNeeded: ['Network Security', 'Ethical Hacking', 'Threat Analysis', 'Incident Response', 'Linux/Windows'],
      certifications: ['Certified Ethical Hacker (CEH)', 'CompTIA Security+', 'CISSP'],
    },
  ];

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
      {selectedCareer !== null && (
        <CareerModal
          image={careers[selectedCareer].image}
          name={careers[selectedCareer].name}
          description={careers[selectedCareer].description}
          whatItIs={careers[selectedCareer].whatItIs}
          whatTheyDo={careers[selectedCareer].whatTheyDo}
          skillsNeeded={careers[selectedCareer].skillsNeeded}
          certifications={careers[selectedCareer].certifications}
          onClose={() => setSelectedCareer(null)}
        />
      )}
    </div>
  );
}