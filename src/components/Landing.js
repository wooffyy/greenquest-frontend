'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { login, register } from '@/lib/auth';

const Heading = ({ children }) => (
  <h2 className="text-2xl font-bold mb-8 text-center">{children}</h2>
);

export default function Landing({ mode }) {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState(params.get('error'));
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = mode === 'login';
  const [form, setForm] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    // Ensure localStorage is accessed only on the client side
    if (typeof window !== 'undefined') {
      const storedUser = JSON.parse(localStorage.getItem('userProfile'));
      if (storedUser) {
        setForm({
          fullname: storedUser.fullname || '',
          username: storedUser.username || '',
          email: storedUser.email || '',
          password: '',
        });
      }
    }
  }, []);

  // LOGIN (langsung redirect)
  const handleLogin = async (e) => {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.target));

    try {
      const result = await login(body);
      if (result.success) {
        router.push("/dashboard");
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error(error);
      setError("Login Failed! Please check your username and password");
    }
  };

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.target));

    try {
      const result = await register(body);
      if (result) {
        router.push('/auth/login');
      }
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.error?.username?.[0] ??
        error.response?.data?.message ??
        "Registration failed";
      setError(message);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4 py-8 sm:py-16 relative">
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-semibold text-[#89F336] drop-shadow-sm z-10 absolute top-4 left-1/2 transform -translate-x-1/2 md:left-6 md:translate-x-0"
      >
        ecochallenge
      </Link>

      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl gap-12 md:gap-28">
        <div className="hidden md:flex flex-col items-center justify-center">
          <img
            src="/images/auth_img.png"
            alt="Eco Challenge Illustration"
            className="w-[26rem] h-[26rem] lg:w-[32rem] lg:h-[32rem] object-contain"
          />
          <h1 className="text-white text-3xl lg:text-4xl font-bold mt-6 text-center">
            Start your journey right now!
          </h1>
        </div>

        {/* Right Section - Form */}
        <div className="w-full max-w-md">
          <div className="bg-white text-black rounded-3xl p-8 shadow-2xl">
            <Heading>{isLogin ? 'Sign In' : 'Sign Up'}</Heading>

            <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-6">
              {/* Full Name Field */}
              {!isLogin && (
                <div>
                  <label htmlFor="fullname" className="block text-sm font-medium text-black mb-2">
                    Fullname
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89F336] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-black mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89F336] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your username"
                />
              </div>

              {/* Email Field (Only for register)*/}
              {!isLogin && (
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89F336] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              )}

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89F336] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black transition-colors duration-200"
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-500 text-sm text-center bg-red-50 py-2 px-4 rounded-lg">
                  {error}
                </div>
              )}

              {/* Redirect Text */}
              <div className="text-center text-sm text-gray-600">
                {isLogin ? (
                  <>
                    Don't have an account yet?{' '}
                    <Link
                      href="/auth/register"
                      className="text-[#89F336] font-semibold hover:underline transition-all duration-200"
                    >
                      Sign up
                    </Link>
                  </>
                ) : (
                  <>
                    Do you already have an account?{' '}
                    <Link
                      href="/auth/login"
                      className="text-[#89F336] font-semibold hover:underline transition-all duration-200"
                    >
                      Sign in
                    </Link>
                  </>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#89F336] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#7BE02A] focus:outline-none transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLogin ? 'Sign In' : 'Sign Up'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
