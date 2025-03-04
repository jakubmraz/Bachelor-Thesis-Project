// Format a date in Danish format (DD-MM-YYYY)
export function formatDateDanish(date: Date | string): string {
    const d = typeof date === "string" ? new Date(date) : date
    return d.toLocaleDateString("da-DK", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }
  
// Format time as HH:MM with colon separator
export function formatTimeDanish(date: Date | string): string {
const d = typeof date === "string" ? new Date(date) : date

// Get hours and minutes and pad with leading zeros if needed
const hours = d.getHours().toString().padStart(2, "0")
const minutes = d.getMinutes().toString().padStart(2, "0")

// Return in HH:MM format with colon
return `${hours}:${minutes}`
}

  