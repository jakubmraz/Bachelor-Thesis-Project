import type React from "react"
import { TopBarAuth } from "@/components/top-bar-auth"
import { PageWrapper } from "@/components/page-wrapper"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <TopBarAuth />
      <PageWrapper>{children}</PageWrapper>
    </>
  )
}

