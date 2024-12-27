import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PenToolIcon as Tool, Zap, BarChart, Users } from 'lucide-react'

const tools = [
  {
    name: "Task Manager",
    description: "Organize and track your tasks efficiently",
    icon: Tool
  },
  {
    name: "Analytics Dashboard",
    description: "Visualize your data with powerful charts",
    icon: BarChart
  },
  {
    name: "Team Collaboration",
    description: "Work together seamlessly with your team",
    icon: Users
  },
  {
    name: "Automation Engine",
    description: "Automate repetitive tasks and workflows",
    icon: Zap
  }
]

export function ToolList() {
  return (
    <section id="toollist" className="py-20 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool, index) => (
            <Card key={index}>
              <CardHeader>
                <tool.icon className="w-10 h-10 text-primary mb-2" />
                <CardTitle>{tool.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{tool.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

