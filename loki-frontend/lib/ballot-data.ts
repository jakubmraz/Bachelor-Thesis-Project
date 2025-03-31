// Define the ballot data structure
export interface BallotOption {
  id: string
  text: string
}

export interface BallotItem {
  id: string
  title: string
  description: string
  options: BallotOption[]
}

export interface Vote {
  proposal: string
  choice: string
}

export interface Ballot {
  id: string
  timestamp: string
  votes: Vote[]
  identiconHash?: string
  phrase?: string
}

// For verification, we only show timestamp and ID, not the actual votes
export interface PublicBallot {
  id: string
  timestamp: string
  isSubmittedByUser?: boolean // Flag to identify user-submitted ballots internally
  identiconHash?: string
  phrase?: string
}

// Define the ballot items
export const ballotItems: BallotItem[] = [
  {
    id: "proposal-1",
    title: "Parliamentary Election",
    description: "Vote for the party you wish to represent you in the Parliament.",
    options: [
      { id: "option-1-1", text: "Social Democrats" },
      { id: "option-1-2", text: "New Liberal Party" },
      { id: "option-1-3", text: "Green Party" },
      { id: "option-1-4", text: "Christian Conservative Union" },
      { id: "option-1-5", text: "CHANGE!" },
    ],
  },
  {
    id: "proposal-2",
    title: "Legalisation of Fentanyl",
    description: "Should the sale, posession, and use of fentanyl be legal for adults aged 18 and above?",
    options: [
      { id: "option-2-1", text: "Yes" },
      { id: "option-2-2", text: "No" },
    ],
  },
  {
    id: "proposal-3",
    title: "Presidential Election",
    description: "Vote for the country's new president.",
    options: [
      { id: "option-3-1", text: "James Goodman" },
      { id: "option-3-2", text: "Nancy Grubber" },
    ],
  },
]

// Helper function to generate a random date with plausible voting hours (7:00 to 23:00)
// and spread across the last 48 hours (typical election period)
function generatePlausibleDate(maxDaysAgo = 2): Date {
  const now = new Date()

  // Randomly distribute timestamps over the election period (last 48 hours)
  // This simulates ballots being created every few minutes
  const minutesAgo = Math.floor(Math.random() * (maxDaysAgo * 24 * 60)) + 1 // Add 1 to ensure we're at least 1 minute in the past
  let date = new Date(now.getTime() - minutesAgo * 60 * 1000)

  // Make sure hour is between 7:00 and 23:00
  const hour = date.getHours()
  if (hour < 7) {
    date.setHours(7 + Math.floor(Math.random() * 5)) // Early morning hours
  } else if (hour > 23) {
    date.setHours(19 + Math.floor(Math.random() * 5)) // Evening hours
  }

  // Check if the date is in the future after hour adjustment (can happen at night)
  if (date > now) {
    // Subtract a day to ensure it's in the past
    date = new Date(date.getTime() - 24 * 60 * 60 * 1000)
  }

  return date
}

// Helper function to check if a date is within the last N days
function isWithinLastDays(date: Date, days: number): boolean {
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = diffTime / (1000 * 60 * 60 * 24)
  return diffDays <= days
}

// Generate a deterministic ID based on timestamp
// Use a reserved range (5000+) for real user ballots
export function generateBallotId(timestamp: string, isUserBallot = false, index = 0): string {
  const timeMs = new Date(timestamp).getTime()

  let id: string
  if (isUserBallot) {
    // For user ballots, use a high number range (5000+)
    // Make it fully deterministic based on timestamp
    const timePart = timeMs.toString().slice(-6)
    id = `ballot-${5000 + (timeMs % 1000)}-${timePart}`
  } else {
    // For generated ballots, use a lower number range (0-4999)
    // Use timestamp and index to ensure uniqueness
    const seed = Math.floor((timeMs % 4000) + (index % 1000))
    id = `ballot-${seed}-${timeMs.toString().slice(-6)}-${index}`
  }

  return id
}

// Import the hash generation function directly to avoid circular dependencies
import { generateBallotHash } from "@/lib/identicon"
import { generatePhrase } from "@/lib/word-phrases"

