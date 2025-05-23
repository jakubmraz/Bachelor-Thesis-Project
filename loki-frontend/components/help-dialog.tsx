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
          id: "general",
          title: "How do I vote online?",
          content: (
            <div className="space-y-2">
              <p>
                As a Danish citizen above the age 18, you are automatically eligible to vote in local and national
                elections. You do not need to register anywhere.
              </p>
              <p>
                You have the option to either vote in person at your local polling station or digitally via this portal.
              </p>
            </div>
          ),
        },
        {
          id: "difference",
          title: "What are the differences between voting online or in person?",
          content: (
            <div className="space-y-2">
              <p>
                The choice to vote in person or digitally is entirely up to you. It is however important to remember
                some differences:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Online voting allows you to change your vote, physical voting does not.</li>
                <li>
                  Physical votes are final. If you vote both online and physically, only your physical vote will count.
                </li>
                <li>
                  Online voting cannot guarantee your privacy from people around you. Physical voting is fully private.
                </li>
              </ul>
              <p>
                The online voting portal has numerous safety measures to protect you from coercion. For further
                information, read the Anti-Coercion Measures section below.
              </p>
            </div>
          ),
        },
        {
          id: "vote-multiple-times",
          title: "Can I vote multiple times?",
          content: (
            <div className="space-y-2">
              <p>
                <b>Every citizen only has one vote.</b>
              </p>
              <p>
                The digital voting system allows you to vote multiple times to change your vote. Only your last vote
                counts. Casting multiple ballots does not result in multiple votes given to your selected
                party/candidate or to your selected position on an issue.
              </p>
              <p>
                Casting a ballot both digitally and in person does not result in multiple votes given. Only your
                physical ballot will count in this scenario.
              </p>
            </div>
          ),
        },
        {
          id: "privacy",
          title: "Are my votes private?",
          content: (
            <div className="space-y-2">
              <p>Your voting privacy is protected through several measures:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Your ballots are encrypted before they are sent over the network. This prevents hackers from seeing
                  your choices even if they have access to your network activity.
                </li>
                <li>
                  The system hides your ballot in the database by creating other fake ballots. This means that even in
                  the event of a database breach, your vote can never be traced back to you.
                </li>
              </ul>
              <p>It is however not possible to guarantee your privacy in some cases:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>There is somebody looking at your screen while you vote.</li>
                <li>Your computer has a virus which allows hackers to see your screen or computer activity.</li>
              </ul>
              <p>
                When voting, always make sure you are alone and have the most up-to-date version of your operating
                system and any security software you use. If you are in doubt, you can vote in person at your local
                polling station instead.
              </p>
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
                No matter if you've voted before, voted in person, or haven't voted at all,{" "}
                <b>
                  the system will never disclose any information about your past actions — it will always appear as if
                  you have not voted before.{" "}
                </b>
                This allows you to plausibly claim or deny any past action you might have taken.
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
      title: "Revoting",
      items: [
        {
          id: "revoting",
          title: "How does revoting work?",
          content: (
            <div className="space-y-2">
              <p>
                The online voting portal allows you to recast your vote an unlimited number of times until the election
                closes.
              </p>
              <p>
                To be able to cast a new ballot, you must be able to recall all your previous valid ballots by their
                date and time cast. The system will provide you with visual and lexical memory aids to help you remember
                your previous ballots.
              </p>
            </div>
          ),
        },
        {
          id: "revote-physical",
          title: "Can I revote if I voted in person?",
          content: (
            <div className="space-y-2">
              <p>
                No. Physical votes are final and cannot be changed. If you vote both digitally and physically, only your
                physical vote will count.
              </p>
            </div>
          ),
        },
        {
          id: "memory-aids",
          title: "What are the memory aids?",
          content: (
            <div className="space-y-2">
              <p>Your ballot has two memory aids to help you identify it later if you need to revote:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Word phrase:</strong> A unique two-word combination (e.g., "grit orient") that's generated
                  from your ballot's information. This phrase is easier to remember than numbers or codes.
                </li>
                <li>
                  <strong>Visual pattern (identicon):</strong> The colored square pattern is a visual identifier unique
                  to your ballot. It helps you recognize your ballot at a glance when you need to verify it later.
                </li>
              </ul>
              <p className="mt-2">
                Both memory aids are generated based on your ballot's timestamp and ID, creating unique identifiers that
                are consistent for your specific ballot. They help you find your ballot among many others if you need to
                revote.
              </p>
              <p className="mt-2">
                While these aids make identification easier, remembering the date and time of your vote is still the
                most reliable way to identify your ballot.
              </p>
            </div>
          ),
        },
        {
          id: "ballot-verification-security",
          title: "Why do I need to verify my voting history?",
          content: (
            <div className="space-y-2">
              <p>The voting history verification step serves two critical security purposes:</p>
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
                mixed with many others. You need to select all of your previous valid ballots to verify your identity.
              </p>
              <p className="mt-2 text-red-600 font-medium">
                Important: If you provide incorrect information about having previously voted or fail to identify all
                your previous valid ballots, your new ballot will not be valid.
              </p>
              <p>
                If you are being coerced, you can use this feature to intentionally invalidate the coerced ballot by
                selecting the wrong ballots or claiming you haven't voted when you have (or vice versa).
              </p>
            </div>
          ),
        },
        {
          id: "previous-ballots",
          title: "How do I identify my previous ballots?",
          content: (
            <div className="space-y-2">
              <p>
                To protect your voting privacy, the system doesn't explicitly tell you which ballots are yours or which
                ones are valid. Instead, you need to recognize your own ballots using:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The date and time when you cast your vote</li>
                <li>The unique visual pattern (identicon) associated with your ballot</li>
                <li>The word phrase generated for your ballot</li>
              </ul>
              <p className="mt-2">
                When you cast a ballot, you'll see a receipt with this information. It's important to remember or note
                these details if you plan to revote later.
              </p>
              <p className="mt-2">If you're having trouble identifying your previous ballots, you can:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use the date and time filters to narrow down the list</li>
                <li>Look for the unique visual pattern and word phrase that match your ballot</li>
              </ul>
              <p className="mt-2">
                If you're still unsure, you can vote in person at your local polling station. Physical votes are final
                and cannot be changed.
              </p>
            </div>
          ),
        },
        {
          id: "valid-ballot",
          title: "What are valid and invalid ballots?",
          content: (
            <div className="space-y-2">
              <p>
                A valid ballot is cast when you provide accurate information about your voting history for the given
                election. Conversely, an invalid ballot is cast when you, intentionally or not, provide false
                information about your voting history.
              </p>
              <p className="mt-2 text-red-600 font-medium">
                It is important that, when revoting, you only identify your previous valid ballots.
              </p>
              <p>Examples:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  If, for this election, this is your first time voting and you select you have not voted before, your
                  first cast ballot will always be valid.
                </li>
                <li>
                  If you vote again later, select that you have voted before in this election, and correctly identify
                  your previous ballot, your new ballot will be valid. If you wish to vote again for the third time
                  later, you must correctly identify both previous ballots.
                </li>
                <li>
                  If you have voted before in this election but select that this is your first time voting, your ballot
                  will be invalid. Conversely, if you have not voted before in this election but select that you have
                  and select any of the presented ballots, your ballot will be invalid.
                </li>
              </ul>
            </div>
          ),
        },
        {
          id: "see-valid-ballot",
          title: "Can I see if my ballot was valid or not?",
          content: (
            <div className="space-y-2">
              <p>
                The system protects you against potential coercion by maintaining your plausible deniability at all
                points. This unfortunately means that there is no way for you to see if any of your ballots were valid
                or not.
              </p>
              <p>
                <b>Your first ballot will always be valid</b>, provided you selected that you had not voted before when
                casting it.
              </p>
              <p>
                If you are unsure about your previous votes in this election but wish to revote, you can still vote
                physically at you local polling station. Physical votes always take priority over digital ones.
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
                For security and privacy reasons, your ballot is mixed with many other decoy ballots. This makes it difficult
                for anyone to identify which ballots are yours, protecting you from potential coercion.
                <br/>
                The decoy ballots are periodically created by the server for each user and will not count in the final election tally.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use the date and time filters to narrow down the list</li>
                <li>Look for the unique visual pattern and word phrase associated with your ballot</li>
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
          id: "see-previous-votes",
          title: "Can I see how I voted?",
          content: (
            <div className="space-y-2">
              <p>
                The system protects you against potential coercion by maintaining your plausible deniability at all
                points. This unfortunately means that there is no way for you to see your voting history.
              </p>
            </div>
          ),
        },
        {
          id: "cant-remember",
          title: "What if I can't remember my previous ballots?",
          content: (
            <div className="space-y-2">
              <p>
                In the event you wish to change your vote but cannot recall your previous valid ballots, you can vote at
                your local polling station in person. Physical votes are final and are always counted, regardless of if
                you voted online first.
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
            <DialogTitle className="text-2xl">Help Centre</DialogTitle>
          </DialogHeader>
          {dialogContent}
        </DialogContent>
      </Dialog>
    </>
  )
}
