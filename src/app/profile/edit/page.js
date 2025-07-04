'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import ProfileHeader from '@/components/ProfileHeader';
import { updateUser, logoutUser } from '@/lib/api_edit';
import { User, Mail, Lock, Camera, Save, X, Eye, EyeOff } from 'lucide-react';

export default function ProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [form, setForm] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    photo: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [warnUnsaved, setWarnUnsaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      router.push('/auth/login');
      return;
    }
    setForm({
      fullname: storedUser.fullname || '',
      username: storedUser.username || '',
      email: storedUser.email || '',
      password: '',
      photo: null,
    });
  }, []);

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

  const triggerFileInput = () => {
    document.getElementById('photoInput').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWarnUnsaved(false);
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const res = await updateUser({ id: user.id, token, data: formData });
      alert("Profile updated!");
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Failed to update profile");
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      await logoutUser(token);
    } catch (err) {
      console.error("Logout error:", err);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-cover bg-center text-white" style={{ backgroundImage: "url('/images/bg-edit.jpg')" }}>
      <ProfileHeader
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setIsSidebarOpen}
      />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="max-w-4xl mx-auto px-4 mt-8 md:mt-32">
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 space-y-8">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative group">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl">
                <User className="w-12 h-12 text-black" />
              </div>
              <input
                type="file"
                id="photoInput"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={triggerFileInput}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#89F336] rounded-full flex items-center justify-center shadow-lg hover:bg-[#7AD02E]"
              >
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-2">{form.fullname}</h2>
              <p className="text-green-200 mb-1">@{form.username}</p>
              <p className="text-green-300">{form.email}</p>
            </div>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-green-200 mb-2">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#89F336]"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-200 mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#89F336]"
                placeholder="Enter your username"
              />
            </div>
          </div>

          {/* Email & Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-green-200 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#89F336]"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-200 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#89F336]"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-[#89F336] px-6 py-3 rounded text-black font-semibold hover:bg-[#7AD02E] transition"
            >
              Update Profile
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="ml-4 bg-white/10 px-6 py-3 rounded text-white font-semibold hover:bg-white/20 border border-white/20"
            >
              Log Out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
