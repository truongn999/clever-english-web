
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FlashCard from '@/components/FlashCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronLeft, ChevronRight, Bookmark, List } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock vocabulary data
const vocabularyMockData = [
  {
    id: "1",
    word: "Ubiquitous",
    meaning: "Present, appearing, or found everywhere.",
    example: "Mobile phones are now ubiquitous in modern society.",
    pronunciation: "yoo-BIK-wi-tuhs",
    category: "Advanced",
  },
  {
    id: "2",
    word: "Ephemeral",
    meaning: "Lasting for a very short time.",
    example: "The beauty of cherry blossoms is ephemeral, lasting only a few days.",
    pronunciation: "ih-FEM-er-uhl",
    category: "Advanced",
  },
  {
    id: "3",
    word: "Resilient",
    meaning: "Able to recover quickly from difficulties; tough.",
    example: "She's a resilient person who bounces back from setbacks.",
    pronunciation: "ri-ZIL-yuhnt",
    category: "Intermediate",
  },
  {
    id: "4",
    word: "Collaborate",
    meaning: "Work jointly on an activity or project.",
    example: "Our teams will collaborate on the new product launch.",
    pronunciation: "kuh-LAB-uh-reyt",
    category: "Intermediate",
  },
  {
    id: "5",
    word: "Articulate",
    meaning: "Expressing oneself clearly and effectively.",
    example: "She gave an articulate presentation that impressed everyone.",
    pronunciation: "ahr-TIK-yuh-lit",
    category: "Intermediate",
  },
  {
    id: "6",
    word: "Procrastinate",
    meaning: "Delay or postpone action; put off doing something.",
    example: "I tend to procrastinate when it comes to difficult tasks.",
    pronunciation: "proh-KRAS-tuh-neyt",
    category: "Intermediate",
  },
  {
    id: "7",
    word: "Substantial",
    meaning: "Of considerable importance, size, or value.",
    example: "He made a substantial contribution to the project.",
    pronunciation: "suhb-STAN-shuhl",
    category: "Intermediate",
  },
  {
    id: "8",
    word: "Ambiguous",
    meaning: "Open to more than one interpretation; not clear or definite.",
    example: "The instructions were ambiguous and left me confused.",
    pronunciation: "am-BIG-yoo-uhs",
    category: "Advanced",
  },
];

