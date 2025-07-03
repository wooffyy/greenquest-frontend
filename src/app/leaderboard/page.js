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
        <div className="flex justify-center gap-4 items-end mb-16">
          <PodiumUser user={third} rank={3} height="h-48" />
          <PodiumUser user={first} rank={1} height="h-64" isWinner />
          <PodiumUser user={second} rank={2} height="h-56" />
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

  return (
    <div className={`flex flex-col items-center justify-end w-32 rounded-t-xl relative pb-4 ${height} ${bgColor} overflow-visible`}>
      {isWinner && (
        <div className="absolute -top-10 flex justify-center w-full z-10">
          <img src="/images/crown.png" alt="Crown" className="h-10 w-auto" />
        </div>
      )}
      <div className="absolute -top-16 w-20 h-20 rounded-full border-4 border-green-500 overflow-hidden bg-white z-20">
        <img src={user.avatar} alt={user.username} className="object-cover w-full h-full" />
      </div>
      <div className={`mt-20 text-sm ${textColor}`}>{user.fullName}</div>
      <div className={`text-xl font-bold ${textColor}`}>{user.points}</div>
      <div className={`text-sm ${textColor}`}>{user.username}</div>
      <div className="absolute top-1 left-1 text-sm bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
        {rank}
      </div>
    </div>
  );
}
