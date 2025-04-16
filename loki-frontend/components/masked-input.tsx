"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"

interface MaskedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: string
  onChange: (value: string) => void
  groups?: number[]
}

// Maps a raw index to a formatted index by adding one extra offset for each fully completed group.
function mapRawToFormatted(rawIndex: number, groups: number[]): number {
  let formattedIndex = rawIndex
  let remaining = rawIndex
  for (let i = 0; i < groups.length; i++) {
    if (remaining > groups[i]) {
      formattedIndex += 1 // add offset for the space
      remaining -= groups[i]
    } else {
      break
    }
  }
  return formattedIndex
}

export function MaskedInput({ value, onChange, groups = [4, 4, 4, 4, 4, 4], className, ...props }: MaskedInputProps) {
  const totalLength = groups.reduce((a, b) => a + b, 0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Build a formatted value that shows typed characters and placeholders for missing ones.
  const formatValue = (raw: string) => {
    let formatted = ""
    let currentIndex = 0
    for (let i = 0; i < groups.length; i++) {
      const groupLength = groups[i]
      const groupValue = raw.slice(currentIndex, currentIndex + groupLength)
      const padded = groupValue + "_".repeat(groupLength - groupValue.length)
      formatted += padded
      if (i < groups.length - 1) {
        formatted += " " // add space between groups
      }
      currentIndex += groupLength
    }
    return formatted
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-alphanumeric characters (stripping spaces and underscores).
    const rawValue = e.target.value.replace(/[^A-Z0-9]/gi, "").toUpperCase()
    if (rawValue.length <= totalLength) {
      onChange(rawValue)
    }
  }

  const handleClear = () => {
    onChange("")
    if (inputRef.current) {
      inputRef.current.setSelectionRange(0, 0)
      inputRef.current.focus()
    }
  }

  // After the raw value changes, adjust the caret position.
  React.useLayoutEffect(() => {
    if (inputRef.current) {
      // Map the raw length (caret at the end of typed characters) to a formatted caret position.
      const caretPos = mapRawToFormatted(value.length, groups)
      inputRef.current.setSelectionRange(caretPos, caretPos)
    }
  }, [value, groups])

  return (
    <div className="relative">
      <Input
        {...props}
        ref={inputRef}
        value={formatValue(value)}
        onChange={handleChange}
        className={`font-mono text-lg pr-8 ${className}`} // pr-8 adds padding for the clear button
        style={{ caretColor: "black", letterSpacing: "0.2em" }}
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          X
        </button>
      )}
    </div>
  )
}
