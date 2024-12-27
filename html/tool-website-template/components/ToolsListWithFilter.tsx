'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PenToolIcon, Zap, BarChart, Users, FileText, Calendar, Mail, Shield } from 'lucide-react'

const tools = [
  {
    name: "Task Manager",
    description: "Organize and track your tasks efficiently",
    icon: PenToolIcon,
    category: "Productivity"
  },
  {
    name: "Analytics Dashboard",
    description: "Visualize your data with powerful charts",
    icon: BarChart,
    category: "Analytics"
  },
  {
    name: "Team Collaboration",
    description: "Work together seamlessly with your team",
    icon: Users,
    category: "Collaboration"
  },
  {
    name: "Automation Engine",
    description: "Automate repetitive tasks and workflows",
    icon: Zap,
    category: "Automation"
  },
  {
    name: "Document Editor",
    description: "Create and edit documents in real-time",
    icon: FileText,
    category: "Productivity"
  },
  {
    name: "Project Planner",
    description: "Plan and schedule your projects effectively",
    icon: Calendar,
    category: "Project Management"
  },
  {
    name: "Email Marketing",
    description: "Create and send email campaigns",
    icon: Mail,
    category: "Marketing"
  },
  {
    name: "Security Monitor",
    description: "Monitor and protect your digital assets",
    icon: Shield,
    category: "Security"
  }
]

export function ToolsListWithFilter() {
  const [filter, setFilter] = useState('')

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(filter.toLowerCase()) ||
    tool.category.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <section id="toollist" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-secondary to-background">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 gradient-text">Our Tools</h2>
        <div className="max-w-md mx-auto mb-12">
          <Input
            type="text"
            placeholder="Search tools by name or category..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 border-primary/20"
            aria-label="Search tools"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredTools.map((tool, index) => (
            <Card key={tool.name} className="bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 border-primary/20 card-hover">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <tool.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="gradient-text">{tool.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{tool.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{tool.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {filteredTools.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">No tools found matching your search.</p>
        )}
      </div>
    </section>
  )
}

