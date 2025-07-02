"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function MainNavbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isCurrentPage = (path) => pathname === path;
  
  return (
    <header className="bg-black text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      
      {/* Left Side - Hamburger for mobile, Logo for desktop */}
      <div className="flex items-center">
        {/* Mobile Hamburger */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          <img src="/hamburger.svg" alt="menu" className="w-6 h-6" />
        </button>
        
        {/* Desktop Logo */}
        <Link
          href="/dashboard"
          className="hidden md:block text-2xl font-bold text-[#89F336] hover:text-[#9aff4a] transition-colors duration-200"
        >
          ecochallenge
        </Link>
      </div>

      {/* Center Logo - Mobile Only */}
      <Link
        href="/dashboard"
        className="md:hidden text-2xl font-bold text-[#89F336] hover:text-[#9aff4a] transition-colors duration-200"
      >
        ecochallenge
      </Link>

      {/* Desktop Navigation - Center */}
      <nav className="absolute left-1/2 transform -translate-x-1/2 space-x-6 hidden md:flex">
        <Link
          href="/dashboard"
          className={`hover:text-[#89f336] ${isCurrentPage("/dashboard") ? "text-[#89f336]" : "text-white"}`}
        >
          Dashboard
        </Link>
        <Link
          href="/challenge"
          className={`hover:text-[#89f336] ${isCurrentPage("/challenge") ? "text-[#89f336]" : "text-white"}`}
        >
          Challenge
        </Link>
        <Link
          href="/leaderboard"
          className={`hover:text-[#89f336] ${isCurrentPage("/leaderboard") ? "text-[#89f336]" : "text-white"}`}
        >
          Leaderboard
        </Link>
      </nav>

      {/* Right Avatar */}
      <div className="flex items-center space-x-4">
        <Link href="/profile">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full border border-green-400"
            />
          ) : (
            <div className="w-8 h-8 bg-[#89F336] rounded-full flex items-center justify-center text-black font-bold">
              A
            </div>
          )}
        </Link>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-black px-6 py-4 md:hidden flex flex-col space-y-3 z-40 border-t border-gray-800">
          <Link 
            href="/dashboard" 
            onClick={() => setIsOpen(false)} 
            className={`hover:text-[#89f336] ${isCurrentPage("/dashboard") ? "text-[#89f336]" : "text-white"}`}
          >
            Dashboard
          </Link>
          <Link 
            href="/challenge" 
            onClick={() => setIsOpen(false)} 
            className={`hover:text-[#89f336] ${isCurrentPage("/challenge") ? "text-[#89f336]" : "text-white"}`}
          >
            Challenge
          </Link>
          <Link 
            href="/leaderboard" 
            onClick={() => setIsOpen(false)} 
            className={`hover:text-[#89f336] ${isCurrentPage("/leaderboard") ? "text-[#89f336]" : "text-white"}`}
          >
            Leaderboard
          </Link>
        </div>
      )}
    </header>
  );
}