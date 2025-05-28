import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Surface,
  Symbols
} from 'recharts';

interface MarketGraphProps {
  className?: string;
}

// Simplified candlestick data
type CandlestickData = {
  time: string;
  uv: number; // Using uv for general value, will simulate candlestick look
  openClose: [number, number]; // [open, close]
  highLow: [number, number]; // [low, high]
};

const generateCandlestickData = (numPoints: number, timeFrame: string): CandlestickData[] => {
  const data: CandlestickData[] = [];
  let lastClose = 5000 + Math.random() * 2000; // Start around 5000-7000

  for (let i = 0; i < numPoints; i++) {
    const open = lastClose;
    const close = open + (Math.random() - 0.5) * 200 * (timeFrame === '1H' ? 0.5 : timeFrame === '7D' ? 1 : timeFrame === '1M' ? 2 : 4);
    const high = Math.max(open, close) + Math.random() * 100 * (timeFrame === '1H' ? 0.5 : 1);
    const low = Math.min(open, close) - Math.random() * 100 * (timeFrame === '1H' ? 0.5 : 1);
    
    let timeLabel = '';
    if (timeFrame === '1H') timeLabel = `T-${numPoints - i}m`;
    else if (timeFrame === '7D') timeLabel = `Day ${i + 1}`;
    else if (timeFrame === '1M') timeLabel = `Wk ${i + 1}`;
    else if (timeFrame === '1Y') timeLabel = `M${i + 1}`;
    else timeLabel = `P ${i + 1}`;

    data.push({
      time: timeLabel,
      uv: (open + close) / 2, // for a potential line
      openClose: [open, close],
      highLow: [low, high],
    });
    lastClose = close;
  }
  return data.reverse(); // Show most recent data to the right
};

// Custom shape for Candlestick
const Candlestick = (props: any) => {
  const { x, y, width, height, low, high, open, close } = props;
  const isGreen = close >= open;
  const color = isGreen ? 'var(--chart-green)' : 'var(--chart-red)'; // PRD colors are --chart-green, not specific red

  return (
    <g>
      <line x1={x + width / 2} y1={y} x2={x + width / 2} y2={low} stroke={color} strokeWidth={1} />
      <line x1={x + width / 2} y1={y + height} x2={x + width / 2} y2={high} stroke={color} strokeWidth={1} />
      <rect x={x} y={y} width={width} height={height} fill={color} />
    </g>
  );
};

// Custom Bar component to pass correct props to Candlestick shape
const CustomBar = (props: any) => {
  const { x, y, width, height, payload } = props;
  const [openVal, closeVal] = payload.openClose;
  const [lowVal, highVal] = payload.highLow;

  // Calculate y and height for the candle body
  const candleY = Math.min(openVal, closeVal);
  const candleHeight = Math.abs(openVal - closeVal);

  // The y from recharts is for the top of the bar (max value usually)
  // We need to adjust based on our scale for open/close
  // This requires yAxis to be domain={[minLow, maxHigh]}
  // For simplicity, this example assumes y and height are correctly calculated by Recharts if Bar is set to openClose range.
  // However, usually, y and height from Bar are for its value. For candlestick, mapping is tricky.
  // A more robust Candlestick needs y to be scaled position of Math.max(open,close) and height to be |open-close| scaled.
  
  // Simplified: Assume y is top of candle body and height is candle body height.
  // This requires dataKey for Bar to be openClose and custom logic.
  // Recharts Bar's y and height are based on its value from dataKey.
  // For candlestick, we need to plot using open, close, high, low directly.
  // The provided x, y, width, height are for the bar if dataKey pointed to a single value.
  // This is a known limitation of Recharts for true candlesticks. 
  // A pragmatic approach is to use a library built on top or accept visual approximations.
  // Here, we'll assume y and height are somewhat representative for demonstration.

  return <Candlestick {...props} open={openVal} close={closeVal} low={lowVal} high={highVal} />;
};

