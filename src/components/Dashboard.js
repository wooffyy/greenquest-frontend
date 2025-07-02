"use client";
import { useState } from "react";
import Post from "./Post";
import PostCards from "./PostCards";

export default function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-black text-white font-sans px-10 py-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold text-[#89F336]">ecochallenge</div>
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#89F336] text-black font-semibold">A</div>
      </header>

      {/* Grid Layout */}
      <main className="grid grid-cols-8 gap-4 px-36 my-12 items-start">
        {/* Left Column (2/8) - Leaderboard */}
        <aside className="col-span-2 bg-[#89F336] text-black p-4 rounded-xl flex flex-col justify-between">
          <div>
            <div className="font-semibold mb-4">LEADERBOARD</div>
            <ol className="space-y-4 my-8">
              <li className="bg-yellow-300 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</li>
              <li className="bg-gray-300 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</li>
              <li className="bg-amber-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white">3</li>
              <li className="bg-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">4</li>
              <li className="bg-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">5</li>
            </ol>
          </div>
          <button className="bg-white mt-6 h-8 rounded-full font-semibold hover:scale-105 hover:transition duration-300 ease-in-out">See More</button>
        </aside>

        {/* Center Column (4/8) - Post Feed */}
        <section className="col-span-4 bg-[#2a2929] rounded-xl p-4 flex flex-col gap-4">
          {/* Input Post */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#89F336] text-black font-semibold">A</div>
            <button 
              onClick={openModal}
              className="w-full rounded-lg h-10 bg-white text-black hover:bg-gray-100 transition duration-200 ease-in-out"
            >
              Share your eco-activities
            </button>
          </div>

          {/* Feed Post */}
          <PostCards />
        </section>

        {/* Right Column (2/8) - Streak & Daily Quest */}
        <aside className="col-span-2 flex flex-col gap-4">
          {/* Streak */}
          <div className="bg-[#89F336] text-black p-6 rounded-xl flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-bold">42</div>
            <div className="text-sm font-semibold">DAYS</div>
          </div>

          {/* Daily Quest */}
          <div className="bg-[#89F336] text-black p-4 rounded-xl flex flex-col justify-between h-full">
            <div className="font-semibold mb-2">DAILY QUEST</div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span>Mission 1</span>
              </div>
              <div className="w-full h-4 bg-black rounded-full"></div>
              <div className="flex justify-between">
                <span>Mission 2</span>
              </div>
              <div className="w-full h-4 bg-black rounded-full"></div>
              <div className="flex justify-between">
                <span>Mission 3</span>
              </div>
              <div className="w-full h-4 bg-black rounded-full"></div>
            </div>
            <button className="w-8 h-8 mt-8 ml-auto bg-white rounded-full flex items-center justify-center text-black font-bold">→</button>
          </div>
        </aside>
      </main>

      {/* Modal */}
      <Post isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}