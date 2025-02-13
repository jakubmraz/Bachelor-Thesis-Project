import { SignInForm } from "@/components/sign-in-form"

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-[#FFD700]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-8 py-4">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold">Logo goes here</div>
          </div>
          <button className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-yellow-400">
            <span>Help</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-8 py-12">
        <div className="mx-auto max-w-[800px]">
          <div className="mt-12">
            <h1 className="mb-4 text-2xl font-bold">Start Voting</h1>
            <p className="mb-8 text-gray-600">Enter your initialization code and year of birth. Then click Start.</p>
            <SignInForm />
          </div>
        </div>
      </main>
    </div>
  )
}

