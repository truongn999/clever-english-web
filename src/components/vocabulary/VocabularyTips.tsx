
import React from 'react';

const VocabularyTips: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-english-light">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-center">Vocabulary Learning Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="font-serif text-xl font-bold mb-3 text-english-dark">Study in Context</h3>
            <p className="text-gray-700">Learn words in context for better retention. Use new words in sentences right away.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="font-serif text-xl font-bold mb-3 text-english-dark">Daily Practice</h3>
            <p className="text-gray-700">Spend 10-15 minutes daily reviewing vocabulary. Consistency is key for long-term memory.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="font-serif text-xl font-bold mb-3 text-english-dark">Word Association</h3>
            <p className="text-gray-700">Create mental connections between new words and familiar concepts or vivid images.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VocabularyTips;
