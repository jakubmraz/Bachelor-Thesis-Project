import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Page() {
  return (
    <div className="flex flex-col items-center pt-8">
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
                </ul>
                <p className="mt-4 text-muted-foreground">
                  Your vote is private and should remain so. Take precautions to ensure no one can influence or observe
                  your voting choices.
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
              If you need assistance with MyID setup or have questions about the voting process, visit our Help page or
              contact your local voting authority.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

