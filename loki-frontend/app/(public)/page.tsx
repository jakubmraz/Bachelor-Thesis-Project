"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Trash2, InfoIcon, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { generateRandomBallots } from "@/lib/ballot-data"

export default function Page() {
  const [debugMessage, setDebugMessage] = useState("")

  // Function to flush ballot history and generate random ballots
  const flushHistory = () => {
    try {
      // Clear existing ballots
      localStorage.removeItem("userBallots")

      // Generate 3 random ballots
      const randomBallots = generateRandomBallots(3)

      // Save random ballots
      localStorage.setItem("userBallots", JSON.stringify(randomBallots))

      setDebugMessage("History flushed and 3 random ballots generated")
      setTimeout(() => setDebugMessage(""), 3000) // Clear message after 3 seconds
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error flushing history:", error)
        setDebugMessage("Error: " + error.message)
      } else {
        setDebugMessage("An unknown error occurred")
      }
      setTimeout(() => setDebugMessage(""), 3000)
    }
  }

  return (
    <div className="flex flex-col items-center pt-8 relative min-h-[80vh]">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Online Voting Portal</h1>
        <p className="text-lg text-gray-600 mb-8">
          Your secure platform for participating in democratic decision-making
        </p>
        <div className="flex justify-center">
          <Link href="/privacy-notice">
            <Button size="lg" className="bg-[#FFD700] hover:bg-[#FFED4A] text-black">
              <span>Login to Vote</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
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

          <AccordionItem value="phishing">
            <AccordionTrigger>Ensure You're on the Official Voting Site</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <p>Hackers may attempt to impersonate the voting portal to steal your credentials or manipulate your vote. This is known as "phishing." To protect yourself, please verify the following:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Check the web address:</strong> Make sure you are on the official voting site. The correct URL will always be <strong>https://votingwebsiteurl.dk</strong>. Avoid clicking links from emails or messages; type the URL manually if possible.</li>
                  <li><strong>Look for HTTPS:</strong> Depending on your browser, the address bar should provide connection informtion. This is usually found on the left of the web address under one of these icons: 🔒, <InfoIcon className="h-3 w-3 inline-block" />, <Settings2 className="h-3 w-3 inline-block" />.
                  Clicking the icon will show you information about the website's security. If you see warnings about an insecure site, do not proceed.</li>
                  <li><strong>Beware of fake login methods:</strong> The voting portal <strong>only</strong> uses MyID for authentication and will never ask for your password via email or text.</li>
                  <li><strong>Watch out for suspicious messages:</strong> If you receive an email or message asking you to vote on a different website, it may be a phishing attempt. Contact official support if in doubt.</li>
                </ul>
                <p className="mt-4 text-muted-foreground">
                  If you suspect a phishing attempt, report it immediately to the election authorities at report@governmentemail.dk.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="coercion">
            <AccordionTrigger>Get to Know our Anti-Coercion Measures</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <p>The Online Voting Portal has numerous features to protect you from voter coercion and intimidation.</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Revoting:</strong> The system allows you to cast a new ballot at any point during the voting period. 
                  Only your last valid ballot counts. Note that physical ballots cast in person are final and do not allow for revoting.</li>
                  <li><strong>Past Ballot Identification:</strong> The revoting mechanism requires you to identify your last previously
                  cast valid ballot in order for the newly-cast ballot to be valid. This helps ensure that only you can cast your own vote at any point.</li>
                  <li><strong>Intentional Ballot Invalidation:</strong> If you find yourself in a situation where a coercer is forcing you to vote a certain way,
                  you have multiple discrete options at your disposal to invalidate the new ballot.</li>
                  <li><strong>For further information, click the Help button in the top right corner of the page.</strong></li>
                </ul>
                <p className="mt-4 text-muted-foreground">
                  Everyone has the right to a secret ballot. However, online voting systems cannot guarantee this to the same degree as an
                  official polling station. These measures help ensure that your intended vote is the one that counts, even under coercion.
                  It is also possible to vote secretly in person at your local polling station.
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
                  <li>A smartphone with MyID app installed</li>
                  <li>Biometric authentication (fingerprint or face recognition) enabled on your device</li>
                  <li>An up-to-date version of MyID</li>
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
              If you need assistance with MyID setup or have questions about the voting process, you can click the Help button
              in the top right section of the page, call us at 00 00 00 00 (24h hotline), or contact your local voting authority.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Debug button in bottom right corner */}
      <div className="absolute bottom-4 right-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-gray-600 flex items-center gap-1"
          onClick={flushHistory}
        >
          <Trash2 className="h-3 w-3" />
          <span className="text-xs">Flush History</span>
        </Button>
        {debugMessage && (
          <div className="absolute bottom-10 right-0 bg-black text-white text-xs p-2 rounded whitespace-nowrap">
            {debugMessage}
          </div>
        )}
      </div>
    </div>
  )
}

