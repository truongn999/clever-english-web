
import React, { useEffect, useRef, useState, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, BookOpen, Award, BarChart, Zap, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';

// Data moved to separate constants for better code organization
import { features, testimonials, stats, howItWorksSteps, faqItems } from '@/data/homePageData';

// Memoized animation variants to prevent recreation on each render
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Memoized components for better performance
const FeatureCard = memo(({ feature, index }: { feature: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={ref}
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="w-12 h-12 bg-english-blue/10 rounded-full flex items-center justify-center mb-4">
        {feature.icon}
      </div>
      <h3 className="font-serif text-xl font-bold mb-2">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
    </motion.div>
  );
});

const StepCard = memo(({ item, index }: { item: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="group bg-white border border-transparent hover:border-english-blue hover:bg-english-blue/5 transition-colors duration-500 rounded-xl overflow-hidden shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading={index === 0 ? "eager" : "lazy"}
          width="400"
          height="200"
        />
      </div>
      <div className="p-6">
        <div className="inline-block px-3 py-1 bg-english-blue/10 text-english-blue rounded-full text-sm font-medium mb-4">
          Step {item.step}
        </div>
        <h3 className="font-serif text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-english-blue">{item.title}</h3>
        <p className="text-gray-600">{item.description}</p>
      </div>
    </motion.div>
  );
});

// Main component
const Index: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Refs for sections to track visibility
  const heroRef = useRef(null);
  const heroIsInView = useInView(heroRef, { once: true });

  useEffect(() => {
    setIsVisible(true);
    
    // Improved intersection observer with better performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px 100px 0px' // Pre-load animations before they come into view
    });
    
    // Use querySelectorAll once and cache the result
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  // Memoize the steps data to prevent recreation on each render
  const howItWorksData = useMemo(() => [
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
  ], []);

  // Memoize the FAQ data
  const faqData = useMemo(() => [
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
  ], []);

  // Optimize newsletter form submission
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Clever English - Master English with Confidence</title>
        <meta name="description" content="Interactive English lessons, vocabulary building, and practical exercises to help you become fluent in English." />
        <meta name="keywords" content="English learning, ESL, English lessons, vocabulary, language learning" />
        <meta property="og:title" content="Clever English - Master English with Confidence" />
        <meta property="og:description" content="Interactive English lessons, vocabulary building, and practical exercises to help you become fluent in English." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://clever-english.com" />
        <meta property="og:image" content="https://clever-english.com/og-image.jpg" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://randomuser.me" />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section - Optimized with ref for visibility tracking */}
      <section 
        ref={heroRef}
        className="hero-section bg-gradient-to-br from-english-blue to-english-dark text-white py-16 md:py-24 overflow-hidden relative"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5MSA0IDQgNCA0LTEuNzkxIDQtNHptMC0zMGMwLTIuMjA5LTEuNzktNC00LTRzLTQgMS43OTEtNCA0IDIuNzkxIDQgNCA0IDQtMS43OTEgNC00em0wIDYwYzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row md:items-center">
            <motion.div 
              className="md:w-1/2 md:pr-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: heroIsInView ? 1 : 0, x: heroIsInView ? 0 : -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                Master English<br />with Confidence
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Interactive lessons, vocabulary building, and practical exercises to help you become fluent in English.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-white text-english-blue hover:bg-gray-100 text-lg group" size="lg" asChild>
                  <Link to="/lessons" className="flex items-center">
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white/10 text-lg" size="lg" asChild>
                  <Link to="/vocabulary">Try a Flash card</Link>
                </Button>
              </div>
              
              {/* Language level selector */}
              <div className="mt-8 bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                <p className="text-white/90 mb-2">Choose your level:</p>
                <div className="flex flex-wrap gap-2">
                  {["Beginner", "Intermediate", "Advanced", "Business"].map((level) => (
                    <Link 
                      key={level} 
                      to={`/level/${level.toLowerCase()}`}
                      className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
                    >
                      {level}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 mt-10 md:mt-0"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: heroIsInView ? 1 : 0, y: heroIsInView ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Students learning English together"
                  className="rounded-lg shadow-xl object-cover h-full w-full"
                  loading="eager"
                  width="600"
                  height="400"
                  fetchPriority="high"
                />
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-english-yellow text-english-dark px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  New lessons weekly!
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section - Optimized with AnimatePresence */}
      <section className="py-12 bg-english-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <AnimatePresence>
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="animate-on-scroll"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <p className="text-3xl md:text-4xl font-bold text-english-blue">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
      
      {/* Features Section - Using memoized components */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Why Learn With Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our platform is designed to make learning English effective, engaging, and enjoyable.</p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our simple 3-step process to mastering English</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {howItWorksSteps.map((item, index) => (
              <StepCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-english-light py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            className="animate-on-scroll"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready to Improve Your English?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of students who are already improving their English skills with our platform.
            </p>
            <Button className="bg-english-blue hover:bg-english-blue/90 text-white text-lg group" size="lg" asChild>
              <Link to="/lessons" className="flex items-center">
                Get Started For Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            {/* Free trial info */}
            <p className="mt-4 text-sm text-gray-500">No credit card required. 7-day free trial.</p>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">What Our Students Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Hear from our community of English learners around the world</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-on-scroll"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-english-yellow" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                    loading="lazy"
                    width="48"
                    height="48"
                  />
                  <div>
                    <p className="font-bold text-english-dark">{testimonial.author}</p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Got questions? We've got answers.</p>
          </div>
          
          <div className="space-y-4 animate-on-scroll">
            {faqItems.map((item, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer p-6">
                    <span>{item.question}</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" width="24" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-700">
                    {item.answer}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Button variant="outline" className="text-english-blue" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 px-4 bg-english-blue text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Get English Tips in Your Inbox</h2>
              <p className="text-white/80">Weekly lessons, vocabulary tips, and learning resources.</p>
            </div>
            <div className="md:w-1/2 w-full">
              <form className="flex flex-col sm:flex-row gap-2 w-full">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-800"
                  aria-label="Email address"
                />
                <Button className="bg-white text-english-blue hover:bg-gray-100">
                  Subscribe
                </Button>
              </form>
              <p className="text-sm text-white/60 mt-2">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default memo(Index);
