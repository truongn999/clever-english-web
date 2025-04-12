import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Video, 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Volume2,
  PlayCircle,
  PauseCircle,
  ThumbsUp,
  BookmarkPlus,
  Share2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for a lesson
const lessonData = {
  '1': {
    id: '1',
    title: 'Introduction to English Greetings',
    description: 'Learn common English greetings and introductions for everyday conversations.',
    level: 'Beginner',
    duration: '15 minutes',
    category: 'Conversation',
    thumbnail: '/images/lessons/greetings.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    content: `
      <h2>Common English Greetings</h2>
      <p>Greetings are an essential part of English conversation. They help establish rapport and set the tone for the interaction.</p>
      
      <h3>Formal Greetings</h3>
      <ul>
        <li><strong>Good morning</strong> - Used from sunrise until noon</li>
        <li><strong>Good afternoon</strong> - Used from noon until 6 p.m.</li>
        <li><strong>Good evening</strong> - Used after 6 p.m.</li>
        <li><strong>Hello</strong> - A universal greeting that can be used at any time</li>
      </ul>
      
      <h3>Informal Greetings</h3>
      <ul>
        <li><strong>Hi</strong> - A casual greeting used among friends and acquaintances</li>
        <li><strong>Hey</strong> - Very casual, typically used among close friends</li>
        <li><strong>What's up?</strong> - A casual greeting that also asks how someone is doing</li>
        <li><strong>How's it going?</strong> - A casual way to ask how someone is doing</li>
      </ul>
      
      <h3>Introductions</h3>
      <p>When meeting someone for the first time, you can use these phrases:</p>
      <ul>
        <li><strong>Nice to meet you</strong> - A polite expression used when being introduced to someone</li>
        <li><strong>Pleased to meet you</strong> - A more formal version of "Nice to meet you"</li>
        <li><strong>My name is...</strong> - Used to introduce yourself</li>
        <li><strong>I'm...</strong> - A more casual way to introduce yourself</li>
      </ul>
    `,
    vocabulary: [
      { word: 'Greeting', definition: 'A polite word or sign of welcome', example: '"Hello" is a common greeting in English.' },
      { word: 'Introduction', definition: 'The action of introducing someone or something', example: 'She made the introductions at the party.' },
      { word: 'Acquaintance', definition: 'A person one knows slightly, but who is not a close friend', example: 'He is just an acquaintance, not a close friend.' },
      { word: 'Rapport', definition: 'A close and harmonious relationship', example: 'They established a good rapport with their clients.' },
      { word: 'Casual', definition: 'Relaxed and informal', example: 'The dress code for the party is casual.' },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: 'Which greeting would be most appropriate at 8:00 PM?',
        options: ['Good morning', 'Good afternoon', 'Good evening', 'Good night'],
        correctAnswer: 'Good evening'
      },
      {
        type: 'fill-in-blank',
        question: 'When meeting someone for the first time, you can say "__________ to meet you."',
        correctAnswer: 'Nice'
      },
      {
        type: 'matching',
        pairs: [
          { item: 'Good morning', match: 'Used before noon' },
          { item: 'Good afternoon', match: 'Used between noon and 6 PM' },
          { item: 'Good evening', match: 'Used after 6 PM' },
          { item: 'Hello', match: 'Can be used at any time' }
        ]
      }
    ],
    relatedLessons: ['2', '3', '5']
  },
  '2': {
    id: '2',
    title: 'Basic English Conversation',
    description: 'Learn how to have simple conversations in English.',
    level: 'Beginner',
    duration: '20 minutes',
    category: 'Conversation',
    thumbnail: '/images/lessons/conversation.jpg',
    // ... other fields would be populated similarly
  },
  '3': {
    id: '3',
    title: 'Asking Questions in English',
    description: 'Master the art of asking questions in English.',
    level: 'Beginner',
    duration: '18 minutes',
    category: 'Grammar',
    thumbnail: '/images/lessons/questions.jpg',
    // ... other fields would be populated similarly
  },
  '5': {
    id: '5',
    title: 'Common English Phrases',
    description: 'Learn everyday English phrases and expressions.',
    level: 'Beginner',
    duration: '25 minutes',
    category: 'Vocabulary',
    thumbnail: '/images/lessons/phrases.jpg',
    // ... other fields would be populated similarly
  }
};

const LessonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('content');
  const [progress, setProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [exerciseAnswers, setExerciseAnswers] = useState<{[key: string]: any}>({});
  const [exerciseResults, setExerciseResults] = useState<{[key: string]: boolean}>({});
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchLesson = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (id && lessonData[id]) {
          setLesson(lessonData[id]);
          
          // Load progress and completion status from localStorage
          const savedProgress = localStorage.getItem(`lesson_progress_${id}`);
          if (savedProgress) {
            setProgress(parseInt(savedProgress, 10));
          }
          
          const savedCompleted = localStorage.getItem(`lesson_completed_${id}`);
          if (savedCompleted === 'true') {
            setLessonCompleted(true);
          }
          
          // Load saved exercise answers
          const savedAnswers = localStorage.getItem(`lesson_answers_${id}`);
          if (savedAnswers) {
            setExerciseAnswers(JSON.parse(savedAnswers));
          }
          
          // Load saved exercise results
          const savedResults = localStorage.getItem(`lesson_results_${id}`);
          if (savedResults) {
            setExerciseResults(JSON.parse(savedResults));
          }
          
          // Check if lesson is bookmarked
          const bookmarks = JSON.parse(localStorage.getItem('bookmarked_lessons') || '[]');
          setIsBookmarked(bookmarks.includes(id));
        }
      } catch (error) {
        console.error('Error fetching lesson:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
    
    // Removing scroll event listener since we're not using it anymore
  }, [id]);

  // Calculate progress based on completed exercises
  useEffect(() => {
    if (lesson && lesson.exercises) {
      const totalExercises = lesson.exercises.length;
      if (totalExercises === 0) return;
      
      const completedExercises = Object.values(exerciseResults).filter(result => result === true).length;
      const newProgress = Math.round((completedExercises / totalExercises) * 100);
      
      setProgress(newProgress);
      
      // Save progress to localStorage
      if (id) {
        localStorage.setItem(`lesson_progress_${id}`, newProgress.toString());
      }
      
      // Check if all exercises are completed correctly
      if (completedExercises === totalExercises && totalExercises > 0) {
        setLessonCompleted(true);
        if (id) {
          localStorage.setItem(`lesson_completed_${id}`, 'true');
        }
      }
    }
  }, [exerciseResults, lesson, id]);

  const handleBookmark = () => {
    if (!id) return;
    
    const bookmarks = JSON.parse(localStorage.getItem('bookmarked_lessons') || '[]');
    
    if (isBookmarked) {
      // Remove bookmark
      const updatedBookmarks = bookmarks.filter((bookmarkId: string) => bookmarkId !== id);
      localStorage.setItem('bookmarked_lessons', JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
      toast({
        title: "Bookmark removed",
        description: "Lesson removed from your bookmarks",
      });
    } else {
      // Add bookmark
      bookmarks.push(id);
      localStorage.setItem('bookmarked_lessons', JSON.stringify(bookmarks));
      setIsBookmarked(true);
      toast({
        title: "Lesson bookmarked",
        description: "Lesson added to your bookmarks",
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: lesson?.title,
        text: lesson?.description,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Lesson link copied to clipboard",
      });
    }
  };

  // New function to handle exercise answers
  const handleExerciseAnswer = (exerciseIndex: number, answer: any) => {
    const newAnswers = { ...exerciseAnswers, [exerciseIndex]: answer };
    setExerciseAnswers(newAnswers);
    
    // Save answers to localStorage
    if (id) {
      localStorage.setItem(`lesson_answers_${id}`, JSON.stringify(newAnswers));
    }
  };

  // New function to check exercise answers
  const checkExerciseAnswer = (exerciseIndex: number) => {
    const exercise = lesson.exercises[exerciseIndex];
    const userAnswer = exerciseAnswers[exerciseIndex];
    let isCorrect = false;
    
    if (!userAnswer) return;
    
    switch (exercise.type) {
      case 'multiple-choice':
        isCorrect = userAnswer === exercise.correctAnswer;
        break;
      case 'fill-in-blank':
        isCorrect = userAnswer.toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim();
        break;
      case 'matching':
        // For matching, userAnswer should be an array of pairs
        isCorrect = userAnswer.every((pair: any, index: number) => 
          pair.item === exercise.pairs[index].item && 
          pair.match === exercise.pairs[index].match
        );
        break;
      default:
        break;
    }
    
    const newResults = { ...exerciseResults, [exerciseIndex]: isCorrect };
    setExerciseResults(newResults);
    
    // Save results to localStorage
    if (id) {
      localStorage.setItem(`lesson_results_${id}`, JSON.stringify(newResults));
    }
    
    // Show toast notification
    if (isCorrect) {
      toast({
        title: "Correct!",
        description: "Great job! Your answer is correct.",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Try again. Your answer is not correct.",
        variant: "destructive",
      });
    }
    
    return isCorrect;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
            <p className="mb-6">The lesson you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/lessons">Back to Lessons</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get related lessons
  const relatedLessons = lesson.relatedLessons
    .map((relatedId: string) => lessonData[relatedId])
    .filter(Boolean);

  return (
    <>
      <Helmet>
        <title>{`${lesson.title} | English Lesson`}</title>
        <meta name="description" content={lesson.description} />
        <meta property="og:title" content={`${lesson.title} | English Lesson`} />
        <meta property="og:description" content={lesson.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        {lesson.thumbnail && <meta property="og:image" content={lesson.thumbnail} />}
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        {/* Progress bar */}
        <div className="sticky top-16 z-30 bg-white shadow-sm">
          <Progress value={progress} className="h-1" />
        </div>
        
        <main className="flex-grow">
          {/* Lesson header */}
          <section className="bg-english-blue text-white py-8 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline" className="text-white border-white">
                      {lesson.level}
                    </Badge>
                    <Badge variant="outline" className="text-white border-white">
                      {lesson.category}
                    </Badge>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">{lesson.title}</h1>
                  <p className="text-lg opacity-90 mb-4">{lesson.description}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{lesson.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span>{progress}% complete</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4 md:mt-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-white border-white hover:bg-white text-english-blue"
                    onClick={handleBookmark}
                  >
                    <BookmarkPlus className="h-4 w-4 mr-2" />
                    {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-white border-white hover:bg-white text-english-blue"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Lesson content */}
          <section className="py-8 px-4">
            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="content" className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 md:mr-2" />
                    <span className="hidden md:inline">Content</span>
                  </TabsTrigger>
                  <TabsTrigger value="video" className="flex items-center">
                    <Video className="h-4 w-4 mr-2 md:mr-2" />
                    <span className="hidden md:inline">Video</span>
                  </TabsTrigger>
                  <TabsTrigger value="vocabulary" className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 md:mr-2" />
                    <span className="hidden md:inline">Vocabulary</span>
                  </TabsTrigger>
                  <TabsTrigger value="exercises" className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 md:mr-2" />
                    <span className="hidden md:inline">Exercises</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="space-y-6">
                  <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content }} />
                  
                  <div className="mt-8 flex justify-between">
                    <Button variant="outline" asChild>
                      <Link to="/lessons">
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back to Lessons
                      </Link>
                    </Button>
                    <Button onClick={() => setActiveTab('video')}>
                      Continue to Video
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="video">
                  <div className="aspect-video mb-6">
                    <iframe 
                      src={lesson.videoUrl} 
                      title={lesson.title}
                      className="w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab('content')}>
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Back to Content
                    </Button>
                    <Button onClick={() => setActiveTab('vocabulary')}>
                      Continue to Vocabulary
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="vocabulary" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {lesson.vocabulary.map((item: any, index: number) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold">{item.word}</h3>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Volume2 className="h-4 w-4" />
                              <span className="sr-only">Pronounce</span>
                            </Button>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.definition}</p>
                          <div className="bg-gray-50 p-2 rounded-md text-sm italic">
                            "{item.example}"
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab('video')}>
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Back to Video
                    </Button>
                    <Button onClick={() => setActiveTab('exercises')}>
                      Continue to Exercises
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="exercises" className="space-y-8">
                  {lesson.exercises.map((exercise: any, index: number) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold mb-4">Exercise {index + 1}</h3>
                        
                        {exercise.type === 'multiple-choice' && (
                          <div>
                            <p className="mb-4">{exercise.question}</p>
                            <div className="space-y-2">
                              {exercise.options.map((option: string, optionIndex: number) => (
                                <div key={optionIndex} className="flex items-center">
                                  <input 
                                    type="radio" 
                                    id={`option-${index}-${optionIndex}`} 
                                    name={`exercise-${index}`} 
                                    className="mr-2"
                                    checked={exerciseAnswers[index] === option}
                                    onChange={() => handleExerciseAnswer(index, option)}
                                    disabled={exerciseResults[index] === true}
                                  />
                                  <label 
                                    htmlFor={`option-${index}-${optionIndex}`}
                                    className={exerciseResults[index] === true && option === exercise.correctAnswer ? "font-bold text-green-600" : ""}
                                  >
                                    {option}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {exercise.type === 'fill-in-blank' && (
                          <div>
                            <p className="mb-4">{exercise.question}</p>
                            <input 
                              type="text" 
                              className={`border rounded p-2 w-full max-w-xs ${
                                exerciseResults[index] === true ? "border-green-500 bg-green-50" : ""
                              }`}
                              placeholder="Type your answer here"
                              value={exerciseAnswers[index] || ''}
                              onChange={(e) => handleExerciseAnswer(index, e.target.value)}
                              disabled={exerciseResults[index] === true}
                            />
                          </div>
                        )}
                        
                        {exercise.type === 'matching' && (
                          <div>
                            <p className="mb-4">Match the items with their correct descriptions:</p>
                            {/* Matching exercise UI would need more complex implementation */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                {exercise.pairs.map((pair: any, pairIndex: number) => (
                                  <div key={pairIndex} className="bg-gray-50 p-2 rounded">
                                    {pair.item}
                                  </div>
                                ))}
                              </div>
                              <div className="space-y-2">
                                {exercise.pairs.map((pair: any, pairIndex: number) => (
                                  <div key={pairIndex} className="bg-gray-50 p-2 rounded">
                                    {pair.match}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                              Drag and drop matching items (simplified UI for demo)
                            </p>
                          </div>
                        )}
                        
                        <div className="mt-4 flex items-center">
                          {exerciseResults[index] === true ? (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="h-5 w-5 mr-2" />
                              <span>Correct!</span>
                            </div>
                          ) : (
                            <Button 
                              onClick={() => checkExerciseAnswer(index)}
                              disabled={!exerciseAnswers[index]}
                            >
                              Check Answer
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <div className={`${lessonCompleted ? "bg-green-50" : "bg-gray-50"} border ${lessonCompleted ? "border-green-200" : "border-gray-200"} rounded-lg p-6 text-center`}>
                    {lessonCompleted ? (
                      <>
                        <h3 className="text-xl font-bold text-green-800 mb-2">Lesson Complete!</h3>
                        <p className="text-green-700 mb-4">Congratulations on completing this lesson. Keep up the good work!</p>
                        <div className="flex justify-center space-x-4">
                          <Button variant="outline" className="bg-white">
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            Rate Lesson
                          </Button>
                          <Button asChild>
                            <Link to="/lessons">
                              Continue Learning
                            </Link>
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-xl font-bold mb-2">Complete the Exercises</h3>
                        <p className="text-gray-600 mb-4">Answer all exercises correctly to complete this lesson.</p>
                        <Progress value={progress} className="max-w-md mx-auto mb-4" />
                        <p className="text-sm text-gray-500">{progress}% completed</p>
                      </>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
          
          {/* Related lessons */}
          {relatedLessons.length > 0 && (
            <section className="py-8 px-4 bg-gray-50">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Related Lessons</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {relatedLessons.map((relatedLesson: any) => (
                    <Link 
                      key={relatedLesson.id} 
                      to={`/lessons/${relatedLesson.id}`}
                      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-video bg-gray-200 relative">
                        {relatedLesson.thumbnail ? (
                          <img 
                            src={relatedLesson.thumbnail} 
                            alt={relatedLesson.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Video className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                          {relatedLesson.duration}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold mb-1 line-clamp-2">{relatedLesson.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{relatedLesson.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default LessonDetail;