'use client';
import Link from 'next/link';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function ResponsiveHeader() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className="bg-black border-b border-[#1a1a1a] text-white w-full sticky top-0 z-40 px-4 sm:px-6 py-4">
        {/* Mobile View */}
        <div className="flex items-center justify-between md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <img src="/hamburger.svg" alt="menu" className="w-8 h-8" />
          </button>
          <Link href="/dashboard" className="text-[#89F336] text-xl font-bold">
            ecochallenge
          </Link>
          <div className="w-8 h-8" />
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex items-center justify-between">
          <Link href="/dashboard" className="text-[#89F336] text-2xl font-bold">
            ecochallenge
          </Link>
          <div className="space-x-6 text-sm font-medium">
            <Link href="/dashboard" className="hover:text-[#89F336]">Dashboard</Link>
            <Link href="/challenge" className="hover:text-[#89F336]">Challenge</Link>
            <Link href="/leaderboard" className="hover:text-[#89F336]">Leaderboard</Link>
          </div>
          <Link href="/profile">
            <div className="w-10 h-10 rounded-full border-2 border-green-400 bg-white overflow-hidden">
              <img src="/images/default-avatar.jpg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </Link>
        </div>
      </nav>

      {/* Sidebar (mobile only) */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
