
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Volume2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface FlashCardProps {
  word: string;
  meaning: string;
  example: string;
  pronunciation?: string;
  imageUrl?: string;
}

const FlashCard: React.FC<FlashCardProps> = ({
  word,
  meaning,
  example,
  pronunciation,
  imageUrl,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isMobile = useIsMobile();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative h-[400px] md:h-[450px]">
        {/* Front of card */}
        <Card
          className={`absolute inset-0 p-6 transition-all duration-500 ease-in-out ${
            isFlipped ? 'opacity-0 rotate-y-180 pointer-events-none' : 'opacity-100'
          }`}
          style={{ 
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          <div className="flex flex-col items-center space-y-4 h-full justify-between">
            <div className="flex flex-col items-center">
              {imageUrl && (
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                  <img 
                    src={imageUrl} 
                    alt={word} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <h3 className="text-2xl font-serif font-bold text-english-dark">{word}</h3>
              {pronunciation && (
                <div className="text-gray-500 text-sm mt-2">/{pronunciation}/</div>
              )}
              <Button
                variant="outline"
                size="icon"
                className="mt-4 text-english-blue"
                onClick={() => handleSpeak(word)}
              >
                <Volume2 size={18} />
              </Button>
            </div>
            
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
          className={`absolute inset-0 p-6 transition-all duration-500 ease-in-out ${
            isFlipped ? 'opacity-100' : 'opacity-0 rotate-y-180 pointer-events-none'
          }`}
          style={{ 
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(-180deg)'
          }}
        >
          <div className="flex flex-col space-y-4 h-full justify-between">
            <div>
              <h3 className="text-xl font-serif font-bold text-english-dark">Meaning:</h3>
              <p className="text-gray-700 mt-2">{meaning}</p>
              <h3 className="text-xl font-serif font-bold text-english-dark mt-4">Example:</h3>
              <p className="text-gray-700 italic mt-2">"{example}"</p>
            </div>
            
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
