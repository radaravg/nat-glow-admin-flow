import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MoreVertical, Users, UserCheck, UserX } from 'lucide-react';

// Mock employee data - in real app this would come from Firebase/Supabase
const mockEmployees = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@nat.com',
    position: 'Software Engineer',
    status: 'active',
    lastSeen: '2 hours ago',
    profilePhoto: null,
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@nat.com', 
    position: 'Project Manager',
    status: 'active',
    lastSeen: '5 minutes ago',
    profilePhoto: null,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@nat.com',
    position: 'UX Designer',
    status: 'offline',
    lastSeen: '1 day ago',
    profilePhoto: null,
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david.kim@nat.com',
    position: 'DevOps Engineer', 
    status: 'active',
    lastSeen: '30 minutes ago',
    profilePhoto: null,
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    email: 'lisa.thompson@nat.com',
    position: 'Marketing Manager',
    status: 'offline',
    lastSeen: '3 hours ago',
    profilePhoto: null,
  },
];

export const EmployeeDashboard = () => {
  const activeEmployees = mockEmployees.filter(emp => emp.status === 'active').length;
  const totalEmployees = mockEmployees.length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card p-6 hover-glow">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalEmployees}</p>
              <p className="text-sm text-muted-foreground">Total Employees</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 hover-glow">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{activeEmployees}</p>
              <p className="text-sm text-muted-foreground">Active Now</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 hover-glow">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-warning/20 rounded-xl flex items-center justify-center">
              <UserX className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalEmployees - activeEmployees}</p>
              <p className="text-sm text-muted-foreground">Offline</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Employee List */}
      <Card className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Employee Directory</h2>
          <Badge variant="secondary" className="bg-secondary/50">
            {totalEmployees} employees
          </Badge>
        </div>

        <div className="space-y-4">
          {mockEmployees.map((employee) => (
            <div
              key={employee.id}
              className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover-glow"
            >
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12 ring-2 ring-border">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground font-medium">
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-foreground">{employee.name}</h3>
                    <Badge 
                      variant={employee.status === 'active' ? 'default' : 'secondary'}
                      className={employee.status === 'active' ? 'bg-success/20 text-success border-success/30' : 'bg-muted/50 text-muted-foreground'}
                    >
                      {employee.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{employee.position}</p>
                  <p className="text-xs text-muted-foreground">Last seen: {employee.lastSeen}</p>
                </div>
              </div>

              <Button 
                variant="ghost" 
                size="sm"
                className="hover-glow"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};