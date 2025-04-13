
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { StreakProvider } from "./contexts/StreakContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import Lessons from "./pages/Lessons";
import LessonDetail from "./pages/LessonDetail";
import Vocabulary from "./pages/Vocabulary";
import Quiz from "./pages/Quiz";
import GrammarLessons from "./pages/GrammarLessons";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import StickyStreak from "./components/streak/StickyStreak";
import LearningPath from "./pages/LearningPath";
import Profile from "./pages/Profile";
import Podcast from "./pages/Podcast";
import PodcastDetail from "./pages/PodcastDetail";
import ShortStories from "./pages/ShortStories";
import StoryDetail from "./pages/StoryDetail";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// ScrollToTop component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Page title and meta description component
const RouteChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Set page title and meta description based on route
    let title = "Learn English | Improve Your Skills";
    let description = "Learn English with our interactive platform featuring lessons, vocabulary, quizzes, and more.";

    switch (pathname) {
      case "/":
        title = "Learn English | Home";
        description = "Start your English learning journey with our interactive platform.";
        break;
      case "/lessons":
        title = "English Lessons | Learn English";
        description = "Interactive English lessons for all levels.";
        break;
      case "/vocabulary":
        title = "Vocabulary Builder | Learn English";
        description = "Build your English vocabulary with interactive flashcards.";
        break;
      case "/quiz":
        title = "English Quiz | Test Your Knowledge";
        description = "Test your English knowledge with our interactive quizzes.";
        break;
      case "/leaderboard":
        title = "Leaderboard | Top English Learners";
        description = "See the top English learners and compete to reach the top of our leaderboard.";
        break;
      case "/login":
        title = "Sign In | Learn English";
        description = "Sign in to your English learning account.";
        break;
      case "/register":
        title = "Create Account | Learn English";
        description = "Create a new account to start learning English.";
        break;
      case "/dashboard":
        title = "Your Learning Dashboard | Learn English";
        description = "Track your English learning progress and achievements.";
        break;
      case "/podcast":
        title = "English Podcasts | Learn by Listening";
        description = "Improve your English listening skills with our curated podcasts for all levels and topics.";
        break;
      case pathname.match(/^\/podcast\/\d+$/)?.input:
        title = "Podcast Episode | Learn English by Listening";
        description = "Listen to English podcasts with interactive transcripts and vocabulary explanations.";
        break;
      case "/stories":
        title = "English Short Stories | Learn with Reading";
        description = "Improve your English reading skills and vocabulary with our collection of short stories for all levels.";
        break;
      case pathname.match(/^\/stories\/\d+$/)?.input:
        title = "English Short Story | Learn by Reading";
        description = "Read interactive English short stories with vocabulary explanations and comprehension exercises.";
        break;
      default:
        break;
    }

    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
  }, [pathname]);

  return null;
};

// App content with access to auth context
const AppContent = () => {
  const { isLoggedIn } = useAuth();
  
  return (
    <>
      <ScrollToTop />
      <RouteChange />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/learning-path" element={<LearningPath />} />
        <Route path="/lessons/:id" element={<LessonDetail />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/grammar" element={<GrammarLessons />} />
        <Route path="/podcast" element={<Podcast />} />
        <Route path="/podcast/:id" element={<PodcastDetail />} />
        <Route path="/stories" element={<ShortStories />} />
        <Route path="/stories/:id" element={<StoryDetail />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <StickyStreak isLoggedIn={isLoggedIn} />
      <Toaster />
      <Sonner />
    </>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <StreakProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </StreakProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
