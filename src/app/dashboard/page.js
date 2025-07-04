"use client";

import { useEffect, useState } from "react";
import { getAllPosts } from "@/lib/api_post";
import Post from "@/components/Post";
import PostCards from "@/components/PostCards";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

import { getLeaderboard } from "@/lib/api_leaderboard";
import { getDailyQuests } from "@/lib/api_quest";
import { getUserById, getUserProfile } from "@/lib/auth";
import { Circle, CircleCheck } from "lucide-react";
import Cookies from "universal-cookie";
import api from "@/lib/api";

const cookies = new Cookies();

const getCurrentUserId = () => {
  if (typeof window === "undefined") return "anonymous";
  const userProfile = getUserProfile();
  return userProfile?.id?.toString() || "anonymous";
};

export default function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [user, setUser] = useState({});
  const [dailyQuests, setDailyQuests] = useState([]);
  const [completedQuests, setCompletedQuests] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true); // ⬅️ loading state

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const leaderboardBg = {
    1: "bg-yellow-300 text-black",
    2: "bg-gray-300 text-black",
    3: "bg-amber-600 text-white",
    default: "bg-white text-black hover:scale-110",
  };

  useEffect(() => {
    const userId = getCurrentUserId();
    const savedCompletedQuests = localStorage.getItem(`completedQuests_${userId}`);
    if (savedCompletedQuests) {
      try {
        const parsed = JSON.parse(savedCompletedQuests);
        if (Array.isArray(parsed)) {
          setCompletedQuests(new Set(parsed));
        }
      } catch (err) {
        console.error("Failed to parse completedQuests:", err);
      }
    }
  }, []);

  useEffect(() => {
    async function fetchAllData() {
      setIsLoading(true);
      try {
        const [
          postsData,
          leaderboardData,
          dailyQuestsData,
          userData
        ] = await Promise.all([
          getAllPosts(),
          getLeaderboard(),
          getDailyQuests(),
          getUserById()
        ]);

        setPosts(postsData);
        setTopUsers(leaderboardData.slice(0, 5));
        setDailyQuests(dailyQuestsData || []);
        setUser(userData?.user || {});
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllData();
  }, []);

  const isQuestCompleted = (questId) => {
    return completedQuests.has(questId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-xl animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans px-10 py-6">
      {/* Header */}
      <header className="flex flex-col-3 md:flex-col-1 justify-between items-center mb-6 sticky top-2">
        <div className="text-2xl font-bold md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <img src="./hamburger.svg" alt="menu" className="w-8 h-8" />
          </button>
        </div>
        <div className="text-2xl font-bold text-[#89F336] hover:text-[#9aff4a] transition-colors duration-200 cursor-pointer">
          ecochallenge
        </div>
        <Link href="/profile" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#9aff4a] hover:scale-110 transition-all duration-200 cursor-pointer">
          {user.photo ? (
            <img src={`http://localhost:8000/storage/${user.photo}`} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <img src="/pfp.svg" alt="profile" className="w-10 h-10 p-2 rounded-full bg-[#1a1a1a]" />
          )}
        </Link>
      </header>

      {/* Grid Layout */}
      <main className="grid grid-cols-1 md:grid-cols-8 gap-4 px-4 md:px-36 my-12 items-start">
        {/* Leaderboard */}
        <aside className="hidden md:flex col-span-2 bg-[#89F336] text-black p-4 rounded-xl flex-col justify-between hover:bg-[#9aff4a] hover:shadow-lg hover:shadow-[#89F336]/20 transition-all duration-300 sticky top-24 h-fit">
          <div>
            <div className="font-semibold mb-4">LEADERBOARD</div>
            <ol className="space-y-4 my-4">
              {topUsers.map((user, index) => (
                <li key={user.id} className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${leaderboardBg[index + 1] || leaderboardBg.default}`}>
                    {index + 1}
                  </div>
                  <div className="flex-1 truncate">
                    <p className="text-sm font-medium truncate">{user.fullname}</p>
                    <p className="text-xs text-[#567761] truncate">@{user.username}</p>
                  </div>
                  <div className="text-sm font-semibold">{user.points}</div>
                </li>
              ))}
            </ol>
          </div>
          <Link href="/leaderboard" className="bg-white mt-6 h-8 rounded-full font-semibold flex items-center justify-center hover:scale-105 hover:bg-gray-100 hover:shadow-md transition-all duration-300 ease-in-out">
            See More
          </Link>
        </aside>

        {/* Post Feed */}
        <section className="w-full col-span-4 bg-[#2a2929] rounded-xl p-4 flex flex-col gap-4 hover:bg-[#323232] hover:shadow-lg hover:shadow-white/5 transition-all duration-300">
          <div className="flex items-center gap-2">
            <Link href="/profile" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#9aff4a] hover:scale-110 transition-all duration-200 cursor-pointer">
              {user.photo ? (
                <img src={`http://localhost:8000/storage/${user.photo}`} alt="profile" className="w-full h-full object-cover" />
              ) : (
                <img src="/pfp.svg" alt="profile" className="w-10 h-10 p-2 rounded-full bg-[#1a1a1a]" />
              )}
            </Link>
            <button
              onClick={openModal}
              className="w-full rounded-lg h-10 bg-white text-black hover:scale-[1.01] transition-all duration-200 ease-in-out"
            >
              Share your eco-activities
            </button>
          </div>
          {posts.length === 0 ? (
            <p className="text-white text-sm">No posts yet.</p>
          ) : (
            posts.map((post) => <PostCards key={post.id} post={post} user={post.user} />)
          )}
        </section>

        {/* Right Column */}
        <aside className="hidden md:flex col-span-2 flex-col gap-4 sticky top-24 h-fit">
          <div className="bg-[#89F336] text-black p-6 rounded-xl flex flex-col items-center justify-center text-center hover:bg-[#9aff4a] hover:shadow-lg hover:shadow-[#89F336]/20 transition-all duration-300 cursor-pointer">
            <div className="text-4xl font-bold">{user.streak || 0}</div>
            <div className="text-sm font-semibold">DAYS</div>
          </div>

          <div className="bg-[#89F336] text-black p-4 rounded-xl flex flex-col justify-between h-full hover:bg-[#9aff4a] hover:shadow-lg hover:shadow-[#89F336]/20 transition-all duration-300">
            <div className="font-semibold mb-2">DAILY QUEST</div>
            <div className="flex flex-col gap-2 text-sm">
              {dailyQuests.length === 0 ? (
                <div className="text-xs text-gray-600">Loading quests...</div>
              ) : (
                dailyQuests.slice(0, 3).map((quest, index) => (
                  <div key={quest.id} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <span className="hover:font-semibold transition-all duration-200 cursor-pointer truncate flex-1 mr-2">
                        {quest.quest || `Mission ${index + 1}`}
                      </span>
                      {isQuestCompleted(quest.id) ? (
                        <CircleCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`w-full h-2 rounded-full transition-colors duration-200 cursor-pointer ${
                        isQuestCompleted(quest.id)
                          ? "bg-green-600"
                          : "bg-black hover:bg-gray-800"
                      }`}
                    ></div>
                  </div>
                ))
              )}
            </div>
            <Link
              href="/challenge"
              className="w-8 h-8 mt-8 ml-auto bg-white rounded-full flex items-center justify-center text-black font-bold hover:bg-gray-100 hover:scale-120 hover:shadow-md transition-all duration-200"
            >
              →
            </Link>
          </div>
        </aside>
      </main>

      {/* Modal & Sidebar */}
      <Post isOpen={isModalOpen} onClose={closeModal} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}
