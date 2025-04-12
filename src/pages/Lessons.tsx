
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LessonCard from '@/components/LessonCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

// Mock data for lessons
const lessonsMockData = [
  {
    id: "grammar-basics",
    title: "English Grammar Basics",
    description: "Learn fundamental English grammar rules including nouns, verbs, adjectives, and basic sentence structure.",
    level: "Beginner",
    duration: 30,
    category: "Grammar",
  },
  {
    id: "everyday-conversation",
    title: "Everyday Conversations",
    description: "Practice common phrases and vocabulary for everyday situations like shopping, dining, and asking for directions.",
    level: "Beginner",
    duration: 25,
    category: "Speaking",
  },
  {
    id: "intermediate-grammar",
    title: "Intermediate Grammar",
    description: "Master more complex grammar concepts including perfect tenses, conditionals, and passive voice.",
    level: "Intermediate",
    duration: 45,
    category: "Grammar",
  },
  {
    id: "business-english",
    title: "Business English",
    description: "Learn vocabulary and phrases for professional environments, emails, presentations, and meetings.",
    level: "Intermediate",
    duration: 40,
    category: "Vocabulary",
  },
  {
    id: "advanced-writing",
    title: "Advanced Writing Skills",
    description: "Develop sophisticated writing techniques for academic essays, reports, and professional correspondence.",
    level: "Advanced",
    duration: 60,
    category: "Writing",
  },
  {
    id: "idioms-expressions",
    title: "Idioms & Expressions",
    description: "Understand and use common English idioms, phrasal verbs, and colloquial expressions.",
    level: "Intermediate",
    duration: 35,
    category: "Vocabulary",
  },
  {
    id: "pronunciation-practice",
    title: "Pronunciation Practice",
    description: "Improve your accent and pronunciation with focused exercises on difficult sounds and word stress.",
    level: "Beginner",
    duration: 30,
    category: "Speaking",
  },
  {
    id: "academic-english",
    title: "Academic English",
    description: "Master the language skills needed for university studies, research papers, and academic discussions.",
    level: "Advanced",
    duration: 55,
    category: "Academic",
  },
];

const Lessons: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('');

  // Filter lessons based on search term and filters
  const filteredLessons = lessonsMockData.filter((lesson) => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel ? lesson.level === filterLevel : true;
    const matchesCategory = filterCategory ? lesson.category === filterCategory : true;
    
    return matchesSearch && matchesLevel && matchesCategory;
  });

  // Get unique categories and levels for filters
  const categories = Array.from(new Set(lessonsMockData.map(lesson => lesson.category)));
  const levels = Array.from(new Set(lessonsMockData.map(lesson => lesson.level)));

  const clearFilters = () => {
    setFilterLevel('');
    setFilterCategory('');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-english-blue text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">English Lessons</h1>
            <p className="text-xl opacity-90">Browse our collection of interactive English lessons</p>
          </div>
        </section>
        
        {/* Search and Filters */}
        <section className="bg-white py-6 px-4 border-b">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Search lessons..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-3">
                <select 
                  className="px-4 py-2 border rounded-md bg-white text-gray-800"
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                >
                  <option value="">All Levels</option>
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                
                <select 
                  className="px-4 py-2 border rounded-md bg-white text-gray-800"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={clearFilters}
                >
                  <Filter size={16} />
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Lessons Grid */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {filteredLessons.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredLessons.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    id={lesson.id}
                    title={lesson.title}
                    description={lesson.description}
                    level={lesson.level as 'Beginner' | 'Intermediate' | 'Advanced'}
                    duration={lesson.duration}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No lessons found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </section>
        
        {/* Learning Path Suggestion */}
        <section className="py-16 px-4 bg-english-light">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Not Sure Where to Start?</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              Try our personalized learning path that adapts to your skill level and goals.
            </p>
            <Button className="btn-primary">Take Placement Test</Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Lessons;
