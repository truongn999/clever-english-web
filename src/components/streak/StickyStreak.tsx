import React, { useEffect } from 'react';
import { useStreak } from '@/contexts/StreakContext';
import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface StickyStreakProps {
  isLoggedIn: boolean;
}

const StickyStreak: React.FC<StickyStreakProps> = ({ isLoggedIn }) => {
  const { 
    isStreakActive, 
    streakProgress, 
    todayStreak, 
    currentStreak, 
    startStreak,
    hasCompletedTodayStreak 
  } = useStreak();
  const isMobile = useIsMobile();

  // Start streak when user logs in (only if not completed today)
  useEffect(() => {
    if (isLoggedIn && !isStreakActive && !hasCompletedTodayStreak) {
      startStreak();
    }
  }, [isLoggedIn, isStreakActive, hasCompletedTodayStreak, startStreak]);

  if (!isLoggedIn) return null;

  return (
    <div 
      className={cn(
        "fixed z-50 flex flex-col items-center bg-white rounded-lg shadow-lg p-3 transition-all duration-300",
        isMobile 
          ? "bottom-20 right-4 w-16" 
          : "bottom-8 right-8 w-20"
      )}
    >
      <div className="relative w-full aspect-square mb-2">
        {/* Circular progress */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle 
            className="text-gray-200" 
            strokeWidth="8" 
            stroke="currentColor" 
            fill="transparent" 
            r="40" 
            cx="50" 
            cy="50" 
          />
          {hasCompletedTodayStreak ? (
            // Completed circle
            <circle 
              className="text-green-500" 
              strokeWidth="8" 
              stroke="currentColor" 
              fill="transparent" 
              r="40" 
              cx="50" 
              cy="50" 
            />
          ) : (
            // Progress circle
            <circle 
              className="text-english-blue transition-all duration-300" 
              strokeWidth="8" 
              strokeDasharray={251.2} 
              strokeDashoffset={251.2 - (251.2 * streakProgress) / 100} 
              strokeLinecap="round" 
              stroke="currentColor" 
              fill="transparent" 
              r="40" 
              cx="50" 
              cy="50" 
            />
          )}
        </svg>
        
        {/* Flame icon in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Flame 
            className={cn(
              "w-8 h-8 transition-all duration-300",
              hasCompletedTodayStreak 
                ? "text-green-500" 
                : isStreakActive 
                  ? "text-english-blue animate-pulse" 
                  : "text-gray-400"
            )} 
          />
        </div>
      </div>
      
      {/* Streak count */}
      <div className="text-center">
        <div className="text-sm font-semibold text-english-blue">{currentStreak}</div>
        <div className="text-xs text-gray-500">streak</div>
      </div>
    </div>
  );
};

export default StickyStreak;