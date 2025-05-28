import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bitcoin, CircleDollarSign, Gem, Coins, Gauge, MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';

interface CryptoSummary {
  id: string;
  name: string;
  icon: React.ElementType;
  iconBgClass: string;
  value: string;
  change: number; // Percentage change
  changeType: 'positive' | 'negative';
  chartData: { name: string; uv: number }[];
}

const generateSparklineData = (): { name: string; uv: number }[] => {
  const data = [];
  let lastVal = 50 + Math.random() * 50;
  for (let i = 0; i < 10; i++) {
    lastVal += (Math.random() - 0.5) * 20;
    lastVal = Math.max(10, Math.min(lastVal, 150)); // Keep within a reasonable range
    data.push({ name: `P${i}`, uv: parseFloat(lastVal.toFixed(1)) });
  }
  return data;
};

const summaryData: CryptoSummary[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    icon: Bitcoin,
    iconBgClass: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-800 dark:text-yellow-300',
    value: '$1,523,647',
    change: 13.11,
    changeType: 'positive' as const,
    chartData: generateSparklineData(),
  },
  {
    id: 'litecoin',
    name: 'Litecoin',
    icon: Coins, // Changed from CircleDollarSign to Coins
    iconBgClass: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
    value: '$2,145,687',
    change: 15.08,
    changeType: 'positive' as const,
    chartData: generateSparklineData(),
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    icon: Gem,
    iconBgClass: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-800 dark:text-indigo-300',
    value: '$3,312,870',
    change: 8.57,
    changeType: 'positive' as const,
    chartData: generateSparklineData(),
  },
  {
    id: 'binance',
    name: 'Binance',
    icon: CircleDollarSign, // BNB - generic icon
    iconBgClass: 'bg-orange-100 text-orange-600 dark:bg-orange-800 dark:text-orange-300',
    value: '$1,820,045',
    change: -9.21,
    changeType: 'negative' as const,
    chartData: generateSparklineData(),
  },
  {
    id: 'dash',
    name: 'Dash',
    icon: Gauge,
    iconBgClass: 'bg-sky-100 text-sky-600 dark:bg-sky-800 dark:text-sky-300',
    value: '$9,458,153',
    change: 12.07,
    changeType: 'positive' as const,
    chartData: generateSparklineData(),
  },
];

interface CryptoSummaryCardProps extends CryptoSummary {}

const CryptoSummaryCard: React.FC<CryptoSummaryCardProps> = (props) => {
  const IconComponent = props.icon;
  const isPositive = props.changeType === 'positive';
  const chartColor = isPositive ? 'var(--chart-green)' : 'var(--chart-red)';

  return (
    <Card className="flex-1 min-w-[200px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className={`p-2 rounded-md ${props.iconBgClass}`}>
            <IconComponent className="h-5 w-5" />
        </div>
        <MoreHorizontal className="h-4 w-4 text-muted-foreground cursor-pointer" />
      </CardHeader>
      <CardContent>
        <div className="text-lg font-semibold text-foreground">{props.value}</div>
        <p className="text-xs text-muted-foreground">{props.name}</p>
        <div className="flex items-center justify-between mt-2">
            <p className={cn(
                'text-xs font-medium',
                isPositive ? 'text-green-500' : 'text-red-500'
            )}>
                {isPositive ? '+' : ''}{props.change.toFixed(2)}%
            </p>
            <div className="h-10 w-20">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={props.chartData}>
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: 'hsl(var(--popover))', 
                                border: '1px solid hsl(var(--border))', 
                                borderRadius: 'var(--radius)',
                                fontSize: '12px',
                                padding: '4px 8px'
                            }}
                            itemStyle={{ color: 'hsl(var(--popover-foreground))'}}
                            formatter={(value: number) => [`$${value.toLocaleString()}`, null]}
                        />
                        <Line type="monotone" dataKey="uv" stroke={chartColor} strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface CryptoSummaryCardsProps {
  className?: string;
}

const CryptoSummaryCards: React.FC<CryptoSummaryCardsProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6', className)}>
      {summaryData.map((summary) => (
        <CryptoSummaryCard key={summary.id} {...summary} />
      ))}
    </div>
  );
};

export default CryptoSummaryCards;
