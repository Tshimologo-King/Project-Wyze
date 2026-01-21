'use client';

export default function AnimatedContactSection() {
  return (
    <div className="flex items-center justify-center h-full relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating gradient circles */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-15 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Animated lines */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          
          {/* Animated paths */}
          <path
            d="M 0 100 Q 250 50 500 100"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M 0 200 Q 250 150 500 200"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            style={{ animationDelay: '0.3s' }}
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-8">
        <div className="mb-8 inline-block">
          <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            ✨
          </div>
        </div>

        <h3 className="text-3xl font-bold text-white mb-4">
          We'd Love to Hear from You
        </h3>

        <p className="text-slate-300 text-lg mb-8 max-w-sm">
          Your message matters to us. Share your thoughts, questions, or opportunities with our team.
        </p>

        {/* Animated icons */}
        <div className="flex justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center animate-bounce">
            <span className="text-2xl">💬</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center animate-bounce" style={{ animationDelay: '0.2s' }}>
            <span className="text-2xl">📧</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center animate-bounce" style={{ animationDelay: '0.4s' }}>
            <span className="text-2xl">🚀</span>
          </div>
        </div>

        {/* Encouragement text */}
        <p className="text-cyan-400 text-sm mt-8 font-semibold animate-pulse">
          Response within 24 hours
        </p>
      </div>
    </div>
  );
}
