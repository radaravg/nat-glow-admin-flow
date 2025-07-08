import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { RotateCcw, Check, X, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResetRequest {
  id: number;
  employeeName: string;
  email: string;
  reason: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Mock reset requests data
const mockResetRequests: ResetRequest[] = [
  {
    id: 1,
    employeeName: 'Alex Turner',
    email: 'alex.turner@nat.com',
    reason: 'Forgot password and lost access to 2FA device',
    requestDate: '2024-07-08 10:30 AM',
    status: 'pending',
  },
  {
    id: 2,
    employeeName: 'Jessica Wong',
    email: 'jessica.wong@nat.com', 
    reason: 'Need to update profile photo and emergency contacts',
    requestDate: '2024-07-08 09:15 AM',
    status: 'pending',
  },
  {
    id: 3,
    employeeName: 'Robert Martinez',
    email: 'robert.martinez@nat.com',
    reason: 'Account locked after multiple failed login attempts',
    requestDate: '2024-07-07 04:20 PM',
    status: 'approved',
  },
  {
    id: 4,
    employeeName: 'Amanda Foster',
    email: 'amanda.foster@nat.com',
    reason: 'Suspicious activity detected, need security reset',
    requestDate: '2024-07-07 02:45 PM',
    status: 'rejected',
  },
];

export const ResetRequests = () => {
  const [requests, setRequests] = useState<ResetRequest[]>(mockResetRequests);
  const { toast } = useToast();

  const handleApprove = (requestId: number) => {
    // Simulate haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    setRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'approved' as const } : req
      )
    );

    toast({
      title: "Request Approved",
      description: "Employee profile reset has been approved.",
    });
  };

  const handleReject = (requestId: number) => {
    // Simulate haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    setRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'rejected' as const } : req
      )
    );

    toast({
      title: "Request Rejected",
      description: "Employee profile reset has been rejected.",
      variant: "destructive",
    });
  };

  const pendingRequests = requests.filter(req => req.status === 'pending');
  const processedRequests = requests.filter(req => req.status !== 'pending');

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-card p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning/20 rounded-xl flex items-center justify-center">
            <RotateCcw className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Reset Requests</h2>
            <p className="text-sm text-muted-foreground">
              Manage employee profile reset requests
            </p>
          </div>
          <Badge variant="secondary" className="ml-auto bg-warning/20 text-warning">
            {pendingRequests.length} pending
          </Badge>
        </div>
      </Card>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-warning" />
            Pending Requests
          </h3>
          
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className="p-4 bg-secondary/30 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <Avatar className="w-12 h-12 ring-2 ring-border">
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground font-medium">
                        {request.employeeName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-foreground">{request.employeeName}</h4>
                        <Badge variant="outline" className="border-warning/30 text-warning">
                          Pending
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{request.email}</p>
                      <p className="text-sm text-foreground mb-2">{request.reason}</p>
                      <p className="text-xs text-muted-foreground">Requested: {request.requestDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      onClick={() => handleApprove(request.id)}
                      size="sm"
                      className="bg-success hover:bg-success/80 text-success-foreground hover-glow"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(request.id)}
                      size="sm"
                      variant="destructive"
                      className="hover-glow"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recent Activity */}
      {processedRequests.length > 0 && (
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
          
          <div className="space-y-3">
            {processedRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                      {request.employeeName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{request.employeeName}</p>
                    <p className="text-xs text-muted-foreground">{request.requestDate}</p>
                  </div>
                </div>
                
                <Badge 
                  variant={request.status === 'approved' ? 'default' : 'destructive'}
                  className={request.status === 'approved' ? 'bg-success/20 text-success border-success/30' : ''}
                >
                  {request.status === 'approved' ? (
                    <Check className="w-3 h-3 mr-1" />
                  ) : (
                    <X className="w-3 h-3 mr-1" />
                  )}
                  {request.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Empty State */}
      {pendingRequests.length === 0 && processedRequests.length === 0 && (
        <Card className="glass-card p-12 text-center">
          <div className="w-16 h-16 bg-muted/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <RotateCcw className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No Reset Requests</h3>
          <p className="text-muted-foreground">All employees have secure access to their profiles.</p>
        </Card>
      )}
    </div>
  );
};