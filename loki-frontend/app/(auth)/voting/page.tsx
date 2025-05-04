"use client"

import { Button } from "@/components/ui/button"
import { Shield, HelpCircle } from "lucide-react"
import Link from "next/link"
import { HelpDialog } from "@/components/help-dialog"

export default function VotingEntryPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">Have you voted before in this election?</h1>
          <HelpDialog defaultOpenSection="ballot-verification-security">
            <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
              <HelpCircle className="h-4 w-4" />
              Why is this necessary?
            </button>
          </HelpDialog>
        </div>
        <p className="text-muted-foreground">
          To make sure only you can cast your vote, please let us know if you have voted before in this election.
        </p>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-start gap-2">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1"><strong>Anti-Coercion Feature — every user sees this regardless of whether they've voted before or not</strong></p>
              <p>
                This security measure ensures that only you can modify your vote.
                <br />
                Your vote will only count if you correctly identify your voting history.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/voting/new" className="block">
          <Button
            variant="outline"
            className="w-full h-32 flex flex-col items-center justify-center gap-2 text-left p-4"
          >
            <div className="font-semibold">No, this is my first vote</div>
            <div className="text-sm text-muted-foreground">I haven't voted in this election yet</div>
          </Button>
        </Link>
        <Link href="/voting/verify" className="block">
          <Button
            variant="outline"
            className="w-full h-32 flex flex-col items-center justify-center gap-2 text-left p-4"
          >
            <div className="font-semibold">Yes, I've voted before</div>
            <div className="text-sm text-muted-foreground">I want to verify my previous ballots and revote</div>
          </Button>
        </Link>
      </div>

      <p className="text-sm text-center text-muted-foreground">
        Choose "Yes" if you want to change a vote you've already cast
      </p>
    </div>
  )
}
