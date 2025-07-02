"use client"
import { useState } from "react";
import Link from "next/link";
import PostCards from "./PostCards";
import Sidebar from "./Sidebar";

function BadgesDesc({ title, description, isMobile = false }) {
    return (
        <div className="flex flex-col gap-1 mt-2">
            <h3 className={`font-bold ${isMobile ? 'text-sm' : 'text-base'}`}>{title}</h3>
            <p className={`text-slate-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>{description}</p>
        </div>
    );
}

export default function GalleryPage() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [activeBadge, setActiveBadge] = useState(null);
    const [isBadgeModalOpen, setBadgeModalOpen] = useState(false);

    const toggleBadgeDescription = (badgeIndex) => {
        setActiveBadge(activeBadge === badgeIndex ? null : badgeIndex);
    };

    // DUMMY BADGES
    const badges = ["Good Habit", "Trash Master", "Power Saver", "King Of The Kings", "Photographer", "Art Curator", "Water Saver", "Green Commuter", "Eco Warrior", "Plant Master", "Solar Champion", "Recycling Hero"];
    const mobileBadges = badges.slice(0, 6); // Show max 6 badges on mobile

    return (
        <>
            {/* Mobile Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            
            {/* Badges Modal */}
            {isBadgeModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#2a2a2a] rounded-2xl w-full max-w-md h-96 flex flex-col">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-4 border-b border-[#3a3a3a]">
                            <h2 className="text-lg font-bold text-white">BADGES</h2>
                            <button 
                                onClick={() => setBadgeModalOpen(false)}
                                className="text-white hover:text-slate-300 text-xl font-bold"
                            >
                                ×
                            </button>
                        </div>
                                                
                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="grid grid-cols-3 gap-3">
                                {badges.map((badge, index) => (
                                    <div key={badge} className="flex flex-col items-center relative">
                                        <button 
                                            onClick={() => toggleBadgeDescription(index)} 
                                            className="hover:scale-110 transition-all duration-300 cursor-pointer w-full h-16 flex items-center justify-center bg-[#1a1a1a] rounded-lg"
                                        > 
                                            <img 
                                                src={`/badges/${badge}.svg`} 
                                                alt={`badge ${badge}`} 
                                                className="w-8 h-8 hover:scale-110 transition-all duration-600"
                                            />
                                        </button>
                                        {activeBadge === index && (
                                            <div className="absolute top-full mt-2 bg-[#1a1a1a] rounded-lg p-2 border border-[#3a3a3a] z-10 min-w-32">
                                                <h3 className="text-xs font-bold text-white">{badge}</h3>
                                                <p className="text-xs text-slate-400 mt-1">This is the description for badge {badge}.</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Navigation - Adjusted z-index */}
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

            {/* Mobile Layout */}
            <div className="md:hidden bg-black min-h-screen text-white">
                {/* Profile Section */}
                <div className="flex flex-col items-center pt-8 pb-6">
                    <div className="w-20 h-20 bg-[#4a4a4a] rounded-full flex items-center justify-center mb-4">
                        <img src="./pfp.svg" alt="profile picture" className="w-12 h-12 object-contain" />
                    </div>
                    <h1 className="text-xl font-bold">Mas Jawa</h1>
                    <p className="text-sm text-slate-400">@masjava</p>
                    <p className="text-sm text-slate-400">Depok, Indonesia</p>
                </div>

                {/* Stats and Streak Grid - Redesigned */}
                <div className="px-4 mb-6">
                    <div className="grid grid-cols-6 gap-3 items-start">
                        {/* Streak Card - 2 columns */}
                        <div className="col-span-2 bg-[#89F336] rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                            <div className="text-6xl font-bold text-black mb-1">42</div>
                            <div className="text-normal font-semibold text-black">DAYS</div>
                        </div>

                       <div className="col-span-4 bg-[#2a2a2a] rounded-2xl p-2">
                            {/* Stats and Badges Header */}
                            <div className="flex justify-between mx-2 mb-2 px-4 py-4 gap-2">
                                {/* Stats Section */}
                                <div className="px-4 py-2 pr-10 text-center border-r-4 border-slate-700">
                                  <div className="text-xs font-semibold text-white mb-1 bor">STATS</div>
                                  <div className="text-3xl font-bold text-[#89F336] leading-none">1259</div>
                                  <div className="text-xs text-slate-400 mt-1">Eco Points</div>
                                </div>

                                {/* Badges Section */}
                                <div className="mx-auto py-2 text-left">
                                    <div className="text-xs font-semibold text-white mb-1">BADGES</div>
                                    <button 
                                      onClick={() => setBadgeModalOpen(true)}
                                      className="text-sm text-[#89F336] hover:text-[#9aff4a] transition-colors"
                                    >
                                      Show all badges &gt;
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Post User Section - Updated to use PostCards */}
                <div className="px-4">
                    <div className="bg-[#2a2a2a] rounded-2xl p-4">
                        <PostCards />
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block bg-black min-h-screen text-white">
                {/* Profile Info */}
                <section className="grid grid-cols-6 gap-4 mt-16 px-4 md:px-36">
                    {/* Profile Picture (1 col) */}
                    <div className="col-span-1 flex justify-end items-start">
                        <div className="w-48 h-48 bg-[#1a1a1a] p-8 rounded-full flex items-center justify-center">
                            <img src="./pfp.svg" alt="profile picture" className="w-full h-full object-contain" />
                        </div>
                    </div>

                    {/* User Info (3 col) */}
                    <div className="col-span-3 flex flex-col justify-start px-12">
                        <h1 className="text-4xl font-bold text-white">Mas Jawa</h1>
                        <div className="flex gap-4 text-sm text-slate-500 font-light mt-1">
                            <span>@jawir123</span>
                            <span>•</span>
                            <span>Depok, Indonesia</span>
                        </div>
                        <Link
                            href="/profile"
                            className="mt-4 bg-white font-semibold text-black max-w-max px-4 py-2 rounded-lg hover:bg-slate-100 transition-all border"
                        >
                            Edit Profile
                        </Link>
                    </div>

                    {/* Streak Display (2 col) */}
                    <div className="col-span-2 flex items-start">
                        <div className="bg-[#89F336] font-bold text-black rounded-xl flex items-center justify-center">
                            <div className="p-4 text-7xl">42</div>  
                            <div className="p-4 text-xl">DAYS STREAK!</div>  
                        </div>
                    </div>
                </section>

                {/* Post + Stats */}
                <section className="grid grid-cols-6 gap-4 mt-16 px-4 md:px-36 items-start">
                    <div className="col-span-4 bg-[#2a2929] rounded-xl p-4 flex flex-col gap-4 hover:bg-[#323232] hover:shadow-lg hover:shadow-white/5 transition-all duration-300">
                        <PostCards/>
                    </div>
                    
                    {/* Stats Section - Fixed Height */}
                    <div className="col-span-2 flex flex-col gap-4">
                        {/* Stats Card */}
                        <div className="bg-[#2a2a2a] rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-center mb-4">Stats</h2>
                            <div className="bg-[#232323] rounded-xl p-6 text-center">
                                <div className="text-6xl font-bold text-[#89F336]">1259</div>
                                <div className="text-sm font-semibold mt-2">Eco Points</div>
                            </div>
                        </div>

                        {/* Badges Card - Updated with 4 columns and bigger badges */}
                        <div className="bg-[#2a2a2a] rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-center mb-4">Your Badges</h2>
                            <div className="grid grid-cols-4 gap-3">
                                {badges.map((badge, index) => (
                                    <div key={badge} className="flex flex-col text-center items-center">
                                        <button 
                                            onClick={() => toggleBadgeDescription(index)} 
                                            className="hover:scale-110 transition-all duration-300 cursor-pointer w-full h-20 flex items-center justify-center"
                                        > 
                                            <img 
                                                src={`/badges/${badge}.svg`} 
                                                alt={`badge ${badge}`} 
                                                className="w-12 h-12 hover:scale-110 transition-all duration-600"
                                            />
                                        </button>
                                        {activeBadge === index && (
                                            <BadgesDesc 
                                                title={badge}
                                                description={`This is the description for badge ${badge}.`}
                                                isMobile={false}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}