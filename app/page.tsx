"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [decimals, setDecimals] = useState("")
  const [supply, setSupply] = useState("")

  const mintActivities = [
    { time: "2024-01-01 12:00:00", type: "MINT", hash: "0x123456...cdef", amount: "1,000,000,000 SPLASH" },
    { time: "2024-01-01 12:01:00", type: "TXN", hash: "0xabcdef...7890", status: "Confirmed" },
    { time: "2024-01-01 12:02:00", type: "TXN", hash: "0x987654...fedcba", status: "Confirmed" },
    { time: "2024-01-01 12:03:00", type: "MINT", hash: "0xfedcba...4321", amount: "1,000,000,000 SPLASH" },
  ]
  return (
    <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="text-8xl font-bold text-white">L</div>
              <p className="text-2xl text-gray-400 font-light">No KYC. No Lambo. Just splash.</p>
            </div>
          </div>

          {/* Right Side - Token Creation Form */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 space-y-6">
            {/* Token Name */}
            <div className="space-y-2">
              <Label htmlFor="tokenName" className="text-gray-300 text-sm">
                Token Name
              </Label>
              <Input
                id="tokenName"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                className="bg-black border-gray-700 text-white rounded-lg h-12 px-4"
              />
            </div>

            {/* Token Symbol */}
            <div className="space-y-2">
              <Label htmlFor="tokenSymbol" className="text-gray-300 text-sm">
                Token Symbol
              </Label>
              <Input
                id="tokenSymbol"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
                className="bg-black border-cyan-500 text-white rounded-lg h-12 px-4 focus:border-cyan-400"
              />
            </div>

            {/* Decimals and Supply */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="decimals" className="text-gray-300 text-sm">
                  Decimals
                </Label>
                <Input
                  id="decimals"
                  value={decimals}
                  onChange={(e) => setDecimals(e.target.value)}
                  className="bg-black border-green-500 text-white rounded-lg h-12 px-4 focus:border-green-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supply" className="text-gray-300 text-sm">
                  Supply
                </Label>
                <Input
                  id="supply"
                  value={supply}
                  onChange={(e) => setSupply(e.target.value)}
                  className="bg-black border-green-500 text-white rounded-lg h-12 px-4 focus:border-green-400"
                />
              </div>
            </div>

            {/* Token Image Upload */}
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm">Token Image</Label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center space-y-4 hover:border-gray-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                <div className="space-y-1">
                  <p className="text-pink-400 font-medium">Click to upload</p>
                  <p className="text-gray-400 text-sm">or drag and drop</p>
                  <p className="text-gray-500 text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
              </div>
            </div>

            {/* Launch Button */}
            <Button className="w-full bg-black border-2 border-transparent bg-gradient-to-r from-cyan-500 via-green-500 to-pink-500 p-[2px] rounded-full hover:from-cyan-400 hover:via-green-400 hover:to-pink-400 transition-all">
              <span className="bg-black text-white font-semibold py-3 px-6 rounded-full w-full">LAUNCH MY TOKEN</span>
            </Button>
          </div>
        </div>
      </div>
  );
}
