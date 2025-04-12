import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Flame, Trophy, Target, Calendar as CalendarIcon, BarChart as ChartIcon, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data - would be replaced with actual API calls
const dailyData = [
  { day: 'Mon', minutes: 25 },
  { day: 'Tue', minutes: 40 },
  { day: 'Wed', minutes: 30 },
  { day: 'Thu', minutes: 45 },
  { day: 'Fri', minutes: 20 },
  { day: 'Sat', minutes: 60 },
  { day: 'Sun', minutes: 35 },
];

const weeklyData = [
  { week: 'Week 1', minutes: 180 },
  { week: 'Week 2', minutes: 240 },
  { week: 'Week 3', minutes: 200 },
  { week: 'Week 4', minutes: 280 },
];

const monthlyData = [
  { month: 'Jan', minutes: 720 },
  { month: 'Feb', minutes: 840 },
  { month: 'Mar', minutes: 960 },
  { month: 'Apr', minutes: 1020 },
  { month: 'May', minutes: 880 },
  { month: 'Jun', minutes: 1100 },
];

const achievements = [
  { id: 1, title: 'First Lesson', description: 'Completed your first lesson', icon: '🎓', date: '2023-05-10' },
  { id: 2, title: '7-Day Streak', description: 'Studied for 7 days in a row', icon: '🔥', date: '2023-05-17' },
  { id: 3, title: 'Vocabulary Master', description: 'Learned 100 new words', icon: '📚', date: '2023-05-25' },
  { id: 4, title: 'Grammar Expert', description: 'Completed all beginner grammar lessons', icon: '✏️', date: '2023-06-05' },
];

const goals = [
  { id: 1, title: 'Daily Study', target: 30, current: 25, unit: 'minutes', deadline: 'Today' },
  { id: 2, title: 'Weekly Vocabulary', target: 50, current: 32, unit: 'words', deadline: 'This week' },
  { id: 3, title: 'Grammar Lessons', target: 10, current: 4, unit: 'lessons', deadline: 'This month' },
  { id: 4, title: 'Speaking Practice', target: 5, current: 2, unit: 'sessions', deadline: 'This week' },
];

const LearningOverview: React.FC = () => {
  const [timeRange, setTimeRange] = useState('daily');
  const isMobile = useIsMobile();
  
  // Get chart data based on selected time range
  const getChartData = () => {
    switch (timeRange) {
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
      default:
        return dailyData;
    }
  };
  
  // Get x-axis data key based on selected time range
  const getXAxisDataKey = () => {
    switch (timeRange) {
      case 'weekly':
        return 'week';
      case 'monthly':
        return 'month';
      default:
        return 'day';
    }
  };
  
  // Calculate streak (would come from API in real app)
  const currentStreak = 12;
  const bestStreak = 21;
  
  // Calculate total study time
  const totalStudyTime = 42; // hours
  
  return (
    <div className="space-y-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Flame className="h-8 w-8 text-orange-500 mr-3" />
              <div>
                <div className="text-2xl font-bold">{currentStreak} days</div>
                <p className="text-xs text-muted-foreground">Best: {bestStreak} days</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Study Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <div className="text-2xl font-bold">{totalStudyTime} hours</div>
                <p className="text-xs text-muted-foreground">Since you started</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Trophy className="h-8 w-8 text-yellow-500 mr-3" />
              <div>
                <div className="text-2xl font-bold">{achievements.length}</div>
                <p className="text-xs text-muted-foreground">Badges earned</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Target className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <div className="text-2xl font-bold">{goals.length}</div>
                <p className="text-xs text-muted-foreground">In progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Learning Progress Chart */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Your study time over time</CardDescription>
            </div>
            <Tabs value={timeRange} onValueChange={setTimeRange} className="mt-2 sm:mt-0">
              <TabsList>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              {timeRange === 'monthly' ? (
                <LineChart data={getChartData()} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={getXAxisDataKey()} />
                  <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`${value} minutes`, 'Study Time']} />
                  <Line type="monotone" dataKey="minutes" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              ) : (
                <BarChart data={getChartData()} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={getXAxisDataKey()} />
                  <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`${value} minutes`, 'Study Time']} />
                  <Bar dataKey="minutes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Learning Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Goals</CardTitle>
          <CardDescription>Track your progress towards your goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{goal.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {goal.current} of {goal.target} {goal.unit} • Due {goal.deadline}
                    </p>
                  </div>
                  <span className="text-sm font-medium">
                    {Math.round((goal.current / goal.target) * 100)}%
                  </span>
                </div>
                <Progress value={(goal.current / goal.target) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Badges and milestones you've reached</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="border rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h4 className="font-medium">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                <Badge variant="outline" className="text-xs">
                  {new Date(achievement.date).toLocaleDateString()}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Study Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Study Calendar</CardTitle>
          <CardDescription>Your learning activity calendar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className={isMobile ? "w-full" : "w-auto"}>
            <Calendar
              mode="single"
              selected={new Date()}
              className="rounded-md border"
              // In a real app, you would highlight days with activity
              // This is just a placeholder
              modifiers={{
                highlight: [
                  new Date(2023, 4, 10),
                  new Date(2023, 4, 11),
                  new Date(2023, 4, 12),
                  new Date(2023, 4, 15),
                  new Date(2023, 4, 16),
                  new Date(2023, 4, 17),
                  new Date(2023, 4, 18),
                  new Date(2023, 4, 19),
                  new Date(2023, 4, 22),
                  new Date(2023, 4, 23),
                  new Date(2023, 4, 24),
                  new Date(2023, 4, 25),
                  new Date(2023, 4, 26),
                ]
              }}
              modifiersClassNames={{
                highlight: "bg-english-blue text-white",
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningOverview;