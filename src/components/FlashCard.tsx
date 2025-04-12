
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Volume2 } from 'lucide-react';

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
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(!isFlipped);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="perspective-1000 w-full max-w-md mx-auto">
      <div
        className={`relative transition-transform duration-300 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        } ${isAnimating ? 'animate-flash' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <Card
          className={`absolute w-full backface-hidden p-6 ${
            isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex flex-col items-center space-y-4">
            {imageUrl && (
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt={word} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h3 className="text-2xl font-serif font-bold text-english-dark">{word}</h3>
            {pronunciation && (
              <div className="text-gray-500 text-sm">/{pronunciation}/</div>
            )}
            <Button
              variant="outline"
              size="icon"
              className="mt-2 text-english-blue"
              onClick={() => handleSpeak(word)}
            >
              <Volume2 size={18} />
            </Button>
            <div className="mt-4 w-full flex justify-between">
              <Button 
                variant="ghost" 
                className="text-english-blue"
                onClick={handleFlip}
              >
                Show Meaning
              </Button>
            </div>
          </div>
        </Card>

        {/* Back of card */}
        <Card
          className={`absolute w-full backface-hidden p-6 ${
            isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-serif font-bold text-english-dark">Meaning:</h3>
            <p className="text-gray-700">{meaning}</p>
            <h3 className="text-xl font-serif font-bold text-english-dark">Example:</h3>
            <p className="text-gray-700 italic">"{example}"</p>
            <div className="mt-4 flex justify-between">
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
