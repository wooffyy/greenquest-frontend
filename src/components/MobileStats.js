"use client"
import StreakCard from "./StreakCard";
import StatsCard from "./StatsCard";

export default function MobileStatsGrid({ streak, ecoPoints }) {
    return (
        <div className="items-center px-4 mb-6">
            <div className="grid grid-cols-2 gap-3 items-start">
                {/* Streak Card - Left */}
                <StreakCard streak={streak} isMobile={true} />
                
                {/* Stats Card - Right */}
                <StatsCard ecoPoints={ecoPoints} isMobile={true} />
            </div>
        </div>
    );
}