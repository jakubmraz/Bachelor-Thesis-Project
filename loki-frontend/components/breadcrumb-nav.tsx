"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useVote } from "@/contexts/vote-context"

export function BreadcrumbNav() {
  const pathname = usePathname()
  const { isVoteSubmitted } = useVote()

  // Don't show breadcrumbs on the elections landing page
  if (pathname === "/elections") {
    return null
  }

  // Don't show breadcrumbs on the voting/new page when a vote has been submitted
  if (pathname === "/voting/new" && isVoteSubmitted) {
    return null
  }

  return (
    <div className="py-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <Link href="/elections" className="hover:text-foreground">
          Elections
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-foreground">2025 General Election</span>
      </div>
    </div>
  )
}

