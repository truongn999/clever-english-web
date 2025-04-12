
import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, Star, StarOff } from 'lucide-react';

interface VocabularyCardProps {
  id: string;
  word: string;
  meaning: string;
  example: string;
  pronunciation?: string;
  category?: string;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

const VocabularyCard: React.FC<VocabularyCardProps> = ({
  id,
  word,
  meaning,
  example,
  pronunciation,
  category,
  isSaved,
  onToggleSave,
}) => {
  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      speechSynthesis.cancel(); // Cancel any ongoing speech
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
      <div className="flex justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-serif text-xl font-bold text-english-dark">
              {word}
            </h3>
            <Button
              variant="ghost" 
              size="sm"
              onClick={() => handleSpeak(word)}
              className="h-8 w-8 p-0"
              aria-label="Pronounce word"
            >
              <Volume2 size={16} />
            </Button>
            {category && (
              <span className="text-xs bg-english-light text-english-dark px-2 py-0.5 rounded">
                {category}
              </span>
            )}
          </div>
          
          {pronunciation && (
            <div className="text-gray-500 text-sm mb-2">/{pronunciation}/</div>
          )}
          
          <p className="text-gray-700">{meaning}</p>
          
          <div className="mt-2 group relative">
            <p className="text-gray-600 italic">"{example}"</p>
            <Button
              variant="ghost" 
              size="sm"
              onClick={() => handleSpeak(example)}
              className="opacity-0 group-hover:opacity-100 absolute -right-2 -top-1 h-6 w-6 p-0"
              aria-label="Pronounce example"
            >
              <Volume2 size={14} />
            </Button>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleSave(id)}
          className={`h-8 ml-2 ${
            isSaved ? 'text-english-yellow' : 'text-gray-400'
          }`}
          aria-label={isSaved ? "Remove from saved" : "Save word"}
        >
          {isSaved ? <Star size={18} /> : <StarOff size={18} />}
        </Button>
      </div>
    </div>
  );
};

export default VocabularyCard;
