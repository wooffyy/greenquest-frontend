"use client"
import Link from "next/link";

export default function ProfileHeader({ isSidebarOpen, setSidebarOpen }) {
    return (
        <nav className="bg-black border-b border-[#1a1a1a] text-white w-full sticky top-0 z-40">
            <div className="flex justify-between items-center px-6 py-4">
                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setSidebarOpen(true)}>
                        <img src="./hamburger.svg" alt="menu" className="w-8 h-8"/>
                    </button>
                </div>
                
                {/* Logo */}
                <div className="text-2xl font-bold flex-1 md:flex-none text-center md:text-left">
                    <Link href="/" className="text-[#89F336] hover:text-[#9aff4a] transition-colors duration-200">
                        ecochallenge
                    </Link>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex space-x-8">
                    <Link 
                        href="/dashboard" 
                        className="text-white hover:text-[#89F336] transition-colors duration-200 font-medium"
                    >
                        Dashboard
                    </Link>
                    <Link 
                        href="/challenge" 
                        className="text-white hover:text-[#89F336] transition-colors duration-200 font-medium"
                    >
                        Challenge
                    </Link>
                    <Link 
                        href="/leaderboard" 
                        className="text-white hover:text-[#89F336] transition-colors duration-200 font-medium"
                    >
                        Leaderboard
                    </Link>
                </div>
                
                {/* Mobile spacer */}
                <div className="w-8 md:hidden"></div>
            </div>
        </nav>
    );
}