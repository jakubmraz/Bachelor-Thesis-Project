import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Fingerprint, HelpCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { HelpDialog } from "@/components/help-dialog"

export default function Page() {
  return (
    <>
      <Link href="/">
        <Button variant="ghost" className="mb-6">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>

      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Secure Login</h1>
          <p className="text-gray-600 mb-4">
            This voting portal uses biometric authentication through MitID to ensure secure and reliable voter
            identification.
          </p>
        </div>

        {/* Privacy Notice Card */}
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Use Incognito Mode to Protect Your Privacy</h2>
              <HelpDialog defaultOpenSection="incognito-mode">
                <button className="text-muted-foreground hover:text-foreground flex items-center gap-1">
                  <HelpCircle className="h-4 w-4" />
                  Why is this important?
                </button>
              </HelpDialog>
            </div>
            <p className="mb-4">
              A voting booth keeps no record, but your browser does. To protect your privacy, right click the login
              button below and then click on "Open link in incognito window".
            </p>

            <div className="relative h-48 w-full border rounded-lg overflow-hidden bg-gray-50 mb-4">
              <Image
                src="/incognito_guide.png?height=192&width=600"
                alt="Screenshot showing how to right click and select 'Open in incognito mode' in a browser"
                fill
                className="object-contain"
              />
            </div>

            <p className="text-sm text-muted-foreground">
              Using incognito mode ensures that no browsing history, cookies, or other data are saved after you close
              the window.
            </p>
          </CardContent>
        </Card>

        {/* Login Button */}
        <Link href="/login/auth" className="block">
          <Button size="lg" className="w-full bg-gray-900 py-6 text-lg">
            <Fingerprint className="mr-2 h-5 w-5" />
            Login with MitID
          </Button>
        </Link>

        {/* Requirements Card */}
        <div className="rounded-lg bg-gray-50 p-4">
          <h2 className="mb-2 font-semibold">Important Information</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• You must have MitID installed with biometric authentication enabled</li>
            <li>• If you cannot use MitID, please visit your local voting station to vote in person</li>
            <li>• Make sure your MitID app is up to date before proceeding</li>
          </ul>
        </div>
      </div>
    </>
  )
}

