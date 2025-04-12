import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  FileText, 
  Headphones, 
  BarChart, 
  Target, 
  Award, 
  Zap, 
  ChevronRight, 
  Calendar, 
  Bookmark, 
  Star,
  MessageSquare,
  Video
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Định nghĩa các loại mục tiêu học tập
type LearningGoal = 'general' | 'business' | 'academic' | 'travel' | 'exam';

// Định nghĩa các cấp độ trình độ
type ProficiencyLevel = 'beginner' | 'elementary' | 'intermediate' | 'advanced' | 'proficient';

// Interface cho dữ liệu khóa học
interface Course {
  id: string;
  title: string;
  description: string;
  level: ProficiencyLevel;
  duration: number; // Thời gian hoàn thành (phút)
  modules: number;
  lessons: number;
  category: string;
  image: string;
  progress?: number;
  tags: string[];
}

// Interface cho dữ liệu lộ trình học
interface LearningPathData {
  id: string;
  title: string;
  description: string;
  level: ProficiencyLevel;
  goal: LearningGoal;
  duration: number; // Tổng thời gian (giờ)
  courses: Course[];
  milestones: string[];
  skills: { name: string; level: number }[];
}

// Dữ liệu mẫu cho các khóa học
const sampleCourses: Course[] = [
  {
    id: 'c1',
    title: 'English Conversation Basics',
    description: 'Learn essential conversation skills for everyday situations.',
    level: 'beginner',
    duration: 1800,
    modules: 5,
    lessons: 20,
    category: 'Speaking',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    progress: 65,
    tags: ['conversation', 'basics', 'speaking']
  },
  {
    id: 'c2',
    title: 'Grammar Fundamentals',
    description: 'Master the basic grammar rules that form the foundation of English.',
    level: 'beginner',
    duration: 2400,
    modules: 8,
    lessons: 32,
    category: 'Grammar',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    progress: 40,
    tags: ['grammar', 'basics', 'structure']
  },
  {
    id: 'c3',
    title: 'Essential Vocabulary',
    description: 'Build your core vocabulary with the most commonly used English words.',
    level: 'beginner',
    duration: 1200,
    modules: 6,
    lessons: 24,
    category: 'Vocabulary',
    image: 'https://images.unsplash.com/photo-1546521343-4eb2c01aa44b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    progress: 20,
    tags: ['vocabulary', 'basics', 'words']
  },
  {
    id: 'c4',
    title: 'Business Communication',
    description: 'Develop professional communication skills for the workplace.',
    level: 'intermediate',
    duration: 3000,
    modules: 10,
    lessons: 40,
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    tags: ['business', 'professional', 'communication']
  },
  {
    id: 'c5',
    title: 'Academic Writing',
    description: 'Learn how to write essays, research papers, and academic reports.',
    level: 'advanced',
    duration: 3600,
    modules: 12,
    lessons: 48,
    category: 'Writing',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    tags: ['academic', 'writing', 'essays']
  },
  {
    id: 'c6',
    title: 'IELTS Preparation',
    description: 'Comprehensive preparation for all sections of the IELTS exam.',
    level: 'intermediate',
    duration: 4800,
    modules: 16,
    lessons: 64,
    category: 'Exam Prep',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    tags: ['IELTS', 'exam', 'preparation']
  },
];

