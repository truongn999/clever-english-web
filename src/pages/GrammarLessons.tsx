
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BookOpen, GraduationCap, List } from 'lucide-react';

const lessons = [
  {
    id: 1,
    title: "Basic Grammar Rules",
    description: "Learn the fundamental grammar structures in English",
    level: "Beginner",
    topics: ["Nouns", "Verbs", "Adjectives", "Sentence Structure"]
  },
  {
    id: 2,
    title: "Present Tenses",
    description: "Master present simple, continuous, and perfect tenses",
    level: "Beginner",
    topics: ["Present Simple", "Present Continuous", "Present Perfect"]
  },
  {
    id: 3,
    title: "Past Tenses",
    description: "Learn how to talk about past events correctly",
    level: "Intermediate",
    topics: ["Past Simple", "Past Continuous", "Past Perfect"]
  },
  {
    id: 4,
    title: "Future Tenses",
    description: "Express future actions and intentions properly",
    level: "Intermediate",
    topics: ["Future Simple", "Future Continuous", "Going to"]
  },
  {
    id: 5,
    title: "Modal Verbs",
    description: "Understand how to use modal verbs for different purposes",
    level: "Intermediate",
    topics: ["Can/Could", "May/Might", "Should/Would", "Must/Have to"]
  },
  {
    id: 6,
    title: "Conditionals",
    description: "Master different types of conditional sentences",
    level: "Advanced",
    topics: ["Zero Conditional", "First Conditional", "Second Conditional", "Third Conditional"]
  }
];

const GrammarLessons: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-english-blue text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">English Grammar</h1>
            <p className="text-xl opacity-90">Master English grammar rules and structures</p>
          </div>
        </section>
        
        {/* Grammar Lessons */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8 text-english-dark text-center">Grammar Lessons</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons.map((lesson) => (
                <div 
                  key={lesson.id}
                  className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-serif font-bold text-english-dark">{lesson.title}</h3>
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-english-light text-english-blue">
                        {lesson.level}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">{lesson.description}</p>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Topics Covered:</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {lesson.topics.map((topic, index) => (
                          <li key={index} className="text-sm">{topic}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <Button 
                        variant="outline"
                        size="sm"
                        className="text-english-blue"
                      >
                        <List size={16} className="mr-2" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        className="bg-english-blue hover:bg-english-blue/90"
                      >
                        <BookOpen size={16} className="mr-2" />
                        Start Lesson
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button 
                size="lg"
                className="bg-english-green hover:bg-english-green/90"
              >
                <GraduationCap size={18} className="mr-2" />
                View All Grammar Lessons
              </Button>
            </div>
          </div>
        </section>
        
        {/* Learning Tips */}
        <section className="py-16 px-4 bg-english-light">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8 text-center">Grammar Learning Tips</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-serif text-xl font-bold mb-3">Practice Regularly</h3>
                <p className="text-gray-700">Consistency is key. Set aside time each day to practice your grammar skills through exercises and real-world usage.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-serif text-xl font-bold mb-3">Read Extensively</h3>
                <p className="text-gray-700">Reading books, articles, and other materials exposes you to correct grammar usage in context.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-serif text-xl font-bold mb-3">Apply Rules in Writing</h3>
                <p className="text-gray-700">Actively apply what you've learned by writing sentences, paragraphs, and short essays using specific grammar points.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default GrammarLessons;
