import type React from "react"
import { TopBarAuth } from "@/components/top-bar-auth"
import { PageWrapper } from "@/components/page-wrapper"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <TopBarAuth />
      <PageWrapper>
        <BreadcrumbNav />
        {children}
      </PageWrapper>
    </>
  )
}

