import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
        <div className="max-w-md mx-auto">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
              <Input id="name" placeholder="Your name" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
              <Input id="email" type="email" placeholder="your@email.com" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
              <Textarea id="message" placeholder="Your message" rows={4} required />
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </div>
      </div>
    </section>
  )
}

