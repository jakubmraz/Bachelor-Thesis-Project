import Link from "next/link"
import { Home } from "lucide-react"
import { HelpDialog } from "./help-dialog"

export function TopBarPublic() {
  return (
    <header className="border-b bg-[#FFD700]">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold">Logo goes here</div>
        </Link>
        <div className="flex items-center gap-4">
          <HelpDialog />
          <Link href="/" className="hover:bg-yellow-400 px-2 py-1 rounded-md flex items-center gap-2">
            <Home className="h-4 w-4" />
            Home
          </Link>
        </div>
      </div>
    </header>
  )
}

