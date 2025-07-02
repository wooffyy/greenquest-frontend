"use client"
import { useState } from "react";

export default function BadgesModal({ isOpen, onClose, badges }) {
    const [activeBadge, setActiveBadge] = useState(null);

    const toggleBadgeDescription = (badgeIndex) => {
        setActiveBadge(activeBadge === badgeIndex ? null : badgeIndex);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2a2a2a] rounded-2xl w-full max-w-md h-96 flex flex-col">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b border-[#3a3a3a]">
                    <h2 className="text-lg font-bold text-white">BADGES</h2>
                    <button 
                        onClick={onClose}
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
    );
}