const MarketGraph: React.FC<MarketGraphProps> = ({ className }) => {
  const [timeRange, setTimeRange] = React.useState<string>('7D');
  const [chartData, setChartData] = React.useState<CandlestickData[]>(generateCandlestickData(30, '7D'));

  React.useEffect(() => {
    let points = 30;
    if (timeRange === '1H') points = 60; // 60 minutes
    if (timeRange === '7D') points = 7;  // 7 days
    if (timeRange === '1M') points = 30; // 30 days (approx)
    if (timeRange === '1Y') points = 12; // 12 months
    if (timeRange === 'ALL') points = 50; // Arbitrary for all
    setChartData(generateCandlestickData(points, timeRange));
  }, [timeRange]);

  const currentPrice = chartData.length > 0 ? chartData[chartData.length -1].openClose[1] : 0;
  const firstPrice = chartData.length > 0 ? chartData[0].openClose[0] : 0;
  const priceChange = currentPrice - firstPrice;
  const percentageChange = firstPrice === 0 ? 0 : (priceChange / firstPrice) * 100;

  const overallMin = Math.min(...chartData.map(d => d.highLow[0]));
  const overallMax = Math.max(...chartData.map(d => d.highLow[1]));

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
            <CardTitle className="text-lg font-medium">Market Graph</CardTitle>
            <div className="text-sm text-muted-foreground flex items-center space-x-2 mt-1">
                <span>{currentPrice.toFixed(6)}</span>
                <span className={percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}>
                    ${priceChange.toFixed(2)} ({percentageChange.toFixed(2)}%)
                </span>
                <span>High {overallMax.toFixed(6)}</span>
                <span>Low {overallMin.toFixed(6)}</span>
            </div>
        </div>
        <ToggleGroup type="single" defaultValue="7D" value={timeRange} onValueChange={(value) => {if (value) setTimeRange(value)}} size="sm">
          {['1H', '7D', '1M', '1Y', 'ALL'].map((range) => (
            <ToggleGroupItem key={range} value={range} aria-label={`Select ${range}`}>{range}</ToggleGroupItem>
          ))}
        </ToggleGroup>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis 
                orientation="right" 
                domain={[overallMin * 0.98, overallMax * 1.02]} 
                tickFormatter={(value) => `$${value.toFixed(0)}`} 
                tick={{ fontSize: 12 }} 
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value: any, name: string, props: any) => {
                    if (name === 'Price') {
                        const { openClose, highLow } = props.payload;
                        return [
                            `Open: ${openClose[0].toFixed(2)}`, 
                            `Close: ${openClose[1].toFixed(2)}`, 
                            `High: ${highLow[1].toFixed(2)}`, 
                            `Low: ${highLow[0].toFixed(2)}`
                        ];
                    }
                    return [value, name];
                }}
              />
              {/* Simplified representation: a line for average trend, or bars for open/close range */}
              {/* True candlestick is tricky with Recharts default components */}
              {/* Option 1: Line chart for average price */}
              {/* <Line type="monotone" dataKey="uv" stroke="var(--chart-blue)" strokeWidth={2} dot={false} /> */}
              
              {/* Option 2: Bar chart trying to simulate candlestick body */}
              {/* This is a very basic candlestick. More complex custom shape would be better. */}
              <Bar dataKey="openClose" fill="var(--chart-blue)" shape={<CustomBar />} />

            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-around text-center mt-4 pt-4 border-t border-border">
            <div>
                <p className="text-xs text-muted-foreground">Total Balance</p>
                <p className="text-lg font-semibold text-foreground">$72.8k</p>
            </div>
            <div>
                <p className="text-xs text-muted-foreground">Profit</p>
                <p className="text-lg font-semibold text-green-500">+$49.7k</p>
            </div>
            <div>
                <p className="text-xs text-muted-foreground">Loss</p>
                <p className="text-lg font-semibold text-red-500">-$23.1k</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketGraph;
