'use client';

import React from 'react';
import ResponsiveHeader from '@/components/ResponsiveHeader';
import users from '@/data/users';

export default function LeaderboardPage() {
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);
  const [first, second, third, ...rest] = sortedUsers;

  return (
    <div className="bg-black min-h-screen text-white relative">
      <ResponsiveHeader />

      <div className="max-w-5xl mx-auto pt-20 pb-1">
        <div className="flex justify-center gap-0 items-end mb-16">
          <PodiumUser user={third} rank={3} height="h-40" />
          <PodiumUser user={first} rank={1} height="h-80" isWinner />
          <PodiumUser user={second} rank={2} height="h-60" />
        </div>

        <div className="bg-green-700 rounded-t-3xl px-6 py-4">
          {rest.map((user) => (
            <div key={user.id} className="flex items-center justify-between py-4 border-b border-black last:border-none">
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-14 h-14 rounded-full bg-white object-cover"
                />
                <div>
                  <div className="text-md font-semibold">{user.fullName}</div>
                  <div className="text-sm text-white/80">{user.username}</div>
                </div>
              </div>
              <div className="text-xl font-bold">{user.points}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PodiumUser({ user, rank, height, isWinner = false }) {
  const bgColor = rank === 1 ? 'bg-white' : 'bg-green-700';
  const textColor = rank === 1 ? 'text-black' : 'text-white';

  const badgeColors = {
    1: 'bg-[#e8c400]', // Gold
    2: 'bg-[#C0C0C0]', // Silver
    3: 'bg-[#CD7F32]'  // Bronze
  };

  return (
    <div className={`flex flex-col items-center justify-end w-32 rounded-t-xl relative pb-4 ${height} ${bgColor} overflow-visible`}>
      {isWinner && (
        <div className="absolute -top-10 flex justify-center w-full z-10">
          <img src="/images/crown.png" alt="Crown" className="h-10 w-auto" />
        </div>
      )}

      {/* Avatar + Rank badge */}
      <div className="absolute -top-16 w-20 h-20 z-20">
        <div className="relative w-full h-full">
          <div className="w-full h-full rounded-full border-4 border-green-500 overflow-hidden bg-white">
            <img src={user.avatar} alt={user.username} className="object-cover w-full h-full" />
          </div>
          <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${badgeColors[rank]} text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center z-30 shadow-md`}>
            {rank}
          </div>
        </div>
      </div>

      {/* Spacer to make room for floating avatar */}
      <div className="mt-12 text-center">
        <div className={`text-sm ${textColor}`}>{user.fullName}</div>
        <div className={`text-xl font-bold ${textColor}`}>{user.points}</div>
        <div className={`text-sm ${textColor}`}>{user.username}</div>
      </div>
    </div>
  );
}


