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
    <div className="space-y-6">
      {/* Header with Export Options */}
      <Card className="glass-card p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Attendance Reports</h2>
              <p className="text-sm text-muted-foreground">Track employee check-ins and tasks</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              className="hover-glow"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            
            <Button 
              onClick={() => handleExport('pdf')}
              variant="outline" 
              size="sm"
              className="hover-glow"
            >
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
            
            <Button 
              onClick={() => handleExport('excel')}
              className="btn-premium"
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Excel
            </Button>
          </div>
        </div>
      </Card>

      {/* View Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView}>
        <TabsList className="bg-secondary/50 p-1 rounded-xl">
          <TabsTrigger 
            value="daily"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Daily
          </TabsTrigger>
          <TabsTrigger 
            value="weekly"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Weekly
          </TabsTrigger>
          <TabsTrigger 
            value="monthly"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Monthly
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Today's Attendance</h3>
            
            <div className="space-y-4">
              {mockAttendance.map((record) => (
                <div
                  key={record.id}
                  className="flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 space-y-3 lg:space-y-0"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-foreground">{record.employeeName}</h4>
                      <Badge 
                        variant={record.status === 'completed' ? 'default' : 'secondary'}
                        className={record.status === 'completed' ? 'bg-success/20 text-success border-success/30' : 'bg-warning/20 text-warning border-warning/30'}
                      >
                        {record.status === 'completed' ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {record.status === 'completed' ? 'Completed' : 'In Progress'}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{record.task}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
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
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Summary</h3>
            <p className="text-muted-foreground">Weekly attendance reports will be displayed here.</p>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Overview</h3>
            <p className="text-muted-foreground">Monthly attendance analytics will be displayed here.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};