import type React from "react"
import { TopBarPublic } from "@/components/top-bar-public"
import { PageWrapper } from "@/components/page-wrapper"
import { Footer } from "@/components/footer"
import { TestRunProvider } from "@/contexts/test-run-context"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TestRunProvider>
      <TopBarPublic />
      <PageWrapper>{children}</PageWrapper>
      <Footer />
    </TestRunProvider>
  )
}
