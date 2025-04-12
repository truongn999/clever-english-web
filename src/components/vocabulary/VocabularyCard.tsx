
import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, Star, StarOff } from 'lucide-react';

interface VocabularyCardProps {
  id: string;
  word: string;
  meaning: string;
  example: string;
  pronunciation?: string;
  pronunciationUK?: string;
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
  pronunciationUK,
  category,
  isSaved,
  onToggleSave,
}) => {
  const handleSpeak = (text: string, lang: 'en-US' | 'en-GB' = 'en-US') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
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
            {category && (
              <span className="text-xs bg-english-light text-english-dark px-2 py-0.5 rounded">
                {category}
              </span>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 mb-2">
            {pronunciation && (
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium text-gray-500">US</span>
                <span className="text-gray-500 text-sm">/{pronunciation}/</span>
                <Button
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleSpeak(word, 'en-US')}
                  className="h-6 w-6 p-0"
                  aria-label="US pronunciation"
                >
                  <Volume2 size={14} />
                </Button>
              </div>
            )}
            
            {pronunciationUK && (
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium text-gray-500">UK</span>
                <span className="text-gray-500 text-sm">/{pronunciationUK}/</span>
                <Button
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleSpeak(word, 'en-GB')}
                  className="h-6 w-6 p-0"
                  aria-label="UK pronunciation"
                >
                  <Volume2 size={14} />
                </Button>
              </div>
            )}
          </div>
          
          <p className="text-gray-700">{meaning}</p>
          
          <div className="mt-2 group relative">
            <p className="text-gray-600 italic">"{example}"</p>
            <div className="opacity-0 group-hover:opacity-100 absolute -right-2 -top-1 flex gap-1">
              {pronunciation && (
                <Button
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleSpeak(example, 'en-US')}
                  className="h-6 w-6 p-0"
                  aria-label="US pronunciation"
                >
                  <Volume2 size={14} />
                </Button>
              )}
              
              {pronunciationUK && (
                <Button
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleSpeak(example, 'en-GB')}
                  className="h-6 w-6 p-0"
                  aria-label="UK pronunciation"
                >
                  <Volume2 size={14} />
                </Button>
              )}
            </div>
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
