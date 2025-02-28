import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function Page() {
  return (
    <div className="space-y-8">
      <Link href="/">
        <Button variant="ghost" className="mb-6">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>

      <div>
        <h1 className="text-2xl font-bold mb-4">Help Center</h1>
        <div className="prose prose-gray max-w-none">
          <h2>Frequently Asked Questions</h2>
          <h3>About MyID Authentication</h3>
          <p>
            MyID is a secure authentication method that uses biometric verification to ensure your identity. You must
            have the MyID app installed on your smartphone with biometric authentication enabled.
          </p>

          <h3>Voting Process</h3>
          <p>
            Once authenticated, you will be guided through the voting process step by step. Make sure to review your
            choices before submitting your final vote.
          </p>

          <h3>Technical Requirements</h3>
          <p>
            - A modern web browser (Chrome, Firefox, Safari)
            <br />- JavaScript enabled
            <br />- Stable internet connection
            <br />- MyID app installed and configured
          </p>

          <h3>Need Additional Help?</h3>
          <p>
            If you cannot use MyID or experience any issues, please visit your local voting station where staff will
            assist you with the voting process.
          </p>
        </div>
      </div>
    </div>
  )
}

