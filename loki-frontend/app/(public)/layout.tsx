import type React from "react"
import { TopBarPublic } from "@/components/top-bar-public"
import { PageWrapper } from "@/components/page-wrapper"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <TopBarPublic />
      <PageWrapper>{children}</PageWrapper>
    </>
  )
}

