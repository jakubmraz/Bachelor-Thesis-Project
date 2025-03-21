import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Fingerprint } from "lucide-react"

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
          <h1 className="mb-4 text-2xl font-bold">Secure Login</h1>
          <p className="text-gray-600">
            This voting portal uses biometric authentication through MitID to ensure secure and reliable voter
            identification.
          </p>
        </div>

        <Link href="/login/auth" className="block">
          <Button size="lg" className="w-full bg-gray-900 py-6 text-lg">
            <Fingerprint className="mr-2 h-5 w-5" />
            Login with MitID
          </Button>
        </Link>

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

