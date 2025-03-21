// Simple identicon generator based on ballot timestamp and ID only (not voting choices)
export function generateBallotHash(ballot: { timestamp: string; id: string }): string {
    // Create a string representation of the ballot using only timestamp and ID
    // Ensure we're using the exact same format every time
    const ballotString = `${ballot.timestamp}:${ballot.id}`
  
    // Simple hash function
    let hash = 0
    for (let i = 0; i < ballotString.length; i++) {
      const char = ballotString.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32bit integer
    }
  
    // Convert to positive hex string
    const result = Math.abs(hash).toString(16).padStart(8, "0")
    return result
  }
  
  // Generate a color from a hash
  export function hashToColor(hash: string): string {
    // Use first 6 characters of hash for color
    return `#${hash.substring(0, 6)}`
  }
  
  // Generate background and foreground colors from a hash
  export function hashToColors(hash: string): { bg: string; fg: string } {
    const bgColor = hashToColor(hash)
  
    // Generate a contrasting foreground color
    const r = Number.parseInt(hash.substring(0, 2), 16)
    const g = Number.parseInt(hash.substring(2, 4), 16)
    const b = Number.parseInt(hash.substring(4, 6), 16)
  
    // Calculate brightness (simple formula)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
  
    // Choose white or black based on background brightness
    const fgColor = brightness > 128 ? "#000000" : "#FFFFFF"
  
    return { bg: bgColor, fg: fgColor }
  }
  
  // Generate a simple grid-based identicon
  export function generateIdenticon(hash: string, size = 5): { grid: boolean[][]; colors: { bg: string; fg: string } } {
    const colors = hashToColors(hash)
    const grid: boolean[][] = []
  
    // Use the hash to determine which cells are filled
    for (let i = 0; i < size; i++) {
      const row: boolean[] = []
      for (let j = 0; j < size; j++) {
        // Use different parts of the hash for different positions
        const position = i * size + j
        const hexChar = hash[position % hash.length]
        const value = Number.parseInt(hexChar, 16)
  
        // Fill the cell if the value is even
        row.push(value % 2 === 0)
      }
      grid.push(row)
    }
  
    // Make the pattern symmetrical (like GitHub identicons)
    for (let i = 0; i < size; i++) {
      for (let j = Math.ceil(size / 2); j < size; j++) {
        grid[i][j] = grid[i][size - j - 1]
      }
    }
  
    return { grid, colors }
  }
  
  