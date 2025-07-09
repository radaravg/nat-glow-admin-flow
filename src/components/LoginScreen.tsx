import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async () => {
    setIsLoading(true);
    
    // Simulate haptic feedback and click sound
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    setTimeout(() => {
      if (password === '4004') {
        toast({
          title: "Welcome Admin!",
          description: "Successfully logged into NAT Admin App",
        });
        onLogin();
      } else {
        toast({
          title: "Access Denied",
          description: "Invalid password. Please try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/90 to-muted/30 px-6 py-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(217_91%_60%_/_0.1),_transparent_50%)]" />
      
      <div className="flex flex-col h-full justify-center">
        <Card className="glass-card p-6 w-full animate-slide-up">
          <div className="text-center space-y-8">
            <div className="space-y-3">
              <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-3xl flex items-center justify-center shadow-glow">
                <span className="text-3xl font-bold text-primary-foreground">N</span>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                NAT Admin
              </h1>
              <p className="text-muted-foreground text-lg">
                Employee Management
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-base font-medium text-foreground block text-left">
                  Admin Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-secondary/50 border-border/50 focus:border-primary/50 transition-all duration-300 h-14 text-lg rounded-2xl"
                />
              </div>

              <Button 
                onClick={handleLogin}
                disabled={isLoading || !password}
                className="btn-premium w-full h-14 text-white font-medium ripple text-lg rounded-2xl"
              >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                'Access Admin Panel'
              )}
            </Button>
            </div>

            <div className="text-sm text-muted-foreground mt-8">
              Default password: 4004
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};