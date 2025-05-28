import React from 'react';
import { cn } from '@/lib/utils';
import {
  LineChart,
  Users,
  ShoppingCart,
  Bitcoin,
  FolderKanban,
  Image as ImageIcon,
  Briefcase,
  Newspaper,
  Settings,
  ShieldCheck,
  type LucideIcon
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive?: boolean;
  isNew?: boolean;
  // children?: NavItem[]; // For nested menus, not used in current design based on image
}

const topNavigationItems: NavItem[] = [
  { label: "Analytics", href: "#", icon: LineChart },
  { label: "CRM", href: "#", icon: Users },
  { label: "Ecommerce", href: "#", icon: ShoppingCart },
  { label: "Crypto", href: "#", icon: Bitcoin, isActive: true },
  { label: "Projects", href: "#", icon: FolderKanban },
  { label: "NFT", href: "#", icon: ImageIcon },
  { label: "Job", href: "#", icon: Briefcase },
  { label: "Blog", href: "#", icon: Newspaper, isNew: true },
];

const bottomNavigationItems: NavItem[] = [
  { label: "Settings", href: "#", icon: Settings },
  { label: "Support", href: "#", icon: ShieldCheck }, 
];

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  return (
    <aside className={cn("bg-sidebar text-sidebar-foreground flex flex-col", className)}>
      <div className="h-16 flex items-center justify-center px-4 border-b border-sidebar-border/20">
        {/* Using text logo as per image */}
        <a href="#" className="text-2xl font-bold text-white tracking-wider">VELZON</a>
      </div>
      
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col justify-between h-full">
          <ul className="space-y-1.5">
            {topNavigationItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    item.isActive
                      ? 'bg-primary/10 text-primary-foreground' // Or a more specific sidebar active style like bg-white/10 text-white
                      : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground/80 hover:text-sidebar-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {item.isNew && (
                    <span className="ml-auto inline-block rounded-full bg-green-500 px-2 py-0.5 text-xs text-white">
                      New
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Example of bottom navigation items, if any */}
          {/* <ul className="space-y-1.5 mt-auto pt-4 border-t border-sidebar-border/20">
            {bottomNavigationItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground/80 hover:text-sidebar-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul> */}
        </nav>
      </ScrollArea>
    </aside>
  );
};

export default SidebarNav;
