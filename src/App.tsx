
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Lessons from "./pages/Lessons";
import Vocabulary from "./pages/Vocabulary";
import Quiz from "./pages/Quiz";
import GrammarLessons from "./pages/GrammarLessons";
import NotFound from "./pages/NotFound";

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
        title = "English Quizzes | Test Your Knowledge";
        description = "Test your English knowledge with our interactive quizzes.";
        break;
      case "/grammar":
        title = "Grammar Lessons | Learn English";
        description = "Master English grammar with our comprehensive lessons.";
        break;
    }

    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }
    
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <RouteChange />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/grammar" element={<GrammarLessons />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
