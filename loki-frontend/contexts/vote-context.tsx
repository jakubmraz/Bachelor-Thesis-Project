"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface VoteContextType {
  isVoteSubmitted: boolean
  setVoteSubmitted: (value: boolean) => void
}

const VoteContext = createContext<VoteContextType | undefined>(undefined)

export function VoteProvider({ children }: { children: ReactNode }) {
  const [isVoteSubmitted, setVoteSubmitted] = useState(false)

  return <VoteContext.Provider value={{ isVoteSubmitted, setVoteSubmitted }}>{children}</VoteContext.Provider>
}

export function useVote() {
  const context = useContext(VoteContext)
  if (context === undefined) {
    throw new Error("useVote must be used within a VoteProvider")
  }
  return context
}