const Vocabulary: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [savedWords, setSavedWords] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'flashcard' | 'list'>('flashcard');

  // Filter vocabulary based on search and category
  const filteredVocabulary = vocabularyMockData.filter((item) => {
    const matchesSearch = item.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.meaning.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? item.category === filterCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  // For saved words tab
  const savedVocabulary = vocabularyMockData.filter(item => 
    savedWords.includes(item.id)
  );

  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : filteredVocabulary.length - 1
    );
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => 
      prevIndex < filteredVocabulary.length - 1 ? prevIndex + 1 : 0
    );
  };

  const toggleSaveWord = (id: string) => {
    setSavedWords(prev => 
      prev.includes(id) 
        ? prev.filter(wordId => wordId !== id) 
        : [...prev, id]
    );
  };

  // Categories for filtering
  const categories = Array.from(new Set(vocabularyMockData.map(item => item.category)));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-english-blue text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Vocabulary Builder</h1>
            <p className="text-xl opacity-90">Enhance your English vocabulary with interactive flashcards</p>
          </div>
        </section>
        
        {/* Tabs */}
        <div className="bg-white pt-4">
          <div className="max-w-7xl mx-auto px-4">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="all">All Words</TabsTrigger>
                <TabsTrigger value="saved">Saved Words ({savedWords.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="pt-6">
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input 
                      placeholder="Search vocabulary..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <select 
                      className="px-4 py-2 border rounded-md bg-white text-gray-800"
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                    >
                      <option value="">All Levels</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    
                    <div className="flex border rounded overflow-hidden">
                      <Button 
                        variant={viewMode === 'flashcard' ? 'default' : 'ghost'}
                        size="sm"
                        className="rounded-none"
                        onClick={() => setViewMode('flashcard')}
                      >
                        <Bookmark size={18} />
                      </Button>
                      <Button 
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        className="rounded-none"
                        onClick={() => setViewMode('list')}
                      >
                        <List size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {filteredVocabulary.length > 0 ? (
                  <>
                    {viewMode === 'flashcard' ? (
                      <div className="mb-12">
                        <div className="flex justify-between items-center mb-6">
                          <div className="text-sm text-gray-500">
                            Card {currentCardIndex + 1} of {filteredVocabulary.length}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleSaveWord(filteredVocabulary[currentCardIndex].id)}
                            className={`flex items-center gap-1 ${
                              savedWords.includes(filteredVocabulary[currentCardIndex].id) 
                                ? 'text-english-yellow' 
                                : 'text-gray-400'
                            }`}
                          >
                            <Bookmark size={16} />
                            {savedWords.includes(filteredVocabulary[currentCardIndex].id) 
                              ? 'Saved' 
                              : 'Save'}
                          </Button>
                        </div>
                        
                        <FlashCard
                          word={filteredVocabulary[currentCardIndex].word}
                          meaning={filteredVocabulary[currentCardIndex].meaning}
                          example={filteredVocabulary[currentCardIndex].example}
                          pronunciation={filteredVocabulary[currentCardIndex].pronunciation}
                        />
                        
                        <div className="flex justify-center mt-8 gap-4">
                          <Button 
                            variant="outline" 
                            onClick={handlePrevCard}
                            className="px-6"
                          >
                            <ChevronLeft size={20} className="mr-1" />
                            Previous
                          </Button>
                          <Button 
                            onClick={handleNextCard}
                            className="px-6 bg-english-blue hover:bg-english-blue/90"
                          >
                            Next
                            <ChevronRight size={20} className="ml-1" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid gap-4 mb-12">
                        {filteredVocabulary.map((item) => (
                          <div key={item.id} className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-serif text-xl font-bold text-english-dark">
                                  {item.word}
                                </h3>
                                <div className="text-gray-500 text-sm mb-2">/{item.pronunciation}/</div>
                                <p className="text-gray-700">{item.meaning}</p>
                                <p className="text-gray-600 mt-2 italic">"{item.example}"</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleSaveWord(item.id)}
                                className={`h-8 ${
                                  savedWords.includes(item.id) 
                                    ? 'text-english-yellow' 
                                    : 'text-gray-400'
                                }`}
                              >
                                <Bookmark size={18} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-700 mb-2">No vocabulary found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        setSearchTerm('');
                        setFilterCategory('');
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="saved" className="pt-6">
                {savedVocabulary.length > 0 ? (
                  <div className="grid gap-4 mb-12">
                    {savedVocabulary.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-serif text-xl font-bold text-english-dark">
                              {item.word}
                            </h3>
                            <div className="text-gray-500 text-sm mb-2">/{item.pronunciation}/</div>
                            <p className="text-gray-700">{item.meaning}</p>
                            <p className="text-gray-600 mt-2 italic">"{item.example}"</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSaveWord(item.id)}
                            className="h-8 text-english-yellow"
                          >
                            <Bookmark size={18} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-700 mb-2">No saved words yet</h3>
                    <p className="text-gray-500">Start saving words from the vocabulary list</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => document.querySelector('[data-value="all"]')?.click()}
                    >
                      Explore Vocabulary
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Study Tips */}
        <section className="py-16 px-4 bg-english-light">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-center">Vocabulary Learning Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-serif text-xl font-bold mb-3">Study in Context</h3>
                <p className="text-gray-700">Learning words in context helps with retention. Try to use new words in sentences.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-serif text-xl font-bold mb-3">Daily Practice</h3>
                <p className="text-gray-700">Spend just 10-15 minutes each day reviewing vocabulary for the best results.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-serif text-xl font-bold mb-3">Word Association</h3>
                <p className="text-gray-700">Create mental connections between new words and images or familiar concepts.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Vocabulary;
