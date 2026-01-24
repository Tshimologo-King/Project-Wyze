'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const navLinks = [
    { href: '/', label: 'WYZE' },
    { href: '/careers', label: 'Explore Careers' },
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
          {session ? (
            <button
              onClick={() => signOut()}
              className="relative px-6 py-2 font-semibold text-white overflow-hidden rounded-lg group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-300 ease-out transform scale-x-0 group-hover:scale-x-100 origin-left" />
              <span className="relative z-10 block transition-all duration-300 group-hover:text-white">
                Sign Out
              </span>
            </button>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white transition-colors"
        >
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 border-t border-slate-700/50">
          <div className="flex flex-col px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Auth Buttons */}
            {!session && (
              <div className="flex flex-col gap-3 pt-3 border-t border-slate-700/50">
                <Link
                  href="/login"
                  className="px-6 py-2 text-center font-semibold text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                
                <Link
                  href="/signup"
                  className="px-6 py-2 text-center font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
