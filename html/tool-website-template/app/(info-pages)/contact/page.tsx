import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-lg mb-6">
            We're here to help! Whether you have a question about our products, need technical support, or want to explore partnership opportunities, our team is ready to assist you.
          </p>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <Input id="name" placeholder="Your name" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <Input id="email" type="email" placeholder="your@email.com" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <Textarea id="message" placeholder="How can we help you?" rows={4} required />
            </div>
            <Button type="submit" size="lg">Send Message</Button>
          </form>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2" /> Email Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>support@toolmaster.com</p>
              <p>sales@toolmaster.com</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="mr-2" /> Call Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>+1 (555) 123-4567</p>
              <p>Monday - Friday, 9am - 5pm EST</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2" /> Visit Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>123 Productivity Lane</p>
              <p>Suite 456</p>
              <p>San Francisco, CA 94105</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