// Helper function to get user submitted ballots from localStorage
function getUserSubmittedBallots(): PublicBallot[] {
  try {
    // Get submitted ballots from localStorage - this is now our ONLY source of truth
    const submittedBallotsString = localStorage.getItem("submittedBallots")
    let ballots: PublicBallot[] = []

    if (submittedBallotsString) {
      ballots = JSON.parse(submittedBallotsString)
    }

    // Filter out ballots older than 2 days
    const recentBallots = ballots.filter((ballot) => {
      const ballotDate = new Date(ballot.timestamp)
      return isWithinLastDays(ballotDate, 2)
    })

    // Ensure all ballots have an identicon hash and phrase
    const processedBallots = recentBallots.map((ballot) => {
      // Generate the identicon hash if it doesn't exist
      const finalHash = ballot.identiconHash || generateBallotHash({ timestamp: ballot.timestamp, id: ballot.id })

      // Generate phrase if it doesn't exist
      const phrase = ballot.phrase || generatePhrase(finalHash)

      return {
        ...ballot,
        isSubmittedByUser: true,
        identiconHash: finalHash,
        phrase,
      }
    })

    return processedBallots
  } catch (error) {
    console.error("Error loading submitted ballots:", error)
  }
  return []
}

// Function to save a ballot to the user's submitted ballots
export function saveUserBallot(ballot: PublicBallot): void {
  try {
    // Generate the identicon hash if it doesn't exist
    const finalHash = ballot.identiconHash || generateBallotHash({ timestamp: ballot.timestamp, id: ballot.id })

    // Generate phrase if it doesn't exist
    const phrase = ballot.phrase || generatePhrase(finalHash)

    const ballotWithHash = {
      ...ballot,
      identiconHash: finalHash,
      phrase,
    }

    // Get existing ballots
    const existingBallotsString = localStorage.getItem("submittedBallots")
    let ballots: PublicBallot[] = existingBallotsString ? JSON.parse(existingBallotsString) : []

    // Check if this ballot already exists
    const existingIndex = ballots.findIndex((b) => b.id === ballot.id)
    if (existingIndex >= 0) {
      // Update existing ballot
      ballots[existingIndex] = ballotWithHash
    } else {
      // Add the new ballot
      ballots.push(ballotWithHash)
    }

    // Filter out ballots older than 2 days
    ballots = ballots.filter((b) => {
      const ballotDate = new Date(b.timestamp)
      return isWithinLastDays(ballotDate, 2)
    })

    // Save back to localStorage - this is our ONLY storage location now
    localStorage.setItem("submittedBallots", JSON.stringify(ballots))

    // Remove the legacy lastCastBallot storage
    localStorage.removeItem("lastCastBallot")
  } catch (error) {
    console.error("Error saving ballot:", error)
  }
}

// Helper function to generate random ballots with realistic timestamps
export function generateRandomPublicBallots(count = 800, includeUserBallots = true): PublicBallot[] {
  // Get user submitted ballots
  const userSubmittedBallots = includeUserBallots ? getUserSubmittedBallots() : []

  // Track used IDs to avoid duplicates
  const usedBallotIds = new Set<string>()

  // Add user ballot IDs to the used set
  userSubmittedBallots.forEach((ballot) => {
    usedBallotIds.add(ballot.id)
  })

  // Generate random ballots (public version with only timestamp and ID)
  const randomBallots: PublicBallot[] = []
  const numRandomBallots = Math.max(0, count - userSubmittedBallots.length)

  // Generate random ballots
  for (let i = 0; i < numRandomBallots; i++) {
    const timestamp = generatePlausibleDate().toISOString()
    // Only include ballots from the last 2 days
    const ballotDate = new Date(timestamp)
    if (isWithinLastDays(ballotDate, 2)) {
      // Generate a unique ID
      let id: string
      let attempts = 0
      do {
        id = generateBallotId(timestamp, false, i + attempts)
        attempts++
      } while (usedBallotIds.has(id) && attempts < 100) // Prevent infinite loops

      if (!usedBallotIds.has(id)) {
        usedBallotIds.add(id)

        // Generate the identicon hash
        const identiconHash = generateBallotHash({ timestamp, id })

        // Generate phrase
        const phrase = generatePhrase(identiconHash)

        randomBallots.push({
          id,
          timestamp,
          identiconHash,
          phrase,
        })
      }
    }
  }

  // Sort ballots by timestamp (newest first)
  randomBallots.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  // Combine random ballots with user submitted ballots
  const allBallots = [...randomBallots, ...userSubmittedBallots]

  // Sort all ballots by timestamp (newest first)
  allBallots.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  return allBallots
}

