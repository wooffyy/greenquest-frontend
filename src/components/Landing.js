'use client';

import SocialAuth from '@/components/SocialAuth';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const Heading = ({ children }) => (
  <h2 className="text-2xl font-bold mb-8 text-center">{children}</h2>
);

export default function Landing({ mode }) {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState(params.get('error'));

  const isLogin = mode === 'login';

  // LOGIN (langsung redirect)
  const handleLogin = async (e) => {
    e.preventDefault();
    router.push('/profile'); // langsung redirect saja
  };

  // REGISTER (simulasi + langsung redirect)
  const handleRegister = async (e) => {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.target));

    // Simulasi request sukses
    console.log('Registered user:', body);
    router.push('/profile');
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4 py-8 sm:py-16 relative">
      <a
        href="/"
        className="absolute left-4 top-4 text-2xl sm:text-3xl font-semibold text-green-400 drop-shadow-sm z-10"
      >
        ecochallenge
      </a>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-10 w-full max-w-5xl mt-20 sm:mt-0">
        {/* Social Auth Card */}
        <div className="w-full max-w-xs sm:max-w-md p-6 sm:p-10 rounded-3xl text-black border-2 border-green-400 bg-[#e5e5e5] flex flex-col items-center">
          <Heading>{isLogin ? 'Log In' : 'Sign Up'}</Heading>
          <SocialAuth callbackUrl="/profile" wide />
        </div>

        {/* OR Divider */}
        <div className="relative flex items-center justify-center sm:flex-col sm:justify-start">
          <div className="h-px sm:h-40 w-24 sm:w-px bg-[repeating-linear-gradient(to_right,_#666_0_6px,_transparent_6px_12px)] sm:bg-[repeating-linear-gradient(to_bottom,_#666_0_6px,_transparent_6px_12px)]" />
          <span className="absolute text-gray-200 font-semibold bg-black px-2 sm:top-1/2 sm:-translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            OR
          </span>
        </div>

        {/* Email Auth Card */}
        <div className="w-full max-w-xs sm:max-w-md p-6 sm:p-10 rounded-3xl text-black border-2 border-green-400 bg-green-100 flex flex-col items-center">
          <Heading>{isLogin ? 'Log In' : 'Sign Up'}</Heading>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <form
            onSubmit={isLogin ? handleLogin : handleRegister}
            className="w-full space-y-4"
          >
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full rounded-full border px-5 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full rounded-full border px-5 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full rounded-full border px-5 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />

            <button
              type="submit"
              className="w-full rounded-full bg-green-500 text-white py-3 text-sm font-semibold hover:brightness-110 active:brightness-95"
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
