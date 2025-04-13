import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { 
  Search, 
  Headphones, 
  Play, 
  Pause,
  Clock, 
  Filter, 
  ChevronRight,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Star,
  Download
} from 'lucide-react';

// Mock data for podcasts
const podcastsData = [
  {
    id: '1',
    title: 'Daily Conversations: Greetings and Introductions',
    description: 'Learn common greetings and how to introduce yourself in English.',
    level: 'Beginner',
    duration: '8:25',
    category: 'Conversation',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    audioUrl: '/audio/greetings-introductions.mp3',
    featured: true,
    popular: true,
    date: '2023-10-15',
  },
  {
    id: '2',
    title: 'Travel English: At the Airport',
    description: 'Essential phrases and vocabulary for navigating airports in English-speaking countries.',
    level: 'Beginner',
    duration: '10:15',
    category: 'Travel',
    thumbnail: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    audioUrl: '/audio/airport-english.mp3',
    featured: false,
    popular: true,
    date: '2023-10-10',
  },
  {
    id: '3',
    title: 'Business English: Job Interviews',
    description: 'How to prepare for and excel in English job interviews.',
    level: 'Intermediate',
    duration: '15:40',
    category: 'Business',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    audioUrl: '/audio/job-interviews.mp3',
    featured: true,
    popular: false,
    date: '2023-10-05',
  },
  {
    id: '4',
    title: 'Everyday Idioms and Expressions',
    description: 'Common English idioms and expressions used in daily conversations.',
    level: 'Intermediate',
    duration: '12:30',
    category: 'Vocabulary',
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    audioUrl: '/audio/idioms-expressions.mp3',
    featured: false,
    popular: true,
    date: '2023-09-28',
  },
  {
    id: '5',
    title: 'Academic English: Giving Presentations',
    description: 'Learn how to structure and deliver academic presentations in English.',
    level: 'Advanced',
    duration: '18:15',
    category: 'Academic',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    audioUrl: '/audio/academic-presentations.mp3',
    featured: true,
    popular: false,
    date: '2023-09-20',
  },
  {
    id: '6',
    title: 'English Pronunciation: Difficult Sounds',
    description: 'Practice pronouncing challenging English sounds and phonemes.',
    level: 'Intermediate',
    duration: '14:50',
    category: 'Pronunciation',
    thumbnail: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    audioUrl: '/audio/pronunciation-difficult-sounds.mp3',
    featured: false,
    popular: true,
    date: '2023-09-15',
  },
  {
    id: '7',
    title: 'Cultural Insights: American vs. British English',
    description: 'Explore the differences between American and British English.',
    level: 'Intermediate',
    duration: '16:20',
    category: 'Culture',
    thumbnail: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    audioUrl: '/audio/american-british-english.mp3',
    featured: false,
    popular: false,
    date: '2023-09-08',
  },
  {
    id: '8',
    title: 'Advanced Discussions: Climate Change',
    description: 'Complex vocabulary and expressions for discussing environmental issues.',
    level: 'Advanced',
    duration: '20:10',
    category: 'Discussion',
    thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    audioUrl: '/audio/climate-change-discussion.mp3',
    featured: true,
    popular: false,
    date: '2023-09-01',
  },
];

// Types for podcast player
interface PodcastPreview {
  id: string;
  title: string;
  audioUrl: string;
  thumbnail: string;
}

