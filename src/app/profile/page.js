"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [form, setForm] = useState({
    fullName: "",
    nickName: "",
    gender: "",
    country: "",
    language: "",
    city: "",
    email: "",
    picture: null,
  });
  const [warnUnsaved, setWarnUnsaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (warnUnsaved) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [warnUnsaved]);

  const handleChange = (e) => {
    setWarnUnsaved(true);
    const { name, value, files } = e.target;
    setForm((o) => ({ ...o, [name]: files ? files[0] : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWarnUnsaved(false);
    alert("Profile updated!");
  };

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="bg-black border-b border-green-500 py-4 px-6 flex items-center justify-between">
        <a href="/dashboard" className="text-green-400 text-2xl font-bold">
          ecochallenge
        </a>
        <div className="space-x-6 text-sm font-medium text-white">
          <a href="/dashboard" className="hover:text-green-400">Dashboard</a>
          <a href="/challange" className="hover:text-green-400">Challange</a>
          <a href="/gallery" className="hover:text-green-400">Gallery</a>
          <a href="/leaderboard" className="hover:text-green-400">Leaderboard</a>
        </div>
      </nav>

      {/* Header Image */}
      <div className="w-full h-48 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/header-leaf.jpg')" }} />

      {/* Profile Form Container */}
      <div className="max-w-5xl mx-auto mt-[-60px] p-8 bg-green-600 rounded-xl shadow-lg relative z-10">
        {/* Avatar + Info */}
        <div className="flex items-center mb-8">
          <div className="relative">
            <img
              src={
                form.picture
                  ? URL.createObjectURL(form.picture)
                  : "/images/default-avatar.jpg"
              }
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover cursor-pointer border-2 border-white"
            />
            <input
              type="file"
              name="picture"
              accept="image/*"
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer rounded-full"
            />
          </div>
          <div className="ml-6">
            <div className="text-xl font-bold">
              {form.fullName || "Your Name"}
            </div>
            <div className="text-gray-200">
              {form.email || "No email added yet"}
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="ml-auto bg-red-800 px-2 py-1 rounded hover:bg-red-800"
          >
            Log Out
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Kotak abu-abu di belakang input */}
          <div className="bg-gray-200/70 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                className="w-full rounded border border-black px-5 py-3 text-sm bg-white placeholder-black text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                name="nickName"
                placeholder="Nick Name"
                value={form.nickName}
                onChange={handleChange}
                className="w-full rounded border border-black px-5 py-3 text-sm bg-white placeholder-black text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full rounded border border-black px-5 py-3 text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Rather not say</option>
              </select>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full rounded border border-black px-5 py-3 text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Country</option>
                <option>Indonesia</option>
                <option>USA</option>
                <option>UK</option>
                <option>Others</option>
              </select>
              <select
                name="language"
                value={form.language}
                onChange={handleChange}
                className="w-full rounded border border-black px-5 py-3 text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Language</option>
                <option>English</option>
                <option>Indonesian</option>
                <option>Spanish</option>
              </select>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="w-full rounded border border-black px-5 py-3 text-sm bg-white placeholder-black text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded border border-black px-5 py-3 text-sm bg-white placeholder-black text-black col-span-1 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-green-800 px-3 py-2 rounded text-gray-200 font-semibold hover:bg-blue-600"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
