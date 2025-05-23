import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function Page() {
  return (
    <div className="flex flex-col items-center pb-8">
      <div className="self-start">
        <Link href="/login">
          <Button variant="ghost" className="mb-6">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      <div className="text-center max-w-xl mb-8">
        <h1 className="text-2xl font-bold mb-4">MitID Authentication</h1>
        <p className="text-gray-600">
          This page would embed a MitID window to guide the user through authentication. The actual MitID integration is
          out of scope for this project.
        </p>
      </div>

      <Link href="/elections" className="mb-8">
        <Button size="lg" className="bg-gray-900">
          Continue
        </Button>
      </Link>

      <div className="border border-dashed border-gray-300 rounded-lg p-4 w-full max-w-md aspect-[4/5] relative bg-gray-50">
        <Image
          src="/mitID_demo.png?height=500&width=400"
          alt="MitID widget placeholder"
          fill
          className="object-contain p-4"
        />
      </div>
    </div>
  )
}
