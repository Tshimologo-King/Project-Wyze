'use client';

interface CareerModalProps {
  image: string;
  name: string;
  description: string;
  whatItIs: string;
  whatTheyDo: string;
  skillsNeeded: string[];
  certifications: string[];
  onClose: () => void;
}

export default function CareerModal({
  image,
  name,
  description,
  whatItIs,
  whatTheyDo,
  skillsNeeded,
  certifications,
  onClose,
}: CareerModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-slate-800 rounded-lg shadow-2xl max-w-2xl w-full my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-300 hover:text-white transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative w-full h-64 overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Title */}
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {name}
          </h2>

          {/* Description */}
          <p className="text-slate-300 text-lg">{description}</p>

          {/* What It Is */}
          <div>
            <h3 className="text-blue-400 font-semibold text-lg mb-2">What It Is</h3>
            <p className="text-slate-300">{whatItIs}</p>
          </div>

          {/* What They Do */}
          <div>
            <h3 className="text-cyan-400 font-semibold text-lg mb-2">What They Do</h3>
            <p className="text-slate-300">{whatTheyDo}</p>
          </div>

          {/* Skills Needed */}
          <div>
            <h3 className="text-blue-400 font-semibold text-lg mb-3">Skills Needed</h3>
            <div className="flex flex-wrap gap-2">
              {skillsNeeded.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-cyan-400 font-semibold text-lg mb-3">Certifications</h3>
            <ul className="space-y-2">
              {certifications.map((cert, index) => (
                <li key={index} className="text-slate-300 flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">•</span>
                  {cert}
                </li>
              ))}
            </ul>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full mt-8 relative px-6 py-3 font-semibold text-white overflow-hidden rounded-lg group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 ease-out transform scale-x-0 group-hover:scale-x-100 origin-left" />
            <span className="relative z-10 block transition-all duration-300 group-hover:text-white">
              Close
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
