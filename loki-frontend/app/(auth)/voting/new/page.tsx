"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check, ChevronRight, HelpCircle, Info, ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { ballotItems, type Ballot, saveUserBallot, generateBallotId } from "@/lib/ballot-data"
import { formatDateDanish, formatTimeDanish } from "@/lib/date-utils"
import { useVote } from "@/contexts/vote-context"
import { BallotIdenticon } from "@/components/ballot-identicon"
import { generateBallotHash } from "@/lib/identicon"
import { generatePhrase } from "@/lib/word-phrases"
import { HelpDialog } from "@/components/help-dialog"

export default function NewVotingPage() {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ballotTimestamp, setBallotTimestamp] = useState("")
  const [ballotId, setBallotId] = useState("")
  const [identiconHash, setIdenticonHash] = useState("")
  const [phrase, setPhrase] = useState("")
  const { setVoteSubmitted } = useVote()

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
      saveUserBallot({
        id: newBallotId,
        timestamp: timestamp,
        isSubmittedByUser: true,
        identiconHash: hash,
        phrase: generatedPhrase,
      })
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
              <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-2 flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-800">
                  If you plan to revote later, you'll need to identify this ballot by the <strong>date and time</strong>{" "}
                  shown below. Please take note of this information.
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
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
                          <span>What's this?</span>
                        </button>
                      </HelpDialog>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="font-medium"><b>{phrase}</b></div>
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

              <div className="space-y-4">
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

              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-4">
                <div className="flex gap-3">
                  <Info className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Important: Remember Your Ballot Details</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      To identify this ballot if you need to revote later, you must remember:
                    </p>
                    <ol className="list-decimal pl-5 text-sm text-gray-600 space-y-1">
                      <li>
                        Date: <strong className="text-black">{formattedDate}</strong>
                      </li>
                      <li>
                        Time: <strong className="text-black">{formattedTime}</strong>
                      </li>
                    </ol>

                    <p className="text-sm text-gray-600 mt-3">
                      The colored pattern square and word phrase ("<strong>{phrase}</strong>") are visual aids to help
                      you recognize your ballot more easily, but remembering the date and time is sufficient. For your
                      privacy, we recommend not saving or sharing this information.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Link href="/logged-out">
                <Button size="lg">Log Out and Return</Button>
              </Link>
            </CardFooter>
          </Card>
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
              <CardDescription>{currentProposal.description}</CardDescription>
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
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                Previous
              </Button>
              <Button onClick={handleNext} disabled={!isCurrentProposalSelected}>
                {currentStep === ballotItems.length - 1 ? "Review" : "Next"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <div className="rounded-lg bg-gray-50 p-4">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 text-gray-500" />
              <div>
                <h3 className="font-semibold">Voting Information</h3>
                <p className="text-sm text-gray-600">
                  Your vote is anonymous and secure. You can navigate between questions using the buttons below each
                  question.
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        // Review step
        <div>
          <h1 className="mb-6 text-2xl font-bold">Review Your Votes</h1>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Confirm Your Selections</CardTitle>
              <CardDescription>Please review your votes before final submission</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {ballotItems.map((item, index) => {
                  const selectedOption = item.options.find((option) => option.id === selectedOptions[item.id])
                  return (
                    <AccordionItem key={item.id} value={item.id}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-4 text-left">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFD700] text-xs font-bold text-black">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-sm font-normal text-gray-500">Selected: {selectedOption?.text}</div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-10">
                          <p className="mb-2 text-gray-600">{item.description}</p>
                          <Button variant="outline" size="sm" onClick={() => setCurrentStep(index)} className="mt-2">
                            Change selection
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(ballotItems.length - 1)}>
                Back to Questions
              </Button>
              <Button onClick={handleSubmit} disabled={!allProposalsAnswered} className="bg-gray-900 hover:bg-gray-800">
                Submit Vote
              </Button>
            </CardFooter>
          </Card>

          <div className="rounded-lg bg-gray-50 p-4">
            <div className="flex items-start gap-3">
              <HelpCircle className="mt-0.5 h-5 w-5 text-gray-500" />
              <div>
                <h3 className="font-semibold">Important Note</h3>
                <p className="text-sm text-gray-600">
                  Once submitted, your vote cannot be changed. Please ensure all selections reflect your intended
                  choices.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

