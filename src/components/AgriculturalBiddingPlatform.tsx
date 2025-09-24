"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, Clock, CheckCircle, Gavel, Shield } from 'lucide-react';

// TypeScript interfaces
interface MarketData {
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  grade: string;
  arrival_date: string;
  min_price: number;
  max_price: number;
  modal_price: number;
}

interface RetailerBid {
  retailer: string;
  amount: number;
  time: string;
}

interface ActiveBid {
  id: number;
  farmer: string;
  quantity: string;
  farmerPrice: number;
  retailerBids: RetailerBid[];
  status: 'active' | 'negotiating';
  timeLeft: string;
}

interface PriceStatus {
  status: 'below' | 'above' | 'fair';
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

type UserType = 'farmer' | 'retailer';

const AgriculturalBiddingPlatform: React.FC = () => {
  const [userType, setUserType] = useState<UserType>('farmer');
  const [bidAmount, setBidAmount] = useState<string>('');

  // Sample data based on the API response
  const marketData: MarketData = {
    state: "Andhra Pradesh",
    district: "Chittor",
    market: "Chittoor",
    commodity: "Gur(Jaggery)",
    variety: "NO 2",
    grade: "FAQ",
    arrival_date: "23/09/2025",
    min_price: 3400,
    max_price: 3500,
    modal_price: 3500
  };

  const [activeBids, setActiveBids] = useState<ActiveBid[]>([
    {
      id: 1,
      farmer: "Rajesh Kumar",
      quantity: "500 kg",
      farmerPrice: 3450,
      retailerBids: [
        { retailer: "Green Valley Store", amount: 3420, time: "2 min ago" },
        { retailer: "Fresh Mart", amount: 3440, time: "5 min ago" }
      ],
      status: "active",
      timeLeft: "2h 30m"
    },
    {
      id: 2,
      farmer: "Priya Sharma",
      quantity: "800 kg",
      farmerPrice: 3480,
      retailerBids: [
        { retailer: "Organic Plus", amount: 3460, time: "1 min ago" },
        { retailer: "Farm Fresh Co", amount: 3470, time: "3 min ago" }
      ],
      status: "negotiating",
      timeLeft: "1h 45m"
    }
  ]);

  const getPriceStatus = (price: number): PriceStatus => {
    if (price < marketData.min_price) return { status: "below", color: "text-red-600", icon: TrendingDown };
    if (price > marketData.max_price) return { status: "above", color: "text-orange-600", icon: TrendingUp };
    return { status: "fair", color: "text-green-600", icon: CheckCircle };
  };

  const handleBidSubmit = (bidId: number): void => {
    if (!bidAmount) return;
    
    const updatedBids = activeBids.map(bid => {
      if (bid.id === bidId) {
        const newBid: RetailerBid = {
          retailer: userType === 'retailer' ? "Your Bid" : "Anonymous Retailer",
          amount: parseFloat(bidAmount),
          time: "Just now"
        };
        return {
          ...bid,
          retailerBids: [newBid, ...bid.retailerBids]
        };
      }
      return bid;
    });
    
    setActiveBids(updatedBids);
    setBidAmount('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-10 w-10 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-800">AgriChain Bidding Platform</h1>
          </div>
          <p className="text-lg text-gray-600">Transparent, Blockchain-Secured Agricultural Trading</p>
        </div>

        {/* User Type Selector */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-2 shadow-md">
            <button
              onClick={() => setUserType('farmer')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                userType === 'farmer' 
                  ? 'bg-green-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Farmer View
            </button>
            <button
              onClick={() => setUserType('retailer')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                userType === 'retailer' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Retailer View
            </button>
          </div>
        </div>

        {/* Market Reference Data */}
        <Card className="mb-8 border-2 border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              Government Mandi Reference Prices (Live Data)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-green-100 to-green-50 p-4 rounded-lg border">
                <div className="text-sm text-gray-600 mb-1">Commodity</div>
                <div className="text-xl font-bold text-gray-800">{marketData.commodity}</div>
                <div className="text-sm text-gray-500">{marketData.variety} - {marketData.grade}</div>
              </div>
              <div className="bg-gradient-to-br from-red-100 to-red-50 p-4 rounded-lg border">
                <div className="text-sm text-gray-600 mb-1">Min Price</div>
                <div className="text-2xl font-bold text-red-600">₹{marketData.min_price}</div>
                <div className="text-sm text-gray-500">per quintal</div>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-4 rounded-lg border">
                <div className="text-sm text-gray-600 mb-1">Max Price</div>
                <div className="text-2xl font-bold text-orange-600">₹{marketData.max_price}</div>
                <div className="text-sm text-gray-500">per quintal</div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-lg border">
                <div className="text-sm text-gray-600 mb-1">Modal Price</div>
                <div className="text-2xl font-bold text-blue-600">₹{marketData.modal_price}</div>
                <div className="text-sm text-gray-500">{marketData.arrival_date}</div>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <strong>Market:</strong> {marketData.market}, {marketData.district}, {marketData.state}
            </div>
          </CardContent>
        </Card>

        {/* Active Bidding Sessions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeBids.map((bid) => {
            const highestBid = Math.max(...bid.retailerBids.map(b => b.amount));
            const priceStatus = getPriceStatus(bid.farmerPrice);
            const StatusIcon = priceStatus.icon;

            return (
              <Card key={bid.id} className="shadow-lg border-2 border-gray-200 hover:shadow-xl transition-shadow">
                <CardHeader className={`${bid.status === 'active' ? 'bg-green-50' : 'bg-orange-50'} border-b`}>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Gavel className="h-5 w-5" />
                      <span className="text-lg">Bid #{bid.id}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        bid.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {bid.timeLeft}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Farmer Details */}
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <div className="font-semibold text-gray-800">Farmer: {bid.farmer}</div>
                          <div className="text-sm text-gray-600">Quantity: {bid.quantity}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">₹{bid.farmerPrice}</div>
                          <div className="flex items-center gap-1">
                            <StatusIcon className={`h-4 w-4 ${priceStatus.color}`} />
                            <span className={`text-sm ${priceStatus.color}`}>
                              {priceStatus.status === 'fair' ? 'Fair Price' : 
                               priceStatus.status === 'above' ? 'Above Market' : 'Below Market'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Retailer Bids */}
                    <div className="space-y-2">
                      <div className="font-semibold text-gray-700 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Retailer Bids ({bid.retailerBids.length})
                      </div>
                      {bid.retailerBids.map((retailerBid, index) => {
                        const bidStatus = getPriceStatus(retailerBid.amount);
                        const BidIcon = bidStatus.icon;
                        
                        return (
                          <div key={index} className="bg-blue-50 p-3 rounded-lg border border-blue-200 flex justify-between items-center">
                            <div>
                              <div className="font-medium text-gray-800">{retailerBid.retailer}</div>
                              <div className="text-sm text-gray-500">{retailerBid.time}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-blue-600">₹{retailerBid.amount}</div>
                              <div className="flex items-center gap-1 justify-end">
                                <BidIcon className={`h-3 w-3 ${bidStatus.color}`} />
                                <span className={`text-xs ${bidStatus.color}`}>
                                  {bidStatus.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Bidding Interface */}
                    {userType === 'retailer' && (
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex gap-3">
                          <input
                            type="number"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            placeholder="Enter bid amount"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => handleBidSubmit(bid.id)}
                            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
                          >
                            Place Bid
                          </button>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          Suggested range: ₹{marketData.min_price} - ₹{marketData.max_price}
                        </div>
                      </div>
                    )}

                    {/* Price Analysis */}
                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      <div className="text-sm">
                        <strong>Price Gap Analysis:</strong> 
                        <span className="ml-2">
                          Farmer asking: ₹{bid.farmerPrice} | 
                          Highest bid: ₹{highestBid} | 
                          Gap: ₹{Math.abs(bid.farmerPrice - highestBid)}
                        </span>
                      </div>
                      {Math.abs(bid.farmerPrice - highestBid) <= 50 && (
                        <div className="text-green-600 text-sm mt-1 flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" />
                          Close to agreement! Consider finalizing this deal.
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Blockchain Features */}
        <Card className="mt-8 border-2 border-purple-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              Blockchain Transparency Features
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">Immutable Records</h3>
                <p className="text-sm text-gray-600">All bids and transactions are permanently recorded on blockchain for complete transparency.</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <h3 className="font-semibold text-indigo-800 mb-2">Smart Contracts</h3>
                <p className="text-sm text-gray-600">Automated execution of agreed terms ensuring fair payment and delivery.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Price Verification</h3>
                <p className="text-sm text-gray-600">Real-time validation against government mandi prices for fair market pricing.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgriculturalBiddingPlatform;