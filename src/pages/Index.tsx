
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const features = [
  {
    title: "Interactive Lessons",
    description: "Engaging content designed by language experts to help you learn naturally."
  },
  {
    title: "Vocabulary Builder",
    description: "Expand your English vocabulary with our flashcard system and spaced repetition."
  },
  {
    title: "Practice with Quizzes",
    description: "Test your knowledge with our interactive quizzes and get instant feedback."
  },
  {
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed progress analytics."
  }
];

const testimonials = [
  {
    quote: "This platform has helped me improve my English skills for my job interviews. Highly recommended!",
    author: "Maria S.",
    role: "Marketing Professional"
  },
  {
    quote: "The lessons are well-structured and the quizzes really helped me prepare for my English exam.",
    author: "Chen Wei",
    role: "University Student"
  },
  {
    quote: "I love the vocabulary flashcards! They've helped me expand my business English vocabulary.",
    author: "Carlos R.",
    role: "Business Analyst"
  }
];

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/2 md:pr-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                Master English<br />with Confidence
              </h1>
              <p className="text-xl mb-8">
                Interactive lessons, vocabulary building, and practical exercises to help you become fluent in English.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-white text-english-blue hover:bg-gray-100 text-lg" size="lg" asChild>
                  <Link to="/lessons">Start Learning</Link>
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white/10 text-lg" size="lg" asChild>
                  <Link to="/quiz">Try a Quiz</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <img
                src="/placeholder.svg"
                alt="Students learning English"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">Why Learn With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-english-blue/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-english-blue" />
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-english-light py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="section-title">Ready to Improve Your English?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of students who are already improving their English skills with our platform.
          </p>
          <Button className="btn-primary text-lg" size="lg" asChild>
            <Link to="/lessons">Get Started For Free</Link>
          </Button>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-english-yellow" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-english-dark">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
