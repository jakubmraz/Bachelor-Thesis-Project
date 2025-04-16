"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { PublicBallot } from "@/lib/ballot-data"
import { generateNoiseBallots } from "@/lib/test-run"

interface TestRun {
  id: number
  electionStart: string // ISO date string
  electionEnd: string // ISO date string
  ballots: PublicBallot[]
  isActive: boolean
}

interface TestRunContextType {
  activeTestRun: TestRun | null
  testRuns: TestRun[]
  beginTestRun: () => Promise<number>
  loadTestRun: (id: number) => Promise<void>
  endTestRun: () => void
  addBallotToActiveTestRun: (ballot: PublicBallot) => void
  isTestRunActive: boolean
  refreshNoiseBallots: () => Promise<void>
}

const TestRunContext = createContext<TestRunContextType | undefined>(undefined)

const TEST_RUNS_STORAGE_KEY = "lokiFrontendTestRuns"
const ACTIVE_TEST_RUN_ID_KEY = "lokiFrontendActiveTestRunId"

export function TestRunProvider({ children }: { children: ReactNode }) {
  const [testRuns, setTestRuns] = useState<TestRun[]>([])
  const [activeTestRun, setActiveTestRun] = useState<TestRun | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load saved test runs from localStorage on mount
  useEffect(() => {
    try {
      const savedTestRuns = localStorage.getItem(TEST_RUNS_STORAGE_KEY)
      const savedActiveTestRunId = localStorage.getItem(ACTIVE_TEST_RUN_ID_KEY)

      let parsedTestRuns: TestRun[] = []

      if (savedTestRuns) {
        parsedTestRuns = JSON.parse(savedTestRuns)
        setTestRuns(parsedTestRuns)
      }

      if (savedActiveTestRunId) {
        const activeId = Number(savedActiveTestRunId)
        const activeRun = parsedTestRuns.find((run) => run.id === activeId)
        if (activeRun) {
          setActiveTestRun({ ...activeRun, isActive: true })
        }
      }
    } catch (error) {
      console.error("Error loading test runs:", error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save test runs to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(TEST_RUNS_STORAGE_KEY, JSON.stringify(testRuns))

      if (activeTestRun) {
        localStorage.setItem(ACTIVE_TEST_RUN_ID_KEY, activeTestRun.id.toString())
      } else {
        localStorage.removeItem(ACTIVE_TEST_RUN_ID_KEY)
      }
    }
  }, [testRuns, activeTestRun, isLoaded])

  // Begin a new test run
  const beginTestRun = async () => {
    // Set election start time to 8:00 AM of the current day
    const now = new Date()
    const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0)

    // Set election end time to start time + 3 days
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + 3)

    // Generate a unique id (higher than any existing id)
    const maxId = testRuns.length > 0 ? Math.max(...testRuns.map((run) => run.id)) : 0
    const newId = maxId + 1

    // Create the new test run
    const newTestRun: TestRun = {
      id: newId,
      electionStart: startDate.toISOString(),
      electionEnd: endDate.toISOString(),
      ballots: [],
      isActive: true,
    }

    // Generate initial noise ballots
    const noiseBallots = await generateNoiseBallots(startDate.toISOString(), [])
    newTestRun.ballots = noiseBallots

    // Update state
    setTestRuns((prev) => [...prev, newTestRun])
    setActiveTestRun(newTestRun)

    return newId
  }

  // Load an existing test run
  const loadTestRun = async (id: number) => {
    const testRun = testRuns.find((run) => run.id === id)
    if (testRun) {
      // Generate noise ballots up to current time
      const updatedBallots = await generateNoiseBallots(testRun.electionStart, testRun.ballots)

      // Create updated test run with new ballots
      const updatedTestRun = {
        ...testRun,
        ballots: updatedBallots,
        isActive: true,
      }

      // Deactivate all test runs and activate the selected one
      const updatedTestRuns = testRuns.map((run) => ({
        ...run,
        isActive: run.id === id,
        // If this is the run we're loading, update its ballots too
        ballots: run.id === id ? updatedBallots : run.ballots,
      }))

      setTestRuns(updatedTestRuns)
      setActiveTestRun(updatedTestRun)
    }
  }

  // End the active test run
  const endTestRun = () => {
    if (activeTestRun) {
      const updatedTestRuns = testRuns.map((run) => (run.id === activeTestRun.id ? { ...run, isActive: false } : run))
      setTestRuns(updatedTestRuns)
      setActiveTestRun(null)
    }
  }

  // Add a ballot to the active test run
  const addBallotToActiveTestRun = (ballot: PublicBallot) => {
    if (activeTestRun) {
      const updatedBallots = [...activeTestRun.ballots, ballot]
      const updatedTestRun = {
        ...activeTestRun,
        ballots: updatedBallots,
      }

      const updatedTestRuns = testRuns.map((run) => (run.id === activeTestRun.id ? updatedTestRun : run))

      setTestRuns(updatedTestRuns)
      setActiveTestRun(updatedTestRun)
    }
  }

  // Refresh noise ballots up to current time
  const refreshNoiseBallots = async () => {
    if (activeTestRun) {
      const updatedBallots = await generateNoiseBallots(activeTestRun.electionStart, activeTestRun.ballots)

      const updatedTestRun = {
        ...activeTestRun,
        ballots: updatedBallots,
      }

      const updatedTestRuns = testRuns.map((run) => (run.id === activeTestRun.id ? updatedTestRun : run))

      setTestRuns(updatedTestRuns)
      setActiveTestRun(updatedTestRun)
    }
  }

  return (
    <TestRunContext.Provider
      value={{
        activeTestRun,
        testRuns,
        beginTestRun,
        loadTestRun,
        endTestRun,
        addBallotToActiveTestRun,
        isTestRunActive: activeTestRun !== null,
        refreshNoiseBallots,
      }}
    >
      {children}
    </TestRunContext.Provider>
  )
}

export function useTestRun() {
  const context = useContext(TestRunContext)
  if (context === undefined) {
    throw new Error("useTestRun must be used within a TestRunProvider")
  }
  return context
}
