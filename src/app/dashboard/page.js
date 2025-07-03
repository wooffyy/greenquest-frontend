// app/dashboard/page.js
"use client";

import { useEffect, useState } from "react";
import { getAllPosts } from "@/lib/api_post";
import Post from "@/components/Post";
import PostCards from "@/components/PostCards";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    getAllPosts()
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans px-10 py-6">
      {/* Header */}
      <header className="flex flex-col-3 md:flex-col-1 justify-between items-center mb-6">
        <div className="text-2xl font-bold md:hidden">
          <button onClick={() => setSidebarOpen(true)}><img src="./hamburger.svg" alt="menu" className="w-8 h-8"/></button>  
        </div>
        <div className="text-2xl font-bold text-[#89F336] hover:text-[#9aff4a] transition-colors duration-200 cursor-pointer">
          ecochallenge
        </div>
        <Link
          href="/profile"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#89F336] text-black font-semibold hover:bg-[#9aff4a] hover:scale-110 transition-all duration-200 cursor-pointer"
        >
          A
        </Link>
      </header>

      {/* Grid Layout */}
      <main className="grid grid-cols-1 md:grid-cols-8 gap-4 px-4 md:px-36 my-12 items-start">
        {/* Left Column (2/8) - Leaderboard */}
        <aside className="hidden md:flex col-span-2 bg-[#89F336] text-black p-4 rounded-xl flex-col justify-between hover:bg-[#9aff4a] hover:shadow-lg hover:shadow-[#89F336]/20 transition-all duration-300">
          <div>
            <div className="font-semibold mb-4">LEADERBOARD</div>
            <ol className="space-y-4 my-8">
              <li className="bg-yellow-300 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</li>
              <li className="bg-gray-300 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</li>
              <li className="bg-amber-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white">3</li>
              <li className="bg-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold hover:scale-110">4</li>
              <li className="bg-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold hover:scale-110">5</li>
            </ol>
          </div>
          <Link
            href="/leaderboard"
            className="bg-white mt-6 h-8 rounded-full font-semibold flex items-center justify-center hover:scale-105 hover:bg-gray-100 hover:shadow-md transition-all duration-300 ease-in-out"
          >
            See More
          </Link>
        </aside>

        {/* Center Column (4/8) - Post Feed */}
        <section className="w-full col-span-4 bg-[#2a2929] rounded-xl p-4 flex flex-col gap-4 hover:bg-[#323232] hover:shadow-lg hover:shadow-white/5 transition-all duration-300">
          {/* Input Post */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#89F336] text-black font-semibold hover:bg-[#9aff4a] hover:scale-110 transition-all duration-200">
              A
            </div>
            <button 
              onClick={openModal}
              className="w-full rounded-lg h-10 bg-white text-black hover:scale-[1.01] transition-all duration-200 ease-in-out"
            >
              Share your eco-activities
            </button>
          </div>

          {/* Feed Post (map all post) */}
          {posts.length === 0 ? (
            <p className="text-white text-sm">No posts yet.</p>
          ) : (
            posts.map((post) => <PostCards key={post.id} post={post} />)
          )}
        </section>

        {/* Right Column (2/8) - Streak & Daily Quest */}
        <aside className="hidden md:flex col-span-2 flex-col gap-4">
          <div className="bg-[#89F336] text-black p-6 rounded-xl flex flex-col items-center justify-center text-center hover:bg-[#9aff4a] hover:scale-105 hover:shadow-lg hover:shadow-[#89F336]/20 transition-all duration-300 cursor-pointer">
            <div className="text-4xl font-bold">42</div>
            <div className="text-sm font-semibold">DAYS</div>
          </div>

          <div className="bg-[#89F336] text-black p-4 rounded-xl flex flex-col justify-between h-full hover:bg-[#9aff4a] hover:shadow-lg hover:shadow-[#89F336]/20 transition-all duration-300">
            <div className="font-semibold mb-2">DAILY QUEST</div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="hover:font-semibold transition-all duration-200 cursor-pointer">Mission 1</span>
              </div>
              <div className="w-full h-4 bg-black rounded-full hover:bg-gray-800 transition-colors duration-200 cursor-pointer"></div>
              <div className="flex justify-between">
                <span className="hover:font-semibold transition-all duration-200 cursor-pointer">Mission 2</span>
              </div>
              <div className="w-full h-4 bg-black rounded-full hover:bg-gray-800 transition-colors duration-200 cursor-pointer"></div>
              <div className="flex justify-between">
                <span className="hover:font-semibold transition-all duration-200 cursor-pointer">Mission 3</span>
              </div>
              <div className="w-full h-4 bg-black rounded-full hover:bg-gray-800 transition-colors duration-200 cursor-pointer"></div>
            </div>
            <Link href="/challenge" className="w-8 h-8 mt-8 ml-auto bg-white rounded-full flex items-center justify-center text-black font-bold hover:bg-gray-100 hover:scale-120 hover:shadow-md transition-all duration-200">
              →
            </Link>
          </div>
        </aside>
      </main>

      {/* Modal */}
      <Post isOpen={isModalOpen} onClose={closeModal} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}