
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Volume2, Star, StarOff } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface FlashCardProps {
  word: string;
  meaning: string;
  example: string;
  pronunciation?: string;
  imageUrl?: string;
  onSave?: (isSaved: boolean) => void;
  isSaved?: boolean;
}

const FlashCard: React.FC<FlashCardProps> = ({
  word,
  meaning,
  example,
  pronunciation,
  imageUrl,
  onSave,
  isSaved = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isMobile = useIsMobile();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(!isSaved);
    }
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      speechSynthesis.cancel(); // Cancel any ongoing speech
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto perspective-1000">
      <div 
        className={`relative h-[380px] sm:h-[420px] transform-style-3d transition-transform duration-500 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ 
          perspective: '1000px',
        }}
      >
        {/* Front of card */}
        <Card
          className={`absolute inset-0 p-5 sm:p-6 backface-hidden ${
            isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="flex flex-col items-center space-y-3 h-full justify-between">
            <div className="flex flex-col items-center">
              {imageUrl && (
                <div className="w-28 h-28 rounded-full overflow-hidden mb-3">
                  <img 
                    src={imageUrl} 
                    alt={word} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-english-dark text-center">{word}</h3>
              
              {pronunciation && (
                <div className="text-gray-500 text-sm mt-2 text-center">/{pronunciation}/</div>
              )}
              
              <Button
                variant="outline"
                size="icon"
                className="mt-3 text-english-blue"
                onClick={() => handleSpeak(word)}
                aria-label="Pronounce word"
              >
                <Volume2 size={18} />
              </Button>
            </div>
            
            {onSave && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                className={`absolute top-2 right-2 ${
                  isSaved ? 'text-english-yellow' : 'text-gray-400'
                }`}
                aria-label={isSaved ? "Remove from saved" : "Save word"}
              >
                {isSaved ? <Star size={18} /> : <StarOff size={18} />}
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              className="text-english-blue w-full mt-auto"
              onClick={handleFlip}
            >
              Show Meaning
            </Button>
          </div>
        </Card>

        {/* Back of card */}
        <Card
          className={`absolute inset-0 p-5 sm:p-6 backface-hidden ${
            isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(-180deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="flex flex-col space-y-3 h-full justify-between">
            <div className="overflow-auto flex-grow">
              <h3 className="text-lg font-serif font-bold text-english-dark">Meaning:</h3>
              <p className="text-gray-700 mt-1">{meaning}</p>
              
              <h3 className="text-lg font-serif font-bold text-english-dark mt-4">Example:</h3>
              <p className="text-gray-700 italic mt-1">"{example}"</p>
            </div>
            
            {onSave && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                className={`absolute top-2 right-2 ${
                  isSaved ? 'text-english-yellow' : 'text-gray-400'
                }`}
                aria-label={isSaved ? "Remove from saved" : "Save word"}
              >
                {isSaved ? <Star size={18} /> : <StarOff size={18} />}
              </Button>
            )}
            
            <div className="flex justify-between mt-auto">
              <Button 
                variant="ghost" 
                className="text-english-blue"
                onClick={handleFlip}
              >
                <RefreshCw size={16} className="mr-2" />
                Show Word
              </Button>
              <Button 
                variant="outline"
                className="text-english-blue"
                onClick={() => handleSpeak(example)}
              >
                <Volume2 size={16} className="mr-2" />
                Hear Example
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FlashCard;
