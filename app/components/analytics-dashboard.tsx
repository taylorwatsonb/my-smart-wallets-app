"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Zap, 
  Clock, 
  DollarSign, 
  Activity,
  Users,
  Wallet,
  ArrowUpRight
} from "lucide-react";

interface TransactionMetrics {
  totalTransactions: number;
  gasSaved: string;
  avgTransactionTime: number;
  successRate: number;
  totalUsers: number;
  totalGasFees: string;
}

interface RecentTransaction {
  hash: string;
  type: string;
  timestamp: number;
  gasUsed: string;
  status: 'success' | 'pending' | 'failed';
}

export default function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState<TransactionMetrics>({
    totalTransactions: 0,
    gasSaved: "0.00",
    avgTransactionTime: 0,
    successRate: 0,
    totalUsers: 0,
    totalGasFees: "0.00"
  });

  const [recentTransactions, setRecentTransactions] = useState<RecentTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 3),
        gasSaved: (parseFloat(prev.gasSaved) + Math.random() * 0.1).toFixed(2),
        avgTransactionTime: Math.max(0.5, prev.avgTransactionTime + (Math.random() - 0.5) * 0.2),
        successRate: Math.min(99.5, prev.successRate + (Math.random() - 0.5) * 0.5),
        totalUsers: prev.totalUsers + (Math.random() > 0.8 ? 1 : 0),
        totalGasFees: (parseFloat(prev.totalGasFees) + Math.random() * 0.05).toFixed(2)
      }));

      // Add new transaction
      if (Math.random() > 0.7) {
        setRecentTransactions(prev => [
          {
            hash: `0x${Math.random().toString(16).substr(2, 8)}...`,
            type: ['NFT Mint', 'Token Transfer', 'Contract Call'][Math.floor(Math.random() * 3)],
            timestamp: Date.now(),
            gasUsed: (Math.random() * 0.01).toFixed(4),
            status: ['success', 'pending', 'failed'][Math.floor(Math.random() * 3)] as any
          },
          ...prev.slice(0, 4)
        ]);
      }
    }, 3000);

    // Initial data load
    setTimeout(() => {
      setMetrics({
        totalTransactions: 1247,
        gasSaved: "2.34",
        avgTransactionTime: 1.2,
        successRate: 98.7,
        totalUsers: 156,
        totalGasFees: "0.00"
      });
      setIsLoading(false);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Analytics Dashboard
          </CardTitle>
          <CardDescription>Loading real-time metrics...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Real-time Analytics
          <Badge variant="outline" className="ml-auto">
            Live
          </Badge>
        </CardTitle>
        <CardDescription>
          Smart wallet performance metrics powered by Alchemy infrastructure
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Transactions</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">
              {metrics.totalTransactions.toLocaleString()}
            </div>
            <div className="text-xs text-blue-600">+12% this week</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Gas Saved</span>
            </div>
            <div className="text-2xl font-bold text-green-900">
              {metrics.gasSaved} ETH
            </div>
            <div className="text-xs text-green-600">$4,234 saved</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Avg Time</span>
            </div>
            <div className="text-2xl font-bold text-purple-900">
              {metrics.avgTransactionTime}s
            </div>
            <div className="text-xs text-purple-600">Lightning fast</div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-700">Users</span>
            </div>
            <div className="text-2xl font-bold text-orange-900">
              {metrics.totalUsers}
            </div>
            <div className="text-xs text-orange-600">Active wallets</div>
          </div>
        </div>

        {/* Success Rate Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Success Rate</span>
            <span className="text-sm font-bold text-green-600">{metrics.successRate}%</span>
          </div>
          <Progress value={metrics.successRate} className="h-2" />
        </div>

        {/* Recent Transactions */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-gray-700">Recent Activity</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {recentTransactions.map((tx, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <div className="text-sm font-medium">{tx.type}</div>
                    <div className="text-xs text-gray-500">{tx.hash}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(tx.status)}>
                    {tx.status}
                  </Badge>
                  <span className="text-xs text-gray-500">{tx.gasUsed} ETH</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Insights */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <ArrowUpRight className="h-4 w-4 text-indigo-600" />
            <span className="font-semibold text-indigo-900">Performance Insights</span>
          </div>
          <div className="text-sm text-indigo-700">
            • 99.2% uptime with Alchemy's infrastructure<br/>
            • Average gas savings of 85% per transaction<br/>
            • Sub-second transaction finality on Arbitrum
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
