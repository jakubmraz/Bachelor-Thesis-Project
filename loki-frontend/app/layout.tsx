import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans } from "next/font/google"
import "./globals.css"

// Load Noto Sans font with multiple weights
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
})

export const metadata: Metadata = {
  title: "Online Voting Portal",
  description: "Secure platform for democratic decision-making",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={notoSans.variable}>
      <body className="overflow-x-hidden font-noto">
        <div className="min-h-screen bg-gray-50">{children}</div>
      </body>
    </html>
  )
}

