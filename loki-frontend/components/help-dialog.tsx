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
  const initialOpenRef = useRef(true)

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
          id: "what-is-coercion",
          title: "What is voter coercion?",
          content: (
            <div className="space-y-2">
              <p>
                Voter coercion occurs when someone forces or pressures you to vote in a particular way against your
                will. This can happen through:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Direct threats:</strong> Someone threatening harm if you don't vote as they demand
                </li>
                <li>
                  <strong>Intimidation:</strong> Creating fear or discomfort to influence your vote
                </li>
                <li>
                  <strong>Monitoring:</strong> Someone watching over your shoulder as you vote to ensure you vote their
                  way
                </li>
                <li>
                  <strong>Family pressure:</strong> Relatives insisting you vote according to family preferences
                </li>
                <li>
                  <strong>Financial leverage:</strong> Promising rewards or threatening financial consequences based on
                  how you vote
                </li>
              </ul>
              <p className="mt-2">
                Online voting systems are particularly vulnerable to coercion because voting can happen outside the
                privacy of an official voting booth. The anti-coercion measures in this system are designed to give you
                ways to protect your true voting intentions even under pressure.
              </p>
            </div>
          ),
        },
        {
          id: "ballot-verification-security",
          title: "Why do I need to verify my voting history?",
          content: (
            <div className="space-y-2">
              <p>The ballot verification step serves two critical security purposes:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Identity verification:</strong> It ensures that only you can cast or change your vote by
                  requiring knowledge that only you should have.
                </li>
                <li>
                  <strong>Anti-coercion protection:</strong> It gives you a way to invalidate coerced votes without the
                  coercer knowing.
                </li>
              </ul>
              <p className="mt-2">
                When you want to revote, you'll be shown a list of ballots that includes your previously cast ballots
                mixed with many others. You need to select all of your previous ballots to verify your identity.
              </p>
              <p className="mt-2 text-red-600 font-medium">
                Important: If you provide incorrect information about having previously voted or fail to identify all
                your previous ballots, your new ballot will not be valid.
              </p>
              <p>
                If you are being coerced, you can use this feature to intentionally invalidate the coerced ballot by
                selecting the wrong ballots or claiming you haven't voted when you have (or vice versa).
              </p>
            </div>
          ),
        },
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
              <p>To change your vote, you'll need to identify your previous ballot(s) to confirm your identity.</p>
              <p className="text-red-600 font-medium">
                Important: If you fail to correctly identify your previous ballot(s), your new vote will not be valid.
              </p>
              <p>If you are being coerced, you can use this feature to intentionally invalidate the coerced ballot.</p>
            </div>
          ),
        },
        {
          id: "previous-ballots",
          title: "How do I identify my previous ballots?",
          content: (
            <div className="space-y-2">
              <p>
                To protect your voting privacy, the system doesn't explicitly tell you which ballots are yours. Instead,
                you need to recognize your own ballots using:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The date and time when you cast your vote</li>
                <li>The unique visual pattern (identicon) associated with your ballot</li>
              </ul>
              <p className="mt-2">
                When you cast a ballot, you'll see a receipt with this information. It's important to remember or note
                these details if you plan to revote later.
              </p>
              <p className="mt-2">If you're having trouble identifying your previous ballots, you can:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use the date and time filters to narrow down the list</li>
                <li>Look for the unique visual pattern (identicon) that matches your ballot</li>
              </ul>
              <p className="mt-2">
                If you're still unsure, you can vote in person at your local polling station. Physical votes are final
                and cannot be changed.
              </p>
            </div>
          ),
        },
        {
          id: "many-ballots",
          title: "Why am I seeing so many ballots?",
          content: (
            <div className="space-y-2">
              <p>
                For security and privacy reasons, your ballot is mixed with many other ballots. This makes it difficult
                for anyone to identify which ballot is yours, protecting you from potential coercion.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use the date and time filters to narrow down the list</li>
                <li>Look for the unique visual pattern (identicon) associated with your ballot</li>
                <li>If you voted recently, your ballot is likely to be among the newer ones</li>
              </ul>
              <p className="mt-2">
                If you're having trouble finding your ballot, you can always vote in person at your local polling
                station.
              </p>
            </div>
          ),
        },
        {
          id: "identicon",
          title: "What is the visual pattern (identicon)?",
          content: (
            <div className="space-y-2">
              <p>
                The colored pattern square is a visual identifier called an "identicon" that is unique to your ballot.
                It helps you:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Recognize your ballot when you need to verify it later</li>
                <li>Confirm that your ballot was correctly recorded in the system</li>
                <li>Identify your ballot without revealing your voting choices</li>
              </ul>
              <p className="mt-2">
                Each identicon is generated based on your ballot's timestamp and ID, creating a unique visual pattern
                that's easier to recognize than a long string of characters. The pattern and colors will always be the
                same for your specific ballot.
              </p>
              <p className="mt-2">
                If you need to revote later, you'll be asked to identify your previous ballot. The identicon will help
                you find it among other ballots.
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
      // Only auto-scroll if this is the initial opening with defaultOpenSection
      if (initialOpenRef.current && defaultOpenSection === openSection) {
        requestAnimationFrame(() => {
          scrollToSection(openSection)
        })
      }
      // Reset the flag after initial opening is handled
      initialOpenRef.current = false
    }
  }, [dialogOpen, openSection, defaultOpenSection])

  // Reset the initialOpen flag when dialog closes
  useEffect(() => {
    if (!dialogOpen) {
      initialOpenRef.current = true
    }
  }, [dialogOpen])

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
            onValueChange={(value) => {
              // When user manually clicks an accordion item, don't trigger auto-scroll
              initialOpenRef.current = false
              setOpenSection(value)
            }}
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

