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
import { HelpDialog } from "./help-dialog"
import Image from "next/image"

// In a real application, this would come from the authentication system
const userInfo = {
  name: "John Testaccount",
  id: "101010-1011",
}

export function TopBarAuth() {
  const pathname = usePathname()
  const isVotingPage = pathname === "/voting"

  return (
    <header className="border-b bg-[#FFD700]">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-auto overflow-hidden flex items-center">
            <Image
              src="/logo.png?height=56&width=180&text=VOTE+LOGO"
              alt="Voting Portal Logo"
              width={240}
              height={80}
              className="object-contain"
              priority
            />
          </div>
          <div className="text-xs leading-tight">
            <div className="font-medium">{userInfo.name}</div>
            <div className="text-gray-700">{userInfo.id}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <HelpDialog />
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
      </div>
    </header>
  )
}

