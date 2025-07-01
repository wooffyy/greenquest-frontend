import { signIn } from "next-auth/react";
import { useState } from "react";

export default function EmailForm({ mode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/profile",
    });
  };

  return (
    <div className="bg-[#F0FFF4] rounded-lg p-6 w-[350px] shadow-lg">
      <h2 className="text-black font-bold text-xl text-center mb-4">{mode}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border border-green-300 rounded px-3 py-2"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full border border-green-300 rounded px-3 py-2"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-green-400 to-green-500 text-black rounded"
        >
          {mode}
        </button>
      </form>
    </div>
  );
}
