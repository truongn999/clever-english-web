import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { storiesData, Story } from "@/data/stories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, Search, Filter } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const ShortStories = () => {
  const [stories, setStories] = useState<Story[]>(storiesData);
  const [filteredStories, setFilteredStories] = useState<Story[]>(storiesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("all");

  // Get unique categories from stories data
  const categories = Array.from(
    new Set(storiesData.map((story) => story.category))
  );

  // Filter stories based on search term, level, and category
  useEffect(() => {
    let result = stories;

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (story) =>
          story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          story.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by level
    if (selectedLevel !== "all") {
      result = result.filter((story) => story.level === selectedLevel);
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((story) => story.category === selectedCategory);
    }

    // Filter by tab
    if (activeTab === "featured") {
      result = result.filter((story) => story.featured);
    } else if (activeTab === "popular") {
      result = result.filter((story) => story.popular);
    }

    setFilteredStories(result);
  }, [searchTerm, selectedLevel, selectedCategory, activeTab, stories]);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLevel("all");
    setSelectedCategory("all");
    setActiveTab("all");
  };

  // Animation variants for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // Get level badge color
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Intermediate":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Advanced":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <>
      <Helmet>
        <title>English Short Stories | Learn with Reading</title>
        <meta
          name="description"
          content="Improve your English reading skills and vocabulary with our collection of short stories for all levels."
        />
        <meta
          name="keywords"
          content="English short stories, reading practice, vocabulary learning, ESL stories, English reading"
        />
      </Helmet>
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <PageHeader
          title="Short Stories"
          description="Improve your reading skills and vocabulary with our collection of short stories for all levels."
          icon={<BookOpen className="h-8 w-8 text-primary" />}
        />

        {/* Filters Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Select
                value={selectedLevel}
                onValueChange={setSelectedLevel}
              >
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={resetFilters}
                className="w-full sm:w-auto"
              >
                <Filter className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-8"
        >
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="all">All Stories</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Results Count */}
        <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredStories.length} of {storiesData.length} stories
        </div>

        {/* Stories Grid */}
        {filteredStories.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredStories.map((story) => (
              <motion.div key={story.id} variants={itemVariants}>
                <Link to={`/stories/${story.id}`}>
                  <Card className="h-full hover:shadow-md transition-shadow duration-300 overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={story.thumbnail}
                        alt={story.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        {story.featured && (
                          <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                            Featured
                          </Badge>
                        )}
                        {story.popular && (
                          <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-200">
                            Popular
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="secondary" className={getLevelColor(story.level)}>
                          {story.level}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {story.readingTime}
                        </div>
                      </div>
                      <CardTitle className="text-xl mt-2 line-clamp-2">
                        {story.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {story.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <Badge variant="outline">{story.category}</Badge>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="ghost" className="w-full justify-start p-0 hover:bg-transparent">
                        <span className="text-primary">Read story</span>
                        <span className="ml-2">→</span>
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <BookOpen className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium mb-2">No stories found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Try adjusting your filters or search term
            </p>
            <Button onClick={resetFilters}>Reset Filters</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ShortStories;