"use client"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"

export default function Page() {
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
            <Button size="lg" className="bg-[#FFD700] hover:bg-[#FFED4A] text-black">
              <span>Login to Vote</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
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
                    previously cast valid ballots in order for the newly-cast ballot to be valid. This helps ensure
                    that only you can cast your own vote at any point.
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
    </div>
  )
}

