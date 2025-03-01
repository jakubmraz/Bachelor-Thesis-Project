"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check, ChevronRight, HelpCircle, Info, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewVotingPage() {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const ballotItems = [
    {
      id: "proposal-1",
      title: "City Budget Allocation",
      description: "How should the city allocate its budget surplus?",
      options: [
        { id: "option-1-1", text: "Infrastructure improvements" },
        { id: "option-1-2", text: "Education funding" },
        { id: "option-1-3", text: "Public healthcare" },
        { id: "option-1-4", text: "Environmental initiatives" },
      ],
    },
    {
      id: "proposal-2",
      title: "Public Transportation Expansion",
      description: "Which public transportation project should be prioritized?",
      options: [
        { id: "option-2-1", text: "Subway line extension" },
        { id: "option-2-2", text: "Electric bus fleet" },
        { id: "option-2-3", text: "Bike lane network" },
        { id: "option-2-4", text: "High-speed rail connection" },
      ],
    },
    {
      id: "proposal-3",
      title: "City Park Development",
      description: "What should be the focus of the new city park development?",
      options: [
        { id: "option-3-1", text: "Recreational facilities" },
        { id: "option-3-2", text: "Natural conservation area" },
        { id: "option-3-3", text: "Community gardens" },
        { id: "option-3-4", text: "Cultural event space" },
      ],
    },
  ]

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
    // In a real application, this would send the vote to a server
    console.log("Submitting votes:", selectedOptions)
    setIsSubmitted(true)
  }

  const currentProposal = ballotItems[currentStep]
  const isCurrentProposalSelected = currentProposal && selectedOptions[currentProposal.id]
  const allProposalsAnswered = ballotItems.every((item) => selectedOptions[item.id])

  return (
    <div className="">
      <Link href="/voting">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Previous Step
        </Button>
      </Link>

      {isSubmitted ? (
        <div className="mt-12 flex flex-col items-center">
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
            <Check className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="mb-4 text-2xl font-bold">Vote Successfully Cast</h1>
          <p className="mb-8 text-center text-gray-600">
            Thank you for participating in the democratic process. Your vote has been recorded securely.
          </p>
          <Link href="/">
            <Button size="lg">Return to Home</Button>
          </Link>
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
                <h3 className="font-semibold">About revoting</h3>
                <p className="text-sm text-gray-600">
                  This system allows you to vote again to change your vote. This however requires you to remember and later
                  identify your previously cast votes. For your convenience, please ensure all selections reflect your intended choices.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

