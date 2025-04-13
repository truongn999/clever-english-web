import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Download,
  Share2,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  Clock,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Info
} from 'lucide-react';
import { podcastsData } from '@/data/podcasts';

// Mock transcript data
const transcriptData = [
  { id: 1, start: 0, end: 5.2, text: "Hello and welcome to our English podcast.", speaker: "Host" },
  { id: 2, start: 5.5, end: 10.8, text: "Today we're going to talk about common greetings and introductions.", speaker: "Host" },
  { id: 3, start: 11.2, end: 15.5, text: "Let's start with the most basic greeting: 'Hello'.", speaker: "Host" },
  { id: 4, start: 16.0, end: 20.3, text: "Hello is a universal greeting that you can use in any situation.", speaker: "Host" },
  { id: 5, start: 20.8, end: 25.5, text: "For more casual situations, you can say 'Hi' or 'Hey'.", speaker: "Host" },
  { id: 6, start: 26.0, end: 32.5, text: "When meeting someone for the first time, you might say: 'Nice to meet you'.", speaker: "Host" },
  { id: 7, start: 33.0, end: 38.5, text: "Let's practice with a dialogue. I'll be joined by Sarah.", speaker: "Host" },
  { id: 8, start: 39.0, end: 42.5, text: "Hi there! I'm Sarah. Nice to meet you all.", speaker: "Sarah" },
  { id: 9, start: 43.0, end: 48.5, text: "Sarah, could you tell us how you would introduce yourself in a business setting?", speaker: "Host" },
  { id: 10, start: 49.0, end: 58.5, text: "Of course. In a business context, I would say: 'Hello, I'm Sarah Johnson. I'm the marketing director at ABC Company.'", speaker: "Sarah" },
  // Add more transcript lines as needed
];

// Mock vocabulary data
const vocabularyData = [
  { 
    word: "greeting", 
    definition: "A polite word or sign of welcome or recognition", 
    example: "In English, 'hello' is a common greeting.",
    synonyms: ["salutation", "welcome", "acknowledgment"],
    level: "Beginner"
  },
  { 
    word: "introduction", 
    definition: "A formal presentation of one person to another, in which each is told the other's name", 
    example: "After the introduction, they shook hands and started talking.",
    synonyms: ["presentation", "acquaintance", "meeting"],
    level: "Beginner"
  },
  { 
    word: "casual", 
    definition: "Relaxed and informal", 
    example: "The office has a casual dress code on Fridays.",
    synonyms: ["informal", "relaxed", "unofficial"],
    level: "Beginner"
  },
  { 
    word: "context", 
    definition: "The circumstances that form the setting for an event, statement, or idea", 
    example: "In a business context, it's important to be professional.",
    synonyms: ["situation", "environment", "setting"],
    level: "Intermediate"
  },
  { 
    word: "universal", 
    definition: "Applicable or common to all cases", 
    example: "A smile is a universal sign of friendliness.",
    synonyms: ["worldwide", "global", "common"],
    level: "Intermediate"
  },
];

// Related podcasts (mock data)
const relatedPodcasts = [1, 2, 4]; // IDs of related podcasts

const PodcastDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [podcast, setPodcast] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [activeTranscriptId, setActiveTranscriptId] = useState<number | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showVocabularyTooltip, setShowVocabularyTooltip] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const transcriptRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Find podcast by ID
  useEffect(() => {
    if (id) {
      const foundPodcast = podcastsData.find(p => p.id === id);
      if (foundPodcast) {
        setPodcast(foundPodcast);
        // Check if podcast is saved (would normally use localStorage or API)
        setIsSaved(localStorage.getItem(`saved_podcast_${id}`) === 'true');
      }
    }
  }, [id]);
  
  // Set up audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !podcast) return;
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      
      // Find active transcript segment
      const activeSegment = transcriptData.find(
        segment => audio.currentTime >= segment.start && audio.currentTime <= segment.end
      );
      
      if (activeSegment && activeSegment.id !== activeTranscriptId) {
        setActiveTranscriptId(activeSegment.id);
        
        // Scroll to active transcript
        const transcriptElement = transcriptRefs.current[activeSegment.id - 1];
        if (transcriptElement) {
          transcriptElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }
    };
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setActiveTranscriptId(null);
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    
    // Set initial volume
    audio.volume = volume / 100;
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [podcast, activeTranscriptId, volume]);
  
  // Handle play/pause
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => console.error('Error playing audio:', e));
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Handle seek
  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = (value[0] / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newVolume = value[0];
    audio.volume = newVolume / 100;
    setVolume(newVolume);
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isMuted) {
      audio.volume = volume / 100;
    } else {
      audio.volume = 0;
    }
    
    setIsMuted(!isMuted);
  };
  
  // Handle playback rate change
  const changePlaybackRate = (rate: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.playbackRate = rate;
    setPlaybackRate(rate);
  };
  
  // Skip forward/backward
  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = Math.min(Math.max(audio.currentTime + seconds, 0), duration);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  // Format time (seconds to MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Play from transcript
  const playFromTranscript = (segment: any) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = segment.start;
    setCurrentTime(segment.start);
    
    if (!isPlaying) {
      audio.play().catch(e => console.error('Error playing audio:', e));
      setIsPlaying(true);
    }
    
    setActiveTranscriptId(segment.id);
  };
  
  // Toggle save podcast
  const toggleSave = () => {
    setIsSaved(!isSaved);
    // Would normally use API call here
    localStorage.setItem(`saved_podcast_${id}`, (!isSaved).toString());
  };
  
  // Handle vocabulary tooltip
  const handleVocabularyHover = (word: string) => {
    setShowVocabularyTooltip(word);
  };
  
  if (!podcast) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Loading podcast...</p>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{podcast.title} | English Podcast</title>
        <meta name="description" content={podcast.description} />
        <meta name="keywords" content={`English podcast, ${podcast.category}, ${podcast.level}, listening practice`} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          {/* Hero section */}
          <section 
            className="relative bg-cover bg-center py-16 px-4 text-white"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${podcast.thumbnail})`,
              backgroundPosition: 'center',
            }}
          >
            <div className="max-w-6xl mx-auto">
              <Link to="/podcast" className="inline-flex items-center text-white/80 hover:text-white mb-6">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Podcasts
              </Link>
              
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-full md:w-1/3 lg:w-1/4">
                  <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src={podcast.thumbnail} 
                      alt={podcast.title}
                      className="w-full h-full object-cover"
                      loading="eager"
                      width="400"
                      height="400"
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-2/3 lg:w-3/4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-white text-english-blue">{podcast.level}</Badge>
                    <Badge variant="outline" className="text-white border-white/30">{podcast.category}</Badge>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">{podcast.title}</h1>
                  
                  <p className="text-white/80 text-lg mb-6">{podcast.description}</p>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center text-white/70">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{podcast.duration}</span>
                    </div>
                    <div className="text-white/70">
                      {new Date(podcast.date).toLocaleDateString()}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3">
                      <Button 
                        size="lg" 
                        className="bg-english-blue hover:bg-english-blue/90"
                        onClick={togglePlayPause}
                      >
                        {isPlaying ? (
                          <><Pause className="h-5 w-5 mr-2" /> Pause</>
                        ) : (
                          <><Play className="h-5 w-5 mr-2" /> Play</>
                        )}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="bg-blue border-white/30 hover:bg-white/10"
                        onClick={toggleSave}
                      >
                        {isSaved ? (
                          <BookmarkCheck className="h-5 w-5" />
                        ) : (
                          <Bookmark className="h-5 w-5" />
                        )}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="bg-blue border-white/30 hover:bg-white/10"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="bg-blue border-white/30 hover:bg-white/10"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Audio player */}
          <section className="py-6 px-4 bg-gray-50 border-b sticky top-0 z-10">
            <div className="max-w-6xl mx-auto">
              <audio ref={audioRef} src={podcast.audioUrl} preload="metadata" />
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-gray-700"
                    onClick={() => skip(-10)}
                  >
                    <SkipBack className="h-5 w-5" />
                  </Button>
                  
                  <Button 
                    variant="default" 
                    size="icon" 
                    className="h-12 w-12 rounded-full bg-english-blue hover:bg-english-blue/90"
                    onClick={togglePlayPause}
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
                    className="text-gray-700"
                    onClick={() => skip(10)}
                  >
                    <SkipForward className="h-5 w-5" />
                  </Button>
                  
                  <div className="text-sm text-gray-500 w-24 text-center">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                  
                  <div className="flex-grow">
                    <Slider
                      value={[duration ? (currentTime / duration) * 100 : 0]}
                      max={100}
                      step={0.1}
                      className="w-full"
                      onValueChange={handleSeek}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-700"
                      onClick={toggleMute}
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </Button>
                    
                    <div className="w-24 hidden md:block">
                      <Slider
                        value={[isMuted ? 0 : volume]}
                        max={100}
                        step={1}
                        className="w-full"
                        onValueChange={handleVolumeChange}
                      />
                    </div>
                  </div>
                  
                  <select 
                    value={playbackRate}
                    onChange={(e) => changePlaybackRate(parseFloat(e.target.value))}
                    className="bg-white border rounded-md px-2 py-1 text-sm"
                  >
                    <option value="0.5">0.5x</option>
                    <option value="0.75">0.75x</option>
                    <option value="1">1x</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
          
          {/* Content tabs */}
          <section className="py-8 px-4">
            <div className="max-w-6xl mx-auto">
              <Tabs defaultValue="transcript" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="transcript">Transcript</TabsTrigger>
                  <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                </TabsList>
                
                <TabsContent value="transcript" className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="mb-4 text-sm text-gray-500">
                      Click on any part of the transcript to play from that point.
                    </div>
                    
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                      {transcriptData.map((segment, index) => (
                        <div 
                          key={segment.id}
                          ref={el => transcriptRefs.current[index] = el}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            activeTranscriptId === segment.id 
                              ? 'bg-english-blue/10 border-l-4 border-english-blue' 
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => playFromTranscript(segment)}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-sm text-gray-700">{segment.speaker}</span>
                            <span className="text-xs text-gray-500">{formatTime(segment.start)}</span>
                          </div>
                          <p className="text-gray-800">
                            {segment.text.split(' ').map((word, i) => {
                              // Check if word is in vocabulary (remove punctuation for checking)
                              const cleanWord = word.replace(/[.,!?;:'"()]/g, '').toLowerCase();
                              const isVocabWord = vocabularyData.some(v => v.word.toLowerCase() === cleanWord);
                              
                              return isVocabWord ? (
                                <span 
                                  key={i}
                                  className="text-english-blue font-medium underline decoration-dotted cursor-help"
                                  onMouseEnter={() => handleVocabularyHover(cleanWord)}
                                  onMouseLeave={() => setShowVocabularyTooltip(null)}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleVocabularyHover(cleanWord);
                                  }}
                                >
                                  {word}{' '}
                                  {showVocabularyTooltip === cleanWord && (
                                    <div className="absolute z-50 bg-white shadow-lg rounded-lg p-3 max-w-xs border">
                                      <div className="font-bold mb-1">{cleanWord}</div>
                                      <div className="text-sm mb-2">
                                        {vocabularyData.find(v => v.word.toLowerCase() === cleanWord)?.definition}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        Click for more details
                                      </div>
                                    </div>
                                  )}
                                </span>
                              ) : (
                                <span key={i}>{word}{' '}</span>
                              );
                            })}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="vocabulary" className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-xl font-bold mb-4">Key Vocabulary</h2>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      {vocabularyData.map((vocab, index) => (
                        <Card key={index} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-lg">{vocab.word}</h3>
                              <Badge variant="outline" className="text-xs">
                                {vocab.level}
                              </Badge>
                            </div>
                            
                            <div className="mb-2">
                              <p className="text-gray-700">{vocab.definition}</p>
                            </div>
                            
                            <div className="bg-gray-50 p-3 rounded-md mb-3">
                              <p className="text-sm italic">"{vocab.example}"</p>
                            </div>
                            
                            {vocab.synonyms.length > 0 && (
                              <div className="text-sm">
                                <span className="text-gray-500">Synonyms: </span>
                                {vocab.synonyms.map((syn, i) => (
                                  <span key={i} className="mr-2">
                                    {syn}{i < vocab.synonyms.length - 1 ? ',' : ''}
                                  </span>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="notes" className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-xl font-bold mb-4">Your Notes</h2>
                    
                    <textarea 
                      className="w-full border rounded-lg p-3 min-h-[200px]"
                      placeholder="Take notes while listening to the podcast..."
                    />
                    
                    <div className="flex justify-end mt-4">
                      <Button>Save Notes</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="discussion" className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-xl font-bold mb-4">Discussion</h2>
                    
                    <div className="mb-6">
                      <textarea 
                        className="w-full border rounded-lg p-3 min-h-[100px]"
                        placeholder="Share your thoughts about this podcast..."
                      />
                      
                      <div className="flex justify-end mt-2">
                        <Button>Post Comment</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                            <div>
                              <h4 className="font-medium">John Doe</h4>
                              <p className="text-xs text-gray-500">2 days ago</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                            <span className="text-sm text-gray-500">12</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700">
                          This podcast was really helpful for understanding basic greetings. I've been struggling with knowing when to use formal vs. informal greetings, and this cleared it up!
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                            <div>
                              <h4 className="font-medium">Jane Smith</h4>
                              <p className="text-xs text-gray-500">1 week ago</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                            <span className="text-sm text-gray-500">8</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700">
                          I loved the dialogue examples! It would be great to have more practice conversations in future episodes. The vocabulary section was also very useful.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
          
          {/* Related podcasts */}
          <section className="py-8 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Related Podcasts</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {podcastsData
                  .filter(p => relatedPodcasts.includes(parseInt(p.id)))
                  .map(relatedPodcast => (
                    <Card key={relatedPodcast.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-video relative">
                        <img 
                          src={relatedPodcast.thumbnail} 
                          alt={relatedPodcast.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          width="800"
                          height="450"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="bg-white/80 text-english-blue">
                            {relatedPodcast.level}
                          </Badge>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                          {relatedPodcast.duration}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">{relatedPodcast.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{relatedPodcast.description}</p>
                        <Link to={`/podcast/${relatedPodcast.id}`}>
                          <Button variant="link" className="p-0 h-auto text-english-blue">
                            Listen Now <ChevronLeft className="h-4 w-4 ml-1 rotate-180" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </section>
          
          {/* Learning tips */}
          <section className="py-8 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="bg-english-blue/5 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-english-blue rounded-full p-3 text-white">
                    <Info className="h-6 w-6" />
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-bold mb-2">Learning Tips</h2>
                    <p className="text-gray-700 mb-4">
                      To get the most out of this podcast episode:
                    </p>
                    
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-english-blue mr-2">•</span>
                        <span>Listen to the episode multiple times to catch details you might have missed</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-english-blue mr-2">•</span>
                        <span>Practice speaking along with the audio to improve your pronunciation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-english-blue mr-2">•</span>
                        <span>Try to use the new vocabulary in your own sentences</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-english-blue mr-2">•</span>
                        <span>Download the audio to practice offline</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default PodcastDetail;