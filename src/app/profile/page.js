"use client"
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileInfo from "@/components/ProfileInfo";
import MobileStatsGrid from "@/components/MobileStats";
import PostSection from "@/components/PostSection";
import StatsCard from "@/components/StatsCard";
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
    const [poin, setPoin] = useState(null);

    useEffect(() => {
        const token = cookies.get("Authorization");
        const userData = JSON.parse(localStorage.getItem("userProfile"));

        if (!token || !userData) {
            router.push("/auth/login");
            return;
        }

        getUserById()
            .then((res) => {
                setPoin(res.total_point)
                setUser(res.user);
                setPosts(res.posts);
            })
            .catch((err) => {
                console.error("Failed to fetch user data", err);
                router.push("/auth/login");
            });
    }, []);
    
    if (!user) return <div className="text-white text-center p-8">Loading profile...</div>;

    return (
        <>
            {/* Mobile Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            
            {/* Navigation */}
            <ProfileHeader 
                isSidebarOpen={isSidebarOpen} 
                setSidebarOpen={setSidebarOpen} 
            />

            {/* Mobile Layout */}
            <div className="md:hidden bg-black min-h-screen text-white">
                {/* Profile Section */}
                <ProfileInfo user={user} point={poin} isMobile={true} />

                {/* Stats and Streak Grid */}
                <MobileStatsGrid 
                    streak={user.streak}
                    ecoPoints={user.ecoPoints}
                />
                {/* Post User Section */}
                <PostSection user={user} posts={posts} isMobile={true} />
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block bg-black min-h-screen text-white">
                {/* Profile Info */}
                <ProfileInfo user={user} point={poin} isMobile={false} />

                <section className="items-center w-full max-w-[1200px] lg:max-w-[1400px] gap-4 mt-16 px-4 md:px-36 mx-auto">
                    <PostSection posts={posts} user={user} isMobile={false} />
                </section>
            </div>
        </>
    );
}
