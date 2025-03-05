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
        { id: "option-3-2", text: "Mr Genocide 5000" },
      ],
    },
  ]
  
  // Helper function to generate random ballots
  export function generateRandomBallots(count = 3): Ballot[] {
    return Array.from({ length: count }, (_, i) => ({
      id: `ballot-demo-${i + 1}`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(), // Random time in the last week
      votes: ballotItems.map((item) => ({
        proposal: item.title,
        choice: getRandomChoice(item.title),
      })),
    }))
  }
  
  // Helper function to get a random choice for a proposal
  function getRandomChoice(proposal: string): string {
    const item = ballotItems.find((item) => item.title === proposal)
    if (!item) return "No selection"
  
    const options = item.options
    return options[Math.floor(Math.random() * options.length)].text
  }
  
  