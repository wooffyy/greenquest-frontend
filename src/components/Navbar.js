"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-black text-white px-6 py-4 flex justify-between items-center border-b border-green-500 sticky top-0 z-50">
      <h1 className="text-green-400 font-bold text-xl">ecochallenge</h1>
      <nav className="space-x-4 hidden md:block">
        <a href="#about" className="hover:text-green-300">About Us</a>
        <a href="#highlights" className="hover:text-green-300">Highlights</a>
        <a href="#statistics" className="hover:text-green-300">Statistics</a>
        <a href="#contact" className="hover:text-green-300">Contacts</a>
      </nav>
      <div className="space-x-2">
        <Link href="/auth/register">
          <button className="bg-green-400 hover:bg-green-300 text-black px-3 py-1 rounded">
            Register
          </button>
        </Link>
        <Link href="/auth/login">
          <button className="border border-green-400 text-green-400 hover:bg-green-400 hover:text-black px-3 py-1 rounded">
            Sign in
          </button>
        </Link>
      </div>
    </header>
  );
}
