"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { HelpCircle, Triangle } from "lucide-react"
import { useState } from "react"
import { MaskedInput } from "./masked-input"

export function SignInForm() {
  const [code, setCode] = useState("")

  const handleCodeChange = (value: string) => {
    setCode(value)
  }

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="rounded-md bg-gray-100 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Triangle className="h-4 w-4 fill-current" />
              <Label htmlFor="code" className="text-base">
                Initialization Code
              </Label>
            </div>
            <button className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900">
              <HelpCircle className="mr-2 h-4 w-4" />
              What is the initialization code?
            </button>
          </div>
          <MaskedInput id="code" value={code} onChange={handleCodeChange} className="bg-white" />
          <p className="mt-2 text-sm text-gray-500">It doesn't matter if you use uppercase or lowercase letters.</p>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="default" className="bg-gray-900 px-6 hover:bg-gray-800">
          Login
        </Button>
      </div>
    </div>
  )
}
