import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbNavProps {
  className?: string;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ className }) => {
  return (
    <nav className={cn('flex items-center text-sm text-muted-foreground', className)} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <a href="#" className="inline-flex items-center hover:text-primary">
            Dashboards
          </a>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="h-4 w-4" />
            <a href="#" className="ms-1 hover:text-primary md:ms-2">Crypto</a>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default BreadcrumbNav;
