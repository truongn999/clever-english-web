
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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
            <Link to="/podcast" className="text-gray-700 hover:text-english-blue font-medium">Podcasts</Link>
            <Link to="/stories" className="text-gray-700 hover:text-english-blue font-medium">Stories</Link>
            {/* <Link to="/quiz" className="text-gray-700 hover:text-english-blue font-medium">Quiz</Link> */}
            {
              isLoggedIn && (
                <Link to="/leaderboard" className="text-gray-700 hover:text-english-blue font-medium">Leaderboard</Link>
              )
            }
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full border-1 border-english-blue hover:bg-blue-50 transition-all duration-200 p-0">
                    <Avatar className="h-full w-full">
                      <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                      <AvatarFallback className="bg-english-blue text-white font-medium">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user?.name || 'User'}</span>
                      <span className="text-xs text-gray-500">{user?.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button className="bg-english-blue hover:bg-english-blue/90">
                <Link to="/login">Sign In</Link>
              </Button>
            )}
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
            <Link to="/podcasr" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-english-blue hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Podcasr
            </Link>
            <Link to="/stories" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-english-blue hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Stories
            </Link>
            <Link to="/leaderboard" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-english-blue hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Leaderboard
            </Link>
            {isLoggedIn ? (
              <div className="md:flex items-center ml-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>Profile</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-4">
                <Button>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
