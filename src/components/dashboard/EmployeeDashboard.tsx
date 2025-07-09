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
    <div className="h-full flex flex-col">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 p-4">
        <Card className="glass-card p-4 hover-glow">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{totalEmployees}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4 hover-glow">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 bg-success/20 rounded-2xl flex items-center justify-center mx-auto">
              <UserCheck className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{activeEmployees}</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4 hover-glow">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 bg-warning/20 rounded-2xl flex items-center justify-center mx-auto">
              <UserX className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{totalEmployees - activeEmployees}</p>
              <p className="text-xs text-muted-foreground">Offline</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Employee List */}
      <div className="flex-1 overflow-hidden">
        <div className="px-4 pb-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Employees</h2>
            <Badge variant="secondary" className="bg-secondary/50 text-xs">
              {totalEmployees}
            </Badge>
          </div>
        </div>

        <div className="px-4 pb-4 h-full overflow-auto">
          <div className="space-y-3">
            {mockEmployees.map((employee) => (
              <Card
                key={employee.id}
                className="glass-card p-4 hover-glow"
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12 ring-2 ring-border">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground font-medium">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground truncate">{employee.name}</h3>
                      <Badge 
                        variant={employee.status === 'active' ? 'default' : 'secondary'}
                        className={`text-xs ${employee.status === 'active' ? 'bg-success/20 text-success border-success/30' : 'bg-muted/50 text-muted-foreground'}`}
                      >
                        {employee.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{employee.position}</p>
                    <p className="text-xs text-muted-foreground">Last seen: {employee.lastSeen}</p>
                  </div>

                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="hover-glow w-8 h-8 p-0 rounded-xl shrink-0"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};