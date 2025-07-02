"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function MainNavbar() {
  const { data: session } = useSession();

  return (
    <header className="bg-black text-white px-6 py-4 flex justify-between items-center border-b border-green-500 sticky top-0 z-50">
      <Link href="/dashboard" className="text-green-400 font-bold text-xl">
        ecochallenge
      </Link>

      <nav className="space-x-6 hidden md:flex">
        <Link href="/dashboard" className="hover:text-green-300">
          Dashboard
        </Link>
        <Link href="/challange" className="hover:text-green-300">
          Challenge
        </Link>
        <Link href="/leaderboard" className="hover:text-green-300">
          Leaderboard
        </Link>
      </nav>

      <div className="flex items-center space-x-4">
        <Link href="/profile">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full border border-green-400"
            />
          ) : (
            <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-black">
              A
            </div>
          )}
        </Link>
      </div>
    </header>
  );
}
