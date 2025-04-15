"use client"

import { useTestRun } from "@/contexts/test-run-context"
import { Badge } from "@/components/ui/badge"
import { formatDateDanish, formatTimeDanish } from "@/lib/date-utils"

export function TestRunStatus() {
  const { activeTestRun } = useTestRun()

  if (!activeTestRun) {
    return null
  }

  const startDate = new Date(activeTestRun.electionStart)
  const endDate = new Date(activeTestRun.electionEnd)
  const formattedStartDate = formatDateDanish(startDate)
  const formattedStartTime = formatTimeDanish(startDate)
  const formattedEndDate = formatDateDanish(endDate)
  const formattedEndTime = formatTimeDanish(endDate)
  const ballotCount = activeTestRun.ballots.length

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            Test Run #{activeTestRun.id}
          </Badge>
          <span className="text-sm text-blue-700">Active</span>
        </div>
        <div className="text-xs text-blue-600">
          {ballotCount} ballot{ballotCount !== 1 ? "s" : ""}
        </div>
      </div>
      <div className="mt-2 text-xs text-blue-700">
        <div>
          Election period: {formattedStartDate} {formattedStartTime} to {formattedEndDate} {formattedEndTime}
        </div>
      </div>
    </div>
  )
}
