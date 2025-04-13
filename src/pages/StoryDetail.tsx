import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { storiesData, VocabularyItem } from "@/data/stories";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  Clock,
  Calendar,
  ArrowLeft,
  BookMarked,
  CheckCircle2,
  XCircle,
  Volume2,
  Bookmark,
  Share2,
  ThumbsUp,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";

const StoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [story, setStory] = useState(
    storiesData.find((s) => s.id === id) || null
  );
  const [activeTab, setActiveTab] = useState("story");
  const [highlightedWords, setHighlightedWords] = useState<string[]>([]);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Speech synthesis
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = window.speechSynthesis;

  useEffect(() => {
    // If story not found, redirect to stories page
    if (!story) {
      navigate("/stories");
      return;
    }

    // Initialize user answers array with -1 (not answered)
    if (story.comprehensionQuestions) {
      setUserAnswers(new Array(story.comprehensionQuestions.length).fill(-1));
    }

    // Extract all vocabulary words for highlighting
    if (story.vocabulary) {
      setHighlightedWords(story.vocabulary.map((item) => item.word.toLowerCase()));
    }

    // Clean up speech synthesis on unmount
    return () => {
      if (synth.speaking) {
        synth.cancel();
      }
    };
  }, [story, navigate, synth]);

  // Handle text-to-speech
  const speakText = () => {
    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    if (story) {
      // Extract plain text from HTML content
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = story.content;
      const textContent = tempDiv.textContent || "";

      const utterance = new SpeechSynthesisUtterance(textContent);
      utterance.lang = "en-US";
      utterance.rate = 0.9; // Slightly slower for better comprehension

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      setIsSpeaking(true);
      synth.speak(utterance);
    }
  };

  // Handle answer selection
  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (showResults) return; // Prevent changing answers after submission

    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  // Submit quiz answers
  const handleSubmitQuiz = () => {
    if (!story || !story.comprehensionQuestions) return;

    // Check if all questions are answered
    if (userAnswers.includes(-1)) {
      toast({
        title: "Please answer all questions",
        description: "You need to answer all questions before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Calculate score
    let correctCount = 0;
    story.comprehensionQuestions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    const finalScore = Math.round(
      (correctCount / story.comprehensionQuestions.length) * 100
    );
    setScore(finalScore);
    setShowResults(true);

    // Show toast with score
    toast({
      title: `Quiz completed! Score: ${finalScore}%`,
      description: `You got ${correctCount} out of ${story.comprehensionQuestions.length} questions correct.`,
      variant: finalScore >= 70 ? "default" : "destructive",
    });

    // Scroll to top of quiz results
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Reset quiz
  const handleResetQuiz = () => {
    setUserAnswers(
      new Array(story?.comprehensionQuestions?.length || 0).fill(-1)
    );
    setShowResults(false);
    setScore(0);
  };

  // Handle bookmark
  const handleBookmark = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "Please log in to bookmark stories.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Story bookmarked",
      description: "This story has been added to your bookmarks.",
    });
  };

  // Handle share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: story?.title || "English Short Story",
          text: story?.description || "Read this interesting English short story",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Story link copied to clipboard",
      });
    }
  };

  // Process story content to highlight vocabulary words
  const processContent = (content: string) => {
    if (!content || highlightedWords.length === 0) return content;

    let processedContent = content;
    highlightedWords.forEach((word) => {
      // Create a regex that matches the word with word boundaries
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      
      // Replace with a span that has data attributes for the tooltip
      const vocabItem = story?.vocabulary.find(
        (item) => item.word.toLowerCase() === word.toLowerCase()
      );
      
      if (vocabItem) {
        processedContent = processedContent.replace(
          regex,
          `<span class="vocabulary-word" 
            data-word="${vocabItem.word}"
            data-definition="${vocabItem.definition.replace(/"/g, '&quot;')}"
            data-example="${vocabItem.example.replace(/"/g, '&quot;')}"
            data-synonyms="${vocabItem.synonyms.join(', ')}"
          >$&</span>`
        );
      }
    });

    return processedContent;
  };

  // Add event listeners for tooltips after content is rendered
  useEffect(() => {
    if (activeTab === "story") {
      const vocabWords = document.querySelectorAll('.vocabulary-word');
      
      // Create tooltip element
      let tooltip = document.getElementById('vocab-tooltip');
      if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'vocab-tooltip';
        tooltip.className = 'vocab-tooltip';
        document.body.appendChild(tooltip);
      }
      
      // Add event listeners to each vocabulary word
      vocabWords.forEach(word => {
        word.addEventListener('mouseenter', (e) => {
          const target = e.target as HTMLElement;
          const rect = target.getBoundingClientRect();
          
          // Get data from attributes
          const vocabWord = target.getAttribute('data-word') || '';
          const definition = target.getAttribute('data-definition') || '';
          const example = target.getAttribute('data-example') || '';
          const synonyms = target.getAttribute('data-synonyms') || '';
          
          // Set tooltip content
          tooltip!.innerHTML = `
            <p class="font-bold">${vocabWord}</p>
            <p class="text-sm mb-1">${definition}</p>
            <p class="text-xs italic mb-1">"${example}"</p>
            ${synonyms ? `<p class="text-xs"><span class="font-semibold">Synonyms:</span> ${synonyms}</p>` : ''}
          `;
          
          // Position tooltip
          tooltip!.style.display = 'block';
          tooltip!.style.top = `${window.scrollY + rect.top - tooltip!.offsetHeight - 10}px`;
          tooltip!.style.left = `${rect.left + (rect.width / 2) - (tooltip!.offsetWidth / 2)}px`;
        });
        
        word.addEventListener('mouseleave', () => {
          tooltip!.style.display = 'none';
        });
      });
      
      // Clean up event listeners
      return () => {
        vocabWords.forEach(word => {
          word.replaceWith(word.cloneNode(true));
        });
      };
    }
  }, [activeTab, story?.content]);

  // Get level badge color
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!story) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <Helmet>
        <title>{`${story.title} | English Short Story`}</title>
        <meta name="description" content={story.description} />
        <meta
          name="keywords"
          content={`English short story, ${story.level} English, ${story.category}, reading practice, vocabulary learning`}
        />
      </Helmet>
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/stories")}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Stories
          </Button>
        </div>

        {/* Story header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="secondary" className={getLevelColor(story.level)}>
              {story.level}
            </Badge>
            <Badge variant="outline">{story.category}</Badge>
            <div className="flex items-center text-sm text-gray-500 ml-auto">
              <Clock className="h-3 w-3 mr-1" />
              {story.readingTime}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              {story.date}
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-3">{story.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {story.description}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={speakText}
              className="flex items-center"
            >
              <Volume2 className="h-4 w-4 mr-2" />
              {isSpeaking ? "Stop" : "Listen"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleBookmark}
              className="flex items-center"
            >
              <Bookmark className="h-4 w-4 mr-2" />
              Bookmark
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center ml-auto"
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              Helpful
            </Button>
          </div>
        </div>

        {/* Featured image */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-sm">
          <img
            src={story.thumbnail}
            alt={story.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue="story"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-8"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="story" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Story
            </TabsTrigger>
            <TabsTrigger value="vocabulary" className="flex items-center">
              <BookMarked className="h-4 w-4 mr-2" />
              Vocabulary
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Quiz
            </TabsTrigger>
          </TabsList>

          {/* Story content */}
          <TabsContent value="story" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div
                  className="prose dark:prose-invert max-w-none story-content"
                  dangerouslySetInnerHTML={{
                    __html: processContent(story.content),
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vocabulary list */}
          <TabsContent value="vocabulary" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Vocabulary Words</CardTitle>
                <CardDescription>
                  Learn and practice these key vocabulary words from the story.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {story.vocabulary.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">{item.word}</CardTitle>
                            <Badge variant="outline">{item.level}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-2 font-medium">Definition:</p>
                          <p className="mb-3 text-gray-700 dark:text-gray-300">
                            {item.definition}
                          </p>
                          <p className="mb-2 font-medium">Example:</p>
                          <p className="mb-3 text-gray-700 dark:text-gray-300 italic">
                            "{item.example}"
                          </p>
                          <p className="mb-2 font-medium">Synonyms:</p>
                          <div className="flex flex-wrap gap-2">
                            {item.synonyms.map((synonym, i) => (
                              <Badge key={i} variant="secondary">
                                {synonym}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Comprehension quiz */}
          <TabsContent value="quiz" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Comprehension Quiz</CardTitle>
                <CardDescription>
                  Test your understanding of the story by answering these questions.
                </CardDescription>
              </CardHeader>
              <CardContent ref={contentRef}>
                {showResults && (
                  <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Your Results</h3>
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span>Score: {score}%</span>
                        <span>
                          {score >= 70 ? "Passed! 🎉" : "Keep practicing! 💪"}
                        </span>
                      </div>
                      <Progress value={score} className="h-2" />
                    </div>
                    <Button onClick={handleResetQuiz} className="w-full sm:w-auto">
                      Try Again
                    </Button>
                  </div>
                )}

                <div className="space-y-6">
                  {story.comprehensionQuestions.map((question, qIndex) => (
                    <div key={qIndex} className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-3">
                        {qIndex + 1}. {question.question}
                      </h3>
                      <div className="space-y-2">
                        {question.options.map((option, oIndex) => (
                          <div
                            key={oIndex}
                            className={`p-3 rounded-md cursor-pointer border transition-colors ${
                              userAnswers[qIndex] === oIndex
                                ? "border-primary bg-primary/5"
                                : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                            } ${
                              showResults
                                ? oIndex === question.correctAnswer
                                  ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900"
                                  : userAnswers[qIndex] === oIndex
                                  ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900"
                                  : ""
                                : ""
                            }`}
                            onClick={() => handleAnswerSelect(qIndex, oIndex)}
                          >
                            <div className="flex items-start">
                              <div className="flex-shrink-0 mr-3">
                                {showResults ? (
                                  oIndex === question.correctAnswer ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                  ) : userAnswers[qIndex] === oIndex ? (
                                    <XCircle className="h-5 w-5 text-red-500" />
                                  ) : (
                                    <div className="h-5 w-5 rounded-full border border-gray-300 dark:border-gray-600" />
                                  )
                                ) : (
                                  <div
                                    className={`h-5 w-5 rounded-full border ${
                                      userAnswers[qIndex] === oIndex
                                        ? "border-primary bg-primary"
                                        : "border-gray-300 dark:border-gray-600"
                                    }`}
                                  />
                                )}
                              </div>
                              <div>{option}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {showResults && (
                        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                          <p className="font-medium">Explanation:</p>
                          <p className="text-gray-700 dark:text-gray-300">
                            {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {!showResults && (
                  <div className="mt-8">
                    <Button onClick={handleSubmitQuiz} className="w-full sm:w-auto">
                      Submit Answers
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related stories */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {storiesData
              .filter((s) => s.id !== story.id && s.level === story.level)
              .slice(0, 3)
              .map((relatedStory) => (
                <motion.div
                  key={relatedStory.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link to={`/stories/${relatedStory.id}`}>
                    <Card className="h-full hover:shadow-md transition-shadow duration-300">
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={relatedStory.thumbnail}
                          alt={relatedStory.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge
                            variant="secondary"
                            className={getLevelColor(relatedStory.level)}
                          >
                            {relatedStory.level}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {relatedStory.readingTime}
                          </div>
                        </div>
                        <CardTitle className="text-lg mt-2 line-clamp-1">
                          {relatedStory.title}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      {/* CSS for vocabulary highlighting and tooltip */}
      <style>{`
        .story-content .vocabulary-word {
          position: relative;
          background-color: rgba(59, 130, 246, 0.1);
          border-bottom: 1px dashed #3b82f6;
          cursor: help;
          padding: 0 2px;
          border-radius: 2px;
          transition: background-color 0.2s;
        }
        
        .story-content .vocabulary-word:hover {
          background-color: rgba(59, 130, 246, 0.2);
        }
        
        .dark .story-content .vocabulary-word {
          background-color: rgba(96, 165, 250, 0.15);
          border-bottom: 1px dashed #60a5fa;
        }
        
        .dark .story-content .vocabulary-word:hover {
          background-color: rgba(96, 165, 250, 0.25);
        }
        
        /* Add proper spacing for paragraphs in story content */
        .story-content p {
          margin-bottom: 1.5em;
          line-height: 1.8;
        }
        
        /* Make sure images are responsive */
        .story-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.375rem;
        }
        
        /* Custom tooltip styles */
        .vocab-tooltip {
          position: absolute;
          display: none;
          background-color: white;
          color: #333;
          padding: 10px;
          border-radius: 6px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          max-width: 300px;
          pointer-events: none;
        }
        
        .dark .vocab-tooltip {
          background-color: #1f2937;
          color: #e5e7eb;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
        }
        
        /* Modal styles */
        .vocab-modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1001;
          justify-content: center;
          align-items: center;
          padding: 1rem;
        }
        
        .vocab-modal-content {
          background-color: white;
          border-radius: 8px;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          overflow: hidden;
        }
        
        .dark .vocab-modal-content {
          background-color: #1f2937;
          color: #e5e7eb;
        }
        
        .vocab-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .dark .vocab-modal-header {
          border-bottom: 1px solid #374151;
        }
        
        .vocab-word-title {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0;
        }
        
        .vocab-modal-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6b7280;
        }
        
        .vocab-modal-close:hover {
          color: #ef4444;
        }
        
        .vocab-modal-body {
          padding: 1rem;
        }
        
        .vocab-definition {
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }
        
        .vocab-example {
          margin-bottom: 0.75rem;
          font-style: italic;
          font-size: 0.875rem;
          color: #6b7280;
        }
        
        .dark .vocab-example {
          color: #9ca3af;
        }
        
        .vocab-synonyms {
          font-size: 0.875rem;
          color: #6b7280;
        }
        
        .dark .vocab-synonyms {
          color: #9ca3af;
        }
      `}</style>

      {/* Remove the old tooltip implementation */}
      <TooltipProvider>
        {story.vocabulary.map((item) => (
          <Tooltip key={item.word}>
            <TooltipContent side="top" className="max-w-xs p-4">
              <div>
                <p className="font-bold">{item.word}</p>
                <p className="text-sm mb-1">{item.definition}</p>
                <p className="text-xs italic mb-1">"{item.example}"</p>
                {item.synonyms.length > 0 && (
                  <p className="text-xs">
                    <span className="font-semibold">Synonyms:</span>{" "}
                    {item.synonyms.join(", ")}
                  </p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </>
  );
};

export default StoryDetail;