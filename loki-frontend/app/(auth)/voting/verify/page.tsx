"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Check, Info, ArrowRight, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function VerifyPreviousVotePage() {
  // In a real app, these would be fetched from the server
  // They would include both real and noise ballots
  const previousBallots = [
    {
      id: "ballot-1",
      timestamp: "2024-02-28T14:30:00Z",
      votes: [
        { proposal: "City Budget Allocation", choice: "Infrastructure improvements" },
        { proposal: "Public Transportation", choice: "Electric bus fleet" },
        { proposal: "City Park Development", choice: "Community gardens" },
      ],
    },
    {
      id: "ballot-2",
      timestamp: "2024-02-28T15:45:00Z",
      votes: [
        { proposal: "City Budget Allocation", choice: "Education funding" },
        { proposal: "Public Transportation", choice: "Bike lane network" },
        { proposal: "City Park Development", choice: "Recreational facilities" },
      ],
    },
    {
      id: "ballot-3",
      timestamp: "2024-02-28T16:15:00Z",
      votes: [
        { proposal: "City Budget Allocation", choice: "Public healthcare" },
        { proposal: "Public Transportation", choice: "Subway line extension" },
        { proposal: "City Park Development", choice: "Natural conservation area" },
      ],
    },
  ]

  const [selectedBallots, setSelectedBallots] = useState<string[]>([])

  const toggleBallot = (ballotId: string) => {
    setSelectedBallots((prev) => (prev.includes(ballotId) ? prev.filter((id) => id !== ballotId) : [...prev, ballotId]))
  }

  return (
    <div className="space-y-2 pb-8">
      <Link href="/voting">
        <Button variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </Link>

      <div className="space-y-4">
        <div className="rounded-lg bg-yellow-50 border border-[#FFD700] p-4">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Identify Your Previous Votes</h3>
              <p className="text-sm text-gray-600">
                Please select the ballot(s) that match your previous voting choices. This step helps ensure the security
                of your vote.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Important Security Notice</h3>
              <p className="text-sm text-red-800">
                If you misidentify your previous ballots, your new vote will not be counted. This is a security feature
                that protects against coerced voting.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {previousBallots.map((ballot) => (
          <Card
            key={ballot.id}
            className={`cursor-pointer transition-colors ${
              selectedBallots.includes(ballot.id) ? "border-[#FFD700] bg-yellow-50" : "hover:border-gray-300"
            }`}
            onClick={() => toggleBallot(ballot.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                      selectedBallots.includes(ballot.id) ? "border-[#FFD700] bg-[#FFD700]" : "border-gray-300"
                    }`}
                  >
                    {selectedBallots.includes(ballot.id) && <Check className="h-4 w-4 text-white" />}
                  </div>
                  <CardTitle className="text-lg">
                    Ballot cast on {new Date(ballot.timestamp).toLocaleDateString()}
                  </CardTitle>
                </div>
                <div className="text-sm text-gray-500">{new Date(ballot.timestamp).toLocaleTimeString()}</div>
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

      <div className="flex justify-end gap-4 mt-8 pt-4">
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

