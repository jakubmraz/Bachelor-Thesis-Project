"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export function TopBarAuth() {
  const pathname = usePathname()
  const isVotingPage = pathname === "/voting"

  return (
    <header className="border-b bg-[#FFD700]">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-8 py-4">
        <div className="text-2xl font-bold">Logo goes here</div>
        {isVotingPage ? (
          <Dialog>
            <DialogTrigger asChild>
              <button className="hover:bg-yellow-400 px-2 py-1 rounded-md">Log Out</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Confirm Logout
                </DialogTitle>
                <DialogDescription className="pt-4">
                  You have not submitted your vote. If you log out now, your selections will be lost. Are you sure you
                  want to leave?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-4">
                <DialogTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogTrigger>
                <Link href="/logged-out">
                  <Button variant="destructive">Yes, Log Out</Button>
                </Link>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Link href="/logged-out" className="hover:bg-yellow-400 px-2 py-1 rounded-md">
            Log Out
          </Link>
        )}
      </div>
    </header>
  )
}

