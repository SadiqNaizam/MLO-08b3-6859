import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Menu,
  Search,
  Globe,
  LayoutGrid,
  Moon,
  Sun,
  Bell,
  User as UserIcon,
  Settings,
  LogOut,
  CreditCard
} from 'lucide-react';
import { useTheme } from 'next-themes'; // Assuming next-themes is set up

interface TopHeaderProps {
  className?: string;
  onToggleSidebar?: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ className, onToggleSidebar }) => {
  const { theme, setTheme } = useTheme();

  // Placeholder for actual user data
  const user = {
    name: 'Anna Adame',
    role: 'Founder',
    avatarUrl: 'https://i.pravatar.cc/40?u=annaadame', // Placeholder avatar
    initials: 'AA'
  };

  return (
    <header 
      className={cn(
        "bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 shadow-sm", 
        className
      )}
    >
      <div className="flex items-center gap-2 lg:gap-4">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        {/* Hamburger for desktop to toggle sidebar width (if feature exists) */}
        {/* <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="hidden lg:inline-flex">
          <Menu className="h-5 w-5" /> 
        </Button> */}
        
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="h-9 w-full rounded-md bg-background sm:w-64 pl-10"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-3">
        <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
          <Globe className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
          <LayoutGrid className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>

        <div className="relative">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
             <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span> 
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
          </span>
          <span className="absolute -top-0.5 -right-0.5 transform translate-x-1/4 -translate-y-1/4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full px-1 min-w-[16px] h-[16px] flex items-center justify-center">
            3
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-auto px-2 py-1 lg:px-3 flex items-center gap-2">
              <Avatar className="h-7 w-7 lg:h-8 lg:w-8">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.initials}</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-xs lg:text-sm font-medium text-foreground">{user.name}</span>
                <span className="text-[10px] lg:text-xs text-muted-foreground">{user.role}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.role}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
