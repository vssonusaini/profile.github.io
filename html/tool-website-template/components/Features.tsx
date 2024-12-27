import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Target, Layers, Users } from 'lucide-react'

const features = [
  {
    title: "Lightning Fast",
    description: "Our tool processes your data at incredible speeds, saving you valuable time.",
    icon: Zap
  },
  {
    title: "Precision Targeting",
    description: "Reach your exact audience with pinpoint accuracy and maximize your impact.",
    icon: Target
  },
  {
    title: "Seamless Integration",
    description: "Easily integrate with your existing workflow and boost overall productivity.",
    icon: Layers
  },
  {
    title: "Team Collaboration",
    description: "Foster teamwork with robust collaboration features and real-time updates.",
    icon: Users
  }
]

export function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-secondary">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 gradient-text">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 border-primary/20 card-hover">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl gradient-text">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

