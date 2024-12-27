'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight, LayoutDashboard, BoxIcon as Toolbox } from 'lucide-react'
import Link from 'next/link'
import { SignUpDialog } from './SignUpDialog'

export function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    try {
      const loginStatus = localStorage.getItem('isLoggedIn')
      if (loginStatus === 'true') {
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error)
    }
  }, [])

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Simplify Your Workflow with <span className="gradient-text">ToolMaster</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Boost productivity and streamline your processes with our all-in-one tool solution. 
              Experience the power of efficiency today.
            </p>
          </div>
          <div className="space-x-4">
            {isLoggedIn ? (
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white" aria-label="Go to Dashboard">
                  Go to Dashboard <LayoutDashboard className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <SignUpDialog />
            )}
            <Link href="/tools">
              <Button variant="outline" size="lg" className="hover:bg-primary/20 hover:text-primary">
                Explore Tools <Toolbox className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="blob"></div>
        <div className="blob"></div>
        <div className="blob"></div>
      </div>
    </section>
  )
}

