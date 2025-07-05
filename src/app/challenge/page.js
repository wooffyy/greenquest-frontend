'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ResponsiveHeader from '@/components/ResponsiveHeader';
import dailyQuests from '@/data/DailyQuests';
import Post from '@/components/Post';
import { getDailyQuests, completeQuest } from '@/lib/api_quest';
import { getUserProfile } from '@/lib/auth';

// Helper function to get current user ID
const getCurrentUserId = () => {
  if (typeof window === "undefined") return 'anonymous';
  const userProfile = getUserProfile();
  return userProfile?.id?.toString() || 'anonymous';
};

export default function ChallengePage() {
  const router = useRouter();
  const [currentUserId, setCurrentUserId] = useState(null);
  const [dailyProgress, setDailyProgress] = useState([1, 1, 0]);
  const [dailyTimeLeft, setDailyTimeLeft] = useState(72000);
  const [selectedDailyQuests, setSelectedDailyQuests] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [completedQuests, setCompletedQuests] = useState(new Set());
  const [currentQuestIndex, setCurrentQuestIndex] = useState(null);
  const [currentQuestType, setCurrentQuestType] = useState(null);
  const [userPoints, setUserPoints] = useState(0);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  // Load user profile and points
  useEffect(() => {
    const userProfile = getUserProfile();
    if (userProfile) {
      setUserPoints(userProfile.points || 0);
    }
  }, []);

  // Load completed quests from localStorage on component mount and when user changes
  useEffect(() => {
    const userId = getCurrentUserId();
    
    // If user changed, reset completed quests
    if (currentUserId !== null && currentUserId !== userId) {
      setCompletedQuests(new Set());
    }
    
    setCurrentUserId(userId);
    
    const savedCompletedQuests = localStorage.getItem(`completedQuests_${userId}`);
    if (savedCompletedQuests) {
      setCompletedQuests(new Set(JSON.parse(savedCompletedQuests)));
    } else {
      setCompletedQuests(new Set());
    }    
  }, [currentUserId]);

  // Fetch daily quests (API or cache)
  useEffect(() => {
    async function fetchQuests() {
      const cached = localStorage.getItem("dailyQuests");
      const cachedTime = localStorage.getItem("dailyQuestsTime");
      const now = Date.now();

      if (cached && cachedTime && (now - cachedTime) < 86400000) { // <24 jam
        console.log("Using cached quests");
        setSelectedDailyQuests(JSON.parse(cached));
        const timeLeft = 86400 - Math.floor((now - cachedTime)/1000);
        setDailyTimeLeft(timeLeft);
      } else {
        console.log("Fetching new quests from API");
        try {
          const dailyData = await getDailyQuests();
          setSelectedDailyQuests(dailyData);
          localStorage.setItem("dailyQuests", JSON.stringify(dailyData));
          localStorage.setItem("dailyQuestsTime", now.toString());
          setDailyTimeLeft(86400);
        } catch (error) {
          console.error("Failed to fetch quests:", error);
          // Fallback to shuffled local data if fails
          console.log("Using fallback local quests");
          const shuffledDaily = [...dailyQuests].sort(() => 0.5 - Math.random());
          setSelectedDailyQuests(shuffledDaily.slice(0, 3));
        }
      }
    }

    fetchQuests();
  }, []);

  // Timer for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setDailyTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Show points animation
  const showPointsNotification = (points) => {
    setEarnedPoints(points);
    setShowPointsAnimation(true);
    setTimeout(() => setShowPointsAnimation(false), 3000);
  };

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
    let questId;
    let questPoints = 0;
    
    console.log('handlePostSuccess called - currentQuestType:', currentQuestType, 'currentQuestIndex:', currentQuestIndex);
    
    if (currentQuestType === 'daily') {
      const quest = selectedDailyQuests[currentQuestIndex];
      questId = quest.id;
      questPoints = quest.point || 0;
      console.log('Daily quest to complete:', quest, 'questId:', questId, 'points:', questPoints);

      // Only call API if quest has a valid ID from backend
      if (questId && typeof questId === 'string') {
        try {
          const response = await completeQuest(questId);
          console.log('Daily quest marked as completed in backend:', response);
          
          // Update user points from backend response if available
          if (response.user && response.user.points !== undefined) {
            setUserPoints(response.user.points);
          } else {
            // Fallback: add points locally
            setUserPoints(prev => prev + questPoints);
          }
          
          // Show points animation
          showPointsNotification(questPoints);
          
        } catch (error) {
          console.error('Failed to mark quest as completed:', error);
          // Continue with local completion even if API fails
          // Add points locally as fallback
          setUserPoints(prev => prev + questPoints);
          showPointsNotification(questPoints);
        }
      } else {
        // For local/fallback quests, just add points locally
        setUserPoints(prev => prev + questPoints);
        showPointsNotification(questPoints);
      }
    }

    console.log('Before update - completedQuests:', [...completedQuests]);
    
    // Update completed quests state
    const newCompletedQuests = new Set([...completedQuests, questId]);
    setCompletedQuests(newCompletedQuests);
    
    console.log('After update - newCompletedQuests:', [...newCompletedQuests]);
    
    // Save to localStorage with user-specific key
    const userId = getCurrentUserId();
    localStorage.setItem(`completedQuests_${userId}`, JSON.stringify([...newCompletedQuests]));
    console.log('Saved to localStorage for user:', userId, [...newCompletedQuests]);

    setShowPostModal(false);
    setCurrentQuestIndex(null);
    setCurrentQuestType(null);
  };

  const handleCloseModal = () => {
    setShowPostModal(false);
    setCurrentQuestIndex(null);
    setCurrentQuestType(null);
  };

  const isQuestCompleted = (quest, questType = 'daily') => {
    console.log('Checking quest completion:', quest, 'questType:', questType, 'completedQuests:', [...completedQuests]);
    
    if (questType === 'daily') {
      const isCompleted = completedQuests.has(quest.id);
      console.log('Daily quest', quest.id, 'is completed:', isCompleted);
      return isCompleted;
    }
    return false;
  };

  return (
    <div className="bg-black min-h-screen text-white relative">
      <ResponsiveHeader />

      {/* Points Animation */}
      {showPointsAnimation && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#89F336] text-black px-8 py-4 rounded-lg shadow-2xl z-50 animate-bounce">
          <div className="text-center">
            <div className="text-2xl font-bold">+{earnedPoints} Points!</div>
            <div className="text-sm">Quest Completed!</div>
          </div>
        </div>
      )}

      {/* User Points Display */}
      <div className="fixed top-20 right-6 bg-[#89F336] text-black px-4 py-2 rounded-lg shadow-lg z-40">
        <div className="text-sm font-semibold">Points: {userPoints}</div>
      </div>

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
                  <div className="flex-1">
                    <span className="text-white text-lg block mb-1">{quest.quest}</span>
                    <span className="text-[#89F336] text-sm font-semibold">
                      Reward: {quest.point || 0} points
                    </span>
                  </div>
                  {isQuestCompleted(quest) ? (
                    <div className="text-center">
                      <span className="text-gray-400 font-semibold py-3 px-6 block">
                        Quest Completed
                      </span>
                      <span className="text-[#89F336] text-xs">
                        +{quest.point || 0} earned
                      </span>
                    </div>
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