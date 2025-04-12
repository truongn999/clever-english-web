import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Trophy, Medal, Award, Search, Users, ArrowUpDown, Crown, Star, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Định nghĩa các loại rank
type RankType = 'beginner' | 'intermediate' | 'advanced' | 'master';

// Interface cho dữ liệu người dùng trong bảng xếp hạng
interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  points: number;
  rank: RankType;
  streak: number;
  country: string;
  position?: number;
  isCurrentUser?: boolean;
}

// Dữ liệu mẫu cho bảng xếp hạng
const mockLeaderboardData: Record<RankType, LeaderboardUser[]> = {
  beginner: Array.from({ length: 20 }, (_, i) => ({
    id: `b-${i + 1}`,
    name: `Learner ${i + 1}`,
    avatar: i % 3 === 0 ? `/avatars/avatar-${(i % 10) + 1}.png` : undefined,
    points: Math.floor(1000 - i * 40 + Math.random() * 30),
    rank: 'beginner',
    streak: Math.floor(Math.random() * 30) + 1,
    country: ['Vietnam', 'Japan', 'Korea', 'China', 'Thailand'][Math.floor(Math.random() * 5)],
  })),
  intermediate: Array.from({ length: 20 }, (_, i) => ({
    id: `i-${i + 1}`,
    name: `Improver ${i + 1}`,
    avatar: i % 4 === 0 ? `/avatars/avatar-${(i % 10) + 1}.png` : undefined,
    points: Math.floor(2000 - i * 50 + Math.random() * 40),
    rank: 'intermediate',
    streak: Math.floor(Math.random() * 60) + 10,
    country: ['Vietnam', 'Japan', 'Korea', 'China', 'Thailand'][Math.floor(Math.random() * 5)],
  })),
  advanced: Array.from({ length: 20 }, (_, i) => ({
    id: `a-${i + 1}`,
    name: `Advanced ${i + 1}`,
    avatar: i % 2 === 0 ? `/avatars/avatar-${(i % 10) + 1}.png` : undefined,
    points: Math.floor(3000 - i * 60 + Math.random() * 50),
    rank: 'advanced',
    streak: Math.floor(Math.random() * 90) + 30,
    country: ['Vietnam', 'Japan', 'Korea', 'China', 'Thailand'][Math.floor(Math.random() * 5)],
  })),
  master: Array.from({ length: 20 }, (_, i) => ({
    id: `m-${i + 1}`,
    name: `Master ${i + 1}`,
    avatar: i % 2 === 0 ? `/avatars/avatar-${(i % 10) + 1}.png` : undefined,
    points: Math.floor(4000 - i * 70 + Math.random() * 60),
    rank: 'master',
    streak: Math.floor(Math.random() * 120) + 60,
    country: ['Vietnam', 'Japan', 'Korea', 'China', 'Thailand'][Math.floor(Math.random() * 5)],
  })),
};