const Podcast: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<PodcastPreview | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [savedPodcasts, setSavedPodcasts] = useState<string[]>([]);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => setIsPlaying(false));
    setAudioElement(audio);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  // Update progress bar
  const updateProgress = () => {
    if (audioElement) {
      const progress = (audioElement.currentTime / audioElement.duration) * 100;
      setAudioProgress(progress);
    }
  };

  // Play/pause podcast preview
  const togglePlayPause = (podcast: PodcastPreview) => {
    if (!audioElement) return;

    if (currentlyPlaying?.id !== podcast.id) {
      audioElement.src = podcast.audioUrl;
      audioElement.currentTime = 0;
      setCurrentlyPlaying(podcast);
      audioElement.play().then(() => setIsPlaying(true)).catch(e => console.error('Error playing audio:', e));
    } else {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play().catch(e => console.error('Error playing audio:', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Set audio progress manually (when user drags slider)
  const setProgress = (value: number[]) => {
    if (audioElement && currentlyPlaying) {
      const newTime = (value[0] / 100) * audioElement.duration;
      audioElement.currentTime = newTime;
      setAudioProgress(value[0]);
    }
  };

  // Toggle save podcast
  const toggleSavePodcast = (id: string) => {
    setSavedPodcasts(prev => 
      prev.includes(id) 
        ? prev.filter(podcastId => podcastId !== id) 
        : [...prev, id]
    );
  };

  // Filter podcasts based on search query, category, and level
  const filteredPodcasts = podcastsData.filter(podcast => {
    const matchesSearch = podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          podcast.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || podcast.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesLevel = activeLevel === 'all' || podcast.level.toLowerCase() === activeLevel.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Get unique categories from podcast data
  const categories = ['all', ...new Set(podcastsData.map(podcast => podcast.category))];
  
  // Get featured podcasts
  const featuredPodcasts = podcastsData.filter(podcast => podcast.featured);

  return (
    <>
      <Helmet>
        <title>English Podcasts | Learn by Listening</title>
        <meta name="description" content="Improve your English listening skills with our curated podcasts for all levels and topics." />
        <meta name="keywords" content="English podcasts, learn English, listening practice, ESL podcasts, English audio lessons" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          {/* Hero section */}
          <section className="bg-english-blue text-white py-12 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">English Podcasts</h1>
              <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
                Improve your listening skills with our collection of English podcasts for all levels.
              </p>
              
              {/* Search bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  type="text"
                  placeholder="Search for podcasts..."
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </section>
          
          {/* Featured podcasts */}
          <section className="py-8 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Featured Podcasts</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPodcasts.slice(0, 3).map(podcast => (
                  <Card key={podcast.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-video relative">
                      <img 
                        src={podcast.thumbnail} 
                        alt={podcast.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width="800"
                        height="450"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button 
                          variant="default" 
                          size="icon" 
                          className="rounded-full bg-white text-english-blue hover:bg-white/90"
                          onClick={() => togglePlayPause({
                            id: podcast.id,
                            title: podcast.title,
                            audioUrl: podcast.audioUrl,
                            thumbnail: podcast.thumbnail
                          })}
                        >
                          {currentlyPlaying?.id === podcast.id && isPlaying ? (
                            <Pause className="h-6 w-6" />
                          ) : (
                            <Play className="h-6 w-6" />
                          )}
                        </Button>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-white/80 text-english-blue">
                          {podcast.level}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg line-clamp-2">{podcast.title}</h3>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-gray-500 hover:text-english-blue"
                          onClick={() => toggleSavePodcast(podcast.id)}
                        >
                          {savedPodcasts.includes(podcast.id) ? (
                            <BookmarkCheck className="h-5 w-5" />
                          ) : (
                            <Bookmark className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{podcast.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{podcast.duration}</span>
                        </div>
                        <Link to={`/podcast/${podcast.id}`}>
                          <Button variant="link" className="p-0 h-auto text-english-blue">
                            Listen Now <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
                      {categories.filter(cat => cat !== 'all').map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
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
                  Showing {filteredPodcasts.length} of {podcastsData.length} podcasts
                </div>
              </div>
            </div>
          </section>
          
          {/* Podcasts grid */}
          <section className="py-8 px-4">
            <div className="max-w-6xl mx-auto">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All Podcasts</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="newest">Newest</TabsTrigger>
                  <TabsTrigger value="saved">Saved</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-6">
                  {filteredPodcasts.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500 mb-4">No podcasts found matching your criteria.</p>
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
                      {filteredPodcasts.map(podcast => (
                        <Card key={podcast.id} className="overflow-hidden hover:shadow-md transition-shadow">
                          <div className="aspect-video relative">
                            <img 
                              src={podcast.thumbnail} 
                              alt={`${podcast.title} - ${podcast.level} ${podcast.category} podcast`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              decoding="async"
                              width="800"
                              height="450"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <Button 
                                variant="default" 
                                size="icon" 
                                className="rounded-full bg-white text-english-blue hover:bg-white/90"
                                onClick={() => togglePlayPause({
                                  id: podcast.id,
                                  title: podcast.title,
                                  audioUrl: podcast.audioUrl,
                                  thumbnail: podcast.thumbnail
                                })}
                              >
                                {currentlyPlaying?.id === podcast.id && isPlaying ? (
                                  <Pause className="h-6 w-6" />
                                ) : (
                                  <Play className="h-6 w-6" />
                                )}
                              </Button>
                            </div>
                            <div className="absolute top-2 right-2">
                              <Badge variant="secondary" className="bg-white/80 text-english-blue">
                                {podcast.level}
                              </Badge>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                              {podcast.duration}
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-lg line-clamp-2">{podcast.title}</h3>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-gray-500 hover:text-english-blue"
                                onClick={() => toggleSavePodcast(podcast.id)}
                              >
                                {savedPodcasts.includes(podcast.id) ? (
                                  <BookmarkCheck className="h-5 w-5" />
                                ) : (
                                  <Bookmark className="h-5 w-5" />
                                )}
                              </Button>
                            </div>
                            <div className="flex items-center mb-2">
                              <Badge variant="outline" className="text-xs mr-2">
                                {podcast.category}
                              </Badge>
                              <span className="text-xs text-gray-500">{new Date(podcast.date).toLocaleDateString()}</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{podcast.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm text-gray-500">
                                <Headphones className="h-4 w-4 mr-1" />
                                <span>Episode {podcast.id}</span>
                              </div>
                              <Link to={`/podcast/${podcast.id}`}>
                                <Button variant="link" className="p-0 h-auto text-english-blue">
                                  Details <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="popular">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {podcastsData.filter(podcast => podcast.popular).map(podcast => (
                      <Card key={podcast.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        {/* Same card content as above */}
                        <div className="aspect-video relative">
                          <img 
                            src={podcast.thumbnail} 
                            alt={`${podcast.title} - ${podcast.level} ${podcast.category} podcast`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                            width="800"
                            height="450"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Button 
                              variant="default" 
                              size="icon" 
                              className="rounded-full bg-white text-english-blue hover:bg-white/90"
                              onClick={() => togglePlayPause({
                                id: podcast.id,
                                title: podcast.title,
                                audioUrl: podcast.audioUrl,
                                thumbnail: podcast.thumbnail
                              })}
                            >
                              {currentlyPlaying?.id === podcast.id && isPlaying ? (
                                <Pause className="h-6 w-6" />
                              ) : (
                                <Play className="h-6 w-6" />
                              )}
                            </Button>
                          </div>
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="bg-white/80 text-english-blue">
                              {podcast.level}
                            </Badge>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                            {podcast.duration}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg line-clamp-2">{podcast.title}</h3>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-gray-500 hover:text-english-blue"
                              onClick={() => toggleSavePodcast(podcast.id)}
                            >
                              {savedPodcasts.includes(podcast.id) ? (
                                <BookmarkCheck className="h-5 w-5" />
                              ) : (
                                <Bookmark className="h-5 w-5" />
                              )}
                            </Button>
                          </div>
                          <div className="flex items-center mb-2">
                            <Badge variant="outline" className="text-xs mr-2">
                              {podcast.category}
                            </Badge>
                            <span className="text-xs text-gray-500">{new Date(podcast.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{podcast.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <Star className="h-4 w-4 mr-1 text-yellow-500" />
                              <span>Popular</span>
                            </div>
                            <Link to={`/podcast/${podcast.id}`}>
                              <Button variant="link" className="p-0 h-auto text-english-blue">
                                Details <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="newest">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {podcastsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6).map(podcast => (
                      <Card key={podcast.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        {/* Same card content structure as above */}
                        <div className="aspect-video relative">
                          <img 
                            src={podcast.thumbnail} 
                            alt={`${podcast.title} - ${podcast.level} ${podcast.category} podcast`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                            width="800"
                            height="450"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Button 
                              variant="default" 
                              size="icon" 
                              className="rounded-full bg-white text-english-blue hover:bg-white/90"
                              onClick={() => togglePlayPause({
                                id: podcast.id,
                                title: podcast.title,
                                audioUrl: podcast.audioUrl,
                                thumbnail: podcast.thumbnail
                              })}
                            >
                              {currentlyPlaying?.id === podcast.id && isPlaying ? (
                                <Pause className="h-6 w-6" />
                              ) : (
                                <Play className="h-6 w-6" />
                              )}
                            </Button>
                          </div>
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="bg-white/80 text-english-blue">
                              {podcast.level}
                            </Badge>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                            {podcast.duration}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg line-clamp-2">{podcast.title}</h3>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-gray-500 hover:text-english-blue"
                              onClick={() => toggleSavePodcast(podcast.id)}
                            >
                              <BookmarkCheck className="h-5 w-5" />
                            </Button>
                          </div>
                          <div className="flex items-center mb-2">
                            <Badge variant="outline" className="text-xs mr-2">
                              {podcast.category}
                            </Badge>
                            <span className="text-xs text-gray-500">{new Date(podcast.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{podcast.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <Headphones className="h-4 w-4 mr-1" />
                              <span>Episode {podcast.id}</span>
                            </div>
                            <Link to={`/podcast/${podcast.id}`}>
                              <Button variant="link" className="p-0 h-auto text-english-blue">
                                Details <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
          
          {/* Podcast categories section */}
          <section className="py-12 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array.from(new Set(podcastsData.map(podcast => podcast.category))).map(category => (
                  <Button 
                    key={category} 
                    variant="outline" 
                    className="h-auto py-6 flex flex-col items-center justify-center gap-2 hover:bg-english-blue/5"
                    onClick={() => {
                      setActiveCategory(category);
                      const allTabElement = document.querySelector('[data-value="all"]') as HTMLElement;
                      allTabElement?.click();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <div className="w-12 h-12 rounded-full bg-english-blue/10 flex items-center justify-center">
                      <Headphones className="h-6 w-6 text-english-blue" />
                    </div>
                    <span className="font-medium">{category}</span>
                    <span className="text-xs text-gray-500">
                      {podcastsData.filter(p => p.category === category).length} episodes
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </section>
          
          {/* Learning tips section */}
          <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="bg-english-blue/5 rounded-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-4">Tips for Learning with Podcasts</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-lg mb-2">How to Get the Most from English Podcasts</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="bg-english-blue text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">1</div>
                        <p><strong>Listen actively</strong>: Take notes on new vocabulary and expressions.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-english-blue text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">2</div>
                        <p><strong>Repeat regularly</strong>: Listen to the same episode multiple times to catch details you missed.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-english-blue text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">3</div>
                        <p><strong>Shadow the speakers</strong>: Repeat what you hear to improve pronunciation and intonation.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-english-blue text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">4</div>
                        <p><strong>Use transcripts</strong>: Read along with the audio to connect spoken and written English.</p>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg mb-2">Recommended Learning Schedule</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="bg-english-blue text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <BookOpen className="h-3 w-3" />
                        </div>
                        <p><strong>Beginners</strong>: 5-10 minutes daily, focusing on basic conversations.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-english-blue text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <BookOpen className="h-3 w-3" />
                        </div>
                        <p><strong>Intermediate</strong>: 15-20 minutes daily, exploring various topics.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-english-blue text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <BookOpen className="h-3 w-3" />
                        </div>
                        <p><strong>Advanced</strong>: 30+ minutes daily, challenging yourself with complex discussions.</p>
                      </li>
                    </ul>
                    
                    <Button className="mt-4" variant="default">
                      <Download className="h-4 w-4 mr-2" />
                      Download Learning Guide
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        {/* Mini player */}
        {currentlyPlaying && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 py-3 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded overflow-hidden mr-3 flex-shrink-0">
                    <img 
                      src={currentlyPlaying.thumbnail} 
                      alt={currentlyPlaying.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mr-4">
                    <h4 className="font-medium text-sm line-clamp-1">{currentlyPlaying.title}</h4>
                    <Link to={`/podcast/${currentlyPlaying.id}`} className="text-xs text-english-blue hover:underline">
                      View details
                    </Link>
                  </div>
                </div>
                
                <div className="flex-grow mx-4 hidden md:block">
                  <div className="flex items-center">
                    <Slider
                      value={[audioProgress]}
                      max={100}
                      step={0.1}
                      className="w-full"
                      onValueChange={setProgress}
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-english-blue"
                    onClick={() => togglePlayPause(currentlyPlaying)}
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6" />
                    )}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-gray-500 ml-2"
                    onClick={() => {
                      if (audioElement) {
                        audioElement.pause();
                        setIsPlaying(false);
                        setCurrentlyPlaying(null);
                      }
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </Button>
                </div>
              </div>
              
              {/* Mobile progress bar */}
              <div className="mt-2 md:hidden">
                <Slider
                  value={[audioProgress]}
                  max={100}
                  step={0.1}
                  className="w-full"
                  onValueChange={setProgress}
                />
              </div>
            </div>
          </div>
        )}
        
        <Footer />
      </div>
    </>
  );
};

export default Podcast;