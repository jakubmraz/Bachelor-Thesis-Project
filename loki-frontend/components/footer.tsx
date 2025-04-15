"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { InfoIcon } from "lucide-react"

export function Footer() {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setDialogOpen(true)
  }

  return (
    <>
      <footer className="border-t mt-16 bg-gray-50">
        <div className="mx-auto max-w-[1200px] px-8 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Links Section */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-900">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-900">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-900">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-900">
                    Accessibility Statement
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Section */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-900">
                    Report a Problem
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-900">
                    Contact Support
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-900">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-900">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            {/* About Section */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">About</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-900">
                    About the Election
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-900">
                    Security Measures
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-900">
                    Voting Process
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-900">
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Contact</h3>
              <address className="not-italic text-sm text-gray-600">
                <p>National Election Commission</p>
                <p>Christiansborg 1</p>
                <p>1218 Copenhagen K</p>
                <p>Denmark</p>
                <p className="mt-2">
                  <a href="#" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-900">
                    Phone: +45 00 00 00 00
                  </a>
                </p>
                <p>
                  <a href="#" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-900">
                    contact@election.gov.dk
                  </a>
                </p>
              </address>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex items-center space-x-4">
                <img src="/logo.png?height=40&width=120&text=VOTE+LOGO" alt="Voting Portal Logo" className="h-10" />
                <p className="text-sm text-gray-600">Official Danish Election Portal</p>
              </div>
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} National Election Commission. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Demo Feature Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <InfoIcon className="h-5 w-5 text-blue-500" />
              Demo Feature
            </DialogTitle>
            <DialogDescription className="pt-2">
              This link is just for show and isn't implemented in this demo.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
