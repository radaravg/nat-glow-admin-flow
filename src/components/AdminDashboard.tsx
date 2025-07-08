import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmployeeDashboard } from './dashboard/EmployeeDashboard';
import { CalendarView } from './dashboard/CalendarView';
import { ResetRequests } from './dashboard/ResetRequests';
import { NotesSection } from './dashboard/NotesSection';
import { Header } from './dashboard/Header';
import { Users, Calendar, RotateCcw, FileText } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (value: string) => {
    // Simulate haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onLogout={onLogout} />
      
      <div className="container mx-auto p-6 animate-fade-in">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-secondary/50 p-1 rounded-xl">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-lg"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="calendar"
              className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-lg"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Calendar</span>
            </TabsTrigger>
            <TabsTrigger 
              value="requests"
              className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-lg"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Requests</span>
            </TabsTrigger>
            <TabsTrigger 
              value="notes"
              className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-lg"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Notes</span>
            </TabsTrigger>
          </TabsList>

          <div className="animate-slide-up">
            <TabsContent value="dashboard" className="space-y-6">
              <EmployeeDashboard />
            </TabsContent>

            <TabsContent value="calendar" className="space-y-6">
              <CalendarView />
            </TabsContent>

            <TabsContent value="requests" className="space-y-6">
              <ResetRequests />
            </TabsContent>

            <TabsContent value="notes" className="space-y-6">
              <NotesSection />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};