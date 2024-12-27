import { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { CookieConsent } from '@/components/CookieConsent'
import { Toaster } from "@/components/ui/toaster"
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ToolMaster - Streamline Your Workflow',
  description: 'Boost productivity with ToolMaster\'s suite of powerful tools.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //const [isLoggedIn, setIsLoggedIn] = useState(false)

  //useEffect(() => {
  //  const loginStatus = localStorage.getItem('isLoggedIn')
  //  if (loginStatus === 'true') {
  //    setIsLoggedIn(true)
  //  }
  //}, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <CookieConsent />
        <Toaster />
      </body>
    </html>
  )
}

