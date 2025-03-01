"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { HelpCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function VotingEntryPage() {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <div className="space-y-6 pt-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Have you voted before?</h1>
          <p className="text-muted-foreground">Please let us know if you have voted before in this election.</p>
        </div>
        <Dialog open={showHelp} onOpenChange={setShowHelp}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <HelpCircle className="h-5 w-5" />
              <span className="sr-only">Help</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>About Revoting</DialogTitle>
              <DialogDescription asChild>
                <div className="pt-4 space-y-4">
                  <div>
                    This voting system allows you to change your vote at any time. This is a security feature that
                    protects your right to vote freely.
                  </div>
                  <div>
                    If you have voted before, you'll need to identify your previous ballot(s) to confirm your identity.
                    This ensures that only you can change your own vote.
                  </div>
                  <div>If this is your first time voting, you can proceed directly to the voting interface.</div>
                  <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm font-medium text-yellow-800">
                      Important: If you misidentify your previous ballots, your new vote will not be counted. This is a
                      security feature that protects against coerced voting.
                    </div>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
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
            <div className="text-sm text-muted-foreground">I want to verify my previous ballot and revote</div>
          </Button>
        </Link>
      </div>

      <p className="text-sm text-center text-muted-foreground">
        Choose "Yes" if you want to change a vote you've already cast
      </p>
    </div>
  )
}

