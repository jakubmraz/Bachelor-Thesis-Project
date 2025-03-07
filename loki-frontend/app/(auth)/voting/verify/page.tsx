"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Check, ArrowRight, AlertTriangle, HelpCircle } from "lucide-react"
import Link from "next/link"
import { type Ballot, generateRandomBallots } from "@/lib/ballot-data"
import { formatDateDanish, formatTimeDanish } from "@/lib/date-utils"
import { HelpDialog } from "@/components/help-dialog"

export default function VerifyPreviousVotePage() {
  const [previousBallots, setPreviousBallots] = useState<Ballot[]>([])
  const [selectedBallot, setSelectedBallot] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load ballots on component mount
  useEffect(() => {
    try {
      // Generate 5 ballots, including the last cast ballot if it exists
      const ballots = generateRandomBallots(5, true)
      setPreviousBallots(ballots)
    } catch (error) {
      console.error("Error loading ballots:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const selectBallot = (ballotId: string) => {
    // If the same ballot is clicked again, deselect it
    if (selectedBallot === ballotId) {
      setSelectedBallot(null)
    } else {
      // Otherwise select the new ballot
      setSelectedBallot(ballotId)
    }
  }

  return (
    <div className="pb-8 space-y-6">
      <Link href="/voting">
        <Button variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </Link>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">Identify Your Last Valid Ballot</h1>
          <HelpDialog defaultOpenSection="last-valid-ballot">
            <button className="text-muted-foreground hover:text-foreground flex items-center gap-1">
              <HelpCircle className="h-4 w-4" />
              What is the last valid ballot?
            </button>
          </HelpDialog>
        </div>
        <p className="text-muted-foreground mb-4">
          Please select the ballot that matches your last valid vote. This step helps ensure the security of your vote
          and protects against coercion.
        </p>

        <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4 mb-6">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Important Security Notice</h3>
              <p className="text-sm text-red-800">
                If you misidentify your last valid ballot, your new vote will not be counted. This is a security feature
                that protects against coerced voting.
              </p>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading your ballot history...</div>
      ) : (
        <div className="grid gap-6">
          {previousBallots.map((ballot) => (
            <Card
              key={ballot.id}
              className={`cursor-pointer transition-colors ${
                selectedBallot === ballot.id ? "border-[#FFD700] bg-yellow-50" : "hover:border-gray-300"
              }`}
              onClick={() => selectBallot(ballot.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                        selectedBallot === ballot.id ? "border-[#FFD700] bg-[#FFD700]" : "border-gray-300"
                      }`}
                    >
                      {selectedBallot === ballot.id && <Check className="h-4 w-4 text-white" />}
                    </div>
                    <CardTitle className="text-lg">Ballot cast on {formatDateDanish(ballot.timestamp)}</CardTitle>
                  </div>
                  <div className="text-sm text-gray-500">{formatTimeDanish(ballot.timestamp)}</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {ballot.votes.map((vote, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">{vote.proposal}</div>
                      <div>{vote.choice}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-8">
        <div className="text-sm text-muted-foreground">
          {selectedBallot === null ? (
            <span className="italic">No ballot selected</span>
          ) : (
            <span>1 ballot selected</span>
          )}
        </div>
        <Link href="/voting/new">
          <Button className="bg-gray-900">
            Continue to Voting
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

