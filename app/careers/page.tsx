'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import CareerCard from '../components/CareerCard';
import CareerModal from '../components/CareerModal';
import CareerFilter from '../components/CareerFilter';

export default function CareersPage() {
  const [selectedCareer, setSelectedCareer] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');

  const careers = [
    {
      image: 'https://picsum.photos/400/300?random=10',
      name: 'Aeronautical Engineer',
      industry: 'Aerospace & Defense',
      description: 'Design and develop aircraft and aerospace systems',
      whatItIs: 'Aeronautical engineering is the field dedicated to designing, developing, and maintaining aircraft and spacecraft.',
      whatTheyDo: 'Aeronautical engineers design aircraft structures, propulsion systems, and aerodynamic components while testing and optimizing performance.',
      skillsNeeded: ['Physics', 'CAD Software', 'Mathematics', 'Problem Solving', 'Team Collaboration'],
      certifications: ['Certified Flight Test Engineer (CFTE)', 'Professional Engineer (PE)', 'Certified Aeronautical Engineer (CAE)'],
    },
    {
      image: 'https://picsum.photos/400/300?random=11',
      name: 'Software Developer',
      industry: 'Technology',
      description: 'Build and maintain software applications',
      whatItIs: 'Software development is the process of designing, coding, testing, and maintaining software applications and systems.',
      whatTheyDo: 'Developers write code, debug applications, collaborate with teams, and implement new features and improvements.',
      skillsNeeded: ['Programming Languages', 'Problem Solving', 'Version Control', 'Database Design', 'API Integration'],
      certifications: ['AWS Certified Developer', 'Microsoft Azure Developer', 'Certified Associate Cloud Engineer'],
    },
    {
      image: 'https://picsum.photos/400/300?random=12',
      name: 'Data Scientist',
      industry: 'Technology',
      description: 'Analyze data to drive business decisions',
      whatItIs: 'Data science combines statistics, programming, and domain expertise to extract insights from data.',
      whatTheyDo: 'Data scientists collect, process, and analyze data to identify patterns and create predictive models.',
      skillsNeeded: ['Python/R', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization'],
      certifications: ['Google Data Analytics Certificate', 'IBM Data Science Professional', 'Microsoft Data Scientist'],
    },
    {
      image: 'https://picsum.photos/400/300?random=13',
      name: 'Product Manager',
      industry: 'Business & Management',
      description: 'Lead product strategy and development',
      whatItIs: 'Product management involves guiding a product through its entire lifecycle from conception to launch and beyond.',
      whatTheyDo: 'PMs define product vision, prioritize features, manage stakeholders, and ensure successful product launches.',
      skillsNeeded: ['Strategic Thinking', 'Communication', 'Analytics', 'User Research', 'Leadership'],
      certifications: ['Certified Product Manager (CPM)', 'Pragmatic Marketing Certificate', 'AIPMM Certification'],
    },
    {
      image: 'https://picsum.photos/400/300?random=14',
      name: 'UX Designer',
      industry: 'Design & Creative',
      description: 'Create intuitive and beautiful user experiences',
      whatItIs: 'UX design focuses on creating products that provide meaningful and relevant experiences to users.',
      whatTheyDo: 'UX designers research user needs, create wireframes, prototypes, and iterate based on user feedback.',
      skillsNeeded: ['Figma/Sketch', 'User Research', 'Wireframing', 'Prototyping', 'Communication'],
      certifications: ['Google UX Design Certificate', 'Adobe XD Certification', 'Nielsen Norman UX Certification'],
    },
    {
      image: 'https://picsum.photos/400/300?random=15',
      name: 'Cybersecurity Analyst',
      industry: 'Technology',
      description: 'Protect systems from cyber threats',
      whatItIs: 'Cybersecurity involves protecting computer networks and systems from digital attacks and unauthorized access.',
      whatTheyDo: 'Analysts monitor networks, identify vulnerabilities, implement security measures, and respond to incidents.',
      skillsNeeded: ['Network Security', 'Ethical Hacking', 'Threat Analysis', 'Incident Response', 'Linux/Windows'],
      certifications: ['Certified Ethical Hacker (CEH)', 'CompTIA Security+', 'CISSP'],
    },
    {
      image: 'https://picsum.photos/400/300?random=16',
      name: 'Financial Analyst',
      industry: 'Finance & Banking',
      description: 'Analyze financial data and trends',
      whatItIs: 'Financial analysis involves examining financial statements and market data to assess investment opportunities and risks.',
      whatTheyDo: 'Analysts create financial models, prepare reports, forecast trends, and provide investment recommendations.',
      skillsNeeded: ['Excel/Financial Modeling', 'Accounting', 'Data Analysis', 'Communication', 'Attention to Detail'],
      certifications: ['Chartered Financial Analyst (CFA)', 'Certified Financial Planner (CFP)', 'Financial Risk Manager (FRM)'],
    },
    {
      image: 'https://picsum.photos/400/300?random=17',
      name: 'Mechanical Engineer',
      industry: 'Manufacturing & Engineering',
      description: 'Design and build mechanical systems',
      whatItIs: 'Mechanical engineering involves designing, building, and improving machines, engines, and mechanical systems.',
      whatTheyDo: 'Mechanical engineers develop prototypes, perform tests, optimize designs, and solve mechanical problems.',
      skillsNeeded: ['CAD Design', 'Thermodynamics', 'Materials Science', 'Problem Solving', 'Project Management'],
      certifications: ['Professional Engineer (PE)', 'Certified SOLIDWORKS Associate', 'Six Sigma Black Belt'],
    },
    {
      image: 'https://picsum.photos/400/300?random=18',
      name: 'Marketing Manager',
      industry: 'Marketing & Business',
      description: 'Develop and execute marketing strategies',
      whatItIs: 'Marketing management involves planning, implementing, and overseeing marketing campaigns and initiatives.',
      whatTheyDo: 'Managers develop marketing plans, manage budgets, oversee campaigns, and analyze market performance.',
      skillsNeeded: ['Strategic Planning', 'Data Analysis', 'Communication', 'Creativity', 'Digital Marketing'],
      certifications: ['Google Digital Marketing Certificate', 'HubSpot Marketing Certification', 'Marketo Certified Expert'],
    },
    {
      image: 'https://picsum.photos/400/300?random=19',
      name: 'Environmental Scientist',
      industry: 'Environment & Sustainability',
      description: 'Study and protect the environment',
      whatItIs: 'Environmental science is the study of interactions between physical, chemical, and biological components of the environment.',
      whatTheyDo: 'Scientists conduct research, monitor environmental conditions, develop conservation strategies, and provide recommendations.',
      skillsNeeded: ['Research Methodology', 'Data Analysis', 'GIS/Remote Sensing', 'Laboratory Skills', 'Communication'],
      certifications: ['Certified Ecologist', 'LEED Accreditation', 'Environmental Professional (EP)'],
    },
  ];

  const industries = Array.from(new Set(careers.map(c => c.industry))).sort();

  const filteredCareers = useMemo(() => {
    return careers.filter(career => {
      const matchesSearch = career.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           career.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = !selectedIndustry || career.industry === selectedIndustry;
      return matchesSearch && matchesIndustry;
    });
  }, [searchTerm, selectedIndustry]);

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
            Discover {careers.length} exciting career opportunities at Wyze
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <CareerFilter
            searchTerm={searchTerm}
            selectedIndustry={selectedIndustry}
            onSearchChange={setSearchTerm}
            onIndustryChange={setSelectedIndustry}
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
                  onClick={() => {
                    const careerIndex = careers.findIndex(c => c.name === career.name);
                    setSelectedCareer(careerIndex);
                  }}
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
