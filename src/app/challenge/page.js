'use client';

import { useEffect, useState } from 'react';
import ResponsiveHeader from '@/components/ResponsiveHeader';
import dailyQuests from '@/data/DailyQuests';
import Post from '@/components/Post';
import { getDailyQuests, completeQuest } from '@/lib/api_quest';
import { getUserProfile } from '@/lib/auth';

export default function ChallengePage() {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [dailyTimeLeft, setDailyTimeLeft] = useState(72000);
  const [selectedDailyQuests, setSelectedDailyQuests] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [completedQuests, setCompletedQuests] = useState(new Set());
  const [currentQuestIndex, setCurrentQuestIndex] = useState(null);
  const [currentQuestType, setCurrentQuestType] = useState(null);

  // Get user ID
  useEffect(() => {
    async function fetchUser() {
      const user = await getUserProfile();
      const id = user?.id?.toString() || 'anonymous';
      setCurrentUserId(id);

      const savedCompleted = localStorage.getItem(`completedQuests_${id}`);
      setCompletedQuests(new Set(JSON.parse(savedCompleted || '[]')));
    }
    fetchUser();
  }, []);

  // Fetch daily quests
  useEffect(() => {
    async function fetchQuests() {
      const cached = localStorage.getItem("dailyQuests");
      const cachedTime = localStorage.getItem("dailyQuestsTime");
      const now = Date.now();

      if (cached && cachedTime && now - cachedTime < 86400000) {
        setSelectedDailyQuests(JSON.parse(cached));
        const timeLeft = 86400 - Math.floor((now - cachedTime) / 1000);
        setDailyTimeLeft(timeLeft);
      } else {
        try {
          const quests = await getDailyQuests();
          setSelectedDailyQuests(quests);
          localStorage.setItem("dailyQuests", JSON.stringify(quests));
          localStorage.setItem("dailyQuestsTime", now.toString());
          setDailyTimeLeft(86400);
        } catch {
          const shuffled = [...dailyQuests].sort(() => 0.5 - Math.random());
          setSelectedDailyQuests(shuffled.slice(0, 3));
        }
      }
    }
    fetchQuests();
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setDailyTimeLeft(prev => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const handleAct = (questIndex, questType) => {
    setCurrentQuestIndex(questIndex);
    setCurrentQuestType(questType);
    setShowPostModal(true);
  };

  const handlePostSuccess = async () => {
    console.log("📸 handlePostSuccess triggered");
    if (currentQuestType === 'daily') {
      const quest = selectedDailyQuests[currentQuestIndex];
      const questId = quest?.id;
      const point = quest?.point || 0;
      const userId = currentUserId;
      try {
          await completeQuest(questId);
          console.log('✅ Quest submitted to backend:', { questId, userId, point });
        } catch (err) {
          console.error('❌ Failed to submit quest:', err);
        }

      const updatedCompleted = new Set([...completedQuests, questId]);
      setCompletedQuests(updatedCompleted);
      localStorage.setItem(`completedQuests_${userId}`, JSON.stringify([...updatedCompleted]));
    }

    setShowPostModal(false);
    setCurrentQuestIndex(null);
    setCurrentQuestType(null);
  };

  const handleCloseModal = () => {
    setShowPostModal(false);
    setCurrentQuestIndex(null);
    setCurrentQuestType(null);
  };

  const isQuestCompleted = (quest) => {
    return completedQuests.has(quest.id);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <ResponsiveHeader />

      <main className="p-6 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-12 mt-16">
          Complete daily quest to earn more points!
        </h1>

        <div className="w-full max-w-2xl mx-auto space-y-8 mt-24">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-300">DAILY QUEST</h2>
              <span className="text-gray-400">{formatTime(dailyTimeLeft)}</span>
            </div>

            {selectedDailyQuests.map((quest, i) => (
              <div key={quest.id} className="bg-gray-900 border border-green-500 rounded-2xl p-6">
                <div className="flex justify-between items-center gap-4">
                  <span className="text-white text-lg flex-1">{quest.quest}</span>
                  {isQuestCompleted(quest) ? (
                    <span className="text-gray-400 font-semibold py-3 px-6">
                      Quest Completed
                    </span>
                  ) : (
                    <button 
                      onClick={() => handleAct(i, 'daily')}
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 rounded-lg transition-colors duration-200 flex items-center justify-center h-12 min-w-[100px]"
                    >
                      Act Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {showPostModal && (
          <Post 
            isOpen={showPostModal}
            onClose={handleCloseModal}
            onPostSuccess={handlePostSuccess}
          />
        )}
      </main>
    </div>
  );
}
