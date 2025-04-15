import { generateBallotId, type PublicBallot } from "@/lib/ballot-data"
import { generateBallotHash } from "@/lib/identicon"
import { generatePhrase } from "@/lib/word-phrases"

/**
 * Generates noise ballots from the election start time up to the current time
 * @param electionStartTime The ISO string for election start time
 * @param existingBallots Existing ballots (user cast + previously generated noise)
 * @returns An updated list of ballots including noise ballots
 */
export async function generateNoiseBallots(
  electionStartTime: string,
  existingBallots: PublicBallot[],
): Promise<PublicBallot[]> {
  // Create a copy of existing ballots
  const ballots = [...existingBallots]

  // Find the timestamp of the last ballot
  let lastBallotTime: Date

  if (ballots.length > 0) {
    // Sort ballots by timestamp (oldest first) to find the last one
    const sortedBallots = [...ballots].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

    lastBallotTime = new Date(sortedBallots[sortedBallots.length - 1].timestamp)
  } else {
    // If no ballots exist, use the election start time
    lastBallotTime = new Date(electionStartTime)
  }

  // Get current time
  const now = new Date()

  // Generate noise ballots until we reach the current time
  while (lastBallotTime < now) {
    // Generate a random delay between 1 and 40 minutes
    const randomDelayMinutes = Math.floor(Math.random() * 40) + 1

    // Calculate the new ballot time
    const ballotTime = new Date(lastBallotTime)
    ballotTime.setMinutes(ballotTime.getMinutes() + randomDelayMinutes)

    // Ensure this ballot won't be in the future
    if (ballotTime > now) {
      break
    }

    // Create the new ballot
    const timestamp = ballotTime.toISOString()
    const id = generateBallotId(timestamp, false, ballots.length)

    // Generate identicon hash
    const identiconHash = generateBallotHash({ timestamp, id })

    // Generate phrase
    const phrase = generatePhrase(identiconHash)

    // Add the new ballot to our list
    ballots.push({
      id,
      timestamp,
      identiconHash,
      phrase,
    })

    // Update lastBallotTime for the next iteration
    lastBallotTime = ballotTime
  }

  // Sort ballots by timestamp (newest first) before returning
  return ballots.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}
