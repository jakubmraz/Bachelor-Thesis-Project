import { generateBallotHash, generateIdenticon } from "@/lib/identicon"

interface BallotIdenticonProps {
  timestamp: string
  id: string
  size?: number
  cellSize?: number
  className?: string
  identiconHash?: string // Allow passing a pre-generated hash
}

export function BallotIdenticon({
  timestamp,
  id,
  size = 5,
  cellSize = 4,
  className = "",
  identiconHash,
}: BallotIdenticonProps) {
  // Use the provided hash if available, otherwise generate it
  const hash = identiconHash || generateBallotHash({ timestamp, id })
  const { grid, colors } = generateIdenticon(hash, size)

  return (
    <div
      className={`flex-shrink-0 rounded-md overflow-hidden ${className}`}
      style={{
        backgroundColor: colors.bg,
        width: size * cellSize,
        height: size * cellSize,
      }}
      title="Ballot visual identifier"
    >
      <div className="grid" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: cell ? colors.fg : "transparent",
              }}
            />
          )),
        )}
      </div>
    </div>
  )
}

