import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { HelpDialog } from "@/components/help-dialog"
import { HelpCircle } from "lucide-react"

export default function Page() {
  return (
    <div className="space-y-6">
      <Link href="/">
        <Button variant="ghost">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>

      <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">Use Incognito Mode to Protect Your Privacy</h1>
          <HelpDialog defaultOpenSection="incognito-mode">
            <button className="text-muted-foreground hover:text-foreground flex items-center gap-1">
              <HelpCircle className="h-4 w-4" />
              Why is this necessary?
            </button>
          </HelpDialog>
      </div>

      <div className="flex flex-col items-center text-center space-y-8">
        <Link href="/login" className="block">
          <Button size="lg" className="bg-[#FFD700] hover:bg-[#FFED4A] text-black px-8">
            Proceed to Login
          </Button>
        </Link>

        <Card className="max-w-xl p-6 space-y-4">
          <p className="text-lg">
            A voting booth keeps no record, but your browser does. To protect your privacy, right click the button above and
            then click on "Open link in incognito window".
          </p>

          <div className="relative h-48 w-full border rounded-lg overflow-hidden bg-gray-50">
            <Image
              src="/incognito_guide.png?height=192&width=600"
              alt="Screenshot showing how to right click and select 'Open in incognito mode' in a browser"
              fill
              className="object-contain"
            />
          </div>

          <div className="text-sm text-muted-foreground">
            Using incognito mode ensures that no browsing history, cookies, or other data are saved after you close the
            window.
          </div>
        </Card>
      </div>
    </div>
  )
}

