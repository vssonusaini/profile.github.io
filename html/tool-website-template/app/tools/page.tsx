'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PenToolIcon, Zap, BarChart, Users, FileText, Calendar, Mail, Shield, Briefcase, Code, Globe, Camera } from 'lucide-react'

const allTools = [
  { id: 1, name: "Task Manager", description: "Organize and track your tasks efficiently", icon: PenToolIcon, category: "Productivity" },
  { id: 2, name: "Analytics Dashboard", description: "Visualize your data with powerful charts", icon: BarChart, category: "Analytics" },
  { id: 3, name: "Team Collaboration", description: "Work together seamlessly with your team", icon: Users, category: "Collaboration" },
  { id: 4, name: "Automation Engine", description: "Automate repetitive tasks and workflows", icon: Zap, category: "Automation" },
  { id: 5, name: "Document Editor", description: "Create and edit documents in real-time", icon: FileText, category: "Productivity" },
  { id: 6, name: "Project Planner", description: "Plan and schedule your projects effectively", icon: Calendar, category: "Project Management" },
  { id: 7, name: "Email Marketing", description: "Create and send email campaigns", icon: Mail, category: "Marketing" },
  { id: 8, name: "Security Monitor", description: "Monitor and protect your digital assets", icon: Shield, category: "Security" },
  { id: 9, name: "CRM System", description: "Manage customer relationships efficiently", icon: Briefcase, category: "Sales" },
  { id: 10, name: "Code Repository", description: "Version control and code collaboration", icon: Code, category: "Development" },
  { id: 11, name: "Website Builder", description: "Create stunning websites with ease", icon: Globe, category: "Web Design" },
  { id: 12, name: "Image Editor", description: "Edit and enhance your images", icon: Camera, category: "Design" },
]

const categories = [...new Set(allTools.map(tool => tool.category))]

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredTools = allTools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || tool.category === selectedCategory)
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 gradient-text">All Tools</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-grow">
          <Input
            type="search"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
            aria-label="Search tools"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory} aria-label="Select category">
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTools.map((tool) => (
          <Card key={tool.id} className="bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 border-primary/20 card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <tool.icon className="h-8 w-8 text-primary" />
                <span className="text-sm text-muted-foreground">{tool.category}</span>
              </div>
              <CardTitle className="gradient-text">{tool.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{tool.description}</CardDescription>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white" aria-label={`Launch ${tool.name}`}>
                Launch Tool
              </Button>
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

