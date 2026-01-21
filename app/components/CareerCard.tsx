'use client';

interface CareerCardProps {
  name: string;
  description: string;
  onClick: () => void;
}

export default function CareerCard({
  name,
  description,
  onClick,
}: CareerCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer text-left h-full"
    >
      {/* Card Content */}
      <div className="p-6 space-y-4 h-full flex flex-col justify-between">
        {/* Title */}
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {name}
        </h3>

        {/* Description */}
        <p className="text-slate-300 text-sm">{description}</p>

        {/* Click Indicator */}
        <div className="flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors mt-4">
          <span className="text-sm font-semibold">Click to learn more</span>
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}
