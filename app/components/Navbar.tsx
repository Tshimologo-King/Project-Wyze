'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navLinks = [
    { href: '/', label: 'WYZE' },
    { href: '/careers', label: 'Careers' },
    { href: '/contact', label: 'Contact' },
    { href: '/designtest', label: 'Design' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer">
              Wyze
            </h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 justify-center">
          {navLinks.map((link) => (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={() => setHoveredLink(link.href)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Link
                href={link.href}
                className="relative px-4 py-3 text-slate-300 transition-all duration-300 rounded-lg group block overflow-hidden"
              >
                {/* Hover background fill animation - left to right */}
                <span
                  className={`absolute inset-0 bg-white transition-all duration-300 ease-out transform scale-x-0 group-hover:scale-x-100 origin-left`}
                />
                {/* Text */}
                <span className="relative z-10 block group-hover:text-black transition-all duration-300">{link.label}</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-3 items-center">
          <Link
            href="/login"
            className="relative px-6 py-2 font-semibold text-white overflow-hidden rounded-lg group"
          >
            <span className="absolute inset-0 bg-slate-700 transition-all duration-300 ease-out transform scale-x-0 group-hover:scale-x-100 origin-left" />
            <span className="relative z-10 block transition-all duration-300 group-hover:text-white">
              Login
            </span>
          </Link>
          
          <Link
            href="/signup"
            className="relative px-6 py-2 font-semibold text-white overflow-hidden rounded-lg group"
          >
            {/* Background animation */}
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 ease-out transform scale-x-0 group-hover:scale-x-100 origin-left" />
            
            {/* Text with hover effect */}
            <span className="relative z-10 block transition-all duration-300 group-hover:text-white">
              Sign Up
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-slate-300 hover:text-white transition-colors">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
