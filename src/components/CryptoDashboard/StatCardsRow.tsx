import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ArrowUpCircle, ArrowDownCircle, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardData {
  id: string;
  title: string;
  value: string;
  percentageChange: number;
  icon: React.ElementType;
  iconColor: string;
}

const statCardsData: StatCardData[] = [
  {
    id: 'total-invested',
    title: 'TOTAL INVESTED',
    value: '$2,390.68',
    percentageChange: 6.24,
    icon: DollarSign, // Using DollarSign based on description, image shows a specific icon
    iconColor: 'text-blue-500'
  },
  {
    id: 'total-change',
    title: 'TOTAL CHANGE',
    value: '$19,523.25',
    percentageChange: 3.67,
    icon: ArrowUpCircle,
    iconColor: 'text-green-500'
  },
  {
    id: 'day-change',
    title: 'DAY CHANGE',
    value: '$14,799.44',
    percentageChange: -4.80,
    icon: ArrowDownCircle,
    iconColor: 'text-red-500'
  },
];

interface StatCardProps extends StatCardData {
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  percentageChange,
  icon: IconComponent,
  iconColor,
  className,
}) => {
  const isPositive = percentageChange >= 0;
  return (
    <Card className={cn('flex-1', className)}>
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-semibold text-foreground mt-1">{value}</p>
        </div>
        <div className="flex flex-col items-end">
            <div className={`p-2 rounded-md bg-opacity-10 ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}>
                <IconComponent className={`h-6 w-6 ${isPositive ? 'text-green-500' : 'text-red-500'}`} />
            </div>
            <div className={cn(
                'mt-1 text-xs px-1.5 py-0.5 rounded-full flex items-center font-medium',
                isPositive ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
            )}>
                {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {Math.abs(percentageChange).toFixed(2)}%
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface StatCardsRowProps {
  className?: string;
}

const StatCardsRow: React.FC<StatCardsRowProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-6', className)}>
      {statCardsData.map((card) => (
        <StatCard key={card.id} {...card} />
      ))}
    </div>
  );
};

export default StatCardsRow;
