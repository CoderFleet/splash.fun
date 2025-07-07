"use client"

import { useMintLog } from "@/contexts/MintLogContext"
import ActivityItem from "./ActivityItem"
import { MintActivity } from "./types"

const activities: MintActivity[] = [
  {
    time: "2024-01-01 12:00:00",
    type: "MINT",
    hash: "0x123456...cdef",
    amount: "1,000,000,000",
    token: "SPLASH"
  },
  {
    time: "2024-01-01 12:01:00",
    type: "TXN",
    hash: "0xabcdef...7890",
    status: "Confirmed"
  },
  {
    time: "2024-01-01 12:02:00",
    type: "TXN",
    hash: "0x987654...fedcba",
    status: "Confirmed"
  },
  {
    time: "2024-01-01 12:03:00",
    type: "MINT",
    hash: "0xfedcba...4321",
    amount: "1,000,000,000",
    token: "SPLASH"
  }
]

export default function MintActivities() {
    const {logs} = useMintLog()

  return (
    <div className="space-y-6">
      <h2 className="text-white text-xl font-semibold">Mint Activities:</h2>

      <div className="bg-black/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
        <div className="relative h-50 overflow-scroll flex flex-col justify-end font-mono text-xs space-y-1 text-gray-300">
          {logs.map((activity, index) => (
            <ActivityItem key={index} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  )
}
