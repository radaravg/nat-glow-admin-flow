import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Download, Filter, Clock, CheckCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock attendance data
const mockAttendance = [
  {
    id: 1,
    employeeName: 'Sarah Johnson',
    date: '2024-07-08',
    checkIn: '09:15 AM',
    checkOut: '06:30 PM',
    task: 'Frontend development - User dashboard components',
    status: 'completed',
  },
  {
    id: 2,
    employeeName: 'Michael Chen',
    date: '2024-07-08',
    checkIn: '08:45 AM',
    checkOut: '05:45 PM',
    task: 'Sprint planning and team coordination',
    status: 'completed',
  },
  {
    id: 3,
    employeeName: 'Emily Rodriguez',
    date: '2024-07-08',
    checkIn: '09:30 AM',
    checkOut: 'In Progress',
    task: 'UX research and wireframe creation',
    status: 'in-progress',
  },
  {
    id: 4,
    employeeName: 'David Kim',
    date: '2024-07-08',
    checkIn: '08:30 AM',
    checkOut: '06:00 PM',
    task: 'Server deployment and monitoring setup',
    status: 'completed',
  },
];

export const CalendarView = () => {
  const [activeView, setActiveView] = useState('daily');

  const handleExport = (format: 'pdf' | 'excel') => {
    // Simulate haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    // In real app, this would generate and download the file
    console.log(`Exporting attendance report as ${format.toUpperCase()}`);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with Export Options */}
      <div className="px-4 py-3 border-b border-border/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Attendance</h2>
              <p className="text-xs text-muted-foreground">Check-ins & tasks</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            size="sm"
            className="hover-glow rounded-xl"
          >
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button 
              onClick={() => handleExport('pdf')}
              variant="outline" 
              size="sm"
              className="hover-glow rounded-xl"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline ml-1">PDF</span>
            </Button>
            
            <Button 
              onClick={() => handleExport('excel')}
              className="btn-premium rounded-xl"
              size="sm"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline ml-1">Excel</span>
            </Button>
          </div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="px-4 py-2">
        <Tabs value={activeView} onValueChange={setActiveView} className="flex-1 flex flex-col">
          <TabsList className="bg-secondary/50 p-1 rounded-2xl">
            <TabsTrigger 
              value="daily"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl"
            >
              Daily
            </TabsTrigger>
            <TabsTrigger 
              value="weekly"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl"
            >
              Weekly
            </TabsTrigger>
            <TabsTrigger 
              value="monthly"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl"
            >
              Monthly
            </TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="flex-1 m-0 pt-4 overflow-auto">
            <div className="space-y-3">
              {mockAttendance.map((record) => (
                <Card
                  key={record.id}
                  className="glass-card p-4 hover-glow"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground">{record.employeeName}</h4>
                      <Badge 
                        variant={record.status === 'completed' ? 'default' : 'secondary'}
                        className={`text-xs ${record.status === 'completed' ? 'bg-success/20 text-success border-success/30' : 'bg-warning/20 text-warning border-warning/30'}`}
                      >
                        {record.status === 'completed' ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {record.status === 'completed' ? 'Done' : 'Active'}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">{record.task}</p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>In: {record.checkIn}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Out: {record.checkOut}</span>
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="flex-1 m-0 pt-4 overflow-auto">
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Summary</h3>
              <p className="text-muted-foreground">Weekly attendance reports will be displayed here.</p>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="flex-1 m-0 pt-4 overflow-auto">
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Overview</h3>
              <p className="text-muted-foreground">Monthly attendance analytics will be displayed here.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};