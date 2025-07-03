'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import ProfileHeader from '@/components/ProfileHeader';

export default function ProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    nickName: '',
    gender: '',
    country: '',
    language: '',
    city: '',
    email: '',
    picture: null,
  });

  const [warnUnsaved, setWarnUnsaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (warnUnsaved) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [warnUnsaved]);

  const handleChange = (e) => {
    setWarnUnsaved(true);
    const { name, value, files } = e.target;
    setForm((o) => ({ ...o, [name]: files ? files[0] : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWarnUnsaved(false);
    alert('Profile updated!');
  };

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Replaced old nav with ProfileHeader */}
      <ProfileHeader
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setIsSidebarOpen}
      />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Header Image */}
      <div
        className="w-full h-48 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/header-leaf.jpg')" }}
      />

      {/* Profile Form */}
      <div className="max-w-5xl mx-auto mt-[-60px] p-8 bg-green-600 rounded-xl shadow-lg relative z-10">
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
              {form.fullName || 'Your Name'}
            </div>
            <div className="text-gray-200">
              {form.email || 'No email added yet'}
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="ml-auto bg-red-800 px-2 py-1 rounded hover:bg-red-700 text-sm"
          >
            Log Out
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-200/70 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                className="w-full rounded border border-black px-5 py-3 text-sm bg-white placeholder-black text-black"
              />
              <input
                type="text"
                name="nickName"
                placeholder="Nick Name"
                value={form.nickName}
                onChange={handleChange}
                className="w-full rounded border border-black px-5 py-3 text-sm bg-white placeholder-black text-black"
              />
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full rounded border border-black px-5 py-3 text-sm bg-white text-black"
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
                className="w-full rounded border border-black px-5 py-3 text-sm bg-white text-black"
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
                className="w-full rounded border border-black px-5 py-3 text-sm bg-white text-black"
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
                className="w-full rounded border border-black px-5 py-3 text-sm bg-white placeholder-black text-black"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded border border-black px-5 py-3 text-sm bg-white placeholder-black text-black col-span-1 md:col-span-2"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-green-800 px-6 py-3 rounded text-gray-200 font-semibold hover:bg-blue-600 w-full sm:w-auto"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
