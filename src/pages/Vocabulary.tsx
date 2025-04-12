
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useVocabulary, getCategories, VocabularyWord } from '@/services/VocabularyService';
import VocabularyControls from '@/components/vocabulary/VocabularyControls';
import VocabularyFlashcardView from '@/components/vocabulary/VocabularyFlashcardView';
import VocabularyListView from '@/components/vocabulary/VocabularyListView';
import EmptyState from '@/components/vocabulary/EmptyState';
import VocabularyTips from '@/components/vocabulary/VocabularyTips';
import { Loader2 } from 'lucide-react';

const Vocabulary: React.FC = () => {
  // Get vocabulary data
  const { data: vocabulary = [], isLoading, error } = useVocabulary();
  
  // State
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [savedWords, setSavedWords] = useState<string[]>(() => {
    // Load saved words from localStorage
    const saved = localStorage.getItem('savedVocabulary');
    return saved ? JSON.parse(saved) : [];
  });
  const [viewMode, setViewMode] = useState<'flashcard' | 'list'>('flashcard');
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>('all');
  
  const { toast } = useToast();
  const categories = getCategories();

  // Save to localStorage when savedWords changes
  useEffect(() => {
    localStorage.setItem('savedVocabulary', JSON.stringify(savedWords));
  }, [savedWords]);

  // Reset current card index when filtered vocabulary changes
  useEffect(() => {
    setCurrentCardIndex(0);
  }, [searchTerm, filterCategory, activeTab]);

  // Filter vocabulary based on search, category, and tab
  const filteredVocabulary = vocabulary.filter((item: VocabularyWord) => {
    const matchesSearch = 
      item.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.meaning.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? item.category === filterCategory : true;
    
    if (activeTab === 'saved') {
      return savedWords.includes(item.id) && matchesSearch && matchesCategory;
    }
    
    return matchesSearch && matchesCategory;
  });

  // Navigation functions
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

  // Toggle save word
  const toggleSaveWord = (id: string) => {
    setSavedWords(prev => {
      if (prev.includes(id)) {
        toast({
          title: "Word removed from saved list",
          duration: 2000,
        });
        return prev.filter(wordId => wordId !== id);
      } else {
        toast({
          title: "Word saved to your list",
          duration: 2000,
        });
        return [...prev, id];
      }
    });
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterCategory('');
  };

  // Switch to all tab
  const handleSwitchToAllTab = () => {
    const tabElement = document.querySelector('[data-value="all"]') as HTMLElement;
    if (tabElement) tabElement.click();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-english-blue text-white py-8 sm:py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">Vocabulary Builder</h1>
            <p className="text-lg md:text-xl opacity-90">
              Enhance your English vocabulary with interactive flashcards
            </p>
          </div>
        </section>
        
        {/* Vocabulary content */}
        <div className="bg-white pt-4 pb-8">
          <div className="max-w-7xl mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-english-blue" />
                <span className="ml-2 text-english-dark">Loading vocabulary...</span>
              </div>
            ) : error ? (
              <div className="text-center py-20 text-red-500">
                <p>Error loading vocabulary. Please try again later.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  Refresh Page
                </Button>
              </div>
            ) : (
              <Tabs 
                defaultValue="all" 
                className="w-full"
                value={activeTab}
                onValueChange={handleTabChange}
              >
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-4">
                  <TabsTrigger value="all" data-value="all">All Words</TabsTrigger>
                  <TabsTrigger value="saved" data-value="saved">
                    Saved Words ({savedWords.length})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="pt-4">
                  {/* Search and Filter */}
                  <VocabularyControls 
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterCategory={filterCategory}
                    setFilterCategory={setFilterCategory}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    categories={categories}
                  />
                  
                  {filteredVocabulary.length > 0 ? (
                    <>
                      {viewMode === 'flashcard' ? (
                        <VocabularyFlashcardView 
                          vocabulary={filteredVocabulary}
                          currentCardIndex={currentCardIndex}
                          savedWords={savedWords}
                          onPrevCard={handlePrevCard}
                          onNextCard={handleNextCard}
                          onToggleSave={toggleSaveWord}
                        />
                      ) : (
                        <VocabularyListView 
                          vocabulary={filteredVocabulary}
                          savedWords={savedWords}
                          onToggleSave={toggleSaveWord}
                        />
                      )}
                    </>
                  ) : (
                    <EmptyState 
                      title="No vocabulary found"
                      description="Try adjusting your search or filters"
                      actionLabel="Reset Filters"
                      onAction={handleResetFilters}
                    />
                  )}
                </TabsContent>
                
                <TabsContent value="saved" className="pt-4">
                  {/* Search and Filter for saved tab */}
                  <VocabularyControls 
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterCategory={filterCategory}
                    setFilterCategory={setFilterCategory}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    categories={categories}
                  />
                  
                  {filteredVocabulary.length > 0 ? (
                    <>
                      {viewMode === 'flashcard' ? (
                        <VocabularyFlashcardView 
                          vocabulary={filteredVocabulary}
                          currentCardIndex={currentCardIndex}
                          savedWords={savedWords}
                          onPrevCard={handlePrevCard}
                          onNextCard={handleNextCard}
                          onToggleSave={toggleSaveWord}
                        />
                      ) : (
                        <VocabularyListView 
                          vocabulary={filteredVocabulary}
                          savedWords={savedWords}
                          onToggleSave={toggleSaveWord}
                        />
                      )}
                    </>
                  ) : (
                    <EmptyState 
                      title="No saved words yet"
                      description="Start saving words from the vocabulary list"
                      actionLabel="Explore Vocabulary"
                      onAction={handleSwitchToAllTab}
                    />
                  )}
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
        
        {/* Study Tips */}
        <VocabularyTips />
      </main>
      
      <Footer />
    </div>
  );
};

export default Vocabulary;
