
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-english-blue font-serif text-2xl font-bold">EnglishMaster</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-english-blue font-medium">Home</Link>
            <Link to="/lessons" className="text-gray-700 hover:text-english-blue font-medium">Lessons</Link>
            <Link to="/vocabulary" className="text-gray-700 hover:text-english-blue font-medium">Vocabulary</Link>
            <Link to="/quiz" className="text-gray-700 hover:text-english-blue font-medium">Quiz</Link>
            <Button className="bg-english-blue hover:bg-english-blue/90">Sign In</Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-english-blue focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-english-blue hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link to="/lessons" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-english-blue hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Lessons
            </Link>
            <Link to="/vocabulary" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-english-blue hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Vocabulary
            </Link>
            <Link to="/quiz" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-english-blue hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Quiz
            </Link>
            <div className="pt-2">
              <Button className="w-full bg-english-blue hover:bg-english-blue/90">Sign In</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
