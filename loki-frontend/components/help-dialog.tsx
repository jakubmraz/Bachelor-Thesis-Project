"use client"

import { useState, useEffect, type ReactNode, useRef, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { HelpCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface HelpSection {
  title: string
  items: {
    id: string
    title: string
    content: ReactNode
  }[]
}

interface HelpDialogProps {
  defaultOpenSection?: string
  triggerText?: string
  children?: ReactNode
}

export function HelpDialog({ defaultOpenSection, triggerText = "Help", children }: HelpDialogProps) {
  const [openSection, setOpenSection] = useState<string | undefined>(defaultOpenSection)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isPrerendered, setIsPrerendered] = useState(false)
  const dialogContentRef = useRef<HTMLDivElement>(null)

  // Create refs for each accordion item
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Define help content organized in sections
  const helpSections: HelpSection[] = [
    {
      title: "General Information",
      items: [
        {
          id: "privacy",
          title: "How is my privacy protected?",
          content: (
            <div className="space-y-2">
              <p>Your privacy is protected through several measures:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use incognito mode to prevent browser history</li>
                <li>Vote in a private environment without surveillance</li>
                <li>Your vote is encrypted and anonymized</li>
                <li>No one can link your identity to your voting choices</li>
              </ul>
            </div>
          ),
        },
        {
          id: "authentication",
          title: "What do I need to vote online?",
          content: (
            <div className="space-y-2">
              <p>To vote online, you need:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>A smartphone with MyID app installed</li>
                <li>Biometric authentication enabled on your device</li>
                <li>An up-to-date version of MyID</li>
              </ul>
            </div>
          ),
        },
      ],
    },
    {
      title: "Anti-Coercion Measures",
      items: [
        {
          id: "coercion-risk",
          title: "What if I'm being coerced to vote?",
          content: (
            <div className="space-y-2">
              <p>If someone is forcing you to vote in a certain way, you have several options:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Intentional misidentification:</strong> If you're being watched while voting, you can
                  intentionally misidentify your previous ballot. This will make your new vote invalid without the
                  coercer knowing.
                </li>
                <li>
                  <strong>Vote again later:</strong> You can comply with the coercer, then vote again later in private.
                  Only your last valid vote counts.
                </li>
                <li>
                  <strong>Vote in person:</strong> You can always choose to vote at a physical polling station where
                  privacy is guaranteed. Physical votes are final and cannot be recast.
                </li>
              </ul>
              <p className="mt-2 text-red-600 font-medium">
                If you're in immediate danger, please contact the authorities at the emergency number 112.
              </p>
            </div>
          ),
        },
        {
          id: "plausible-deniability",
          title: "How does plausible deniability work?",
          content: (
            <div className="space-y-2">
              <p>
                The system is designed so that if you're forced to vote under supervision, you can make your vote
                invalid in ways that aren't obvious to an observer:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  If you've voted before, you can claim you haven't (or select the wrong previous ballot). This
                  invalidates your new vote.
                </li>
                <li>
                  If you haven't voted before, you can claim you have. This will lead to a verification step that will
                  fail, invalidating your vote.
                </li>
                <li>These actions appear normal to an observer but result in an invalid vote.</li>
                <li>
                  If you voted in person, your vote cannot be changed. However, these features still remain available to
                  you for your protection.
                </li>
              </ul>
              <p>
                No matter if you've voted before, voted in person, or haven't voted at all, the system will never
                disclose any information about your past actions — it always appear as if you have not voted before.
                This allows you to plausibly claim or deny any past action you might have taken.
              </p>
            </div>
          ),
        },
        {
          id: "revoting",
          title: "Can I change my vote?",
          content: (
            <div className="space-y-2">
              <p>
                Yes, you can change your vote at any time during the voting period. This is a security feature that:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Protects against coercion</li>
                <li>Allows you to vote freely even if initially pressured</li>
                <li>Only counts your final vote</li>
              </ul>
              <p>To change your vote, you'll need to identify your last valid ballot to confirm your identity.</p>
              <p className="text-red-600 font-medium">
                Important: If you fail to correctly identify your last valid ballot, the new ballot will not be valid.
              </p>
              <p>If you are being coerced, you can use this feature to intentionally invalidate the coerced ballot.</p>
            </div>
          ),
        },
        {
          id: "ballot-verification",
          title: "Why do I need to verify if I've voted before?",
          content: (
            <div className="space-y-2">
              <p>This verification step is crucial for several security reasons:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Identity verification:</strong> It ensures that only you can cast or change your vote.
                </li>
                <li>
                  <strong>Anti-coercion protection:</strong> It protects you from coercion by allowing you to
                  intentionally cast an invalid vote with plausible deniability.
                </li>
              </ul>
              <p className="mt-2 text-red-600 font-medium">
                Important: If you provide incorrect information about having previously voted or incorrectly identify
                your last valid ballot, your new ballot will not be valid.
              </p>
              <p>If you are being coerced, you can use this feature to intentionally invalidate the coerced ballot.</p>
            </div>
          ),
        },
        {
          id: "last-valid-ballot",
          title: "What is the last valid ballot?",
          content: (
            <div className="space-y-2">
              <p>
                To protect you against coerction, the Online Voting Portal allows you to discreetly submit invalid
                ballots. An invalid ballot is submitted when you provide incorrect information about having previously
                voted or your last valid ballot. Conversely, a valid ballot is cast when you provide truthful
                informaton.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your first ballot is always valid — given you select you have not voted before</li>
                <li>
                  You can protect your first ballot under coercion by falsely claiming you have voted before and thus
                  submitting an invalid ballot
                </li>
                <li>Once you have cast your first ballot, this is now your last valid ballot</li>
                <li>
                  If you choose to revote, select the last valid ballot to be able to submit a new valid ballot — this
                  new ballot is now your last valid ballot
                </li>
                <li>
                  If you are being coerced and submit an invalid ballot, this new ballot does <strong>not</strong> count
                  as your last valid balot — when revoting, you must select the last valid ballot you submitted before
                  the invalid ones submitted under coercion
                </li>
                <li>
                  The system does not allow you to see what your last valid ballot is. This for your protection, as a
                  potential coercer could also see this information
                </li>
              </ul>
              <p>
                If you are not sure what your last valid ballot is, you can vote in person before the election closes.
                Physically cast ballots are final and cannot be changed.
              </p>
            </div>
          ),
        },
        {
          id: "incognito-mode",
          title: "Why do I need to use Incognito Mode?",
          content: (
            <div className="space-y-2">
              <p>
                Incognito Mode does not keep your browsing history or save any cookies. This helps to protect you from
                coercion by ensuring that no one can tell whether you've already voted. It is an important step to
                maintain your plausible deniability from a potential coercer.
              </p>
            </div>
          ),
        },
      ],
    },
    {
      title: "Technical Support",
      items: [
        {
          id: "technical",
          title: "Technical Requirements",
          content: (
            <div className="space-y-2">
              <p>For the best voting experience:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use a modern web browser (Chrome, Firefox, Safari)</li>
                <li>Enable JavaScript</li>
                <li>Ensure a stable internet connection</li>
                <li>Use a private, secure device</li>
              </ul>
            </div>
          ),
        },
        {
          id: "assistance",
          title: "Need Additional Help?",
          content: (
            <div>
              If you cannot use MyID or experience any issues, please visit your local voting station where staff will
              assist you with the voting process.
            </div>
          ),
        },
      ],
    },
  ]

  // Create a flat map of all section IDs for easier lookup
  const allSectionIds = useMemo(() => {
    const ids: string[] = []
    helpSections.forEach((section) => {
      section.items.forEach((item) => {
        ids.push(item.id)
      })
    })
    return ids
  }, [])

  // Prerender the dialog content when the component mounts
  useEffect(() => {
    // Mark as prerendered after a short delay to ensure the component has mounted
    const timer = setTimeout(() => {
      setIsPrerendered(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Function to scroll to a specific section without animation
  const scrollToSection = (sectionId: string) => {
    if (itemRefs.current[sectionId]) {
      itemRefs.current[sectionId]?.scrollIntoView({
        behavior: "auto", // Use 'auto' instead of 'smooth' to avoid visible scrolling
        block: "start",
      })
    }
  }

  // Handle dialog open state changes and scroll to the default section
  useEffect(() => {
    const scroll = () => {
      if (defaultOpenSection && allSectionIds.includes(defaultOpenSection)) {
        scrollToSection(defaultOpenSection)
      }
    }

    if (dialogOpen && defaultOpenSection) {
      setOpenSection(defaultOpenSection)

      requestAnimationFrame(() => {
        scroll()
      })
    }
  }, [dialogOpen, defaultOpenSection, allSectionIds])

  // Handle section changes
  useEffect(() => {
    if (dialogOpen && openSection) {
      requestAnimationFrame(() => {
        scrollToSection(openSection)
      })
    }
  }, [dialogOpen, openSection])

  // Prepare dialog content for prerendering
  const dialogContent = (
    <div className="mt-4 space-y-6">
      {helpSections.map((section, index) => (
        <div key={index} className="space-y-3">
          <h2 className="text-lg font-semibold border-b pb-2">{section.title}</h2>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={section.items.some((item) => item.id === openSection) ? openSection : undefined}
            onValueChange={setOpenSection}
          >
            {section.items.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                ref={(el) => {
                  if (el) {
                    itemRefs.current[item.id] = el
                  }
                }}
                data-section-id={item.id}
              >
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  )

  return (
    <>
      {/* Prerender the dialog content in a hidden div */}
      {isPrerendered && <div className="hidden">{dialogContent}</div>}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          {children ? (
            children
          ) : (
            <button className="hover:bg-yellow-400 px-2 py-1 rounded-md flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              {triggerText}
            </button>
          )}
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" ref={dialogContentRef}>
          <DialogHeader>
            <DialogTitle className="text-2xl">Help Center</DialogTitle>
          </DialogHeader>
          {dialogContent}
        </DialogContent>
      </Dialog>
    </>
  )
}

