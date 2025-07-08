import { Button } from '@/components/ui/button';
import { LogOut, Settings } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
}

export const Header = ({ onLogout }: HeaderProps) => {
  const handleLogout = () => {
    // Simulate haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    onLogout();
  };

  return (
    <header className="glass-card border-b border-border/50 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
            <span className="text-lg font-bold text-primary-foreground">N</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">NAT Admin</h1>
            <p className="text-sm text-muted-foreground">Employee Management System</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            className="hover-glow text-muted-foreground hover:text-foreground"
          >
            <Settings className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="hover-glow text-muted-foreground hover:text-destructive"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};