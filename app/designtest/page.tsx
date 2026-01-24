'use client';

import { useEffect, useState } from 'react';

export default function DesignTest() {
  const [mounted, setMounted] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, [mounted]);

  const letters = [
    { char: 'W', delay: 0, highlight: false },
    { char: 'Y', delay: 0.3, highlight: true },
    { char: 'Z', delay: 0.4, highlight: true },
    { char: 'E', delay: 0.5, highlight: false },
    { char: ' ', delay: 0.6, highlight: false },
    { char: 'U', delay: 0.7, highlight: false },
    { char: 'P', delay: 0.8, highlight: false },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-96 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-96 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <style>{`
          @keyframes slideInFromRight {
            from {
              opacity: 0;
              transform: translateX(200px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes popIn {
            0% {
              opacity: 0;
              transform: scale(0.5);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          .letter-animate {
            animation: slideInFromRight 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            opacity: 0;
          }

          .letter-first {
            animation: slideInFromRight 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            opacity: 0;
          }

          .letter-rest {
            animation: popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            opacity: 0;
          }
        `}</style>

        <div className="flex justify-center items-center gap-1 md:gap-3">
          {mounted &&
            letters.map((letter, index) => (
              <span
                key={`${index}-${animationKey}`}
                className={`
                  text-6xl md:text-9xl font-bold tracking-tighter
                  ${letter.highlight
                    ? 'bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent'
                    : 'text-white'
                  }
                  ${index === 0 ? 'letter-first' : 'letter-rest'}
                  drop-shadow-lg
                `}
                style={{
                  animationDelay: `${letter.delay}s`,
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                }}
              >
                {letter.char}
              </span>
            ))}
        </div>

        {/* Subtitle */}
        <div className="mt-12 text-center">
          <p
            key={`subtitle-${animationKey}`}
            className="text-cyan-400 text-lg md:text-xl font-light tracking-widest opacity-0 animate-fadeIn"
            style={{ animationDelay: '1.2s' }}
          >
            Coming Soon ...
          </p>
        </div>
      </div>

      {/* Add fade-in animation for subtitle */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
