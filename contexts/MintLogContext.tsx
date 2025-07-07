"use client"

import { createContext, useContext, useState } from "react"
import { MintActivity } from "@/components/MintActivities/types"

interface LogContextType {
  logs: MintActivity[]
  log: (entry: MintActivity) => void
  clear: () => void
}

const MintLogContext = createContext<LogContextType | null>(null)

export const useMintLog = () => {
  const context = useContext(MintLogContext)
  if (!context) throw new Error("useMintLog must be used within MintLogProvider")
  return context
}

export function MintLogProvider({ children }: { children: React.ReactNode }) {
  const [logs, setLogs] = useState<MintActivity[]>([])

  const log = (entry: MintActivity) => {
    setLogs((prev) => [...prev, entry])
  }

  const clear = () => setLogs([])

  return (
    <MintLogContext.Provider value={{ logs, log, clear }}>
      {children}
    </MintLogContext.Provider>
  )
}
