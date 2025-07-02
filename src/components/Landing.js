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
    <main className="min-h-screen bg-black flex items-center justify-center p-6 relative">
      <a
        href="/"
        className="absolute left-6 top-6 text-3xl font-semibold text-green-400 drop-shadow-sm"
      >
        ecochallenge
      </a>

      <div className="flex flex-col sm:flex-row items-center gap-10">
        {/* Kartu Social */}
        <div className="w-80 sm:w-96 p-10 rounded-3xl text-black border-2 border-green-400 bg-[#e5e5e5] flex flex-col items-center">
          <Heading>{isLogin ? 'Log In' : 'Sign Up'}</Heading>
          <SocialAuth callbackUrl="/profile" wide />
        </div>

        {/* OR */}
        <div className="flex flex-col items-center relative">
          <div className="w-px h-32 sm:h-56 bg-[repeating-linear-gradient(to_bottom,_#666_0_6px,_transparent_6px_12px)]" />
          <span className="absolute top-1/2 -translate-y-1/2 text-gray-200 font-semibold bg-black px-2">
            OR
          </span>
        </div>

        {/* Kartu Email */}
        <div className="w-80 sm:w-96 p-10 rounded-3xl text-black border-2 border-green-400 bg-green-100 flex flex-col items-center">
          <Heading>{isLogin ? 'Log In' : 'Sign Up'}</Heading>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          <form
            onSubmit={isLogin ? handleLogin : handleRegister}
            className="w-full space-y-5"
          >
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full rounded-full border px-5 py-3 text-sm bg-gray/80 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full rounded-full border px-5 py-3 text-sm bg-gray/80 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full rounded-full border px-5 py-3 text-sm bg-gray/80 focus:outline-none focus:ring-2 focus:ring-green-400"
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
