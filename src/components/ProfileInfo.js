"use client";
import Link from "next/link";
import StatsCard from "./StatsCard";

export default function ProfileInfo({ user,point, isMobile = false }) {
  console.log(point);
  
  if (isMobile) {
    return (
      <div className="flex flex-col items-center pt-8 pb-6">
        <div className="w-20 h-20 bg-[#4a4a4a] rounded-full flex items-center justify-center mb-4 overflow-hidden">
          <img src={`http://localhost:8000/storage/${user.photo}`} alt="profile picture" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-xl font-bold">{user.fullname}</h1>
        <p className="text-sm text-slate-400">@{user.username}</p>

        {/* Edit Profile Button for Mobile */}
        <Link
          href="/profile/edit"
          className="mt-4 bg-white font-semibold text-black w-full text-center px-4 py-2 rounded-lg hover:bg-slate-100 transition-all border max-w-[120px]"
        >
          Edit Profile
        </Link>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-16 px-4 md:px-36">
      {/* Profile Picture */}
      <div className="flex justify-center md:justify-end items-start col-span-1">
        <div className="w-32 h-32 md:w-48 md:h-48 bg-[#1a1a1a] p-2 rounded-full flex items-center justify-center overflow-hidden">
          <img src={`http://localhost:8000/storage/${user.photo}`} alt="profile picture" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* User Info */}
      <div className="flex flex-col justify-start px-0 md:px-12 col-span-3 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-white">{user.fullname}</h1>
        <div className="flex flex-col md:flex-row gap-1 md:gap-4 text-xl text-slate-500 font-light mt-1 items-center md:items-start">
          <span>@{user.username}</span>
        </div>
        <Link
          href="/profile/edit"
          className="mt-4 bg-white font-semibold text-black max-w-max mx-auto md:mx-0 px-4 py-2 rounded-lg hover:bg-slate-100 transition-all border"
        >
          Edit Profile
        </Link>
      </div>

      {/* Streak Display */}
      <div className="col-span-2 flex-col justify-center md:justify-start items-start max-w-[240px]">
        <div className="bg-[#89F336] font-bold text-black rounded-xl flex items-center justify-center w-full max-w-[240px]">
          <div className="p-4 text-5xl md:text-7xl">{user.streak ?? 0}</div>
          <div className="p-4 text-lg md:text-xl">DAYS STREAK!</div>
        </div>
        <StatsCard ecoPoints={point ?? 0} className="mt-4" />
      </div>
    </section>
  );
}
