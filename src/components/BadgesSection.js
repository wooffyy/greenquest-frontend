"use client"
import { useState } from "react";

function BadgesDesc({ title, description, isMobile = false }) {
    return (
        <div className="flex flex-col gap-1 mt-2">
            <h3 className={`font-bold ${isMobile ? 'text-sm' : 'text-base'}`}>{title}</h3>
            <p className={`text-slate-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>{description}</p>
        </div>
    );
}

export default function BadgesSection({ badges, onShowAllBadges, isMobile = false }) {
    const [activeBadge, setActiveBadge] = useState(null);

    const toggleBadgeDescription = (badgeIndex) => {
        setActiveBadge(activeBadge === badgeIndex ? null : badgeIndex);
    };

    if (isMobile) {
        return (
            <div className="items-left">
                <div className="text-xs font-semibold text-white px-4">BADGES</div>
                <button 
                    onClick={onShowAllBadges}
                    className="px-4 mt-2 text-left text-[12px] text-[#89F336] hover:text-[#9aff4a] transition-colors cursor-pointer"
                >
                    Show all badges &gt;
                </button>
            </div>
        );
    }

    return (
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
    );
}