import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'

const docCategories = [
  { title: "Getting Started", items: ["Quick Start Guide", "Installation", "Basic Configuration"] },
  { title: "Core Features", items: ["Task Management", "Team Collaboration", "Analytics Dashboard"] },
  { title: "Advanced Topics", items: ["API Integration", "Custom Workflows", "Security Best Practices"] },
  { title: "Troubleshooting", items: ["Common Issues", "Error Messages", "Contact Support"] },
]

export default function DocumentationPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Documentation</h1>
      <div className="mb-12">
        <div className="relative">
          <Input type="search" placeholder="Search documentation..." className="pl-10" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {docCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Button variant="link" className="p-0 h-auto">{item}</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

