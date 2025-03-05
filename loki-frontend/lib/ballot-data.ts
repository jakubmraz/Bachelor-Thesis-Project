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
      title: "City Budget Allocation",
      description: "How should the city allocate its budget surplus?",
      options: [
        { id: "option-1-1", text: "Infrastructure improvements" },
        { id: "option-1-2", text: "Education funding" },
        { id: "option-1-3", text: "Public healthcare" },
        { id: "option-1-4", text: "Parking lots" },
      ],
    },
    {
      id: "proposal-2",
      title: "Public Transportation Expansion",
      description: "Which public transportation project should be prioritized?",
      options: [
        { id: "option-2-1", text: "Subway line extension" },
        { id: "option-2-2", text: "Electric bus fleet" },
        { id: "option-2-3", text: "Bike lane network" },
        { id: "option-2-4", text: "High-speed rail connection" },
        { id: "option-2-5", text: "None" },
      ],
    },
    {
      id: "proposal-3",
      title: "Presidential Election",
      description: "Vote for the country's new president",
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
  
  