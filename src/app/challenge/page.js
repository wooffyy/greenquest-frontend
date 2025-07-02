'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dailyQuests from '@/data/DailyQuests';
import monthlyQuests from '@/data/MonthlyQuests';
import MainNavbar from '@/components/MainNavbar';
import Sidebar from '@/components/Sidebar';
// import { Axios } from 'axios';
// import { cookies } from 'universal-cookie/cjs/Cookies';

// Yang dikasih comment, buat back-end

// const API_URL  = process.env.API_ENDPOINT;
// const cookies = new Cookies();

export default function ChallangePage() {
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dailyProgress, setDailyProgress] = useState([1, 1, 0]);
  const [monthlyProgress, setMonthlyProgress] = useState(1);
  const [dailyTimeLeft, setDailyTimeLeft] = useState(72000); // 20 hours
  const [monthlyTimeLeft, setMonthlyTimeLeft] = useState(2505600); // 29 days
  const [selectedDailyQuests, setSelectedDailyQuests] = useState([]);
  const [selectedMonthlyQuest, setSelectedMonthlyQuest] = useState('');

  const [data, setData] = useState();

  // Countdown timers
  useEffect(() => {
    // const cookie = get.Cookies('Authorization');
    // const getData = async () => {
    //   await Axios.get(`${API_ENDPOINT}quests`, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${cookie}`,

    //     }).then((response) => {
    //       setData(response.data);
    //     }
          
    //   }});
    
    const timer = setInterval(() => {
      setDailyTimeLeft((prev) => Math.max(prev - 1, 0));
      setMonthlyTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Select quests
  useEffect(() => {
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
    router.push('/dashboard');
  };

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Desktop Navbar */}
      <div className="hidden sm:block">
        <MainNavbar />
      </div>

      {/* Mobile Hamburger Button */}
      <div className="sm:hidden flex items-center justify-between p-4 border-b border-green-500">
        <button onClick={() => setIsSidebarOpen(true)} className="text-white text-3xl">
          <img src="./hamburger.svg" alt="menu" className="w-8 h-8"/>
        </button>
        <div className="w-10 h-10 bg-white rounded-full border-2 border-green-400" />
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="p-6 max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mt-8 mb-12">
          Complete daily quest to<br />earn more points!
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start mx-2">
          {/* Stats Card */}
          <div className="bg-gray-800 rounded-2xl p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-lg">Quest Taken</span>
                <span className="text-white text-2xl font-bold">22</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-lg">Quest Completed</span>
                <span className="text-white text-2xl font-bold">14</span>
              </div>
            </div>
          </div>

          {/* Daily Quest Section */}
          <div className="col-span-1 lg:col-span-3 space-y-6">
            {/* Daily Quest Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-center text-gray-300">DAILY QUEST</h2>
              <span className="text-gray-400">{formatTime(dailyTimeLeft)}</span>
            </div>

            {/* Daily Quest Items - Dynamic from shuffled data */}
            <div className="space-y-4">
              {selectedDailyQuests.map((title, i) => (
                <div 
                  key={i}
                  className="bg-gray-900 border border-green-500 rounded-2xl p-6 cursor-pointer hover:bg-gray-800"
                  onClick={handleRedirect}
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white text-lg">{title}</span>
                    <span className="text-gray-400 text-sm">{dailyProgress[i]}/10</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{width: `${(dailyProgress[i] / 10) * 100}%`}}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Monthly Quest Header */}
            <div className="flex justify-between items-center mt-12">
              <h2 className="text-xl lg:text-2xl font-semibold text-center text-gray-300">MONTHLY CHALLENGE QUEST</h2>
              <span className="text-gray-400">{formatTime(monthlyTimeLeft)}</span>
            </div>

            {/* Monthly Quest Item - Dynamic from shuffled data */}
            <div className="bg-gray-900 border border-green-500 rounded-2xl p-6 cursor-pointer hover:bg-gray-800"
                 onClick={handleRedirect}>
              <div className="flex justify-between items-center mb-4">
                <span className="text-white text-lg">{selectedMonthlyQuest}</span>
                <span className="text-gray-400 text-sm">{monthlyProgress}/5000</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{width: `${(monthlyProgress / 5000) * 100}%`}}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}