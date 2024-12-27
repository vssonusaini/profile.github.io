'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu, LayoutDashboard, LogOut, BoxIcon as Toolbox } from 'lucide-react'
import { LoginDialog } from './LoginDialog'
import { SignUpDialog } from './SignUpDialog'
import { useToast } from "@/components/ui/use-toast"

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { toast } = useToast()

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

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
    localStorage.setItem('isLoggedIn', 'true')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('isLoggedIn')
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
  }

  return (
    <header className="bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-2xl font-bold gradient-text">ToolMaster</span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center justify-between">
          <div className="flex items-center space-x-6 text-sm font-medium">
            <Link href="#about" className="text-foreground/60 transition-colors hover:text-foreground hover:gradient-text">About</Link>
            {isLoggedIn && (
              <Link href="/dashboard" className="text-foreground/60 transition-colors hover:text-foreground hover:gradient-text">
                <LayoutDashboard className="h-4 w-4 mr-2 inline-block" />
                Dashboard
              </Link>
            )}
            <Link href="/tools" className="text-foreground/60 transition-colors hover:text-foreground hover:gradient-text">
              <Toolbox className="h-4 w-4 mr-2 inline-block" />
              Tools
            </Link>
            <Link href="#features" className="text-foreground/60 transition-colors hover:text-foreground hover:gradient-text">Features</Link>
            <Link href="#pricing" className="text-foreground/60 transition-colors hover:text-foreground hover:gradient-text">Pricing</Link>
            <Link href="#contact" className="text-foreground/60 transition-colors hover:text-foreground hover:gradient-text">Contact</Link>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <Button variant="ghost" className="hover:bg-primary/20 hover:text-primary" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </Button>
            ) : (
              <>
                <LoginDialog onLoginSuccess={handleLoginSuccess} />
                <SignUpDialog />
              </>
            )}
          </div>
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Toggle menu">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
    </header>
  )
}

