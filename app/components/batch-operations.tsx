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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Trash2,
  Zap,
  Clock,
  DollarSign,
  CheckCircle,
  Loader2,
  ArrowRight,
  Users,
  Gift
} from "lucide-react";

interface BatchOperation {
  id: string;
  type: 'mint' | 'transfer' | 'approve' | 'custom';
  target: string;
  amount?: string;
  data?: string;
  enabled: boolean;
}

const defaultOperations: BatchOperation[] = [
  {
    id: '1',
    type: 'mint',
    target: 'NFT Contract',
    amount: '1',
    enabled: true
  },
  {
    id: '2',
    type: 'transfer',
    target: '0x742d35Cc6634C0532925a3b8D',
    amount: '0.1',
    enabled: true
  },
  {
    id: '3',
    type: 'approve',
    target: 'Token Contract',
    amount: '1000',
    enabled: false
  }
];

export default function BatchOperations() {
  const [operations, setOperations] = useState<BatchOperation[]>(defaultOperations);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<string | null>(null);

  const addOperation = () => {
    const newOperation: BatchOperation = {
      id: Date.now().toString(),
      type: 'mint',
      target: '',
      amount: '1',
      enabled: true
    };
    setOperations([...operations, newOperation]);
  };

  const removeOperation = (id: string) => {
    setOperations(operations.filter(op => op.id !== id));
  };

  const updateOperation = (id: string, updates: Partial<BatchOperation>) => {
    setOperations(operations.map(op => 
      op.id === id ? { ...op, ...updates } : op
    ));
  };

  const toggleOperation = (id: string) => {
    updateOperation(id, { enabled: !operations.find(op => op.id === id)?.enabled });
  };

  const executeBatch = async () => {
    const enabledOps = operations.filter(op => op.enabled);
    if (enabledOps.length === 0) return;

    setIsExecuting(true);
    setExecutionResult(null);

    // Simulate batch execution
    await new Promise(resolve => setTimeout(resolve, 3000));

    setExecutionResult(`Successfully executed ${enabledOps.length} operations in a single transaction!`);
    setIsExecuting(false);
  };

  const getOperationIcon = (type: string) => {
    switch (type) {
      case 'mint': return <Gift className="h-4 w-4 text-green-600" />;
      case 'transfer': return <ArrowRight className="h-4 w-4 text-blue-600" />;
      case 'approve': return <CheckCircle className="h-4 w-4 text-purple-600" />;
      case 'custom': return <Zap className="h-4 w-4 text-orange-600" />;
      default: return <Zap className="h-4 w-4 text-gray-600" />;
    }
  };

  const getOperationColor = (type: string) => {
    switch (type) {
      case 'mint': return 'bg-green-100 text-green-800';
      case 'transfer': return 'bg-blue-100 text-blue-800';
      case 'approve': return 'bg-purple-100 text-purple-800';
      case 'custom': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const enabledCount = operations.filter(op => op.enabled).length;
  const estimatedGas = enabledCount * 0.001; // Simulate gas calculation

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Batch Operations
        </CardTitle>
        <CardDescription>
          Execute multiple operations in a single transaction with gas sponsorship
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Batch Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-900">{enabledCount}</div>
              <div className="text-sm text-blue-600">Operations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-900">{estimatedGas.toFixed(3)} ETH</div>
              <div className="text-sm text-green-600">Gas Sponsored</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-900">1</div>
              <div className="text-sm text-purple-600">Transaction</div>
            </div>
          </div>
        </div>

        {/* Operations List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Operations</h4>
            <Button onClick={addOperation} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Operation
            </Button>
          </div>

          <div className="space-y-2">
            {operations.map((operation, index) => (
              <div key={operation.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Checkbox
                  checked={operation.enabled}
                  onCheckedChange={() => toggleOperation(operation.id)}
                />
                
                <div className="flex-1 grid grid-cols-4 gap-3">
                  <div className="flex items-center gap-2">
                    {getOperationIcon(operation.type)}
                    <Select
                      value={operation.type}
                      onValueChange={(value) => updateOperation(operation.id, { type: value as any })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mint">Mint NFT</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                        <SelectItem value="approve">Approve</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Input
                    placeholder="Target address"
                    value={operation.target}
                    onChange={(e) => updateOperation(operation.id, { target: e.target.value })}
                    className="text-sm"
                  />

                  <Input
                    placeholder="Amount"
                    value={operation.amount}
                    onChange={(e) => updateOperation(operation.id, { amount: e.target.value })}
                    className="text-sm"
                  />

                  <div className="flex items-center gap-2">
                    <Badge className={getOperationColor(operation.type)}>
                      {operation.type}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOperation(operation.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Execution Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-semibold">Execute Batch</h4>
              <p className="text-sm text-gray-600">
                All enabled operations will be executed in a single transaction
              </p>
            </div>
            <Button
              onClick={executeBatch}
              disabled={enabledCount === 0 || isExecuting}
              className="gap-2"
              size="lg"
            >
              {isExecuting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Executing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  Execute Batch
                </>
              )}
            </Button>
          </div>

          {executionResult && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">{executionResult}</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Gas fees were sponsored by Alchemy's infrastructure. 
                Transaction hash: 0x742d35Cc6634C0532925a3b8D...
              </p>
            </div>
          )}
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-indigo-600" />
            <span className="font-semibold text-indigo-900">Batch Operation Benefits</span>
          </div>
          <div className="text-sm text-indigo-700 space-y-1">
            <div>• Reduce gas costs by batching multiple operations</div>
            <div>• Improve user experience with single transaction</div>
            <div>• Atomic execution - all operations succeed or fail together</div>
            <div>• Sponsored by Alchemy's gas manager</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