// Hàm lấy màu cho từng loại rank
const getRankColor = (rank: RankType): string => {
  switch (rank) {
    case 'beginner':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'intermediate':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'advanced':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'master':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Hàm lấy icon cho từng loại rank
const getRankIcon = (rank: RankType) => {
  switch (rank) {
    case 'beginner':
      return <Shield className="h-4 w-4" />;
    case 'intermediate':
      return <Star className="h-4 w-4" />;
    case 'advanced':
      return <Award className="h-4 w-4" />;
    case 'master':
      return <Crown className="h-4 w-4" />;
    default:
      return null;
  }
};

// Component hiển thị thông tin người dùng trong bảng xếp hạng
const LeaderboardUserCard: React.FC<{ user: LeaderboardUser; position: number }> = ({ user, position }) => {
  // Xác định icon cho top 3
  const getPositionIcon = (pos: number) => {
    switch (pos) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-700" />;
      default:
        return <span className="text-gray-500 font-medium">{pos}</span>;
    }
  };

  return (
    <Card className={`mb-2 overflow-hidden transition-all ${user.isCurrentUser ? 'border-english-blue bg-blue-50' : ''}`}>
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 flex justify-center">
            {getPositionIcon(position)}
          </div>
          
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium truncate">{user.name}</span>
              {user.isCurrentUser && (
                <Badge variant="outline" className="text-xs">You</Badge>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-500 gap-2">
              <span className="flex items-center">
                <img 
                  src={`/flags/${user.country.toLowerCase().replace(' ', '-')}.svg`} 
                  alt={user.country}
                  className="h-3 w-4 mr-1"
                />
                {user.country}
              </span>
              <span className="flex items-center">
                <span className="inline-block h-2 w-2 rounded-full bg-orange-500 mr-1"></span>
                {user.streak} day streak
              </span>
            </div>
          </div>
          
          <div className="flex-shrink-0 text-right">
            <div className="font-bold text-english-blue">{user.points.toLocaleString()}</div>
            <Badge className={`text-xs ${getRankColor(user.rank)}`}>
              <span className="flex items-center gap-1">
                {getRankIcon(user.rank)}
                {user.rank.charAt(0).toUpperCase() + user.rank.slice(1)}
              </span>
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Leaderboard: React.FC = () => {
  const [activeRank, setActiveRank] = useState<RankType>('beginner');
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFrame, setTimeFrame] = useState('weekly');
  const { user } = useAuth();

  // Tải dữ liệu bảng xếp hạng
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setLoading(true);
      try {
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Lấy dữ liệu từ mock data
        let data = [...mockLeaderboardData[activeRank]];
        
        // Sắp xếp theo điểm số
        data.sort((a, b) => b.points - a.points);
        
        // Thêm vị trí
        data = data.map((user, index) => ({
          ...user,
          position: index + 1,
          // Giả định người dùng hiện tại là người có ID b-5, i-3, a-2, hoặc m-1 tùy theo rank
          isCurrentUser: user.id === `${activeRank.charAt(0)}-${activeRank === 'beginner' ? 5 : activeRank === 'intermediate' ? 3 : activeRank === 'advanced' ? 2 : 1}`
        }));
        
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [activeRank, timeFrame]);

  // Lọc dữ liệu theo tìm kiếm
  const filteredData = searchQuery
    ? leaderboardData.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.country.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : leaderboardData;

  // Tìm vị trí của người dùng hiện tại
  const currentUserPosition = leaderboardData.findIndex(user => user.isCurrentUser);

  return (
    <>
      <Helmet>
        <title>Leaderboard | Top English Learners</title>
        <meta name="description" content="See the top English learners and compete to reach the top of our leaderboard. Track your progress and compare with other learners." />
        <meta property="og:title" content="Leaderboard | Top English Learners" />
        <meta property="og:description" content="See the top English learners and compete to reach the top of our leaderboard." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          {/* Hero section */}
          <section className="bg-english-blue text-white py-8 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Leaderboard</h1>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                See how you rank among other English learners and compete to reach the top!
              </p>
            </div>
          </section>
          
          {/* Main content */}
          <section className="py-8 px-4">
            <div className="max-w-4xl mx-auto">
              {/* Filters */}
              <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex-grow max-w-md relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by name or country..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2 items-center">
                  <Select value={timeFrame} onValueChange={setTimeFrame}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Time Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="alltime">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Rank tabs */}
              <Tabs defaultValue="beginner" value={activeRank} onValueChange={(value) => setActiveRank(value as RankType)} className="w-full">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="beginner" className="flex items-center gap-1">
                    <Shield className="h-4 w-4 hidden sm:inline" />
                    <span>Beginner</span>
                  </TabsTrigger>
                  <TabsTrigger value="intermediate" className="flex items-center gap-1">
                    <Star className="h-4 w-4 hidden sm:inline" />
                    <span>Intermediate</span>
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="flex items-center gap-1">
                    <Award className="h-4 w-4 hidden sm:inline" />
                    <span>Advanced</span>
                  </TabsTrigger>
                  <TabsTrigger value="master" className="flex items-center gap-1">
                    <Crown className="h-4 w-4 hidden sm:inline" />
                    <span>Master</span>
                  </TabsTrigger>
                </TabsList>
                
                {/* Leaderboard content */}
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-gray-500" />
                      <h2 className="text-xl font-bold">Top Learners</h2>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      Points
                    </Button>
                  </div>
                  
                  {/* Leaderboard list */}
                  {loading ? (
                    // Loading skeletons
                    Array.from({ length: 5 }).map((_, i) => (
                      <Card key={i} className="mb-2 overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="flex-grow">
                              <Skeleton className="h-5 w-32 mb-2" />
                              <Skeleton className="h-4 w-24" />
                            </div>
                            <div className="text-right">
                              <Skeleton className="h-6 w-16 mb-1" />
                              <Skeleton className="h-5 w-20" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : filteredData.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500 mb-4">No users found matching your search.</p>
                      <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
                    </div>
                  ) : (
                    <>
                      {/* Top 3 podium for larger screens */}
                      <div className="hidden md:flex justify-center items-end gap-4 mb-8">
                        {filteredData.slice(0, 3).map((user, index) => {
                          const position = index + 1;
                          const height = position === 1 ? 'h-32' : position === 2 ? 'h-24' : 'h-20';
                          
                          return (
                            <div key={user.id} className="flex flex-col items-center">
                              <Avatar className="h-16 w-16 mb-2 border-2 border-white shadow-lg">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div className="text-center mb-2">
                                <div className="font-bold">{user.name}</div>
                                <div className="text-english-blue font-bold">{user.points.toLocaleString()}</div>
                              </div>
                              <div className={`${height} w-20 rounded-t-lg flex items-center justify-center ${
                                position === 1 ? 'bg-yellow-500' : position === 2 ? 'bg-gray-300' : 'bg-amber-700'
                              }`}>
                                <span className="text-white text-2xl font-bold">{position}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Leaderboard list */}
                      <div className="space-y-2">
                        {filteredData.map((user) => (
                          <LeaderboardUserCard 
                            key={user.id} 
                            user={user} 
                            position={user.position || 0} 
                          />
                        ))}
                      </div>
                      
                      {/* Current user position if not in view */}
                      {currentUserPosition >= 0 && currentUserPosition > 10 && (
                        <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
                          <div className="text-center text-sm text-gray-500 mb-2">Your Position</div>
                          <LeaderboardUserCard 
                            user={leaderboardData[currentUserPosition]} 
                            position={currentUserPosition + 1} 
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </Tabs>
            </div>
          </section>
          
          {/* How to improve rank section */}
          <section className="bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">How to Improve Your Rank</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="bg-green-100 text-green-800 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trophy className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold mb-2">Complete Lessons</h3>
                    <p className="text-gray-600 text-sm">
                      Finish lessons to earn points. The more lessons you complete, the higher your score.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="bg-blue-100 text-blue-800 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold mb-2">Daily Streak</h3>
                    <p className="text-gray-600 text-sm">
                      Maintain your daily learning streak to earn bonus points and climb the leaderboard faster.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="bg-purple-100 text-purple-800 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold mb-2">Perfect Scores</h3>
                    <p className="text-gray-600 text-sm">
                      Aim for perfect scores in quizzes and exercises to maximize your points and rank up.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Leaderboard;