'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

// Default credentials
const DEFAULT_EMAIL = "user@example.com"
const DEFAULT_PASSWORD = "password123"

export function LoginDialog({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
      })
      onLoginSuccess()
      setOpen(false)
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="hover:bg-primary/20 hover:text-primary" aria-label="Log in">Log in</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log in to your account</DialogTitle>
          <DialogDescription>
            Enter your email and password to access your ToolMaster account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Log in</Button>
        </form>
        <DialogDescription className="text-center mt-4">
          Default Email: {DEFAULT_EMAIL}<br />
          Default Password: {DEFAULT_PASSWORD}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

