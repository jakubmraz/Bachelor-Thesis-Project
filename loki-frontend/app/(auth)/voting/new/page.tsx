"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check, ChevronRight, HelpCircle, Info, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ballotItems, type Ballot } from "@/lib/ballot-data"
import { formatDateDanish, formatTimeDanish } from "@/lib/date-utils"

export default function NewVotingPage() {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ballotTimestamp, setBallotTimestamp] = useState("")

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
    setBallotTimestamp(now.toISOString())

    // Create ballot data
    const ballotData: Ballot = {
      id: `ballot-${Date.now()}`,
      timestamp: now.toISOString(),
      votes: ballotItems.map((item) => {
        const selectedOptionId = selectedOptions[item.id]
        const selectedOption = item.options.find((opt) => opt.id === selectedOptionId)
        return {
          proposal: item.title,
          choice: selectedOption?.text || "No selection",
        }
      }),
    }

    // Store in localStorage for demo purposes
    try {
      // Get existing ballots or initialize empty array
      const existingBallotsString = localStorage.getItem("userBallots")
      const existingBallots = existingBallotsString ? JSON.parse(existingBallotsString) : []

      // Add new ballot
      const updatedBallots = [...existingBallots, ballotData]

      // Save back to localStorage
      localStorage.setItem("userBallots", JSON.stringify(updatedBallots))
    } catch (error) {
      console.error("Error saving ballot:", error)
    }

    setIsSubmitted(true)
  }

  const currentProposal = ballotItems[currentStep]
  const isCurrentProposalSelected = currentProposal && selectedOptions[currentProposal.id]
  const allProposalsAnswered = ballotItems.every((item) => selectedOptions[item.id])

  // Format the timestamp in the same way it appears in the verification page
  const formattedDate = ballotTimestamp ? formatDateDanish(ballotTimestamp) : ""
  const formattedTime = ballotTimestamp ? formatTimeDanish(ballotTimestamp) : ""

  return (
    <div className="pt-6 pb-8">
      <Link href="/voting">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Previous Step
        </Button>
      </Link>

      {isSubmitted ? (
        <div className="mt-6 space-y-6">
          <div className="flex flex-col items-center">
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="mb-4 text-2xl font-bold">Vote Successfully Cast</h1>
            <p className="mb-8 text-center text-gray-600 max-w-md">
              Thank you for participating in the democratic process. Your vote has been recorded securely.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Your Ballot Information</CardTitle>
              <CardDescription>
                This information may help you identify your ballot if you need to revote later.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="font-medium mb-1">Ballot cast on {formattedDate}</div>
                <div className="text-sm text-gray-500">at {formattedTime}</div>
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

              <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mt-4">
                <div className="flex gap-3">
                  <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Important Privacy Notice</h3>
                    <p className="text-sm text-gray-600">
                      For your privacy, we recommend not saving or sharing this information unless you plan to revote.
                      The system is designed to protect your voting privacy even if you cannot recall your previous
                      ballot.
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

