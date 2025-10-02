"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Clock, 
  Shield, 
  TrendingUp,
  Activity,
  Globe,
  Database,
  Cpu
} from "lucide-react";

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  target: number;
  icon: React.ReactNode;
  color: string;
}

const metrics: PerformanceMetric[] = [
  {
    name: 'Transaction Throughput',
    value: 1250,
    unit: 'TPS',
    trend: 'up',
    target: 1000,
    icon: <Zap className="h-4 w-4" />,
    color: 'text-green-600'
  },
  {
    name: 'Average Latency',
    value: 0.8,
    unit: 's',
    trend: 'down',
    target: 1.0,
    icon: <Clock className="h-4 w-4" />,
    color: 'text-blue-600'
  },
  {
    name: 'Success Rate',
    value: 99.7,
    unit: '%',
    trend: 'up',
    target: 99.5,
    icon: <Shield className="h-4 w-4" />,
    color: 'text-purple-600'
  },
  {
    name: 'Gas Efficiency',
    value: 87,
    unit: '%',
    trend: 'up',
    target: 80,
    icon: <TrendingUp className="h-4 w-4" />,
    color: 'text-orange-600'
  }
];

export default function PerformanceMetrics() {
  const [animatedMetrics, setAnimatedMetrics] = useState(metrics.map(m => ({ ...m, value: 0 })));
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const animateMetrics = () => {
      setAnimatedMetrics(prev => 
        prev.map((metric, index) => {
          const target = metrics[index];
          const increment = target.value / 50;
          const newValue = Math.min(metric.value + increment, target.value);
          
          return {
            ...metric,
            value: newValue
          };
        })
      );
    };

    const interval = setInterval(animateMetrics, 50);
    
    setTimeout(() => {
      clearInterval(interval);
      setIsAnimating(false);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Performance Metrics
          <Badge variant="outline" className="ml-auto">
            Live
          </Badge>
        </CardTitle>
        <CardDescription>
          Real-time infrastructure performance powered by Alchemy
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {animatedMetrics.map((metric, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <div className={metric.color}>
                  {metric.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">{metric.name}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-gray-900">
                  {metric.unit === '%' ? metric.value.toFixed(1) : 
                   metric.unit === 's' ? metric.value.toFixed(1) :
                   Math.floor(metric.value).toLocaleString()}
                </span>
                <span className="text-sm text-gray-600">{metric.unit}</span>
                <span className={`text-xs ${getTrendColor(metric.trend)}`}>
                  {getTrendIcon(metric.trend)}
                </span>
              </div>
              <div className="mt-2">
                <Progress 
                  value={(metric.value / metric.target) * 100} 
                  className="h-2"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Target: {metric.target}{metric.unit}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Infrastructure Status */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-green-900">Infrastructure Status</span>
            <Badge className="bg-green-100 text-green-800">All Systems Operational</Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>API Endpoints</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Gas Manager</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Account Kit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Blockchain Nodes</span>
            </div>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Performance Insights</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Database className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Data Processing</span>
              </div>
              <div className="text-xs text-blue-700">
                Processing 1.2M+ transactions daily with 99.9% accuracy
              </div>
            </div>
            
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Compute Power</span>
              </div>
              <div className="text-xs text-purple-700">
                Optimized for high-frequency trading and DeFi protocols
              </div>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">Security</span>
              </div>
              <div className="text-xs text-green-700">
                Enterprise-grade security with 256-bit encryption
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Activity */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="h-4 w-4 text-indigo-600" />
            <span className="font-semibold text-indigo-900">Real-time Activity</span>
          </div>
          <div className="text-sm text-indigo-700 space-y-1">
            <div>• 2,847 transactions processed in the last minute</div>
            <div>• Average gas savings of 85% per transaction</div>
            <div>• 99.7% transaction success rate</div>
            <div>• Sub-second finality on all supported networks</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
