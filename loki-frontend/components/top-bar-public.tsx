import Link from "next/link"

export function TopBarPublic() {
  return (
    <header className="border-b bg-[#FFD700]">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-8 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold">Logo goes here</div>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/help" className="hover:bg-yellow-400 px-2 py-1 rounded-md">
            Help
          </Link>
          <Link href="/" className="hover:bg-yellow-400 px-2 py-1 rounded-md">
            Home
          </Link>
        </div>
      </div>
    </header>
  )
}

