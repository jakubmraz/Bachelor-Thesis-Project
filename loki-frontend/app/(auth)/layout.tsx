import type React from "react"
import { TopBarAuth } from "@/components/top-bar-auth"
import { PageWrapper } from "@/components/page-wrapper"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { VoteProvider } from "@/contexts/vote-context"
import { TestRunProvider } from "@/contexts/test-run-context"

interface AuthLayoutProps {
  children: React.ReactNode
  params: {
    hideNav?: boolean
  }
}

export default function AuthLayout({ children, params }: AuthLayoutProps) {
  return (
    <VoteProvider>
      <TestRunProvider>
        <TopBarAuth />
        <PageWrapper>
          {!params.hideNav && <BreadcrumbNav />}
          {children}
        </PageWrapper>
      </TestRunProvider>
    </VoteProvider>
  )
}
