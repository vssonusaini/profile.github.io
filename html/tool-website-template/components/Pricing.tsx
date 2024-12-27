import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    features: ["5 projects", "Basic analytics", "24/7 support"],
  },
  {
    name: "Pro",
    price: "$19.99",
    features: ["Unlimited projects", "Advanced analytics", "Priority support", "Team collaboration"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Custom solutions", "Dedicated account manager", "On-premise deployment", "SLA"],
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-secondary">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 gradient-text">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`flex flex-col bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 border-primary/20 card-hover ${plan.highlighted ? 'ring-2 ring-primary' : ''}`}>
              <CardHeader>
                <CardTitle className="text-2xl gradient-text">{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                  {plan.name !== "Enterprise" && <span className="text-muted-foreground"> / month</span>}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white" aria-label={`Get started with ${plan.name} plan`}>
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

