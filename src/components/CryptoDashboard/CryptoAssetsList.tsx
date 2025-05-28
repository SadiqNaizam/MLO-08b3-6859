import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bitcoin, CircleDollarSign, Gem, Gauge } from 'lucide-react'; // Gem for ETH, Gauge for Dash, CircleDollarSign for LTC

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  icon: React.ElementType;
  iconColorClass: string;
  chartDotColor: string;
  amount: string;
  value: string;
}

const assetsData: CryptoAsset[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: Bitcoin,
    iconColorClass: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-800 dark:text-yellow-300',
    chartDotColor: 'bg-yellow-500', // Matches --chart-yellow in spirit
    amount: '0.00584875',
    value: '$19,405.12',
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: Gem, // Placeholder icon
    iconColorClass: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-800 dark:text-indigo-300',
    chartDotColor: 'bg-blue-500', // Matches --chart-blue in spirit
    amount: '2.25842108',
    value: '$40,552.18',
  },
  {
    id: 'litecoin',
    name: 'Litecoin',
    symbol: 'LTC',
    icon: CircleDollarSign, // Placeholder icon
    iconColorClass: 'text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-300',
    chartDotColor: 'bg-green-500', // Matches --chart-green in spirit
    amount: '10.58963217',
    value: '$1,5824.58',
  },
  {
    id: 'dash',
    name: 'Dash',
    symbol: 'DASH',
    icon: Gauge, // Placeholder icon
    iconColorClass: 'text-sky-500 bg-sky-100 dark:bg-sky-800 dark:text-sky-300',
    chartDotColor: 'bg-teal-500', // Matches --chart-teal in spirit
    amount: '204.28565885',
    value: '$30,635.84',
  },
];

interface CryptoAssetsListProps {
  className?: string;
}

const CryptoAssetsList: React.FC<CryptoAssetsListProps> = ({ className }) => {
  return (
    <Card className={cn('w-full md:w-2/3', className)}>
      <CardHeader>
        <CardTitle>My Assets</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {assetsData.map((asset) => {
            const IconComponent = asset.icon;
            return (
              <li key={asset.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${asset.iconColorClass}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className={`h-2 w-2 rounded-full mr-2 ${asset.chartDotColor}`}></span>
                      <p className="font-medium text-foreground">{asset.name}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{asset.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm text-foreground">{asset.amount} {asset.symbol}</p>
                  <p className="text-xs text-muted-foreground">{asset.value}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CryptoAssetsList;