// Dữ liệu mẫu cho các lộ trình học
const sampleLearningPaths: LearningPathData[] = [
  {
    id: 'lp1',
    title: 'Everyday English Mastery',
    description: 'A comprehensive path to master everyday English for general communication.',
    level: 'beginner',
    goal: 'general',
    duration: 120,
    courses: [sampleCourses[0], sampleCourses[1], sampleCourses[2]],
    milestones: [
      'Hold basic conversations about everyday topics',
      'Understand common phrases and expressions',
      'Read and comprehend simple texts',
      'Write short messages and emails'
    ],
    skills: [
      { name: 'Speaking', level: 3 },
      { name: 'Listening', level: 3 },
      { name: 'Reading', level: 4 },
      { name: 'Writing', level: 2 },
      { name: 'Grammar', level: 3 },
      { name: 'Vocabulary', level: 4 }
    ]
  },
  {
    id: 'lp2',
    title: 'Business English Professional',
    description: 'Develop professional English skills for business and workplace communication.',
    level: 'intermediate',
    goal: 'business',
    duration: 180,
    courses: [sampleCourses[3], sampleCourses[1], sampleCourses[0]],
    milestones: [
      'Conduct business meetings and negotiations',
      'Write professional emails and reports',
      'Give presentations with confidence',
      'Network effectively in professional settings'
    ],
    skills: [
      { name: 'Business Communication', level: 5 },
      { name: 'Professional Writing', level: 4 },
      { name: 'Presentation Skills', level: 4 },
      { name: 'Negotiation Language', level: 3 },
      { name: 'Email Etiquette', level: 5 },
      { name: 'Business Vocabulary', level: 4 }
    ]
  },
  {
    id: 'lp3',
    title: 'Academic Excellence',
    description: 'Master academic English for university studies and research.',
    level: 'advanced',
    goal: 'academic',
    duration: 240,
    courses: [sampleCourses[4], sampleCourses[1], sampleCourses[2]],
    milestones: [
      'Write research papers and essays',
      'Understand academic lectures and discussions',
      'Participate in academic debates',
      'Present research findings effectively'
    ],
    skills: [
      { name: 'Academic Writing', level: 5 },
      { name: 'Critical Reading', level: 4 },
      { name: 'Research Skills', level: 4 },
      { name: 'Analytical Thinking', level: 5 },
      { name: 'Citation & Referencing', level: 4 },
      { name: 'Academic Vocabulary', level: 5 }
    ]
  },
  {
    id: 'lp4',
    title: 'IELTS Success Path',
    description: 'Comprehensive preparation to achieve your target IELTS score.',
    level: 'intermediate',
    goal: 'exam',
    duration: 160,
    courses: [sampleCourses[5], sampleCourses[4], sampleCourses[0]],
    milestones: [
      'Master IELTS reading strategies',
      'Develop effective writing for Task 1 and 2',
      'Improve speaking fluency and coherence',
      'Enhance listening skills for all question types'
    ],
    skills: [
      { name: 'IELTS Reading', level: 4 },
      { name: 'IELTS Writing', level: 4 },
      { name: 'IELTS Speaking', level: 3 },
      { name: 'IELTS Listening', level: 4 },
      { name: 'Time Management', level: 5 },
      { name: 'Exam Strategies', level: 5 }
    ]
  }
];

// Component hiển thị thẻ kỹ năng với mức độ
const SkillTag: React.FC<{ skill: { name: string; level: number } }> = ({ skill }) => {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-sm">
      <span className="font-medium">{skill.name}</span>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            size={12} 
            className={i < skill.level ? "fill-english-yellow text-english-yellow" : "text-gray-300"} 
          />
        ))}
      </div>
    </div>
  );
};

