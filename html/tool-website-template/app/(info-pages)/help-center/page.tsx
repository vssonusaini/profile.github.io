import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, HelpCircle, Book, MessageCircle } from 'lucide-react'

const faqItems = [
  { question: "How do I reset my password?", answer: "To reset your password, click on the 'Forgot Password' link on the login page and follow the instructions sent to your email." },
  { question: "Can I use ToolMaster on mobile devices?", answer: "Yes, ToolMaster is fully responsive and can be used on smartphones and tablets through our mobile app or web browser." },
  { question: "How do I invite team members?", answer: "To invite team members, go to your account settings, click on 'Team Management', and use the 'Invite Member' button to send invitations via email." },
  { question: "What payment methods do you accept?", answer: "We accept all major credit cards, PayPal, and offer invoice payment options for enterprise customers." },
]

export default function HelpCenterPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Help Center</h1>
      <div className="mb-12">
        <div className="relative">
          <Input type="search" placeholder="Search for help..." className="pl-10" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="mr-2" /> FAQs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Find quick answers to common questions about ToolMaster.</p>
            <Button variant="link" className="mt-4 p-0">Browse FAQs</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="mr-2" /> User Guides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Detailed guides to help you make the most of ToolMaster.</p>
            <Button variant="link" className="mt-4 p-0">View Guides</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2" /> Contact Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Get in touch with our support team for personalized help.</p>
            <Button variant="link" className="mt-4 p-0">Contact Us</Button>
          </CardContent>
        </Card>
      </div>
      <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqItems.map((item, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
            <p className="text-muted-foreground">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

