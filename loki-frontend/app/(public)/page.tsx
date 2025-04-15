"use client"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import { useState } from "react"
import { useTestRun } from "@/contexts/test-run-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Calendar } from "lucide-react"
import { formatDateDanish } from "@/lib/date-utils"

export default function Page() {
  const [testStartDialogOpen, setTestStartDialogOpen] = useState(false)
  const [testLoadDialogOpen, setTestLoadDialogOpen] = useState(false)
  const [testRunId, setTestRunId] = useState("")
  const [lastStartedTestRun, setLastStartedTestRun] = useState<number | null>(null)

  const { beginTestRun, loadTestRun, isTestRunActive, testRuns, activeTestRun } = useTestRun()

  const handleTestRunStart = async () => {
    const newTestRunId = await beginTestRun()
    setLastStartedTestRun(newTestRunId)
    setTestStartDialogOpen(true)
  }

  const handleTestRunLoad = () => {
    const numericId = Number.parseInt(testRunId, 10)
    if (!isNaN(numericId)) {
      loadTestRun(numericId)
      setTestLoadDialogOpen(false)
      setTestRunId("")
    }
  }

  return (
    <div className="flex flex-col items-center pt-8 relative min-h-[80vh]">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Denmark's Online Voting Portal</h1>
        <p className="text-lg text-gray-600 mb-8">
          Your secure platform for participating in democratic decision-making
        </p>
        <div className="flex justify-center">
          <Link href="/login">
            <Button
              size="lg"
              className={
                isTestRunActive
                  ? "bg-[#FFD700] hover:bg-[#FFED4A] text-black"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }
              disabled={!isTestRunActive}
            >
              <span>Login to Vote</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        {!isTestRunActive && (
          <div className="mt-2 text-sm text-gray-500">Test run required to enable voting features</div>
        )}
      </div>

      {/* Banner Image */}
      <div className="w-full max-w-2xl mb-8 relative">
        <div className="aspect-[4/1] relative w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <Image
            src="/landingpage_banner.png?height=168&width=672&text=Election+Banner+Image"
            alt="Election banner"
            fill
            className="object-fill"
            priority
          />
        </div>
      </div>

      {/* Information Section */}
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">Before You Vote:</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="privacy">
            <AccordionTrigger>Ensure You're in a Private Environment</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <p>For your security and voting privacy, please ensure:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>You are in a private space where no one can observe your screen</li>
                  <li>No one is watching over your shoulder</li>
                  <li>
                    Your computer's activity is not being monitored or recorded (e.g., by workplace monitoring software
                    or screen recording tools)
                  </li>
                  <li>You are not in a public space or using a public computer</li>
                  <li>You are not connected via an insecure or public Wi-Fi connection</li>
                </ul>
                <p className="mt-4 text-muted-foreground">
                  Your vote is private and should remain so. Take precautions to ensure no one can influence or observe
                  your voting choices.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="coercion">
            <AccordionTrigger>Get to Know our Anti-Coercion Measures</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <p>
                  The Online Voting Portal has numerous features to protect you from voter coercion and intimidation.
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>Revoting:</strong> The system allows you to cast a new ballot at any point during the voting
                    period. Only your last valid ballot counts. Note that physical ballots cast in person are final and
                    do not allow for revoting.
                  </li>
                  <li>
                    <strong>Past Ballot Identification:</strong> The revoting mechanism requires you to identify your
                    previously cast valid ballots in order for the newly-cast ballot to be valid. This helps ensure that
                    only you can cast your own vote at any point.
                  </li>
                  <li>
                    <strong>Intentional Ballot Invalidation:</strong> If you find yourself in a situation where a
                    coercer is forcing you to vote a certain way, you have multiple discreet options at your disposal to
                    invalidate the new ballot.
                  </li>
                  <li>
                    <strong>For further information, click the Help button in the top right corner of the page.</strong>
                  </li>
                </ul>
                <p className="mt-4 text-muted-foreground">
                  Everyone has the right to a secret ballot. However, online voting systems cannot guarantee this to the
                  same degree as an official polling station. These measures help ensure that your intended vote is the
                  one that counts, even under coercion. It is also possible to vote secretly in person at your local
                  polling station.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="authentication">
            <AccordionTrigger>Authentication Requirements</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <p>To vote online, you need:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>A smartphone with MitID app installed</li>
                  <li>Biometric authentication (fingerprint or face recognition) enabled on your device</li>
                  <li>An up-to-date version of MitID</li>
                </ul>
                <p className="mt-4">
                  If you cannot meet these requirements, please visit your local voting station to cast your vote in
                  person.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="requirements">
            <AccordionTrigger>System Requirements</AccordionTrigger>
            <AccordionContent>
              To ensure a smooth voting experience, use a modern web browser like Chrome, Firefox, or Safari. Enable
              JavaScript and make sure you have a stable internet connection.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="help">
            <AccordionTrigger>Need Help?</AccordionTrigger>
            <AccordionContent>
              If you need assistance with MitID setup or have questions about the voting process, you can click the Help
              button in the top right section of the page, call us at 00 00 00 00 (24h hotline), or contact your local
              voting authority.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Test Run Controls Section - Added below the accordion */}
      <div className="w-full max-w-2xl mt-8 border-t border-dashed border-gray-300 pt-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-blue-500">Testing Mode</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Development Only</span>
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Button
            onClick={handleTestRunStart}
            variant="outline"
            className="bg-blue-50 border-blue-200 hover:bg-blue-100"
          >
            Begin Test Run
          </Button>

          <Button
            onClick={() => setTestLoadDialogOpen(true)}
            variant="outline"
            className="bg-blue-50 border-blue-200 hover:bg-blue-100"
          >
            Load Test Run
          </Button>
        </div>

        {/* Test Run Status */}
        {isTestRunActive && activeTestRun && (
          <div className="mt-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-800">Test Run #{activeTestRun.id} Active</h3>
                </div>
                <div className="text-sm text-blue-700 font-medium">
                  {activeTestRun.ballots.length} ballot{activeTestRun.ballots.length !== 1 ? "s" : ""}
                </div>
              </div>
              <div className="flex items-center text-sm text-blue-700">
                <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>
                  {formatDateDanish(activeTestRun.electionStart)} - {formatDateDanish(activeTestRun.electionEnd)}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 text-sm text-blue-600">
          {!isTestRunActive && (
            <div className="bg-amber-50 text-amber-800 p-3 rounded border border-amber-200">
              Start or load a test run to enable the voting features.
            </div>
          )}
        </div>
      </div>

      {/* Test Started Dialog */}
      <Dialog open={testStartDialogOpen} onOpenChange={setTestStartDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Test Successfully Began
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>A new test run has been started with the following details:</div>
            <div className="bg-gray-50 p-3 rounded border">
              <div>
                <strong>Test Run ID: {lastStartedTestRun}</strong>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Election start time: 8:00 AM today
                <br />
                Election end time: +3 days from start
              </div>
            </div>
            <div>
              Noise ballots have been generated from the election start time until now. You can now proceed to vote.
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setTestStartDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Load Test Run Dialog */}
      <Dialog open={testLoadDialogOpen} onOpenChange={setTestLoadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Load Test Run</DialogTitle>
            <DialogDescription>Enter the ID of the test run you want to load.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Test Run ID"
                value={testRunId}
                onChange={(e) => setTestRunId(e.target.value)}
              />

              {testRuns.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  Available test runs: {testRuns.map((run) => run.id).join(", ")}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setTestLoadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleTestRunLoad}>Load Test Run</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
