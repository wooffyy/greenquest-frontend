'use client';

import { signIn } from 'next-auth/react';

const providers = [
  {
    id: 'facebook',
    label: 'Log In with Facebook',
    className:
      'bg-[#1877F2] text-white hover:brightness-110 active:brightness-90',
  },
  {
    id: 'google',
    label: 'Log In with Google',
    className:
      'bg-white text-gray-700 border hover:bg-gray-50 active:bg-gray-100',
  },
  {
    id: 'apple',
    label: 'Log In with Apple',
    className:
      'bg-black text-white hover:brightness-110 active:brightness-90',
  },
];

export default function SocialAuth({ callbackUrl, wide = false }) {
  return (
    <ul className="w-full space-y-3">
      {providers.map((p) => (
        <li key={p.id}>
          <button
            type="button"
            onClick={() => signIn(p.id, { callbackUrl })}
            className={`${
              wide ? 'w-full py-3' : 'w-full py-2'
            } rounded text-sm font-medium ${p.className}`}
          >
            {p.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
