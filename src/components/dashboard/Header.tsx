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
    <header className="glass-card border-b border-border/50 px-4 py-3 shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
            <span className="text-lg font-bold text-primary-foreground">N</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">NAT Admin</h1>
            <p className="text-xs text-muted-foreground">Employee Management</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="hover-glow text-muted-foreground hover:text-foreground w-9 h-9 p-0 rounded-xl"
          >
            <Settings className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="hover-glow text-muted-foreground hover:text-destructive w-9 h-9 p-0 rounded-xl"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};