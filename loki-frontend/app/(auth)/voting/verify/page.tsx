"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowLeft, Check, ArrowRight, AlertTriangle, HelpCircle, Filter, X, Clock } from "lucide-react"
import Link from "next/link"
import { type PublicBallot, generateRandomPublicBallots } from "@/lib/ballot-data"
import { formatDateDanish, formatTimeDanish } from "@/lib/date-utils"
import { HelpDialog } from "@/components/help-dialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BallotIdenticon } from "@/components/ballot-identicon"

export default function VerifyPreviousVotePage() {
  const [previousBallots, setPreviousBallots] = useState<PublicBallot[]>([])
  const [selectedBallotIds, setSelectedBallotIds] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [selectedDates, setSelectedDates] = useState<string[]>([])
  const [selectedHours, setSelectedHours] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")

  const ITEMS_PER_PAGE = 8

  // Load ballots on component mount
  useEffect(() => {
    try {
      // Clear any legacy storage
      localStorage.removeItem("lastCastBallot")

      // Generate 800 ballots as a simulation (in reality there would be ~1000 for a 48h election)
      // Include user ballots
      const ballots = generateRandomPublicBallots(800, true)

      setPreviousBallots(ballots)
    } catch (error) {
      console.error("Error loading ballots:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Switch to "all" tab if no ballots are selected
  useEffect(() => {
    if (selectedBallotIds.length === 0 && activeTab === "selected") {
      setActiveTab("all")
    }
  }, [selectedBallotIds, activeTab])

  // Extract unique dates from ballots
  const availableDates = useMemo(() => {
    const dates = new Set<string>()
    previousBallots.forEach((ballot) => {
      const date = formatDateDanish(ballot.timestamp)
      dates.add(date)
    })
    return Array.from(dates).sort((a, b) => {
      // Sort dates in descending order (newest first)
      const [dayA, monthA, yearA] = a.split("-").map(Number)
      const [dayB, monthB, yearB] = b.split("-").map(Number)
      if (yearA !== yearB) return yearB - yearA
      if (monthA !== monthB) return monthB - monthA
      return dayB - dayA
    })
  }, [previousBallots])

  // Extract unique hour ranges from ballots
  const availableHours = useMemo(() => {
    const hours = new Map<string, number>()

    previousBallots.forEach((ballot) => {
      const date = new Date(ballot.timestamp)
      const hour = date.getHours()

      // Create hour ranges (e.g., "07:00 - 08:59", "09:00 - 10:59", etc.)
      const hourGroup = Math.floor(hour / 2)
      const startHour = hourGroup * 2
      const endHour = startHour + 1

      const hourRange = `${startHour.toString().padStart(2, "0")}:00 - ${endHour.toString().padStart(2, "0")}:59`

      hours.set(hourRange, (hours.get(hourRange) || 0) + 1)
    })

    // Sort by hour (chronologically)
    return Array.from(hours.entries()).sort((a, b) => {
      const hourA = Number.parseInt(a[0].split(":")[0])
      const hourB = Number.parseInt(b[0].split(":")[0])
      return hourA - hourB
    })
  }, [previousBallots])

  // Filter ballots based on selected dates and hours
  const filteredBallots = useMemo(() => {
    return previousBallots.filter((ballot) => {
      // Check if ballot matches selected dates
      const ballotDate = formatDateDanish(ballot.timestamp)
      const matchesDate = selectedDates.length === 0 || selectedDates.includes(ballotDate)

      // Check if ballot matches selected hours
      const date = new Date(ballot.timestamp)
      const hour = date.getHours()
      const hourGroup = Math.floor(hour / 2)
      const startHour = hourGroup * 2
      const endHour = startHour + 1
      const hourRange = `${startHour.toString().padStart(2, "0")}:00 - ${endHour.toString().padStart(2, "0")}:59`

      const matchesHour = selectedHours.length === 0 || selectedHours.includes(hourRange)

      return matchesDate && matchesHour
    })
  }, [previousBallots, selectedDates, selectedHours])

  // Paginated ballots
  const paginatedBallots = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    return filteredBallots.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredBallots, page])

  // Get selected ballots data
  const selectedBallotsData = useMemo(() => {
    return previousBallots.filter((ballot) => selectedBallotIds.includes(ballot.id))
  }, [previousBallots, selectedBallotIds])

  // Total pages
  const totalPages = Math.max(1, Math.ceil(filteredBallots.length / ITEMS_PER_PAGE))

  const toggleBallot = (ballotId: string) => {
    setSelectedBallotIds((prev) => {
      if (prev.includes(ballotId)) {
        return prev.filter((id) => id !== ballotId)
      } else {
        return [...prev, ballotId]
      }
    })
  }

  const toggleDateFilter = (date: string) => {
    setSelectedDates((prev) => {
      if (prev.includes(date)) {
        return prev.filter((d) => d !== date)
      } else {
        return [...prev, date]
      }
    })
    setPage(1) // Reset to first page when filters change
  }

  const toggleHourFilter = (hourRange: string) => {
    setSelectedHours((prev) => {
      if (prev.includes(hourRange)) {
        return prev.filter((h) => h !== hourRange)
      } else {
        return [...prev, hourRange]
      }
    })
    setPage(1) // Reset to first page when filters change
  }

  const clearFilters = () => {
    setSelectedDates([])
    setSelectedHours([])
    setPage(1)
  }

  const hasActiveFilters = selectedDates.length > 0 || selectedHours.length > 0

  return (
    <div className="pb-8 space-y-6">
      <Link href="/voting">
        <Button variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </Link>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">Identify Your Previous Ballots</h1>
          <div className="flex items-center gap-3">
            <HelpDialog defaultOpenSection="previous-ballots">
              <button className="text-muted-foreground hover:text-foreground flex items-center gap-1">
                <HelpCircle className="h-4 w-4" />
                How do I identify my ballots?
              </button>
            </HelpDialog>
            <HelpDialog defaultOpenSection="ballot-verification-security">
              <button className="text-muted-foreground hover:text-foreground flex items-center gap-1">
                <HelpCircle className="h-4 w-4" />
                Why is this necessary?
              </button>
            </HelpDialog>
          </div>
        </div>
        <p className="text-muted-foreground mb-4">
          Please select ALL ballots that match your previous votes. This step helps ensure the security of your vote and
          protects against coercion.
        </p>

        <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4 mb-6">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Important Security Notice</h3>
              <p className="text-sm text-red-800">
                If you fail to identify all your previous ballots, your new vote will not be counted. This is a security
                feature that protects against coerced voting.
              </p>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading your ballot history...</div>
      ) : (
        <>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All Ballots</TabsTrigger>
              <TabsTrigger value="selected" disabled={selectedBallotIds.length === 0}>
                Selected ({selectedBallotIds.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-4">
              <div className="flex flex-wrap items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      {selectedDates.length > 0 ? `Dates (${selectedDates.length})` : "Filter by Date"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Select Dates</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {availableDates.map((date) => (
                      <DropdownMenuCheckboxItem
                        key={date}
                        checked={selectedDates.includes(date)}
                        onCheckedChange={() => toggleDateFilter(date)}
                      >
                        {date}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Clock className="h-4 w-4" />
                      {selectedHours.length > 0 ? `Hours (${selectedHours.length})` : "Filter by Time"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Select Time Ranges</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {availableHours.map(([hourRange, count]) => (
                        <DropdownMenuCheckboxItem
                          key={hourRange}
                          checked={selectedHours.includes(hourRange)}
                          onCheckedChange={() => toggleHourFilter(hourRange)}
                        >
                          <div className="flex justify-between w-full">
                            <span>{hourRange}</span>
                            <span className="text-muted-foreground text-xs">({count})</span>
                          </div>
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                {hasActiveFilters && (
                  <Button variant="ghost" onClick={clearFilters} className="gap-2">
                    <X className="h-4 w-4" />
                    Clear Filters
                  </Button>
                )}

                <div className="ml-auto">
                  <HelpDialog defaultOpenSection="many-ballots">
                    <button className="text-muted-foreground hover:text-foreground flex items-center gap-1">
                      <HelpCircle className="h-4 w-4" />
                      Why am I seeing so many ballots?
                    </button>
                  </HelpDialog>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {selectedDates.map((date) => (
                  <Badge key={date} variant="secondary" className="gap-1">
                    {date}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleDateFilter(date)} />
                  </Badge>
                ))}

                {selectedHours.map((hourRange) => (
                  <Badge key={hourRange} variant="secondary" className="gap-1">
                    {hourRange}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleHourFilter(hourRange)} />
                  </Badge>
                ))}
              </div>

              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Showing {paginatedBallots.length} of {filteredBallots.length} ballots
                    </div>
                    <div className="text-sm font-medium">
                      {selectedBallotIds.length} ballot{selectedBallotIds.length !== 1 ? "s" : ""} selected
                    </div>
                  </div>
                </CardContent>
              </Card>

              {filteredBallots.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="text-muted-foreground mb-2">No ballots match your filters</div>
                    <Button variant="outline" onClick={clearFilters}>
                      Clear all filters
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {paginatedBallots.map((ballot) => (
                    <Card
                      key={ballot.id}
                      className={`cursor-pointer transition-colors ${
                        selectedBallotIds.includes(ballot.id)
                          ? "border-[#FFD700] bg-yellow-50"
                          : "hover:border-gray-300"
                      }`}
                      onClick={() => toggleBallot(ballot.id)}
                    >
                      <CardHeader className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                                selectedBallotIds.includes(ballot.id)
                                  ? "border-[#FFD700] bg-[#FFD700]"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedBallotIds.includes(ballot.id) && <Check className="h-3 w-3 text-white" />}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">{formatDateDanish(ballot.timestamp)}</span>
                              <span className="text-gray-500 ml-2">{formatTimeDanish(ballot.timestamp)}</span>
                            </div>
                          </div>
                          <BallotIdenticon
                            timestamp={ballot.timestamp}
                            id={ballot.id}
                            size={5}
                            cellSize={4}
                            identiconHash={ballot.identiconHash}
                          />
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              )}

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                  <PaginationItem className="flex items-center">
                    <span className="text-sm">
                      Page {page} of {totalPages}
                    </span>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </TabsContent>

            <TabsContent value="selected" className="space-y-4 mt-4">
              {selectedBallotsData.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {selectedBallotsData.map((ballot) => (
                      <Card key={ballot.id} className="border-[#FFD700] bg-yellow-50">
                        <CardHeader className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#FFD700] bg-[#FFD700]">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                              <div className="text-sm">
                                <span className="font-medium">{formatDateDanish(ballot.timestamp)}</span>
                                <span className="text-gray-500 ml-2">{formatTimeDanish(ballot.timestamp)}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <BallotIdenticon
                                timestamp={ballot.timestamp}
                                id={ballot.id}
                                size={5}
                                cellSize={4}
                                identiconHash={ballot.identiconHash}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleBallot(ballot.id)
                                }}
                              >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="text-muted-foreground mb-2">No ballots selected</div>
                    <Button variant="outline" onClick={() => setActiveTab("all")}>
                      Go to All Ballots
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end mt-8">
            <Link href="/voting/new">
              <Button className="bg-gray-900">
                Continue to Voting
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

