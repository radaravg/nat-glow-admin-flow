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
    <div className="min-h-screen bg-background flex flex-col">
      <Header onLogout={onLogout} />
      
      <div className="flex-1 animate-fade-in">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="h-full flex flex-col">
          <div className="px-4 py-3 border-b border-border/50">
            <TabsList className="grid w-full grid-cols-4 bg-secondary/50 p-1 rounded-2xl h-12">
              <TabsTrigger 
                value="dashboard" 
                className="flex flex-col items-center justify-center gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-xl h-10"
              >
                <Users className="w-5 h-5" />
                <span className="text-xs">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger 
                value="calendar"
                className="flex flex-col items-center justify-center gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-xl h-10"
              >
                <Calendar className="w-5 h-5" />
                <span className="text-xs">Calendar</span>
              </TabsTrigger>
              <TabsTrigger 
                value="requests"
                className="flex flex-col items-center justify-center gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-xl h-10"
              >
                <RotateCcw className="w-5 h-5" />
                <span className="text-xs">Requests</span>
              </TabsTrigger>
              <TabsTrigger 
                value="notes"
                className="flex flex-col items-center justify-center gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-xl h-10"
              >
                <FileText className="w-5 h-5" />
                <span className="text-xs">Notes</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 animate-slide-up overflow-auto">
            <TabsContent value="dashboard" className="h-full m-0 p-0">
              <EmployeeDashboard />
            </TabsContent>

            <TabsContent value="calendar" className="h-full m-0 p-0">
              <CalendarView />
            </TabsContent>

            <TabsContent value="requests" className="h-full m-0 p-0">
              <ResetRequests />
            </TabsContent>

            <TabsContent value="notes" className="h-full m-0 p-0">
              <NotesSection />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};