// Component hiển thị thẻ khóa học
const CourseCard: React.FC<{ course: Course; inProgress?: boolean }> = ({ course, inProgress }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-40">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className={`
            ${course.level === 'beginner' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
              course.level === 'elementary' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
              course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' :
              course.level === 'advanced' ? 'bg-purple-100 text-purple-800 hover:bg-purple-100' :
              'bg-red-100 text-red-800 hover:bg-red-100'}
          `}>
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </Badge>
        </div>
        <div className="absolute top-2 left-2">
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
            {course.category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          {course.tags.map((tag, i) => (
            <Badge key={i} variant="outline" className="mr-1 mb-1">
              {tag}
            </Badge>
          ))}
        </div>
        <h3 className="font-bold text-lg mb-1">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <div className="flex items-center mr-3">
            <BookOpen size={14} className="mr-1" />
            <span>{course.lessons} lessons</span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{Math.floor(course.duration / 60)} hrs</span>
          </div>
        </div>
        
        {inProgress && course.progress !== undefined && (
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span className="font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}
        
        <Button 
          className="w-full mt-2" 
          variant={inProgress ? "default" : "outline"}
          onClick={() => navigate(`/lessons/${course.id}`)}
        >
          {inProgress ? "Continue Learning" : "Start Course"}
        </Button>
      </CardContent>
    </Card>
  );
};

// Component hiển thị thẻ lộ trình học
const PathCard: React.FC<{ path: LearningPathData; active?: boolean }> = ({ path, active }) => {
  const navigate = useNavigate();
  
  // Tính toán tổng tiến độ của lộ trình
  const calculatePathProgress = () => {
    const coursesWithProgress = path.courses.filter(c => c.progress !== undefined);
    if (coursesWithProgress.length === 0) return 0;
    
    const totalProgress = coursesWithProgress.reduce((sum, course) => sum + (course.progress || 0), 0);
    return Math.round(totalProgress / coursesWithProgress.length);
  };
  
  const pathProgress = calculatePathProgress();
  
  return (
    <Card className={`overflow-hidden hover:shadow-md transition-shadow ${active ? 'border-english-blue' : ''}`}>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Badge className={`mb-2 ${
              path.level === 'beginner' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
              path.level === 'elementary' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
              path.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' :
              path.level === 'advanced' ? 'bg-purple-100 text-purple-800 hover:bg-purple-100' :
              'bg-red-100 text-red-800 hover:bg-red-100'
            }`}>
              {path.level.charAt(0).toUpperCase() + path.level.slice(1)}
            </Badge>
            <h3 className="font-bold text-xl mb-1">{path.title}</h3>
          </div>
          {active && (
            <Badge variant="outline" className="bg-english-blue/10 text-english-blue border-english-blue">
              Current Path
            </Badge>
          )}
        </div>
        
        <p className="text-gray-600 mb-4">{path.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center">
            <BookOpen size={16} className="mr-2 text-english-blue" />
            <span>{path.courses.length} Courses</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-2 text-english-blue" />
            <span>{path.duration} Hours</span>
          </div>
          <div className="flex items-center">
            <Target size={16} className="mr-2 text-english-blue" />
            <span>{path.goal.charAt(0).toUpperCase() + path.goal.slice(1)}</span>
          </div>
          <div className="flex items-center">
            <Award size={16} className="mr-2 text-english-blue" />
            <span>{path.milestones.length} Milestones</span>
          </div>
        </div>
        
        {active && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Overall Progress</span>
              <span className="font-medium">{pathProgress}%</span>
            </div>
            <Progress value={pathProgress} className="h-2" />
          </div>
        )}
        
        <Button 
          className="w-full mt-2" 
          variant={active ? "default" : "outline"}
          onClick={() => navigate(`/learning-path/${path.id}`)}
        >
          {active ? "Continue Path" : "View Path Details"}
        </Button>
      </CardContent>
    </Card>
  );
};

// Component chính cho trang Lộ trình học
const LearningPath: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("current");
  const [selectedGoal, setSelectedGoal] = useState<LearningGoal>("general");
  const [selectedLevel, setSelectedLevel] = useState<ProficiencyLevel>("beginner");
  
  // Giả định người dùng đã có lộ trình học đầu tiên
  const currentPath = sampleLearningPaths[0];
  
  // Lọc các lộ trình học phù hợp với mục tiêu và trình độ đã chọn
  const filteredPaths = sampleLearningPaths.filter(
    path => path.goal === selectedGoal && path.level === selectedLevel
  );
  
  return (
    <>
      <Helmet>
        <title>Personalized Learning Path | Master English at Your Own Pace</title>
        <meta 
          name="description" 
          content="Create a personalized English learning path based on your goals and proficiency level. Track your progress and achieve fluency faster."
        />
        <meta property="og:title" content="Personalized Learning Path | Master English" />
        <meta 
          property="og:description" 
          content="Create a personalized English learning path based on your goals and proficiency level."
        />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          {/* Hero section */}
          <section className="bg-english-blue text-white py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="md:w-2/3 md:pr-8">
                  <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                    Your Personalized Learning Path
                  </h1>
                  <p className="text-xl opacity-90 mb-6">
                    Learn English efficiently with a customized path designed for your goals, level, and learning style.
                  </p>
                  {!isLoggedIn && (
                    <Button className="bg-white text-english-blue hover:bg-gray-100" size="lg">
                      Create Your Path
                    </Button>
                  )}
                </div>
                <div className="md:w-1/3 mt-8 md:mt-0">
                  <img 
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Personalized learning journey" 
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </section>
          
          {/* Main content */}
          <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-8">
                  <TabsTrigger value="current">Current Path</TabsTrigger>
                  <TabsTrigger value="explore">Explore Paths</TabsTrigger>
                  <TabsTrigger value="create">Create Custom Path</TabsTrigger>
                </TabsList>
                
                {/* Current Path Tab */}
                <TabsContent value="current">
                  {isLoggedIn ? (
                    <div>
                      <div className="mb-8">
                        <PathCard path={currentPath} active={true} />
                      </div>
                      
                      <h2 className="text-2xl font-bold mb-6">Your Current Courses</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {currentPath.courses.map((course) => (
                          <CourseCard key={course.id} course={course} inProgress={true} />
                        ))}
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-6 mb-8">
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                          <Target className="mr-2 text-english-blue" />
                          Path Milestones
                        </h3>
                        <ul className="space-y-3">
                          {currentPath.milestones.map((milestone, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>{milestone}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                          <Award className="mr-2 text-english-blue" />
                          Skills You'll Develop
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {currentPath.skills.map((skill, index) => (
                            <SkillTag key={index} skill={skill} />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                        <BookOpen className="h-12 w-12 text-english-blue mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">No Active Learning Path</h3>
                        <p className="text-gray-600 mb-6">
                          Sign in to view your current learning path or create a new one tailored to your needs.
                        </p>
                        <Button className="bg-english-blue hover:bg-english-blue/90">
                          Sign In to Continue
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                {/* Explore Paths Tab */}
                <TabsContent value="explore">
                  <div className="mb-8 bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Find Your Ideal Learning Path</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Your Learning Goal</label>
                        <Select value={selectedGoal} onValueChange={(value) => setSelectedGoal(value as LearningGoal)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your goal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General English</SelectItem>
                            <SelectItem value="business">Business English</SelectItem>
                            <SelectItem value="academic">Academic English</SelectItem>
                            <SelectItem value="travel">Travel & Conversation</SelectItem>
                            <SelectItem value="exam">Exam Preparation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Your Current Level</label>
                        <Select value={selectedLevel} onValueChange={(value) => setSelectedLevel(value as ProficiencyLevel)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="elementary">Elementary</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                            <SelectItem value="proficient">Proficient</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  {filteredPaths.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredPaths.map((path) => (
                        <PathCard key={path.id} path={path} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">No Paths Found</h3>
                      <p className="text-gray-600 mb-4">
                        We couldn't find any learning paths matching your criteria.
                      </p>
                      <Button variant="outline" onClick={() => {
                        setSelectedGoal('general');
                        setSelectedLevel('beginner');
                      }}>
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                {/* Create Custom Path Tab */}
                <TabsContent value="create">
                  <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Create Your Custom Learning Path</h2>
                    <p className="mb-6">
                      Answer a few questions about your goals, current level, and preferences to get a personalized learning path.
                    </p>
                    
                    <Accordion type="single" collapsible className="mb-6">
                      <AccordionItem value="step1">
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <div className="bg-english-blue text-white w-6 h-6 rounded-full flex items-center justify-center mr-2">1</div>
                            <span>Define Your Goals</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="p-4 space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">What's your primary goal for learning English?</label>
                              <Select defaultValue="general">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your goal" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="general">Everyday Communication</SelectItem>
                                  <SelectItem value="business">Professional Development</SelectItem>
                                  <SelectItem value="academic">Academic Success</SelectItem>
                                  <SelectItem value="travel">Travel & Cultural Exchange</SelectItem>
                                  <SelectItem value="exam">Exam Preparation</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">Which specific skills do you want to improve?</label>
                              <div className="grid grid-cols-2 gap-2">
                                <Button variant="outline" className="justify-start">
                                  <MessageSquare className="mr-2 h-4 w-4" /> Speaking
                                </Button>
                                <Button variant="outline" className="justify-start">
                                  <Headphones className="mr-2 h-4 w-4" /> Listening
                                </Button>
                                <Button variant="outline" className="justify-start">
                                  <BookOpen className="mr-2 h-4 w-4" /> Reading
                                </Button>
                                <Button variant="outline" className="justify-start">
                                  <FileText className="mr-2 h-4 w-4" /> Writing
                                </Button>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="step2">
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <div className="bg-english-blue text-white w-6 h-6 rounded-full flex items-center justify-center mr-2">2</div>
                            <span>Assess Your Current Level</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="p-4 space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">How would you rate your current English level?</label>
                              <Select defaultValue="beginner">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your level" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="beginner">Beginner - I know a few words and phrases</SelectItem>
                                  <SelectItem value="elementary">Elementary - I can have simple conversations</SelectItem>
                                  <SelectItem value="intermediate">Intermediate - I can communicate in most situations</SelectItem>
                                  <SelectItem value="advanced">Advanced - I can express complex ideas</SelectItem>
                                  <SelectItem value="proficient">Proficient - I'm nearly fluent</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">Rate your skills in these areas:</label>
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm">Speaking</span>
                                    <span className="text-sm text-gray-500">Beginner</span>
                                  </div>
                                  <Progress value={20} className="h-2" />
                                </div>
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm">Listening</span>
                                    <span className="text-sm text-gray-500">Elementary</span>
                                  </div>
                                  <Progress value={40} className="h-2" />
                                </div>
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm">Reading</span>
                                    <span className="text-sm text-gray-500">Intermediate</span>
                                  </div>
                                  <Progress value={60} className="h-2" />
                                </div>
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm">Writing</span>
                                    <span className="text-sm text-gray-500">Beginner</span>
                                  </div>
                                  <Progress value={20} className="h-2" />
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <Button variant="outline" className="w-full">
                                Take a Placement Test
                              </Button>
                              <p className="text-xs text-gray-500 mt-2">
                                For a more accurate assessment, take our 15-minute placement test
                              </p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="step3">
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <div className="bg-english-blue text-white w-6 h-6 rounded-full flex items-center justify-center mr-2">3</div>
                            <span>Set Your Learning Preferences</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="p-4 space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">How much time can you dedicate to learning each week?</label>
                              <Select defaultValue="moderate">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select time commitment" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="light">Light (1-2 hours/week)</SelectItem>
                                  <SelectItem value="moderate">Moderate (3-5 hours/week)</SelectItem>
                                  <SelectItem value="intensive">Intensive (6-10 hours/week)</SelectItem>
                                  <SelectItem value="immersive">Immersive (10+ hours/week)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">What learning methods do you prefer?</label>
                              <div className="grid grid-cols-2 gap-2">
                                <Button variant="outline" className="justify-start">
                                  <Video className="mr-2 h-4 w-4" /> Video Lessons
                                </Button>
                                <Button variant="outline" className="justify-start">
                                  <Headphones className="mr-2 h-4 w-4" /> Audio Lessons
                                </Button>
                                <Button variant="outline" className="justify-start">
                                  <BookOpen className="mr-2 h-4 w-4" /> Reading Materials
                                </Button>
                                <Button variant="outline" className="justify-start">
                                  <MessageSquare className="mr-2 h-4 w-4" /> Interactive Practice
                                </Button>
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">Do you have any specific interests?</label>
                              <div className="grid grid-cols-2 gap-2">
                                <Button variant="outline" className="justify-start">
                                  Business
                                </Button>
                                <Button variant="outline" className="justify-start">
                                  Travel
                                </Button>
                                <Button variant="outline" className="justify-start">
                                  Technology
                                </Button>
                                <Button variant="outline" className="justify-start">
                                  Culture
                                </Button>
                                <Button variant="outline" className="justify-start">
                                  Science
                                </Button>
                                <Button variant="outline" className="justify-start">
                                  Arts
                                </Button>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    
                    <div className="flex justify-end">
                      <Button className="bg-english-blue hover:bg-english-blue/90">
                        Generate My Learning Path
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <Zap className="mr-2 text-english-blue" />
                      Recommended Courses for You
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sampleCourses.slice(0, 3).map((course) => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
          
          {/* Weekly Schedule Section */}
          <section className="py-12 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Calendar className="mr-2 text-english-blue" />
                Your Weekly Learning Schedule
              </h2>
              
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="grid grid-cols-7 border-b">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                    <div key={i} className="p-4 text-center font-medium border-r last:border-r-0">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 h-48">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="border-r last:border-r-0 p-2 relative">
                      {i === 1 && (
                        <div className="absolute top-2 left-2 right-2 bg-english-blue/10 rounded p-2 border-l-4 border-english-blue">
                          <p className="text-xs font-medium">Grammar Basics</p>
                          <p className="text-xs text-gray-500">9:00 - 10:00 AM</p>
                        </div>
                      )}
                      {i === 3 && (
                        <div className="absolute top-16 left-2 right-2 bg-green-100 rounded p-2 border-l-4 border-green-500">
                          <p className="text-xs font-medium">Vocabulary Practice</p>
                          <p className="text-xs text-gray-500">6:00 - 7:00 PM</p>
                        </div>
                      )}
                      {i === 5 && (
                        <div className="absolute top-8 left-2 right-2 bg-purple-100 rounded p-2 border-l-4 border-purple-500">
                          <p className="text-xs font-medium">Speaking Session</p>
                          <p className="text-xs text-gray-500">11:00 - 12:00 PM</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <Button variant="outline" className="text-sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Customize Schedule
                </Button>
              </div>
            </div>
          </section>
          
          {/* Learning Tips Section */}
          <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Bookmark className="mr-2 text-english-blue" />
                Learning Tips & Resources
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3">Consistency is Key</h3>
                    <p className="text-gray-600 mb-4">
                      Studies show that learning for 20 minutes daily is more effective than cramming for hours once a week.
                    </p>
                    <Button variant="link" className="p-0 h-auto text-english-blue">
                      Read more tips <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3">Immerse Yourself</h3>
                    <p className="text-gray-600 mb-4">
                      Surround yourself with English by watching shows, listening to podcasts, and reading articles.
                    </p>
                    <Button variant="link" className="p-0 h-auto text-english-blue">
                      View resources <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3">Track Your Progress</h3>
                    <p className="text-gray-600 mb-4">
                      Regularly review your learning analytics to identify strengths and areas for improvement.
                    </p>
                    <Button variant="link" className="p-0 h-auto text-english-blue">
                      View your stats <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default LearningPath;