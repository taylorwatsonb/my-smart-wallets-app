"use client";

import { useSignerStatus } from "@account-kit/react";
import UserInfoCard from "./components/user-info-card";
import NftMintCard from "./components/nft-mint-card";
import LoginCard from "./components/login-card";
import Header from "./components/header";
import LearnMore from "./components/learn-more";
import AnalyticsDashboard from "./components/analytics-dashboard";
import NetworkSwitcher from "./components/network-switcher";
import BatchOperations from "./components/batch-operations";
import PerformanceMetrics from "./components/performance-metrics";

export default function Home() {
  const signerStatus = useSignerStatus();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Header />
      <div className="bg-bg-main bg-cover bg-center bg-no-repeat min-h-[calc(100vh-4rem)]">
        <main className="container mx-auto px-4 py-8">
          {signerStatus.isConnected ? (
            <div className="space-y-8">
              {/* Analytics Dashboard */}
              <AnalyticsDashboard />
              
              {/* Performance Metrics */}
              <PerformanceMetrics />
              
              {/* Main Content Grid */}
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Left Column - User Info & Network */}
                <div className="space-y-6">
                  <UserInfoCard />
                  <NetworkSwitcher />
                </div>
                
                {/* Center Column - NFT Minting */}
                <div>
                  <NftMintCard />
                </div>
                
                {/* Right Column - Batch Operations */}
                <div>
                  <BatchOperations />
                </div>
              </div>
              
              {/* Learn More Section */}
              <LearnMore />
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
              <LoginCard />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
