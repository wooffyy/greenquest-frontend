"use client"
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileInfo from "@/components/ProfileInfo";
import MobileStatsGrid from "@/components/MobileStats";
import PostSection from "@/components/PostSection";
import StatsCard from "@/components/StatsCard";
import BadgesSection from "@/components/BadgesSection";
import BadgesModal from "@/components/BadgesModal";

export default function GalleryPage() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isBadgeModalOpen, setBadgeModalOpen] = useState(false);

    const userData = {
        name: "Mas Jawa",
        username: "masjava",
        desktopUsername: "masjava",
        location: "Depok, Indonesia",
        streak: 42,
        ecoPoints: 1259
    };

    // DUMMY BADGES
    const badges = [
        "Good Habit", "Trash Master", "Power Saver", "King Of The Kings", 
        "Photographer", "Art Curator", "Water Saver", "Green Commuter", 
        "Eco Warrior", "Plant Master", "Solar Champion", "Recycling Hero"
    ];

    return (
        <>
            {/* Mobile Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            
            {/* Badges Modal */}
            <BadgesModal 
                isOpen={isBadgeModalOpen} 
                onClose={() => setBadgeModalOpen(false)} 
                badges={badges} 
            />
            
            {/* Navigation */}
            <ProfileHeader 
                isSidebarOpen={isSidebarOpen} 
                setSidebarOpen={setSidebarOpen} 
            />

            {/* Mobile Layout */}
            <div className="md:hidden bg-black min-h-screen text-white">
                {/* Profile Section */}
                <ProfileInfo user={userData} isMobile={true} />

                {/* Stats and Streak Grid */}
                <MobileStatsGrid 
                    streak={userData.streak}
                    ecoPoints={userData.ecoPoints}
                    badges={badges}
                    onShowAllBadges={() => setBadgeModalOpen(true)}
                />

                {/* Post User Section */}
                <PostSection isMobile={true} />
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block bg-black min-h-screen text-white">
                {/* Profile Info */}
                <ProfileInfo user={{
                    ...userData,
                    username: userData.desktopUsername
                }} isMobile={false} />

                {/* Post + Stats */}
                <section className="grid grid-cols-6 gap-4 mt-16 px-4 md:px-36 items-start">
                    <PostSection isMobile={false} />
                    
                    {/* Stats Section */}
                    <div className="col-span-2 flex flex-col gap-4">
                        <StatsCard ecoPoints={userData.ecoPoints} />
                        <BadgesSection badges={badges} />
                    </div>
                </section>
            </div>
        </>
    );
}