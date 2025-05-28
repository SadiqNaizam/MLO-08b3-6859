import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bitcoin, ChevronDown } from 'lucide-react';

interface PortfolioHeaderProps {
  className?: string;
}

const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({ className }) => {
  const [selectedCurrency, setSelectedCurrency] = React.useState<string>('btc');

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <h1 className="text-xl font-semibold text-foreground">My Portfolio</h1>
      <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
        <SelectTrigger className="w-[100px] h-9">
          <div className="flex items-center">
            <Bitcoin className="h-4 w-4 mr-2 text-yellow-500" />
            <SelectValue placeholder="Currency" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="btc">
            <div className="flex items-center">
              <Bitcoin className="h-4 w-4 mr-2 text-yellow-500" /> BTC
            </div>
          </SelectItem>
          <SelectItem value="eth">
            {/* Placeholder for ETH icon, lucide-react doesn't have one */}
            <div className="flex items-center">
              <span className="h-4 w-4 mr-2 flex items-center justify-center">E</span> ETH
            </div>
          </SelectItem>
          <SelectItem value="usd">
             <div className="flex items-center">
              <span className="h-4 w-4 mr-2 flex items-center justify-center">$</span> USD
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PortfolioHeader;
