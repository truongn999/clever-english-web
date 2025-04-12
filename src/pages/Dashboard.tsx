import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LearningOverview from '@/components/dashboard/LearningOverview';
import { Helmet } from 'react-helmet';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      <Helmet>
        <title>Your Learning Dashboard | EnglishMaster</title>
        <meta name="description" content="Track your English learning progress, view your learning streak, achievements, and set learning goals." />
        <meta name="keywords" content="english learning, dashboard, progress tracking, learning goals, language achievements" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          {/* Header */}
          <section className="bg-english-blue text-white py-8 px-4">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">Your Learning Dashboard</h1>
              <p className="text-lg opacity-90">Track your progress and achieve your language goals</p>
            </div>
          </section>
          
          {/* Dashboard Content */}
          <section className="py-8 px-4">
            <div className="max-w-7xl mx-auto">
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
                  <TabsTrigger value="grammar">Grammar</TabsTrigger>
                  <TabsTrigger value="speaking">Speaking</TabsTrigger>
                  <TabsTrigger value="community">Community</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-8">
                  <LearningOverview />
                </TabsContent>
                
                <TabsContent value="vocabulary">
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-500">Vocabulary section coming soon</h3>
                  </div>
                </TabsContent>
                
                <TabsContent value="grammar">
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-500">Grammar section coming soon</h3>
                  </div>
                </TabsContent>
                
                <TabsContent value="speaking">
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-500">Speaking section coming soon</h3>
                  </div>
                </TabsContent>
                
                <TabsContent value="community">
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-500">Community section coming soon</h3>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings">
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-500">Settings section coming soon</h3>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;