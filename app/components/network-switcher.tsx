"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Network, 
  Zap, 
  Shield, 
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface NetworkInfo {
  id: string;
  name: string;
  chainId: number;
  rpcUrl: string;
  blockExplorer: string;
  gasPrice: string;
  features: string[];
  status: 'active' | 'maintenance' | 'beta';
}

const networks: NetworkInfo[] = [
  {
    id: 'arbitrum-sepolia',
    name: 'Arbitrum Sepolia',
    chainId: 421614,
    rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
    blockExplorer: 'https://sepolia.arbiscan.io',
    gasPrice: '0.001 gwei',
    features: ['Account Abstraction', 'Gas Sponsorship', 'Fast Finality'],
    status: 'active'
  },
  {
    id: 'ethereum-sepolia',
    name: 'Ethereum Sepolia',
    chainId: 11155111,
    rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/demo',
    blockExplorer: 'https://sepolia.etherscan.io',
    gasPrice: '0.02 gwei',
    features: ['Account Abstraction', 'Gas Sponsorship'],
    status: 'active'
  },
  {
    id: 'polygon-mumbai',
    name: 'Polygon Mumbai',
    chainId: 80001,
    rpcUrl: 'https://polygon-mumbai.g.alchemy.com/v2/demo',
    blockExplorer: 'https://mumbai.polygonscan.com',
    gasPrice: '0.001 gwei',
    features: ['Account Abstraction', 'Gas Sponsorship', 'Low Fees'],
    status: 'active'
  },
  {
    id: 'base-sepolia',
    name: 'Base Sepolia',
    chainId: 84532,
    rpcUrl: 'https://sepolia.base.org',
    blockExplorer: 'https://sepolia.basescan.org',
    gasPrice: '0.001 gwei',
    features: ['Account Abstraction', 'Gas Sponsorship', 'Coinbase L2'],
    status: 'beta'
  }
];

export default function NetworkSwitcher() {
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
  const [isSwitching, setIsSwitching] = useState(false);

  const handleNetworkChange = async (networkId: string) => {
    const network = networks.find(n => n.id === networkId);
    if (!network) return;

    setIsSwitching(true);
    
    // Simulate network switching delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSelectedNetwork(network);
    setIsSwitching(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'maintenance': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'beta': return <AlertCircle className="h-4 w-4 text-blue-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'beta': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5" />
          Multi-Chain Support
        </CardTitle>
        <CardDescription>
          Switch between networks seamlessly with Alchemy's unified infrastructure
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Network Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Network</label>
          <Select 
            value={selectedNetwork.id} 
            onValueChange={handleNetworkChange}
            disabled={isSwitching}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a network" />
            </SelectTrigger>
            <SelectContent>
              {networks.map((network) => (
                <SelectItem key={network.id} value={network.id}>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(network.status)}
                    <span>{network.name}</span>
                    <Badge 
                      variant="outline" 
                      className={getStatusColor(network.status)}
                    >
                      {network.status}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Current Network Info */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {getStatusIcon(selectedNetwork.status)}
              <span className="font-semibold">{selectedNetwork.name}</span>
              <Badge variant="outline" className={getStatusColor(selectedNetwork.status)}>
                {selectedNetwork.status}
              </Badge>
            </div>
            {isSwitching && (
              <div className="animate-spin">
                <Clock className="h-4 w-4" />
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Chain ID:</span>
              <span className="ml-2 font-mono">{selectedNetwork.chainId}</span>
            </div>
            <div>
              <span className="text-gray-600">Gas Price:</span>
              <span className="ml-2 font-mono">{selectedNetwork.gasPrice}</span>
            </div>
          </div>
        </div>

        {/* Network Features */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Supported Features</h4>
          <div className="flex flex-wrap gap-2">
            {selectedNetwork.features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="gap-1">
                <Shield className="h-3 w-3" />
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Network Performance */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Network Performance</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Zap className="h-5 w-5 text-green-600 mx-auto mb-1" />
              <div className="text-xs text-green-600">Finality</div>
              <div className="font-semibold text-green-800">
                {selectedNetwork.id.includes('arbitrum') ? '< 1s' : 
                 selectedNetwork.id.includes('polygon') ? '< 2s' : '~12s'}
              </div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Shield className="h-5 w-5 text-blue-600 mx-auto mb-1" />
              <div className="text-xs text-blue-600">Security</div>
              <div className="font-semibold text-blue-800">
                {selectedNetwork.id.includes('ethereum') ? 'High' : 'Medium'}
              </div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Clock className="h-5 w-5 text-purple-600 mx-auto mb-1" />
              <div className="text-xs text-purple-600">Uptime</div>
              <div className="font-semibold text-purple-800">99.9%</div>
            </div>
          </div>
        </div>

        {/* Alchemy Infrastructure Benefits */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-indigo-600" />
            <span className="font-semibold text-indigo-900">Alchemy Infrastructure</span>
          </div>
          <div className="text-sm text-indigo-700 space-y-1">
            <div>• Unified API across all networks</div>
            <div>• Automatic failover and load balancing</div>
            <div>• Real-time monitoring and alerting</div>
            <div>• Enterprise-grade reliability</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
