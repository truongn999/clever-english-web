import { BookOpen, Award, BarChart, Zap, CheckCircle } from 'lucide-react';
import React from 'react';

// Feature data
export const features = [
  {
    title: "Interactive Lessons",
    description: "Engaging content designed by language experts to help you learn naturally.",
    icon: React.createElement(BookOpen, { className: "w-6 h-6 text-english-blue" })
  },
  {
    title: "Vocabulary Builder",
    description: "Expand your English vocabulary with our flashcard system and spaced repetition.",
    icon: React.createElement(Zap, { className: "w-6 h-6 text-english-blue" })
  },
  {
    title: "Practice with Quizzes",
    description: "Test your knowledge with our interactive quizzes and get instant feedback.",
    icon: React.createElement(Award, { className: "w-6 h-6 text-english-blue" })
  },
  {
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed progress analytics.",
    icon: React.createElement(BarChart, { className: "w-6 h-6 text-english-blue" })
  }
];

// Testimonial data
export const testimonials = [
  {
    quote: "This platform has helped me improve my English skills for my job interviews. Highly recommended!",
    author: "Maria S.",
    role: "Marketing Professional",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    quote: "The lessons are well-structured and the quizzes really helped me prepare for my English exam.",
    author: "Chen Wei",
    role: "University Student",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    quote: "I love the vocabulary flashcards! They've helped me expand my business English vocabulary.",
    author: "Carlos R.",
    role: "Business Analyst",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg"
  }
];

// Stats data
export const stats = [
  { value: "50K+", label: "Active Learners" },
  { value: "1000+", label: "Lessons" },
  { value: "25K+", label: "Vocabulary Words" },
  { value: "98%", label: "Satisfaction Rate" }
];

// How it works steps
export const howItWorksSteps = [
  { 
    step: "01", 
    title: "Choose Your Path", 
    description: "Select your current level and learning goals to get a personalized learning path.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  { 
    step: "02", 
    title: "Learn & Practice", 
    description: "Complete interactive lessons, vocabulary exercises, and quizzes at your own pace.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  { 
    step: "03", 
    title: "Track Progress", 
    description: "Monitor your improvement with detailed analytics and adjust your learning strategy.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  }
];

// FAQ items
export const faqItems = [
  {
    question: "How much time should I spend learning each day?",
    answer: "We recommend 15-30 minutes of daily practice for optimal results. Consistency is more important than duration."
  },
  {
    question: "Is this platform suitable for complete beginners?",
    answer: "Absolutely! We have specially designed courses for beginners with no prior English knowledge."
  },
  {
    question: "Can I access the platform on mobile devices?",
    answer: "Yes, our platform is fully responsive and works on smartphones, tablets, and computers."
  },
  {
    question: "How long does it take to become fluent?",
    answer: "The journey to fluency varies for each learner, but with consistent practice, most students see significant improvement within 3-6 months."
  }
];