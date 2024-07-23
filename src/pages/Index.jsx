import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react';

const generateData = () => [...Array(12)].map((_, i) => ({
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  revenue: Math.floor(Math.random() * 5000) + 1000
}));

const MetricCard = ({ title, value, change, icon: Icon }) => (
  <Card className="w-full">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <h3 className="text-sm font-medium">{title}</h3>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={`text-xs ${change >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
        {change >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
        {Math.abs(change)}%
      </p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [data, setData] = useState(generateData());
  const [timeframe, setTimeframe] = useState('1M');

  useEffect(() => {
    // Simulate data fetching based on timeframe
    setData(generateData());
  }, [timeframe]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Financial Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard title="Total Revenue" value="$12,345" change={2.5} icon={DollarSign} />
        <MetricCard title="New Customers" value="321" change={-1.8} icon={Users} />
        <MetricCard title="Sales" value="543" change={5.2} icon={ShoppingCart} />
        <MetricCard title="Growth Rate" value="18.2%" change={0.8} icon={TrendingUp} />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">Revenue Overview</h2>
          <div className="space-x-2">
            {['1W', '1M', '3M', '1Y', 'ALL'].map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeframe(tf)}
              >
                {tf}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Top Performing Products</h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Product A</span>
                <span className="font-semibold">$3,245</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Product B</span>
                <span className="font-semibold">$2,890</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Product C</span>
                <span className="font-semibold">$2,150</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Transaction #1234</span>
                <span className="font-semibold text-green-500">+$980</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Transaction #1235</span>
                <span className="font-semibold text-green-500">+$1,250</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Transaction #1236</span>
                <span className="font-semibold text-red-500">-$340</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;