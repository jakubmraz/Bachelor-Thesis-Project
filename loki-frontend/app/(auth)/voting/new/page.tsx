"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, HelpCircle, ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { ballotItems, type Ballot, saveUserBallot, generateBallotId } from "@/lib/ballot-data"
import { formatDateDanish, formatTimeDanish } from "@/lib/date-utils"
import { useVote } from "@/contexts/vote-context"
import { generateBallotHash } from "@/lib/identicon"
import { generatePhrase } from "@/lib/word-phrases"
import { HelpDialog } from "@/components/help-dialog"
import { useTestRun } from "@/contexts/test-run-context"
import { BallotIdenticon } from "@/components/ballot-identicon"

export default function NewVotingPage() {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ballotTimestamp, setBallotTimestamp] = useState("")
  const [ballotId, setBallotId] = useState("")
  const [identiconHash, setIdenticonHash] = useState("")
  const [phrase, setPhrase] = useState("")
  const { setVoteSubmitted } = useVote()
  const { addBallotToActiveTestRun } = useTestRun()

  const handleOptionSelect = (proposalId: string, optionId: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [proposalId]: optionId,
    })
  }

  const handleNext = () => {
    if (currentStep < ballotItems.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Show confirmation step
      setCurrentStep(ballotItems.length)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Generate timestamp for the ballot
    const now = new Date()
    const timestamp = now.toISOString()

    // Generate a ballot ID in the reserved range for user ballots
    const newBallotId = generateBallotId(timestamp, true)

    // Generate the identicon hash
    const hash = generateBallotHash({ timestamp, id: newBallotId })

    // Generate memorable phrase
    const generatedPhrase = generatePhrase(hash)

    setBallotTimestamp(timestamp)
    setBallotId(newBallotId)
    setIdenticonHash(hash)
    setPhrase(generatedPhrase)

    // Create ballot data
    const ballot: Ballot = {
      id: newBallotId,
      timestamp: timestamp,
      votes: ballotItems.map((item) => {
        const selectedOptionId = selectedOptions[item.id]
        const selectedOption = item.options.find((opt) => opt.id === selectedOptionId)
        return {
          proposal: item.title,
          choice: selectedOption?.text || "No selection",
        }
      }),
      identiconHash: hash,
      phrase: generatedPhrase,
    }

    // Save the ballot to localStorage
    try {
      // Save to the submitted ballots list with the exact same ID and timestamp
      // that will be used to generate the identicon
      const publicBallot = {
        id: newBallotId,
        timestamp: timestamp,
        isSubmittedByUser: true,
        identiconHash: hash,
        phrase: generatedPhrase,
      }

      saveUserBallot(publicBallot)

      // Also add to the active test run if one exists
      addBallotToActiveTestRun(publicBallot)
    } catch (error) {
      console.error("Error saving ballot:", error)
    }

    setIsSubmitted(true)
    // Update the context to hide the breadcrumb
    setVoteSubmitted(true)
  }

  const currentProposal = ballotItems[currentStep]
  const isCurrentProposalSelected = currentProposal && selectedOptions[currentProposal.id]
  const allProposalsAnswered = ballotItems.every((item) => selectedOptions[item.id])

  // Format the timestamp in the same way it appears in the verification page
  const formattedDate = ballotTimestamp ? formatDateDanish(ballotTimestamp) : ""
  const formattedTime = ballotTimestamp ? formatTimeDanish(ballotTimestamp) : ""

  return (
    <div className="pb-8">
      {!isSubmitted && (
        <Link href="/voting">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Previous Step
          </Button>
        </Link>
      )}

      {isSubmitted ? (
        <div className="mt-6 space-y-6">
          <div className="flex items-center mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mr-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Vote Successfully Cast</h1>
              <p className="text-gray-600">
                Thank you for participating in the democratic process. Your vote has been recorded securely.
              </p>
            </div>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Your Ballot Information</CardTitle>
              <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mt-4">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="pb-6">
                    <h3 className="font-semibold mb-1 text-blue-600">In Case You Want to Revote Later</h3>
                    <p className="text-sm text-blue-600">
                      You will need to identify this ballot next time if you try to change your vote in this election.
                      It is important you remember the details below.
                      <br/>
                      <strong>Note:</strong> if you provided incorrect information about your previous votes in the earlier steps, this vote will not be valid
                      and you should not select it when revoting.
                    </p>
                  </div>
                </div>
                  <CardContent className="pt-6 p-0 space-y-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium mb-1">
                            Ballot cast on <strong className="text-black">{formattedDate}</strong>
                          </div>
                          <div className="text-sm text-gray-500">
                            at <strong className="text-black">{formattedTime}</strong>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center justify-end mb-1">
                            <div className="text-sm font-medium text-black mr-2">Memory aids</div>
                            <HelpDialog defaultOpenSection="memory-aids">
                              <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
                                <HelpCircle className="h-3 w-3" />
                                <span>What are these?</span>
                              </button>
                            </HelpDialog>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="font-medium">
                              <b>{phrase}</b>
                            </div>
                            <div>
                              {identiconHash ? (
                                <BallotIdenticon
                                  timestamp={ballotTimestamp}
                                  id={ballotId}
                                  size={5}
                                  cellSize={8}
                                  className=""
                                  identiconHash={identiconHash}
                                />
                              ) : (
                                <div className="w-20 h-20 bg-gray-200 rounded-md"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>

                <div className="space-y-4 pt-6">
                      <h3 className="font-medium">Your Selections:</h3>
                      {ballotItems.map((item) => {
                        const selectedOptionId = selectedOptions[item.id]
                        const selectedOption = item.options.find((opt) => opt.id === selectedOptionId)
                        return (
                          <div key={item.id} className="grid grid-cols-2 gap-2 text-sm border-b pb-2">
                            <div className="text-gray-500">{item.title}</div>
                            <div>{selectedOption?.text || "No selection"}</div>
                          </div>
                        )
                      })}
                    </div>
            </CardHeader>            
          </Card>

          {/* Add the Finish and Log Out button */}
          <div className="flex justify-center mt-8">
            <Link href="/logged-out">
              <Button size="lg" className="bg-gray-900">
                Finish and Log Out
              </Button>
            </Link>
          </div>
        </div>
      ) : currentStep < ballotItems.length ? (
        <>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Cast Your Vote</h1>
            <div className="text-sm text-gray-500">
              Question {currentStep + 1} of {ballotItems.length}
            </div>
          </div>

          <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-[#FFD700]"
              style={{ width: `${((currentStep + 1) / ballotItems.length) * 100}%` }}
            ></div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{currentProposal.title}</CardTitle>
              <p className="text-gray-500 mt-1">{currentProposal.description}</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {currentProposal.options.map((option) => (
                  <div
                    key={option.id}
                    className={`flex cursor-pointer items-center rounded-lg border p-4 transition-colors hover:bg-gray-50 ${
                      selectedOptions[currentProposal.id] === option.id
                        ? "border-[#FFD700] bg-yellow-50"
                        : "border-gray-200"
                    }`}
                    onClick={() => handleOptionSelect(currentProposal.id, option.id)}
                  >
                    <div
                      className={`mr-4 flex h-6 w-6 items-center justify-center rounded-full border ${
                        selectedOptions[currentProposal.id] === option.id
                          ? "border-[#FFD700] bg-[#FFD700]"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedOptions[currentProposal.id] === option.id && <Check className="h-4 w-4 text-white" />}
                    </div>
                    <span className="text-lg">{option.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
              Previous
            </Button>
            <Button onClick={handleNext} disabled={!isCurrentProposalSelected}>
              {currentStep === ballotItems.length - 1 ? "Review" : "Next"}
            </Button>
          </div>
        </>
      ) : (
        // Review step
        <div>
          <h1 className="mb-6 text-2xl font-bold">Review Your Votes</h1>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Confirm Your Selections</CardTitle>
              <p className="text-gray-500 mt-1">Please review your votes before final submission</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ballotItems.map((item) => {
                  const selectedOptionId = selectedOptions[item.id]
                  const selectedOption = item.options.find((option) => option.id === selectedOptionId)
                  return (
                    <div key={item.id} className="grid grid-cols-2 gap-2 text-sm border-b pb-4">
                      <div className="font-medium">{item.title}</div>
                      <div>{selectedOption?.text || "No selection"}</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(ballotItems.length - 1)}>
              Back to Questions
            </Button>
            <Button onClick={handleSubmit} disabled={!allProposalsAnswered} className="bg-gray-900 hover:bg-gray-800">
              Submit Vote
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
