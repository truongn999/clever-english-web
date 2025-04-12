
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-english-blue font-serif text-xl font-bold">EnglishMaster</h3>
            <p className="text-gray-600">Unlock your potential with our engaging English learning resources.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-english-blue">Home</Link></li>
              <li><Link to="/lessons" className="text-gray-600 hover:text-english-blue">Lessons</Link></li>
              <li><Link to="/vocabulary" className="text-gray-600 hover:text-english-blue">Vocabulary</Link></li>
              <li><Link to="/quiz" className="text-gray-600 hover:text-english-blue">Quiz</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-english-blue">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-english-blue">Grammar Guide</a></li>
              <li><a href="#" className="text-gray-600 hover:text-english-blue">Pronunciation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-english-blue">Learning Tips</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-600">Email: contact@englishmaster.com</li>
              <li className="text-gray-600">Phone: +1 (555) 123-4567</li>
              <li className="text-gray-600">Address: 123 Learning St, Education City</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 mt-8 border-t border-gray-200">
          <p className="text-gray-500 text-center">© {new Date().getFullYear()} EnglishMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
