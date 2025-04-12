
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FlashCard from '@/components/FlashCard';

interface VocabularyWord {
  id: string;
  word: string;
  meaning: string;
  example: string;
  pronunciation?: string;
  pronunciationUK?: string;
  category?: string;
  imageUrl?: string;
}

interface VocabularyFlashcardViewProps {
  vocabulary: VocabularyWord[];
  currentCardIndex: number;
  savedWords: string[];
  onPrevCard: () => void;
  onNextCard: () => void;
  onToggleSave: (id: string) => void;
}

const VocabularyFlashcardView: React.FC<VocabularyFlashcardViewProps> = ({
  vocabulary,
  currentCardIndex,
  savedWords,
  onPrevCard,
  onNextCard,
  onToggleSave,
}) => {
  if (vocabulary.length === 0) {
    return null;
  }

  const currentWord = vocabulary[currentCardIndex];
  const isSaved = savedWords.includes(currentWord.id);

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-500">
          Card {currentCardIndex + 1} of {vocabulary.length}
        </div>
      </div>
      
      <FlashCard
        word={currentWord.word}
        meaning={currentWord.meaning}
        example={currentWord.example}
        pronunciation={currentWord.pronunciation}
        pronunciationUK={currentWord.pronunciationUK}
        imageUrl={currentWord.imageUrl}
        isSaved={isSaved}
        onSave={() => onToggleSave(currentWord.id)}
      />
      
      <div className="flex justify-center mt-8 gap-4">
        <Button 
          variant="outline" 
          onClick={onPrevCard}
          className="px-6"
        >
          <ChevronLeft size={20} className="mr-1" />
          Previous
        </Button>
        <Button 
          onClick={onNextCard}
          className="px-6 bg-english-blue hover:bg-english-blue/90"
        >
          Next
          <ChevronRight size={20} className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default VocabularyFlashcardView;
