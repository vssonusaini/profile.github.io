'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Settings, PenToolIcon as Tool } from 'lucide-react'
import Link from 'next/link'

// Mock data for user's tools
const userTools = [
  { id: 1, name: "Task Manager", description: "Organize and track your tasks", icon: Tool },
  { id: 2, name: "Time Tracker", description: "Monitor your productivity", icon: Tool },
  { id: 3, name: "Project Planner", description: "Plan and manage your projects", icon: Tool },
  { id: 4, name: "Document Editor", description: "Collaborate on documents", icon: Tool },
]

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTools = userTools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Tools Dashboard</h1>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search your tools..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search your tools"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <Card key={tool.id} className="bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 border-primary/20 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="gradient-text">{tool.name}</span>
                <tool.icon className="h-6 w-6 text-primary" />
              </CardTitle>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" aria-label={`Launch ${tool.name}`}>
                  Launch
                </Button>
                <Button variant="ghost" size="sm" aria-label={`Settings for ${tool.name}`}>
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">No tools found matching your search.</p>
      )}
    </div>
  )
}

