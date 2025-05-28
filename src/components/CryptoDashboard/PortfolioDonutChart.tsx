import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

interface PortfolioDonutChartProps {
  className?: string;
}

const portfolioData = [
  { name: 'Bitcoin', value: 40552.18, symbol: 'BTC', quantity: '0.00584875', color: 'var(--chart-yellow)' }, // Example: using yellow for Bitcoin
  { name: 'Ethereum', value: 30635.84, symbol: 'ETH', quantity: '2.25842108', color: 'var(--chart-blue)' },
  { name: 'Litecoin', value: 19405.12, symbol: 'LTC', quantity: '10.58963217', color: 'var(--chart-green)' },
  { name: 'Dash', value: 15824.58, symbol: 'DASH', quantity: '204.28565885', color: 'var(--chart-teal)' },
];

const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0);

const PortfolioDonutChart: React.FC<PortfolioDonutChartProps> = ({ className }) => {
  return (
    <Card className={cn('w-full md:w-1/3', className)}>
      <CardHeader>
        {/* Title is part of PortfolioHeader, so this card might not need a title if structure is like image */}
        {/* Keeping it flexible, if this component is standalone */}
        {/* <CardTitle>Portfolio Allocation</CardTitle> */}
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="w-full h-[250px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={portfolioData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {portfolioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-sm text-muted-foreground">Total value</span>
            <span className="text-2xl font-bold text-foreground">
              ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioDonutChart;
