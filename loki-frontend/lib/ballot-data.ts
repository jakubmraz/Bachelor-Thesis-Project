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
function generatePlausibleDate(daysAgo = 7): Date {
  const date = new Date()
  // Set a random day within the last 'daysAgo' days
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo))

  // Set a plausible hour between 7:00 and 23:00
  const hour = 7 + Math.floor(Math.random() * 16) // 7 to 23
  const minute = Math.floor(Math.random() * 60) // 0 to 59

  date.setHours(hour, minute, 0, 0)
  return date
}

// Helper function to generate random ballots
export function generateRandomBallots(count = 5, includeLastBallot = true): Ballot[] {
  // Try to get the last cast ballot
  let lastBallot: Ballot | null = null
  try {
    const lastBallotString = localStorage.getItem("lastCastBallot")
    if (lastBallotString) {
      lastBallot = JSON.parse(lastBallotString)
    }
  } catch (error) {
    console.error("Error loading last ballot:", error)
  }

  // Generate random ballots
  const randomBallots: Ballot[] = []
  const numRandomBallots = includeLastBallot && lastBallot ? count - 1 : count

  for (let i = 0; i < numRandomBallots; i++) {
    randomBallots.push({
      id: `ballot-random-${Date.now()}-${i}`,
      timestamp: generatePlausibleDate().toISOString(),
      votes: ballotItems.map((item) => ({
        proposal: item.title,
        choice: getRandomChoice(item.title),
      })),
    })
  }

  // Sort ballots by timestamp (newest first)
  randomBallots.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  // If we have a last ballot and we want to include it, insert it at a random position
  if (includeLastBallot && lastBallot) {
    const randomPosition = Math.floor(Math.random() * (randomBallots.length + 1))
    randomBallots.splice(randomPosition, 0, lastBallot)
  }

  return randomBallots
}

// Helper function to get a random choice for a proposal
function getRandomChoice(proposal: string): string {
  const item = ballotItems.find((item) => item.title === proposal)
  if (!item) return "No selection"

  const options = item.options
  return options[Math.floor(Math.random() * options.length)].text
}

