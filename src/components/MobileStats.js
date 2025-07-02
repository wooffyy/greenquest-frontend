"use client"
import StreakCard from "./StreakCard";
import StatsCard from "./StatsCard";
import BadgesSection from "./BadgesSection";

export default function MobileStatsGrid({ streak, ecoPoints, badges, onShowAllBadges }) {
    return (
        <div className="px-4 mb-6">
            <div className="grid grid-cols-6 gap-3 items-start">
                {/* Streak Card - 2 columns */}
                <StreakCard streak={streak} isMobile={true} />

                <div className="col-span-4 bg-[#2a2a2a] rounded-2xl p-2">
                    {/* Stats and Badges Header */}
                    <div className="flex justify-between mx-2 mb-2 px-4 py-4 gap-2">
                        {/* Stats Section */}
                        <StatsCard ecoPoints={ecoPoints} isMobile={true} />

                        {/* Badges Section */}
                        <BadgesSection 
                            badges={badges} 
                            onShowAllBadges={onShowAllBadges} 
                            isMobile={true} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}