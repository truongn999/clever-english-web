
import React from 'react';
import VocabularyCard from './VocabularyCard';

interface VocabularyWord {
  id: string;
  word: string;
  meaning: string;
  example: string;
  pronunciation?: string;
  pronunciationUK?: string;
  category?: string;
}

interface VocabularyListViewProps {
  vocabulary: VocabularyWord[];
  savedWords: string[];
  onToggleSave: (id: string) => void;
}

const VocabularyListView: React.FC<VocabularyListViewProps> = ({
  vocabulary,
  savedWords,
  onToggleSave,
}) => {
  if (vocabulary.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-4 mb-12">
      {vocabulary.map((item) => (
        <VocabularyCard
          key={item.id}
          id={item.id}
          word={item.word}
          meaning={item.meaning}
          example={item.example}
          pronunciation={item.pronunciation}
          pronunciationUK={item.pronunciationUK}
          category={item.category}
          isSaved={savedWords.includes(item.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
};

export default VocabularyListView;
