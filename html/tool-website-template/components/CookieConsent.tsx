'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const handleAccept = () => {
    try {
      localStorage.setItem('cookieConsent', 'accepted')
      setShowConsent(false)
      toast({
        title: "Cookies accepted",
        description: "Thank you for accepting our cookies policy.",
      })
    } catch (error) {
      console.error('Error setting cookie consent:', error)
      toast({
        title: "Error",
        description: "There was an error saving your preference. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeny = () => {
    try {
      localStorage.setItem('cookieConsent', 'denied')
      setShowConsent(false)
      toast({
        title: "Cookies denied",
        description: "You have chosen to deny our cookies policy. Some features may be limited.",
        variant: "destructive",
      })
    } catch (error) {
      console.error('Error setting cookie consent:', error)
      toast({
        title: "Error",
        description: "There was an error saving your preference. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 p-4 md:p-6 shadow-lg border-t border-border">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground flex-grow">
          <p>We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleDeny} variant="outline" size="sm">
            Deny All
          </Button>
          <Button onClick={handleAccept} size="sm">
            Accept All
          </Button>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2" 
          onClick={() => setShowConsent(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </div>
  )
}

