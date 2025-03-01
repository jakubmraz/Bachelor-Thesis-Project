"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { HelpCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function HelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="hover:bg-yellow-400 px-2 py-1 rounded-md flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          Help
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-visible">
        <DialogHeader>
          <DialogTitle className="text-2xl">Help Center</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="privacy">
              <AccordionTrigger>How is my privacy protected?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Your privacy is protected through several measures:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Use incognito mode to prevent browser history</li>
                    <li>Vote in a private environment without surveillance</li>
                    <li>Your vote is encrypted and anonymized</li>
                    <li>No one can link your identity to your voting choices</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="authentication">
              <AccordionTrigger>What do I need to vote online?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>To vote online, you need:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>A smartphone with MyID app installed</li>
                    <li>Biometric authentication enabled on your device</li>
                    <li>An up-to-date version of MyID</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="revoting">
              <AccordionTrigger>Can I change my vote?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>
                    Yes, you can change your vote at any time during the voting period. This is a security feature that:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Protects against coercion</li>
                    <li>Allows you to vote freely even if initially pressured</li>
                    <li>Only counts your final vote</li>
                  </ul>
                  <p className="mt-2">
                    To change your vote, you'll need to identify your previous ballot(s) to confirm your identity.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="technical">
              <AccordionTrigger>Technical Requirements</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>For the best voting experience:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Use a modern web browser (Chrome, Firefox, Safari)</li>
                    <li>Enable JavaScript</li>
                    <li>Ensure a stable internet connection</li>
                    <li>Use a private, secure device</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="assistance">
              <AccordionTrigger>Need Additional Help?</AccordionTrigger>
              <AccordionContent>
                If you cannot use MyID or experience any issues, please visit your local voting station where staff will
                assist you with the voting process.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  )
}

