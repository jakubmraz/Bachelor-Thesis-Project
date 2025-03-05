import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, CheckCircle2, Clock } from "lucide-react"

export default function ElectionsPage() {
  // In a real application, this would come from an API
  const elections = [
    {
      id: "general-2025",
      title: "2025 General Election",
      description: "Vote for the parliament and the next president.",
      startDate: "2025-03-01",
      endDate: "2025-06-15",
      status: "active",
    },
    // More elections would be listed here in a real application
  ]

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-6">Available Elections</h1>
      <p className="text-muted-foreground mb-8">
        Select an election to cast or modify your vote. 
      </p>

      <div className="grid gap-6">
        {elections.map((election) => (
          <Card key={election.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{election.title}</CardTitle>
                  <CardDescription className="mt-1">{election.description}</CardDescription>
                </div>
                {election.status === "active" && (
                  <div className="flex items-center text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Active
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <CalendarIcon className="h-4 w-4 mr-2" />
                <span>
                  {new Date(election.startDate).toLocaleDateString()} -{" "}
                  {new Date(election.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>Closes in 10 days</span>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t">
              <div className="w-full flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {election.status === "active" ? "You can vote or modify your vote until the election closes" : ""}
                </div>
                <Link href="/voting">
                  <Button>Enter Election</Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

