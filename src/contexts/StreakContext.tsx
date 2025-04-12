import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface StreakContextType {
  isStreakActive: boolean;
  streakProgress: number;
  todayStreak: number;
  currentStreak: number;
  startStreak: () => void;
  resetStreakProgress: () => void;
  hasCompletedTodayStreak: boolean;
}

const StreakContext = createContext<StreakContextType | undefined>(undefined);

export const useStreak = () => {
  const context = useContext(StreakContext);
  if (context === undefined) {
    throw new Error('useStreak must be used within a StreakProvider');
  }
  return context;
};

export const StreakProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isStreakActive, setIsStreakActive] = useState(false);
  const [streakProgress, setStreakProgress] = useState(0);
  const [todayStreak, setTodayStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [streakTimer, setStreakTimer] = useState<NodeJS.Timeout | null>(null);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [hasCompletedTodayStreak, setHasCompletedTodayStreak] = useState(false);
  const { toast } = useToast();

  // Load streak data from localStorage on mount
  useEffect(() => {
    const storedTodayStreak = localStorage.getItem('todayStreak');
    const storedCurrentStreak = localStorage.getItem('currentStreak');
    const storedLastStreakDate = localStorage.getItem('lastStreakDate');
    const storedCompletedToday = localStorage.getItem('completedTodayStreak');
    
    // Check if we need to reset the daily streak (new day)
    const today = new Date().toDateString();
    if (storedLastStreakDate !== today) {
      setTodayStreak(0);
      setHasCompletedTodayStreak(false);
      localStorage.setItem('todayStreak', '0');
      localStorage.setItem('lastStreakDate', today);
      localStorage.setItem('completedTodayStreak', 'false');
    } else {
      if (storedTodayStreak) {
        setTodayStreak(parseInt(storedTodayStreak, 10));
      }
      if (storedCompletedToday) {
        setHasCompletedTodayStreak(storedCompletedToday === 'true');
      }
    }
    
    if (storedCurrentStreak) {
      setCurrentStreak(parseInt(storedCurrentStreak, 10));
    }
    
    // Check if user was active in the last 24 hours
    const lastStreakTime = localStorage.getItem('lastStreakTime');
    if (lastStreakTime) {
      const hoursSinceLastStreak = (Date.now() - parseInt(lastStreakTime, 10)) / (1000 * 60 * 60);
      if (hoursSinceLastStreak > 24) {
        // Reset streak if more than 24 hours of inactivity
        setCurrentStreak(0);
        localStorage.setItem('currentStreak', '0');
      }
    }
  }, []);

  // Track user activity
  useEffect(() => {
    const handleActivity = () => {
      setLastActivity(Date.now());
    };

    // Listen for user activity events
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    // Check for inactivity every minute
    const inactivityCheck = setInterval(() => {
      const inactiveTime = (Date.now() - lastActivity) / 1000;
      if (inactiveTime > 300 && isStreakActive) { // 5 minutes of inactivity
        resetStreakProgress();
      }
    }, 60000);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      clearInterval(inactivityCheck);
    };
  }, [isStreakActive, lastActivity]);

  const startStreak = () => {
    // Nếu streak đã hoàn thành hôm nay hoặc đang chạy, không làm gì cả
    if (isStreakActive || hasCompletedTodayStreak) return;
    
    setIsStreakActive(true);
    setStreakProgress(0);
    
    // Clear any existing timer
    if (streakTimer) {
      clearInterval(streakTimer);
    }
    
    // Start a new timer that updates progress every second
    const timer = setInterval(() => {
      setStreakProgress(prev => {
        const newProgress = prev + (100 / 300); // 100% over 300 seconds (5 minutes)
        
        // If streak is complete
        if (newProgress >= 100) {
          clearInterval(timer);
          setIsStreakActive(false);
          
          // Update streak counts
          const newTodayStreak = todayStreak + 1;
          const newCurrentStreak = currentStreak + 1;
          
          setTodayStreak(newTodayStreak);
          setCurrentStreak(newCurrentStreak);
          setHasCompletedTodayStreak(true);
          
          // Save to localStorage
          localStorage.setItem('todayStreak', newTodayStreak.toString());
          localStorage.setItem('currentStreak', newCurrentStreak.toString());
          localStorage.setItem('lastStreakDate', new Date().toDateString());
          localStorage.setItem('lastStreakTime', Date.now().toString());
          localStorage.setItem('completedTodayStreak', 'true');
          
          // Show toast notification
          toast({
            title: "Streak Completed! 🔥",
            description: `You've earned a streak point! Current streak: ${newCurrentStreak} days`,
          });
          
          return 0;
        }
        
        return newProgress;
      });
    }, 1000);
    
    setStreakTimer(timer);
  };

  const resetStreakProgress = () => {
    if (streakTimer) {
      clearInterval(streakTimer);
      setStreakTimer(null);
    }
    setIsStreakActive(false);
    setStreakProgress(0);
  };

  return (
    <StreakContext.Provider
      value={{
        isStreakActive,
        streakProgress,
        todayStreak,
        currentStreak,
        startStreak,
        resetStreakProgress,
        hasCompletedTodayStreak,
      }}
    >
      {children}
    </StreakContext.Provider>
  );
};