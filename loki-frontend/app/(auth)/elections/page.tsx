"use client"

import type React from "react"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, CheckCircle2, Clock, InfoIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useTestRun } from "@/contexts/test-run-context"
import { formatDateDanish } from "@/lib/date-utils"

export default function ElectionsPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { isTestRunActive, activeTestRun } = useTestRun()

  // Calculate days remaining until election end
  const daysRemaining = useMemo(() => {
    if (!activeTestRun) return 10 // Default value

    const now = new Date()
    const endDate = new Date(activeTestRun.electionEnd)
    const diffTime = Math.abs(endDate.getTime() - now.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }, [activeTestRun])

  // Format dates for display
  const electionDates = useMemo(() => {
    if (!activeTestRun) {
      return {
        startDate: "2025-03-01",
        endDate: "2025-06-15",
      }
    }

    return {
      startDate: activeTestRun.electionStart,
      endDate: activeTestRun.electionEnd,
    }
  }, [activeTestRun])

  // In a real application, this would come from an API
  const activeElections = [
    {
      id: "general-2025",
      title: "2025 General Election",
      description: "Vote for the parliament and the next president.",
      startDate: electionDates.startDate,
      endDate: electionDates.endDate,
      status: "active",
    },
    // More elections would be listed here in a real application
  ]

  const pastElections = [
    {
      id: "local-2024",
      title: "2024 Local Elections",
      description: "Vote for your local municipality representatives.",
      startDate: "2024-11-01",
      endDate: "2024-11-15",
      status: "completed",
    },
  ]

  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setDialogOpen(true)
  }

  return (
    <div className="py-8 space-y-12">
      {/* Active Elections Section */}
      <section>
        <h1 className="text-2xl font-bold mb-6">Available Elections</h1>
        <p className="text-muted-foreground mb-8">Select an election to cast or modify your vote.</p>

        <div className="grid gap-6">
          {activeElections.map((election) => (
            <Card key={election.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{election.title}</CardTitle>
                    <CardDescription className="mt-1">{election.description}</CardDescription>
                  </div>
                  {election.status === "active" && (
                    <div className="flex items-center text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Active
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span>
                    {formatDateDanish(election.startDate)} - {formatDateDanish(election.endDate)}
                  </span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Closes in {daysRemaining} days</span>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t py-4">
                <div className="w-full flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {election.status === "active" ? "You can vote or modify your vote until the election closes" : ""}
                  </div>
                  <Link href="/voting">
                    <Button disabled={!isTestRunActive}>Enter Election</Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Past Elections Section */}
      <section>
        <h2 className="text-xl font-bold mb-6">Past Elections</h2>
        <p className="text-muted-foreground mb-8">View results from previous elections.</p>

        <div className="grid gap-6">
          {pastElections.map((election) => (
            <Card key={election.id} className="overflow-hidden bg-gray-100 border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{election.title}</CardTitle>
                    <CardDescription className="mt-1">{election.description}</CardDescription>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded-full">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Completed
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span>
                    {formatDateDanish(election.startDate)} - {formatDateDanish(election.endDate)}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-200 border-t py-4">
                <div className="w-full flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">Final results are available</div>
                  <Button variant="outline" onClick={handleDemoClick}>
                    View Results
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Archived Elections Section */}
      <section>
        <h2 className="text-xl font-bold mb-6">Archived Elections</h2>
        <p className="text-muted-foreground mb-8">Access historical election data from the archives.</p>

        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="py-6">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="text-gray-500">Access historical election data from previous years</div>
              <Button variant="outline" onClick={handleDemoClick}>
                View Archived Elections
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Demo Feature Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <InfoIcon className="h-5 w-5 text-blue-500" />
              Demo Feature
            </DialogTitle>
            <DialogDescription className="pt-2">
              This feature is just for show and isn't implemented in this demo.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
