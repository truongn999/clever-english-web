
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  BookOpen, 
  Video, 
  MessageSquare, 
  Clock, 
  Filter, 
  ChevronRight 
} from 'lucide-react';

// Mock data for lessons
const lessonsData = [
  {
    id: '1',
    title: 'Introduction to English Greetings',
    description: 'Learn common English greetings and introductions for everyday conversations.',
    level: 'Beginner',
    duration: '15 minutes',
    category: 'Conversation',
    thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'Basic English Conversation',
    description: 'Learn how to have simple conversations in English.',
    level: 'Beginner',
    duration: '20 minutes',
    category: 'Conversation',
    thumbnail: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Asking Questions in English',
    description: 'Master the art of asking questions in English.',
    level: 'Beginner',
    duration: '18 minutes',
    category: 'Grammar',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    title: 'Present Simple Tense',
    description: 'Learn how to use the present simple tense in English.',
    level: 'Beginner',
    duration: '22 minutes',
    category: 'Grammar',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    title: 'Common English Phrases',
    description: 'Learn everyday English phrases and expressions.',
    level: 'Beginner',
    duration: '25 minutes',
    category: 'Vocabulary',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '6',
    title: 'English Numbers and Counting',
    description: 'Learn how to count and use numbers in English.',
    level: 'Beginner',
    duration: '15 minutes',
    category: 'Vocabulary',
    thumbnail: 'https://images.unsplash.com/photo-1564939558297-fc396f18e5c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '7',
    title: 'Past Simple Tense',
    description: 'Learn how to talk about past events in English.',
    level: 'Intermediate',
    duration: '28 minutes',
    category: 'Grammar',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '8',
    title: 'English for Travel',
    description: 'Essential English phrases and vocabulary for traveling.',
    level: 'Intermediate',
    duration: '30 minutes',
    category: 'Conversation',
    thumbnail: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

const Lessons: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');

  // Filter lessons based on search query, category, and level
  const filteredLessons = lessonsData.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || lesson.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesLevel = activeLevel === 'all' || lesson.level.toLowerCase() === activeLevel.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <>
      <Helmet>
        <title>English Lessons | Learn English</title>
        <meta name="description" content="Browse our collection of English lessons for all levels. Learn grammar, vocabulary, and conversation skills." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          {/* Hero section */}
          <section className="bg-english-blue text-white py-12 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">English Lessons</h1>
              <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
                Explore our comprehensive collection of English lessons designed to help you improve your language skills.
              </p>
              
              {/* Search bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  type="text"
                  placeholder="Search for lessons..."
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </section>
          
          {/* Filters section */}
          <section className="py-6 px-4 border-b">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="font-medium">Filters:</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <div className="mr-4">
                    <span className="text-sm text-gray-500 mr-2">Category:</span>
                    <select 
                      className="border rounded-md px-2 py-1 text-sm"
                      value={activeCategory}
                      onChange={(e) => setActiveCategory(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      <option value="Grammar">Grammar</option>
                      <option value="Vocabulary">Vocabulary</option>
                      <option value="Conversation">Conversation</option>
                    </select>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-500 mr-2">Level:</span>
                    <select 
                      className="border rounded-md px-2 py-1 text-sm"
                      value={activeLevel}
                      onChange={(e) => setActiveLevel(e.target.value)}
                    >
                      <option value="all">All Levels</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                
                <div className="text-sm text-gray-500">
                  Showing {filteredLessons.length} of {lessonsData.length} lessons
                </div>
              </div>
            </div>
          </section>
          
          {/* Lessons grid */}
          <section className="py-8 px-4">
            <div className="max-w-6xl mx-auto">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All Lessons</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="newest">Newest</TabsTrigger>
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-6">
                  {filteredLessons.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500 mb-4">No lessons found matching your criteria.</p>
                      <Button onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('all');
                        setActiveLevel('all');
                      }}>
                        Clear Filters
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredLessons.map(lesson => (
                        <Link 
                          key={lesson.id} 
                          to={`/lessons/${lesson.id}`}
                          className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100"
                        >
                          <div className="aspect-video bg-gray-200 relative">
                            {lesson.thumbnail ? (
                              <img 
                                src={lesson.thumbnail} 
                                alt={`${lesson.title} - ${lesson.level} ${lesson.category} lesson`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                decoding="async"
                                width="800"
                                height="450"
                                fetchPriority={lesson.id === '1' ? 'high' : 'auto'}
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                                }}
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Video className="h-8 w-8 text-gray-400" />
                              </div>
                            )}
                            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                              {lesson.duration}
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="flex items-center mb-2">
                              <Badge variant="outline" className="text-xs mr-2">
                                {lesson.level}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {lesson.category}
                              </Badge>
                            </div>
                            <h2 className="font-bold text-lg mb-2 line-clamp-2">{lesson.title}</h2>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{lesson.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{lesson.duration}</span>
                              </div>
                              <Button variant="ghost" size="sm" className="text-english-blue">
                                Start Lesson
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="popular">
                  <div className="text-center py-12 text-gray-500">
                    <p>Popular lessons coming soon!</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="newest">
                  <div className="text-center py-12 text-gray-500">
                    <p>Newest lessons coming soon!</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="recommended">
                  <div className="text-center py-12 text-gray-500">
                    <p>Recommended lessons coming soon!</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
          
          {/* Call to action */}
          <section className="bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to improve your English?</h2>
              <p className="text-gray-600 mb-6">
                Start learning today with our comprehensive lessons designed for all skill levels.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to="/register">Sign Up for Free</Link>
                </Button>
                <Button variant="outline" size="lg">
                  <BookOpen className="h-5 w-5 mr-2" />
                  View Learning Path
                </Button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Lessons;
