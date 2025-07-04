'use client';
import Link from 'next/link';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function ProfileHeader({ isSidebarOpen, setSidebarOpen }) {

  return (
    <>
      <nav className="bg-black border-b border-[#1a1a1a] text-white w-full sticky top-0 z-40 px-4 sm:px-6 py-4">
        {/* Mobile View */}
        <div className="flex items-center justify-between md:hidden">
          <button onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link href="/dashboard" className="text-[#89F336] text-xl font-bold">
            ecochallenge
          </Link>
          <div className="w-8 h-8" /> {/* Spacer for symmetry */}
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/dashboard" className="text-[#89F336] text-2xl font-bold">
            ecochallenge
          </Link>

          {/* Center: Nav Links */}
          <nav className="absolute left-1/2 transform -translate-x-1/2 space-x-6 hidden md:flex">
            <Link
              href="/dashboard"
              className="hover:text-[#89f336] text-white"
            >
              Dashboard
            </Link>
            <Link
              href="/challenge"
              className="hover:text-[#89f336] text-white"
            >
              Challenge
            </Link>
            <Link
              href="/leaderboard"
              className="hover:text-[#89f336] text-white"
            >
              Leaderboard
            </Link>
          </nav>

          {/* Right: Profile Icon */}
          <Link href="/profile">
            <div className="w-10 h-10 rounded-full border-2 border-green-400 bg-white overflow-hidden">
              <img src="/images/default-avatar.jpg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </Link>
        </div>
      </nav>

      {/* Sidebar controlled by parent */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
