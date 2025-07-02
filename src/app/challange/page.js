"use client";

import MainNavbar from "@/components/MainNavbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dailyQuests from "@/data/DailyQuests";
import monthlyQuests from "@/data/MonthlyQuests";

export default function ChallangePage() {
  const router = useRouter();
  const [dailyProgress, setDailyProgress] = useState([1, 1, 0]);
  const [monthlyProgress, setMonthlyProgress] = useState(1);
  const [dailyTimeLeft, setDailyTimeLeft] = useState(72000); // 20 hours
  const [monthlyTimeLeft, setMonthlyTimeLeft] = useState(2505600); // 29 days
  const [selectedDailyQuests, setSelectedDailyQuests] = useState([]);
  const [selectedMonthlyQuest, setSelectedMonthlyQuest] = useState("");

  useEffect(() => {
    // Timer countdown
    const timer = setInterval(() => {
      setDailyTimeLeft((prev) => Math.max(prev - 1, 0));
      setMonthlyTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Select 3 random daily quests and 1 monthly quest
    const shuffledDaily = [...dailyQuests].sort(() => 0.5 - Math.random());
    setSelectedDailyQuests(shuffledDaily.slice(0, 3));
    const shuffledMonthly = [...monthlyQuests].sort(() => 0.5 - Math.random());
    setSelectedMonthlyQuest(shuffledMonthly[0]);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const handleRedirect = () => {
    router.push("/dashboard");
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <MainNavbar />
      <main className="p-6">
        <h1 className="text-4xl font-bold mb-4">Complete daily quest to earn more points!</h1>

        <div className="bg-gray-800 p-4 rounded-lg w-fit mb-6">
          <p>Quest Taken: <span className="font-bold">22</span></p>
          <p>Quest Completed: <span className="font-bold">14</span></p>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            DAILY QUEST <span className="float-right text-sm">{formatTime(dailyTimeLeft)}</span>
          </h2>
          {selectedDailyQuests.map((title, i) => (
            <div
              key={i}
              className="bg-gray-900 mb-3 p-4 rounded-lg border border-green-500 cursor-pointer hover:bg-gray-800"
              onClick={handleRedirect}
            >
              <p>{title}</p>
              <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                <div
                  className="bg-green-400 h-2.5 rounded-full"
                  style={{ width: `${(dailyProgress[i] / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            MONTHLY CHALLENGE QUEST <span className="float-right text-sm">{formatTime(monthlyTimeLeft)}</span>
          </h2>
          <div
            className="bg-gray-900 mb-3 p-4 rounded-lg border border-green-500 cursor-pointer hover:bg-gray-800"
            onClick={handleRedirect}
          >
            <p>{selectedMonthlyQuest}</p>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
              <div
                className="bg-green-400 h-2.5 rounded-full"
                style={{ width: `${(monthlyProgress / 5000) * 100}%` }}
              ></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
