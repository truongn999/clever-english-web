// Podcast data types
export interface Podcast {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  category: string;
  thumbnail: string;
  audioUrl: string;
  featured: boolean;
  popular: boolean;
  date: string;
}

// Mock podcast data
export const podcastsData: Podcast[] = [
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