import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 pt-12">
      <h1 className="text-2xl font-bold">Successfully Logged Out</h1>
      <p className="text-gray-600">Thank you for using the online voting portal.</p>
      <Link href="/">
        <Button size="lg">Return to Front Page</Button>
      </Link>
    </div>
  )
}
