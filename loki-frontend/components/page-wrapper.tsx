import type React from "react"
// Create a shared wrapper component to ensure consistent layout
export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-[1200px] px-8 pt-8">
      <div className="mx-auto max-w-[800px]">{children}</div>
    </main>
  )
}