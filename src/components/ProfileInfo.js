"use client";
import Link from "next/link";

export default function ProfileInfo({ user, isMobile = false }) {
    if (isMobile) {
        return (
            <div className="flex flex-col items-center pt-8 pb-6">
                <div className="w-20 h-20 bg-[#4a4a4a] rounded-full flex items-center justify-center mb-4">
                    <img src="./pfp.svg" alt="profile picture" className="w-12 h-12 object-contain" />
                </div>
                <h1 className="text-xl font-bold">{user.name}</h1>
                <p className="text-sm text-slate-400">@{user.username}</p>
                <p className="text-sm text-slate-400">{user.location}</p>

                {/* Edit Profile Button for Mobile */}
                <Link
                    href="/profile/edit"
                    className="mt-4 bg-white font-semibold text-black w-full text-center px-4 py-2 rounded-lg hover:bg-slate-100 transition-all border max-w-xs"
                >
                    Edit Profile
                </Link>
            </div>
        );
    }

    return (
        <section className="grid grid-cols-6 gap-4 mt-16 px-4 md:px-36">
            {/* Profile Picture (1 col) */}
            <div className="col-span-1 flex justify-end items-start">
                <div className="w-48 h-48 bg-[#1a1a1a] p-8 rounded-full flex items-center justify-center">
                    <img src="./pfp.svg" alt="profile picture" className="w-full h-full object-contain" />
                </div>
            </div>

            {/* User Info (3 col) */}
            <div className="col-span-3 flex flex-col justify-start px-12">
                <h1 className="text-4xl font-bold text-white">{user.name}</h1>
                <div className="flex gap-4 text-sm text-slate-500 font-light mt-1">
                    <span>@{user.username}</span>
                    <span>•</span>
                    <span>{user.location}</span>
                </div>
                <Link
                    href="/profile/edit"
                    className="mt-4 bg-white font-semibold text-black max-w-max px-4 py-2 rounded-lg hover:bg-slate-100 transition-all border"
                >
                    Edit Profile
                </Link>
            </div>

            {/* Streak Display (2 col) */}
            <div className="col-span-2 flex items-start">
                <div className="bg-[#89F336] font-bold text-black rounded-xl flex items-center justify-center">
                    <div className="p-4 text-7xl">{user.streak}</div>
                    <div className="p-4 text-xl">DAYS STREAK!</div>
                </div>
            </div>
        </section>
    );
}
