"use client"
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileInfo from "@/components/ProfileInfo";
import MobileStatsGrid from "@/components/MobileStats";
import PostSection from "@/components/PostSection";
import StatsCard from "@/components/StatsCard";
import BadgesSection from "@/components/BadgesSection";
import BadgesModal from "@/components/BadgesModal";
import Cookies from "universal-cookie";

import { getUserById } from "@/lib/auth";
import { useRouter } from "next/navigation";

const cookies = new Cookies()

export default function GalleryPage() {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isBadgeModalOpen, setBadgeModalOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const token = cookies.get("Authorization");
        const userData = JSON.parse(localStorage.getItem("userProfile"));

        if (!token || !userData) {
            router.push("/auth/login");
            return;
        }

        getUserById()
            .then((res) => {
                 setUser(res.user);
                 setPosts(res.post);
            })
            .catch((err) => {
                console.error("Failed to fetch user data", err);
                router.push("/auth/login");
            });
    }, []);

    // DUMMY BADGES
    const badges = [
        "Good Habit", "Trash Master", "Power Saver", "King Of The Kings", 
        "Photographer", "Art Curator", "Water Saver", "Green Commuter", 
        "Eco Warrior", "Plant Master", "Solar Champion", "Recycling Hero"
    ];

    if (!user) return <div className="text-white text-center p-8">Loading profile...</div>;

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
                <ProfileInfo user={user} isMobile={true} />

                {/* Stats and Streak Grid */}
                <MobileStatsGrid 
                    streak={user.streak}
                    ecoPoints={user.ecoPoints}
                    badges={badges}
                    onShowAllBadges={() => setBadgeModalOpen(true)}
                />

                {/* Post User Section */}
                <PostSection posts={posts} isMobile={true} />
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block bg-black min-h-screen text-white">
                {/* Profile Info */}
                <ProfileInfo user={user} isMobile={false} />

                {/* Post + Stats */}
                <section className="grid grid-cols-6 gap-4 mt-16 px-4 md:px-36 items-start">
                    <PostSection posts={posts} isMobile={false} />
                    
                    {/* Stats Section */}
                    <div className="col-span-2 flex flex-col gap-4">
                        <StatsCard ecoPoints={user.ecoPoints} />
                        <BadgesSection badges={badges} />
                    </div>
                </section>
            </div>
        </>
    );
}
