"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Space_Grotesk } from "next/font/google";
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});


export default function Component() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get("name") ?? "N/A";
  const mintAddress = searchParams.get("mintAddress") ?? "N/A";
  const tokenAccount = searchParams.get("tokenAccount") ?? "N/A";
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const tokenData = {
    name,
    mintAddress,
    address: tokenAccount,
  };

    return (<>

      {/* Success Card with Glow */}
      <div className={`max-w-2xl mx-auto ${grotesk.className}`}>
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-green-500/20 rounded-2xl blur-xl"></div>
          <Card className="relative bg-black border-2 border-green-400 p-8 mb-8 rounded-2xl shadow-2xl shadow-green-500/25">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-green-400 mb-4 tracking-wide">
                SUCCESS!
              </h1>
              <p className="text-gray-400 text-lg">
                Your token has been unleashed upon the digital cosmos.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {/* Token Name */}
              <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-green-400 text-sm font-mono mb-2 font-semibold">
                      {"> TOKEN NAME"}
                    </div>
                    <div className="text-white font-mono text-lg">
                      {tokenData.name}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(tokenData.name, "name")}
                    className="text-gray-500 hover:text-green-400 hover:bg-gray-800 rounded-lg">
                    {copiedField === "name" ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Token Address */}
              <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-green-400 text-sm font-mono mb-2 font-semibold">
                      {"> TOKEN ADDRESS"}
                    </div>
                    <div className="text-white font-mono text-sm break-all">
                      {tokenData.address}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      copyToClipboard(tokenData.address, "address")
                    }
                    className="text-gray-500 hover:text-green-400 hover:bg-gray-800 ml-3 flex-shrink-0 rounded-lg">
                    {copiedField === "address" ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Token Mint Address */}
              <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-green-400 text-sm font-mono mb-2 font-semibold">
                      {"> TOKEN MINT ADDRESS"}
                    </div>
                    <div className="text-white font-mono text-sm break-all">
                      {tokenData.mintAddress}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      copyToClipboard(tokenData.mintAddress, "mintAddress")
                    }
                    className="text-gray-500 hover:text-green-400 hover:bg-gray-800 ml-3 flex-shrink-0 rounded-lg">
                    {copiedField === "mintAddress" ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={() =>
                  window.open(
                    `https://explorer.solana.com/address/${mintAddress}?cluster=devnet`,
                    "_blank"
                  )
                }
                className="flex-1 bg-transparent border-2 border-gray-600 text-white hover:border-gray-500 hover:bg-gray-900/50 rounded-full py-3 font-semibold text-sm tracking-wide transition-all duration-200 cursor-pointer"
                style={{
                  background:
                    "linear-gradient(45deg, transparent, rgba(255,255,255,0.05), transparent)",
                  borderImage:
                    "linear-gradient(45deg, #374151, #6b7280, #374151) 1",
                }}>
                VIEW ON EXPLORER
              </Button>
              <Button
                onClick={() => router.push("/")}
                className="cursor-pointer flex-1 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black font-bold rounded-full py-3 text-sm tracking-wide transition-all duration-200 shadow-lg shadow-green-500/25">
                CREATE ANOTHER
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
