import type React from "react"
export const metadata = {
  params: {
    hideNav: true,
  },
}

export default function VotingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
